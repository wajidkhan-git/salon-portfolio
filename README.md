# VelvetGlow Hair Salon & Spa

A complete, ultra-premium, fully responsive front-end website and salon management portal crafted exclusively with **HTML5**, modern **CSS3**, and **Vanilla JavaScript** (no frameworks, no Bootstrap, no external dependencies).

---

## 🌟 Brand Philosophy & Visual Aesthetic

- **Atmosphere**: Luxurious, editorial, warm, feminine, calm, and modern.
- **Color Palette**: 
  - Ivory / Off-White (`#FAF8F5`, `#F3EFEA`)
  - Charcoal Noir (`#1C1B1A`, `#2C2A28`)
  - Muted Terracotta & Dusty Rose (`#C28274`, `#F4E8E5`)
  - Sage Olive (`#687056`, `#EDF0E7`)
  - Champagne Warm Gold (`#C5A059`, `#EBD9B9`)
- **Typography**: *Playfair Display* for editorial headings, *DM Sans* for crisp body text.
- **Micro-Interactions**: Ambient glassmorphism, smooth scrolling, draggable comparison slider, live calculating booking summary, interactive lookbook lightbox, and toast notifications.

---

## 💎 Features & Sections

1. **Branded Animated Page Loader**: Monogram spinning ring animation with progress bar that gracefully dissolves on load.
2. **Responsive Sticky Header**: Glassmorphism navbar with brand monogram, navigation links, light/dark ambient mode toggle, mobile hamburger drawer, and "Book a Ritual" CTA.
3. **Hero Sanctuary Section**: Editorial headline, live open status pill, 5-star trust badge (1,450+ reviews), beauty collage, and booking triggers.
4. **Brand Highlights Bar**: Four core pillars (Clean Botanical Luxury, Master Artisans, Private Sanctuary Suites, Artisanal Refreshments).
5. **About / Brand Story**: Editorial narrative, founder quote from Elena Vance, statistics counters, and signature badge.
6. **Featured Service Cards**: Hair Artistry, Skin Sanctuary, and Bridal & Gala Couture with duration, pricing, hover zoom, and direct form pre-selection.
7. **Interactive Treatment Menu & Price List**: Tabbed categories (*Hair*, *Colour*, *Skin*, *Spa*) with real-time search input for instant filtering.
8. **Interactive Before/After Hair-Colour Slider**: Draggable split-view slider comparing brassy tones to a luminous sunlit French balayage.
9. **Master Artisans & Stylist Roster**: Stylist cards with specialties, years of mastery, detailed modal biographies, and direct artisan booking buttons.
10. **Client Testimonials & Review System**: 5-star customer reviews with verified badges and an interactive "Write a Review" modal that publishes directly to `localStorage`.
11. **Interactive Booking Sanctuary**:
    - Full validation with instant visual feedback.
    - **Past-date restriction** (prevents selecting past dates; sets minimum date to today).
    - Dynamic artisan and treatment preselection from anywhere on the page.
    - Interactive time slot picker and luxury add-on checkboxes.
    - Live computed summary displaying total estimated price and duration.
    - Generates a branded printable **Confirmation Voucher Receipt Modal** with a unique Booking ID.
    - **One-Click WhatsApp Dispatch**: Formats and opens appointment details directly to WhatsApp (`03354923228`).
12. **Gift Voucher Studio**: Interactive digital gift voucher customizer with live gold-accented preview and value presets ($100, $250, $500, $1,000).
13. **FAQ Accordion**: Collapsible questions for policies, patch tests, non-toxic formulations, and parking.
14. **Footer**: Navigation, physical address, email (`wajidwazir62@gmail.com`), phone/WhatsApp (`03354923228`), newsletter subscription with toast feedback, and developer credit link.
15. **Floating Actions**: Persistent WhatsApp launcher and back-to-top smooth scroll button.

---

## 🛠️ Front-End Admin Management Portal (`admin.html`)

An included front-end salon management console for the salon owner/manager:
- **Live Metrics**: Total appointments booked, estimated pipeline revenue, active treatments count, and VIP subscriber count.
- **Appointments Table**: Filter by status (*Confirmed*, *Pending*, *Cancelled*), search by guest name or phone, change appointment status, or delete bookings.
- **Export Capabilities**: One-click **Export to CSV** for spreadsheets and text export for newsletter subscribers.
- **Services & Price Manager**: Add new treatments, update pricing, or remove old services.
- **Walk-in Diary**: Add manual appointments for in-person walk-ins.
- **Business Details Editor**: Edit salon contact information, hours, and address.

---

## 📁 File Structure

```
Salon website/
├── index.html          # Main client-facing website
├── admin.html          # Front-end Salon Owner & Manager Dashboard
├── style.css           # Global design system, glassmorphism, responsive styles
├── script.js           # Vanilla JavaScript engine (state, slider, modals, booking)
└── README.md           # Project documentation & configuration guide
```

---

## 🔗 Contact & WhatsApp Integration

- **Salon Email**: `wajidwazir62@gmail.com`
- **Salon Phone & WhatsApp**: `03354923228` (+92 335 4923228)
- **Direct WhatsApp Link**: `https://wa.me/923354923228`

---

## 🧑‍💻 Developer Portfolio Link Configuration

A dedicated placeholder link is positioned in the footer for your developer portfolio.

To customize your portfolio link, update line in `index.html`:
```html
<!-- Footer Developer Portfolio Placeholder -->
<div class="footer-developer-credit">
  Designed &amp; Engineered by 
  <a href="https://yourportfolio-link.com" target="_blank" rel="noopener" id="developer-portfolio-link">
    Wajid Wazir Portfolio
  </a>
</div>
```
Simply replace `https://yourportfolio-link.com` with your actual portfolio URL before production deployment.

---

## ⚠️ Front-End Demonstration Notice

*All booking forms, newsletter subscriptions, review submissions, and admin data management in this package are implemented as fully functional client-side front-end demonstrations using browser `localStorage` and direct WhatsApp links. To connect to an external server or live payment gateway, connect the form submit listeners in `script.js` to your desired REST API or backend service.*

---

## 🚀 How to Run Locally

1. Open the project folder in VS Code or any text editor.
2. Double-click `index.html` to open directly in any modern web browser (Chrome, Safari, Edge, Firefox), or use the VS Code Live Server extension.
3. Access the admin portal by clicking "Admin Portal" in the top navigation or opening `admin.html`.
