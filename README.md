# Eduvance Academy — Coaching Centre Website Template

A polished, responsive static website template for coaching centres, tuition institutes and learning academies. Built with HTML, CSS, vanilla JavaScript and Bootstrap 5. No backend, database, authentication or secret API keys are used.

## Run locally

Open `index.html` in a browser, or serve this folder with any static-file server. Bootstrap, Font Awesome, Google Fonts and the photography are loaded from their public CDNs, so those assets require an internet connection.

## Customise before publishing

This project intentionally uses editable demo information. Search and replace all demo details before deploying:

- **Institute identity:** Update the brand, page title, SEO description, Open Graph metadata and introductory copy in `index.html`.
- **Contact information:** Replace the demo phone number, WhatsApp number, email, address, opening hours, social profiles and Google Maps directions in the contact section, footer and floating WhatsApp link.
- **WhatsApp destination:** Change `whatsappNumber` in `js/script.js` to the institute's country code and number in international format, digits only. Update the WhatsApp links in `index.html` to the same number.
- **Courses and pricing:** Edit course names, descriptions, demo durations and demo INR fees in `index.html`. Ensure each course enquiry button's `data-course` exactly matches an option in the enquiry form.
- **Faculty, results and testimonials:** Replace demo profiles and counter values only with information the institute is authorised to publish. The sample testimonials are fictional previews, not genuine reviews.
- **Images:** Replace the Unsplash image URLs in `index.html` and `css/style.css` with appropriately licensed, optimised images. Update their alt text. The linked photos are remotely hosted and require internet access.
- **Branding:** Adjust the palette in the `:root` rules in `css/style.css`; replace `assets/images/favicon.svg` if desired.

All visible course durations and fees are demo information. The results are demo placeholders, the faculty profiles are demos, and testimonial cards are clearly sample previews. Verify all content and contact links before publication.

## Enquiry privacy and behaviour

The enquiry form validates in the browser, formats a message and opens WhatsApp with that draft. Nothing is stored or submitted to a server. The visitor must review and send the message in WhatsApp; opening WhatsApp does not confirm admission. Update the demo WhatsApp number before use.

## Included interactions

- Sticky navigation, active section indication and a collapsible mobile menu.
- Smooth anchor navigation and scroll-reveal effects (with reduced-motion support).
- Demo statistic counters, interactive FAQ accordion and course enquiry buttons.
- Client-side enquiry validation and WhatsApp message generation.
- Responsive layouts, accessible labels, keyboard skip link and semantic page sections.
