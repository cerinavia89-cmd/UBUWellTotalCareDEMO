<?php
  /**
  * Requires the "PHP Email Form" library.
  * Configure the receiving email address and install the library before production use.
  */

  $receiving_email_address = 'contact@example.com';

  if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
  } else {
    die('Unable to load the "PHP Email Form" Library!');
  }

  function booking_post_value($key) {
    if (!isset($_POST[$key])) {
      return '';
    }

    $value = $_POST[$key];

    if (is_array($value)) {
      $value = array_map(function ($item) {
        return trim(strip_tags((string) $item));
      }, $value);

      return implode(', ', array_filter($value, 'strlen'));
    }

    return trim(strip_tags((string) $value));
  }

  function booking_add_message($form, $key, $label) {
    $value = booking_post_value($key);

    if ($value !== '') {
      $form->add_message($value, $label);
    }
  }

  $first_name = booking_post_value('first_name');
  $middle_initial = booking_post_value('middle_initial');
  $last_name = booking_post_value('last_name');
  $full_name = trim($first_name . ' ' . $middle_initial . ' ' . $last_name);
  $service = booking_post_value('service');

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  $contact->to = $receiving_email_address;
  $contact->from_name = $full_name !== '' ? $full_name : 'Appointment Patient';
  $contact->from_email = booking_post_value('email');
  $contact->subject = 'Online Appointment Form' . ($service !== '' ? ' - ' . $service : '');

  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $fields = array(
    'service' => 'Selected Service',
    'first_name' => 'First Name',
    'middle_initial' => 'Middle Initial',
    'last_name' => 'Last Name',
    'date_of_birth' => 'Date of Birth',
    'gender' => 'Gender',
    'preferred_pronouns' => 'Preferred Pronouns',
    'preferred_pronouns_other' => 'Other Preferred Pronouns',
    'address' => 'Patient Address',
    'city' => 'Patient City',
    'state' => 'Patient State',
    'zip_code' => 'Patient Zip Code',
    'phone' => 'Patient Phone Number',
    'email' => 'Patient Email Address',
    'preferred_contact_method' => 'Preferred Contact Method',
    'emergency_contact_name' => 'Emergency Contact Name',
    'emergency_contact_phone' => 'Emergency Contact Phone Number',
    'emergency_relationship' => 'Emergency Contact Relationship',
    'information_consent' => 'Information Accuracy Consent',
    'signature' => 'Typed Signature',
    'signature_date' => 'Signature Date',
    'date' => 'Appointment Date',
    'time' => 'Appointment Time'
  );

  foreach ($fields as $key => $label) {
    booking_add_message($contact, $key, $label);
  }

  echo $contact->send();
?>
