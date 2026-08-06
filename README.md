# UbuWell Stripe Checkout Integration

This is the current Stripe Checkout test setup for the UbuWell Payments page.

## Website checkout endpoint

The Payments page sends the selected service codes to:

`https://ubuwell-stripe-checkout-test.cfogle.workers.dev/`

The website does not contain Stripe Price IDs or the Stripe secret API key. It sends only the selected service codes. The test Cloudflare Worker must map those codes to Stripe test-mode Price IDs. The live Price IDs below are retained only as a service-code reference and must not be used with an `sk_test_` key.

## Live service-code reference

For the test Worker, keep these exact service-code keys but replace every value with its corresponding Stripe test-mode `price_...` ID:

```js
const SERVICE_PRICES = {
  "acute-same-day": "price_1U1DguQt4llHnbcGYIa86hUI",
  "acute-after-hours": "price_1U1DiaQt4llHnbcGALNJNxJj",
  "acute-telemedicine": "price_1U1Dj2Qt4llHnbcGb6lJrJIt",
  "acute-extended": "price_1U1Di0Qt4llHnbcGmwQmJMDO",
  "sports-physical": "price_1U1DjRQt4llHnbcGO2eJ1q8W",
  "dot-physical": "price_1U1SOgQt4llHnbcGB0e7lxAW",
  "psychiatric-evaluation": "price_1TsxWoQt4llHnbcG0kHX6Iog",
  "Psychiatric-Follow-Up": "price_1TsxWlQt4llHnbcGTOwkPCS3",
  "Primary-Care-Visit": "price_1TsxWoQt4llHnbcGv2vjle0C",
  "Lab-Review-Wellness-Planning": "price_1TsxWlQt4llHnbcGmScYgR3i",
  "Menopause-Follow-Up": "price_1TsxWoQt4llHnbcGMSvi7TwL",
  "Menopause Consultation": "price_1TsxWnQt4llHnbcGvpOFplbF",
  "Weight-Loss-Follow-Up": "price_1TsxWlQt4llHnbcG0SrOIzjW",
  "Weight-Loss-Consultation": "price_1TsxWnQt4llHnbcG9xfWzJtD",
  "Medication-Management": "price_1TsxWkQt4llHnbcGhka1S7s2"
};
```

The accidental leading space before the first Price ID was removed because Stripe Price IDs must begin directly with `price_`.

## Matching website service codes

The checkbox values in `payments.html` now match the Worker keys exactly, including capitalization and the space in `Menopause Consultation`.

## Required Worker settings

- Store the Stripe test secret key (`sk_test_...`) in the test Worker as a Cloudflare secret named `STRIPE_SECRET_KEY`.
- Do not place the secret key in the website, Worker source code, GitHub repository, or this ZIP file.
- Set the Worker `ALLOWED_ORIGIN` to `https://ubuwelltotalhealth.com` (without a trailing slash).

## Payment success page

The current site includes `payment-success.html`. Configure the Cloudflare Worker Checkout Session to return successful payments to this page:

```js
stripeBody.append(
  "success_url",
  "https://ubuwelltotalhealth.com/payment-success.html?session_id={CHECKOUT_SESSION_ID}"
);
```

The live website origin is `https://ubuwelltotalhealth.com`. Keep `{CHECKOUT_SESSION_ID}` exactly as written so Stripe can insert the Checkout Session ID.

Site deployment refresh
The page confirms that the patient returned from Stripe, provides receipt guidance, and explains that payment does not itself schedule an appointment. A successful-page redirect should not be treated as the clinic’s authoritative payment record; Stripe Dashboard or a verified `checkout.session.completed` webhook should be used for confirmation.

