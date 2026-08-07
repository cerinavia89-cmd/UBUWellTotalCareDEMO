(function () {
  "use strict";

  const forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const thisForm = this;
      const action = thisForm.getAttribute('action');
      const recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      setSubmittingState(thisForm, true);
      const formData = new FormData(thisForm);

      if (recaptcha) {
        if (typeof grecaptcha !== 'undefined') {
          grecaptcha.ready(function () {
            try {
              grecaptcha.execute(recaptcha, { action: 'php_email_form_submit' })
                .then(function (token) {
                  formData.set('recaptcha-response', token);
                  submitForm(thisForm, action, formData);
                });
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!');
        }
      } else {
        submitForm(thisForm, action, formData);
      }
    });
  });

  function submitForm(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(async function (response) {
        const raw = await response.text();
        let payload = null;

        try {
          payload = raw ? JSON.parse(raw) : null;
        } catch (_) {
          // Legacy handlers may return plain text such as "OK".
        }

        if (!response.ok) {
          const message = payload && payload.message
            ? payload.message
            : (raw || `${response.status} ${response.statusText}`);
          throw new Error(message);
        }

        return { raw: raw, payload: payload };
      })
      .then(function (result) {
        setSubmittingState(thisForm, false);

        const web3Success = result.payload && result.payload.success === true;
        const legacySuccess = result.raw.trim() === 'OK';

        if (web3Success || legacySuccess) {
          const sentMessage = thisForm.querySelector('.sent-message');
          const errorMessage = thisForm.querySelector('.error-message');

          if (errorMessage) errorMessage.classList.remove('d-block');
          if (sentMessage) sentMessage.classList.add('d-block');

          thisForm.reset();
          thisForm.dispatchEvent(new CustomEvent('form:success', {
            bubbles: true,
            detail: result.payload || { success: true }
          }));
        } else {
          const message = result.payload && result.payload.message
            ? result.payload.message
            : (result.raw || 'Form submission failed. Please try again.');
          throw new Error(message);
        }
      })
      .catch(function (error) {
        displayError(thisForm, error);
      });
  }

  function setSubmittingState(thisForm, isSubmitting) {
    const loading = thisForm.querySelector('.loading');
    const errorMessage = thisForm.querySelector('.error-message');
    const sentMessage = thisForm.querySelector('.sent-message');

    if (loading) loading.classList.toggle('d-block', isSubmitting);
    if (errorMessage && isSubmitting) errorMessage.classList.remove('d-block');
    if (sentMessage && isSubmitting) sentMessage.classList.remove('d-block');
  }

  function displayError(thisForm, error) {
    setSubmittingState(thisForm, false);
    const errorMessage = thisForm.querySelector('.error-message');
    if (!errorMessage) return;

    errorMessage.textContent = error instanceof Error ? error.message : String(error);
    errorMessage.classList.add('d-block');
  }
})();
