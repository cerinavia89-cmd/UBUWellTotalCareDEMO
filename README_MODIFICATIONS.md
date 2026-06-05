# UbuWell Total Health – Site Updates

This package contains controlled, content-only updates across the existing pages (no redesign or navigation logic changes).

## Homepage (index.html)
- Hero subtitle updated to: “Golden Rule: Do unto others as you would have them do unto you”
- “Excellence in Medical Care, Every Day” section updated:
  - Title → “How we Work”
  - Body copy replaced with the provided care-model paragraph
  - **Existing links preserved**: `contact.html` and `services.html` (links unchanged)
- Feature blocks updated:
  - Advanced Technology → updated description copy
  - 24/7 Availability → title changed to “Timely Support” + updated description copy
  - Expert Team → updated description copy
- “Our Mission” (Home About) section copy replaced with the provided mission statement (split across the existing two paragraphs to preserve layout).
- Floating card updated:
  - “24/7 Emergency Care” → “Timely Support”
  - “Always here when you need us most” → “Here when you need us most”

## About Page (about.html)
- “About us” paragraph replaced with the provided Telehealth/Video Therapy copy (kept within the existing paragraph using line breaks to preserve layout).
- “Our Mission” → “Our Vision” and section description updated (icons and their subtext left unchanged).
- Ubuntu Principles sentence updated to include: honesty, compassion (and the full requested list).

## Services Page (services.html)
- Card title and content updates:
  - Primary Care → **Primary Care Services** + updated description + added bullet list
  - Sick Visit → **Acute Illness & Injury Care** (kept existing description) + added bullet list
  - Psychiatry/Mental Health Care → **Mental Health & Behavioral Support** (kept existing description) + added bullet list
  - Medication Management → kept description + added bullet list
  - Lifestyle Coaching → **Women’s & Men’s Health** + updated description + added bullet list
  - Weight Management → kept description + added bullet list
  - Menopause Care → **DOT Physical Examination** + updated description + added bullet list
- Removed cards as requested:
  - Herbal/Plant Medicine
  - Psychotherapy
- Removed all “Patient-Centered Care” / “Personalized Support” text from the Services page.

## Our Team Page (doctors.html)
- Page title changed: “Our Team” → **Our Story**
- Intro paragraph updated to the provided “board-certified Family and Psychiatric Mental Health Nurse Practitioners…” copy
- Provider cards:
  - Removed “Dr.” prefix from both provider names
  - “Dr. Abbey Ngaima-Johnson” → **Abbey Jowan Ngaima-Johnson**

## Footer (sitewide)
- “Connect” link renamed to **Contact Us** (still links to `contact.html`)
- Added **Our Team** link in the footer navigation (links to `doctors.html`)

## QA Notes
- No layout/section reordering performed.
- Only the requested copy updates, card removals (Services page), and footer link label/addition were applied.

## Site-wide Right-Side Logo
- Added a fixed-position UbuWell logo in the right-side whitespace on all pages (only displays on wide screens to prevent any overlap with page content).
- Cropped the provided logo to remove extra transparent padding and saved as `assets/img/ubuwell-logo-side.png`.


## 2026-05-22 Updates
### Top Contact Banner Restored
- Added a site-wide top contact banner (green) with centered phone and email.
- No social media icons included.
- Moved the navigation drawer toggle icon into the top banner (aligned right).

### Warm Section Backgrounds
- Updated the `.light-background` section background color to a soft mint tint derived from the brand green (`--accent-color`) to reduce the clinical feel.
- Applied `light-background` to primary content sections across pages (hero/page-title areas unchanged).

## 2026-05-22 – Top banner styling + drawer alignment
- Set top contact banner background to solid brand green (no transparency) and made phone/email text white.
- Ensured the nav drawer icon is aligned to the right within the top banner on all pages.


## May 27, 2026 – Layout-neutral refinements
### Sitewide
- Reduced in-hero/page-title UbuWell logo size by ~25% (CSS only; no structural/layout changes).
- Removed the footer logo image (kept footer text/links and layout intact).
- Reduced footer vertical spacing (top padding and section/bottom padding) to shorten page height without crowding content.

### Homepage (index.html)
- Updated hero tagline to: Our Golden Rule: "Do unto others as you would have them do unto you"

### Services (services.html)
- Removed the “Emergency Services Available 24/7 / Call Emergency …” block.

### Page Title spacing
- Reduced top padding on Services and Our Team page-title sections.
- Reduced top padding and slightly increased bottom padding on Resources and Contact page-title sections.

### Contact (contact.html)
- Page title subtext updated: “Here when you need us!”
- Contact form header updated to “Better yet, see us in person!”
- Contact form subtext updated to “We love our patients, so feel free to visit during normal business hours.”
- Added Phone Number field to the contact form.
