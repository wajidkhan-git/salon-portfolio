/**
 * ==========================================================================
 * VELVETGLOW HAIR SALON & SPA — VANILLA JAVASCRIPT ENGINE
 * Fully Modular, High-Performance, Framework-Free Architecture
 * Features:
 *  1. Animated Page Loader
 *  2. Header Scroll & Mobile Drawer Navigation
 *  3. Theme Switcher (Dark Ambient / Light Ivory)
 *  4. Lookbook Gallery Filtering & Lightbox Modal
 *  5. Interactive Before/After Hair-Colour Slider (Mouse & Touch)
 *  6. Stylist Biographies Modal & Booking Pre-selection
 *  7. Interactive Treatment Menu & Live Real-Time Search
 *  8. Booking Engine (Validation, Past-Date Lock, Price Computation,
 *     LocalStorage Storage, Voucher Modal, WhatsApp Dispatch)
 *  9. Interactive Gift Card Studio
 * 10. Testimonials System & Client Review Submission
 * 11. FAQ Accordions
 * 12. Toast Notification System
 * 13. Synchronized LocalStorage State with Admin Panel
 * ==========================================================================
 */

'use strict';

// ---------------------------------------------------------------------------
// DATA STORE & DEFAULTS
// ---------------------------------------------------------------------------
const SALON_DATA = {
  phone: '03354923228',
  whatsappRaw: '923354923228',
  email: 'wajidwazir62@gmail.com',
  address: "42 Rue de l'Élégance, Downtown Luxe District",
  stylists: {
    elena: {
      name: 'Elena Vance',
      role: 'Creative Director & Master Colorist',
      experience: '14 Years Mastery',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
      bio: 'Trained at the prestigious Académie de Haute Coiffure in Paris, Elena has spent over a decade perfecting organic balayage and dimensional foil techniques. Her philosophy centers on hair integrity, using botanical bond multipliers to achieve radiant, effortless blondes and rich brunettes.',
      awards: ['Master Colorist of the Year 2024', 'L’Oréal Color Trophy Finalist', 'Certified Organic Hair Practitioner'],
      specialties: ['French Balayage', 'Blonde Chemistry', 'Color Correction', 'Face-Framing Babylights'],
      favoriteProduct: 'Botanical Silk Peptide Gloss'
    },
    marcus: {
      name: 'Marcus Thorne',
      role: 'Senior Stylist & Precision Cutter',
      experience: '11 Years Mastery',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      bio: 'A master of geometric precision and effortless texture, Marcus specializes in bespoke architectural cuts that grow out seamlessly. Known for his customized dry-cutting method and zero-formaldehyde silk smoothing therapies.',
      awards: ['Vogue Beauty Stylist Spotlight', 'Sassoon Precision Cutting Master'],
      specialties: ['French Textured Bobs', 'Long Layer Sculpting', 'Silk Keratin', 'Dry Scissor Carving'],
      favoriteProduct: 'Whipped Shea Finishing Cream'
    },
    sophia: {
      name: 'Sophia Laurent',
      role: 'Lead Aesthetician & Bridal Director',
      experience: '9 Years Mastery',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      bio: 'Sophia blends European clinical aesthetics with Eastern holistic acupressure to create deeply transformative skin rituals. She oversees VelvetGlow’s private bridal suite, curating glowing HD airbrush skin and timeless gala updos.',
      awards: ['Holistic Aesthetician Award 2023', 'Bridal Master Guild Certified'],
      specialties: ['HydraGlow Facial', 'Lymphatic Jade Sculpting', 'Bridal Airbrush HD', 'Ethereal Updos'],
      favoriteProduct: '24K Cellular Gold Nectar'
    }
  }
};

// ---------------------------------------------------------------------------
// 1. PAGE LOADER INITIALIZATION
// ---------------------------------------------------------------------------
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loaded');
      loader.setAttribute('aria-hidden', 'true');
    }, 700);
  });

  // Fallback safety timeout if load event is slow
  setTimeout(() => {
    if (!loader.classList.contains('loaded')) {
      loader.classList.add('loaded');
    }
  }, 2500);
}

// ---------------------------------------------------------------------------
// 2. HEADER SCROLL & MOBILE NAVIGATION
// ---------------------------------------------------------------------------
function initNavigation() {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section, header section');

  // Sticky Header On Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active link highlighting based on scroll position
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile Drawer Toggle
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }
}

// ---------------------------------------------------------------------------
// 3. THEME TOGGLE (DARK AMBIENT / LIGHT IVORY)
// ---------------------------------------------------------------------------
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('vg_theme') || 'light';
  
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      if (newTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      
      localStorage.setItem('vg_theme', newTheme);
      showToast(`Ambience switched to ${newTheme === 'dark' ? 'Evening Noir' : 'Daylight Ivory'}`);
    });
  }
}

// ---------------------------------------------------------------------------
// 4. LOOKBOOK GALLERY FILTERING & LIGHTBOX MODAL
// ---------------------------------------------------------------------------
function initLookbook() {
  const filterBtns = document.querySelectorAll('.lookbook-filter-btn');
  const lookbookItems = document.querySelectorAll('.lookbook-item');
  const lightboxModal = document.getElementById('lookbook-modal');
  const modalImg = document.getElementById('lightbox-modal-img');
  const modalCategory = document.getElementById('lightbox-modal-category');
  const modalTitle = document.getElementById('lightbox-modal-title');
  const modalDesc = document.getElementById('lightbox-modal-desc');
  const recreateBtn = document.getElementById('lightbox-recreate-btn');

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      lookbookItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox Modal Trigger
  lookbookItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.getAttribute('data-img');
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');
      const category = item.querySelector('.lookbook-tag')?.textContent || 'Lookbook';

      if (modalImg) modalImg.src = img;
      if (modalImg) modalImg.alt = title;
      if (modalCategory) modalCategory.textContent = category;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;

      if (recreateBtn) {
        recreateBtn.onclick = () => {
          closeModal(lightboxModal);
          preselectServiceInForm(title);
        };
      }

      openModal(lightboxModal);
    });
  });
}

// ---------------------------------------------------------------------------
// 5. INTERACTIVE BEFORE / AFTER HAIR COLOUR SLIDER
// ---------------------------------------------------------------------------
function initBeforeAfterSlider() {
  const slider = document.getElementById('ba-slider');
  const beforeLayer = document.getElementById('ba-before-layer');
  const handle = document.getElementById('ba-handle');

  if (!slider || !beforeLayer || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = slider.getBoundingClientRect();
    let position = clientX - rect.left;

    // Constrain within container bounds
    if (position < 0) position = 0;
    if (position > rect.width) position = rect.width;

    const percentage = (position / rect.width) * 100;
    beforeLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  // Click anywhere on slider to reposition
  slider.addEventListener('click', (e) => {
    updateSliderPosition(e.clientX);
  });

  // Touch Events for Mobile / Tablet
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });
}

// ---------------------------------------------------------------------------
// 6. STYLIST MODALS & BOOKING PRESELECTION
// ---------------------------------------------------------------------------
function initStylists() {
  const bioButtons = document.querySelectorAll('.view-stylist-bio-btn');
  const bookButtons = document.querySelectorAll('.book-stylist-btn');
  const stylistModal = document.getElementById('stylist-modal');
  const stylistModalContent = document.getElementById('stylist-modal-content');

  // Open Stylist Bio Modal
  bioButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const data = SALON_DATA.stylists[id];
      if (!data || !stylistModalContent) return;

      stylistModalContent.innerHTML = `
        <div style="display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem; flex-wrap: wrap;">
          <img src="${data.photo}" alt="${data.name}" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 3px solid var(--color-rose);">
          <div>
            <span class="section-tag" style="margin-bottom: 0.35rem;">${data.experience}</span>
            <h3 style="margin-bottom: 0.2rem;">${data.name}</h3>
            <p style="color: var(--color-rose); font-weight: 600; font-size: 0.95rem;">${data.role}</p>
          </div>
        </div>
        
        <p style="line-height: 1.8; color: var(--color-text-muted); margin-bottom: 1.5rem;">${data.bio}</p>
        
        <div style="margin-bottom: 1.5rem;">
          <h5 style="font-family: var(--font-sans); font-size: 0.95rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--color-charcoal);">Recognitions & Accreditations</h5>
          <ul style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.88rem; color: var(--color-text-main);">
            ${data.awards.map(a => `<li style="display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-gold);">★</span> ${a}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 2rem;">
          <h5 style="font-family: var(--font-sans); font-size: 0.95rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--color-charcoal);">Core Specialties</h5>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${data.specialties.map(s => `<span class="specialty-tag" style="background: var(--color-bg-alt);">${s}</span>`).join('')}
          </div>
        </div>

        <button class="btn btn-rose btn-lg" id="modal-book-with-stylist-btn" style="width: 100%;">
          <span>Reserve Ritual with ${data.name}</span>
        </button>
      `;

      // Attach booking listener inside modal
      const modalBookBtn = document.getElementById('modal-book-with-stylist-btn');
      if (modalBookBtn) {
        modalBookBtn.onclick = () => {
          closeModal(stylistModal);
          preselectStylistInForm(data.name);
        };
      }

      openModal(stylistModal);
    });
  });

  // Direct Book Button from Stylist Cards
  bookButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const stylistName = btn.getAttribute('data-stylist');
      preselectStylistInForm(stylistName);
    });
  });
}

// ---------------------------------------------------------------------------
// 7. TREATMENT MENU TABS & REAL-TIME SEARCH (SYNCED WITH ADMIN)
// ---------------------------------------------------------------------------
function initTreatmentMenu() {
  const tabs = document.querySelectorAll('.pricing-tab-btn');
  const searchInput = document.getElementById('pricing-search-input');
  const priceGrid = document.getElementById('price-list-grid');
  const serviceDropdown = document.getElementById('book-service');

  // Check if admin has customized services in localStorage
  try {
    const rawServices = localStorage.getItem('vg_admin_services');
    if (rawServices) {
      const customServices = JSON.parse(rawServices);
      if (Array.isArray(customServices) && customServices.length > 0) {
        // Re-render Price Grid
        if (priceGrid) {
          priceGrid.innerHTML = customServices.map(srv => {
            let catKey = 'hair';
            const catLower = (srv.category || '').toLowerCase();
            if (catLower.includes('colour') || catLower.includes('color') || catLower.includes('balayage')) catKey = 'colour';
            else if (catLower.includes('skin') || catLower.includes('facial')) catKey = 'skin';
            else if (catLower.includes('spa') || catLower.includes('body') || catLower.includes('massage')) catKey = 'spa';
            else if (catLower.includes('bridal') || catLower.includes('gala')) catKey = 'bridal';

            const numPrice = parseInt((srv.price || '0').replace(/[^0-9]/g, ''), 10) || 0;
            const desc = srv.desc || 'Customized luxury treatment formulated with pure botanical extracts and executed by master specialists.';

            return `
              <div class="price-item-card" data-category="${catKey}">
                <div>
                  <div class="price-item-header">
                    <h4 class="price-item-title">${srv.name}</h4>
                    <span class="price-item-cost">${srv.price}</span>
                  </div>
                  <div class="price-item-meta">
                    <span class="price-item-duration">${srv.duration}</span>
                    <span class="price-item-badge">${srv.category}</span>
                  </div>
                  <p class="price-item-desc">${desc}</p>
                </div>
                <div class="price-item-actions">
                  <button class="btn btn-outline btn-sm book-service-btn" data-service="${srv.name}" data-price="${numPrice}">Select Ritual</button>
                </div>
              </div>
            `;
          }).join('');
        }

        // Sync Booking Dropdown with custom services
        if (serviceDropdown) {
          serviceDropdown.innerHTML = `
            <option value="" disabled selected>Choose your experience...</option>
            ${customServices.map(srv => {
              const numPrice = parseInt((srv.price || '0').replace(/[^0-9]/g, ''), 10) || 0;
              return `<option value="${srv.name}" data-price="${numPrice}" data-duration="${srv.duration}">${srv.name} — ${srv.price}</option>`;
            }).join('')}
          `;
        }
      }
    }
  } catch (e) {
    console.warn('LocalStorage service load fallback', e);
  }

  const priceCards = document.querySelectorAll('.price-item-card');
  const bookServiceBtns = document.querySelectorAll('.book-service-btn');

  // Tab Switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterPriceMenu();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterPriceMenu();
    });
  }

  function filterPriceMenu() {
    const activeTab = document.querySelector('.pricing-tab-btn.active');
    const selectedCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const cards = document.querySelectorAll('.price-item-card');
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const title = card.querySelector('.price-item-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.price-item-desc')?.textContent.toLowerCase() || '';

      const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
      const matchesSearch = query === '' || title.includes(query) || desc.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Book Service Buttons across cards and price items
  bookServiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');
      preselectServiceInForm(serviceName);
    });
  });
}

// ---------------------------------------------------------------------------
// 8. BOOKING SANCTUARY ENGINE
// ---------------------------------------------------------------------------
function initBookingEngine() {
  const bookingForm = document.getElementById('booking-form');
  const serviceSelect = document.getElementById('book-service');
  const stylistSelect = document.getElementById('book-stylist');
  const dateInput = document.getElementById('book-date');
  const timeSlots = document.querySelectorAll('.time-slot-pill');
  const addonCheckboxes = document.querySelectorAll('input[name="addons"]');
  const voucherModal = document.getElementById('voucher-modal');

  // Summary Elements
  const summaryService = document.getElementById('summary-service-name');
  const summaryStylist = document.getElementById('summary-stylist-name');
  const summaryDateTime = document.getElementById('summary-datetime-display');
  const summaryDuration = document.getElementById('summary-duration-display');
  const summaryAddons = document.getElementById('summary-addons-display');
  const summaryTotal = document.getElementById('summary-total-price');

  if (!bookingForm) return;

  // Past Date Restriction: set min date to today (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  if (dateInput) {
    dateInput.min = today;
    dateInput.value = today;
  }

  // Time Slot Selection
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
      updateBookingSummary();
    });
  });

  // Event Listeners for Live Calculation
  serviceSelect?.addEventListener('change', updateBookingSummary);
  stylistSelect?.addEventListener('change', updateBookingSummary);
  dateInput?.addEventListener('change', updateBookingSummary);
  addonCheckboxes.forEach(cb => cb.addEventListener('change', updateBookingSummary));

  // Initial Summary Calculation
  updateBookingSummary();

  function updateBookingSummary() {
    const selectedOption = serviceSelect?.selectedOptions[0];
    const serviceName = selectedOption && selectedOption.value ? selectedOption.value : 'None Selected';
    const basePrice = selectedOption ? parseInt(selectedOption.getAttribute('data-price') || '0', 10) : 0;
    const duration = selectedOption ? selectedOption.getAttribute('data-duration') || '60 mins' : '60 mins';

    const stylistName = stylistSelect?.value || 'First Available';
    const chosenDate = dateInput?.value || today;
    const activeSlot = document.querySelector('.time-slot-pill.active')?.getAttribute('data-time') || '09:30 AM';

    // Calculate Add-ons
    let addonsTotal = 0;
    const selectedAddonNames = [];
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        addonsTotal += parseInt(cb.getAttribute('data-addon-price') || '0', 10);
        selectedAddonNames.push(cb.value);
      }
    });

    const grandTotal = basePrice + addonsTotal;

    // Update Summary UI
    if (summaryService) summaryService.textContent = serviceName;
    if (summaryStylist) summaryStylist.textContent = stylistName;
    if (summaryDateTime) summaryDateTime.textContent = `${chosenDate} @ ${activeSlot}`;
    if (summaryDuration) summaryDuration.textContent = duration;
    if (summaryAddons) summaryAddons.textContent = selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'None';
    if (summaryTotal) summaryTotal.textContent = `$${grandTotal}`;
  }

  // Form Submission & Validation
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('book-name');
    const emailInput = document.getElementById('book-email');
    const phoneInput = document.getElementById('book-phone');
    const consentInput = document.getElementById('book-consent');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      markError(nameInput);
      isValid = false;
    } else {
      unmarkError(nameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      markError(emailInput);
      isValid = false;
    } else {
      unmarkError(emailInput);
    }

    // Validate Phone
    if (!phoneInput.value.trim() || phoneInput.value.trim().length < 6) {
      markError(phoneInput);
      isValid = false;
    } else {
      unmarkError(phoneInput);
    }

    // Validate Service
    if (!serviceSelect.value) {
      markError(serviceSelect);
      isValid = false;
    } else {
      unmarkError(serviceSelect);
    }

    // Validate Date (Ensure not in the past)
    if (!dateInput.value || dateInput.value < today) {
      markError(dateInput);
      isValid = false;
    } else {
      unmarkError(dateInput);
    }

    // Validate Consent
    if (!consentInput.checked) {
      showToast('Please accept the cancellation terms to complete reservation.', 'error');
      return;
    }

    if (!isValid) {
      showToast('Please correct the highlighted fields.', 'error');
      return;
    }

    // Build Booking Record
    const bookingId = 'VG-' + Math.floor(10000 + Math.random() * 90000);
    const activeSlot = document.querySelector('.time-slot-pill.active')?.getAttribute('data-time') || '09:30 AM';
    const notesInput = document.getElementById('book-notes');

    const selectedAddons = [];
    addonCheckboxes.forEach(cb => {
      if (cb.checked) selectedAddons.push(cb.value);
    });

    const bookingRecord = {
      id: bookingId,
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      service: serviceSelect.value,
      stylist: stylistSelect.value,
      date: dateInput.value,
      time: activeSlot,
      addons: selectedAddons,
      notes: notesInput ? notesInput.value.trim() : '',
      total: summaryTotal ? summaryTotal.textContent : '$0',
      status: 'Confirmed',
      timestamp: new Date().toISOString()
    };

    // Save to LocalStorage (for Admin Portal sync)
    saveBookingToStorage(bookingRecord);

    // Populate Voucher Modal
    const vId = document.getElementById('voucher-booking-id');
    const vName = document.getElementById('voucher-guest-name');
    const vStylist = document.getElementById('voucher-stylist');
    const vService = document.getElementById('voucher-service');
    const vDatetime = document.getElementById('voucher-datetime');
    const vWhatsappBtn = document.getElementById('voucher-whatsapp-btn');

    if (vId) vId.textContent = bookingId;
    if (vName) vName.textContent = bookingRecord.name;
    if (vStylist) vStylist.textContent = bookingRecord.stylist;
    if (vService) vService.textContent = bookingRecord.service;
    if (vDatetime) vDatetime.textContent = `${bookingRecord.date} · ${bookingRecord.time}`;

    // WhatsApp Direct Link with Prefilled Appointment Summary
    if (vWhatsappBtn) {
      const waMsg = encodeURIComponent(
        `*New VelvetGlow Reservation [${bookingId}]*\n` +
        `• Guest: ${bookingRecord.name}\n` +
        `• Ritual: ${bookingRecord.service}\n` +
        `• Artisan: ${bookingRecord.stylist}\n` +
        `• Date/Time: ${bookingRecord.date} at ${bookingRecord.time}\n` +
        `• Phone: ${bookingRecord.phone}\n` +
        `• Total: ${bookingRecord.total}\n\n` +
        `Please confirm my sanctuary appointment.`
      );
      vWhatsappBtn.href = `https://wa.me/${SALON_DATA.whatsappRaw}?text=${waMsg}`;
    }

    // Open Voucher Modal & Reset Form
    openModal(voucherModal);
    bookingForm.reset();
    dateInput.value = today;
    addonCheckboxes.forEach(cb => cb.checked = false);
    updateBookingSummary();
    showToast('Appointment successfully reserved!', 'success');
  });

  function markError(el) {
    el.classList.add('error');
  }

  function unmarkError(el) {
    el.classList.remove('error');
  }
}

// ---------------------------------------------------------------------------
// 9. HELPER: SCROLL & PRESELECT SERVICE OR STYLIST
// ---------------------------------------------------------------------------
function preselectServiceInForm(serviceName) {
  const bookingSection = document.getElementById('booking');
  const serviceSelect = document.getElementById('book-service');

  if (serviceSelect && serviceName) {
    // Find matching or partial matching option
    let matched = false;
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) ||
          serviceName.toLowerCase().includes(serviceSelect.options[i].value.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Set value directly if custom
      serviceSelect.value = serviceName;
    }
    serviceSelect.dispatchEvent(new Event('change'));
  }

  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
    showToast(`Pre-selected "${serviceName}" in booking sanctuary.`);
  }
}

function preselectStylistInForm(stylistName) {
  const bookingSection = document.getElementById('booking');
  const stylistSelect = document.getElementById('book-stylist');

  if (stylistSelect && stylistName) {
    for (let i = 0; i < stylistSelect.options.length; i++) {
      if (stylistSelect.options[i].value.toLowerCase().includes(stylistName.toLowerCase()) ||
          stylistName.toLowerCase().includes(stylistSelect.options[i].value.toLowerCase())) {
        stylistSelect.selectedIndex = i;
        break;
      }
    }
    stylistSelect.dispatchEvent(new Event('change'));
  }

  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
    showToast(`Master Artisan "${stylistName}" selected.`);
  }
}

// ---------------------------------------------------------------------------
// 10. LOCALSTORAGE STATE MANAGEMENT FOR BOOKINGS & ADMIN SYNC
// ---------------------------------------------------------------------------
function saveBookingToStorage(record) {
  const bookings = getBookingsFromStorage();
  bookings.unshift(record);
  localStorage.setItem('vg_bookings', JSON.stringify(bookings));
}

function getBookingsFromStorage() {
  try {
    const raw = localStorage.getItem('vg_bookings');
    return raw ? JSON.parse(raw) : getDemoBookings();
  } catch (e) {
    return getDemoBookings();
  }
}

function getDemoBookings() {
  return [
    {
      id: 'VG-94821',
      name: 'Victoria Stirling',
      email: 'victoria@example.com',
      phone: '03354923228',
      service: 'Bridal & Gala Couture',
      stylist: 'Sophia Laurent',
      date: '2026-08-25',
      time: '11:00 AM',
      addons: ['24K Gold Eye Infusion'],
      notes: 'Bridal rehearsal session.',
      total: '$315',
      status: 'Confirmed',
      timestamp: new Date().toISOString()
    },
    {
      id: 'VG-83910',
      name: 'Amara Chen',
      email: 'amara.chen@example.com',
      phone: '03354923228',
      service: 'Signature Sunlit Balayage & Glaze',
      stylist: 'Elena Vance',
      date: '2026-08-26',
      time: '01:30 PM',
      addons: ['Botanical Scalp Detox'],
      notes: 'Subtle sunlit tones.',
      total: '$280',
      status: 'Confirmed',
      timestamp: new Date().toISOString()
    }
  ];
}

// ---------------------------------------------------------------------------
// 11. INTERACTIVE GIFT VOUCHER STUDIO
// ---------------------------------------------------------------------------
function initGiftCards() {
  const amountBtns = document.querySelectorAll('.amount-btn');
  const recipientInput = document.getElementById('giftcard-recipient');
  const previewAmount = document.getElementById('giftcard-preview-amount');
  const previewName = document.getElementById('giftcard-preview-name');
  const purchaseBtn = document.getElementById('purchase-giftcard-btn');

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.getAttribute('data-val');
      if (previewAmount) previewAmount.textContent = `$${val}`;
    });
  });

  if (recipientInput) {
    recipientInput.addEventListener('input', () => {
      const name = recipientInput.value.trim() || 'Cherished Guest';
      if (previewName) previewName.textContent = name;
    });
  }

  if (purchaseBtn) {
    purchaseBtn.addEventListener('click', () => {
      const name = recipientInput?.value.trim() || 'Cherished Guest';
      const activeBtn = document.querySelector('.amount-btn.active');
      const amount = activeBtn ? activeBtn.getAttribute('data-val') : '250';

      // WhatsApp Gift Card Order Link
      const msg = encodeURIComponent(`Hello VelvetGlow, I would like to order a $${amount} Luxury Gift Voucher for ${name}.`);
      window.open(`https://wa.me/${SALON_DATA.whatsappRaw}?text=${msg}`, '_blank');
      showToast(`Created $${amount} Gift Voucher for ${name}! (Front-end demo)`, 'success');
    });
  }
}

// ---------------------------------------------------------------------------
// 12. TESTIMONIALS & REVIEW SUBMISSION SYSTEM
// ---------------------------------------------------------------------------
function initTestimonials() {
  const openReviewBtn = document.getElementById('open-review-modal-btn');
  const reviewModal = document.getElementById('review-modal');
  const reviewForm = document.getElementById('review-form');
  const testimonialsGrid = document.getElementById('testimonials-grid');

  // Load custom reviews from localStorage
  loadCustomReviews();

  if (openReviewBtn && reviewModal) {
    openReviewBtn.addEventListener('click', () => {
      openModal(reviewModal);
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('review-author')?.value.trim();
      const service = document.getElementById('review-service')?.value.trim();
      const rating = document.getElementById('review-rating')?.value || '5';
      const comment = document.getElementById('review-comment')?.value.trim();

      if (!author || !service || !comment) {
        showToast('Please fill out all fields.', 'error');
        return;
      }

      const stars = '★'.repeat(parseInt(rating, 10)) + '☆'.repeat(5 - parseInt(rating, 10));

      const reviewCard = document.createElement('div');
      reviewCard.className = 'testimonial-card';
      reviewCard.innerHTML = `
        <div>
          <div class="testimonial-stars" style="color: var(--color-gold);">${stars}</div>
          <p class="testimonial-quote">"${comment}"</p>
        </div>
        <div class="testimonial-author">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="${author}" class="author-avatar">
          <div class="author-info">
            <h5>${author}</h5>
            <p>${service} · Verified Client</p>
          </div>
        </div>
      `;

      testimonialsGrid?.prepend(reviewCard);

      // Save to localStorage
      saveCustomReview({ author, service, stars, comment });

      closeModal(reviewModal);
      reviewForm.reset();
      showToast('Thank you! Your glowing review has been published.', 'success');
    });
  }

  function saveCustomReview(review) {
    try {
      const existing = JSON.parse(localStorage.getItem('vg_reviews') || '[]');
      existing.unshift(review);
      localStorage.setItem('vg_reviews', JSON.stringify(existing));
    } catch (e) {}
  }

  function loadCustomReviews() {
    try {
      const existing = JSON.parse(localStorage.getItem('vg_reviews') || '[]');
      existing.forEach(r => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'testimonial-card';
        reviewCard.innerHTML = `
          <div>
            <div class="testimonial-stars" style="color: var(--color-gold);">${r.stars}</div>
            <p class="testimonial-quote">"${r.comment}"</p>
          </div>
          <div class="testimonial-author">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="${r.author}" class="author-avatar">
            <div class="author-info">
              <h5>${r.author}</h5>
              <p>${r.service} · Verified Client</p>
            </div>
          </div>
        `;
        testimonialsGrid?.prepend(reviewCard);
      });
    } catch (e) {}
  }
}

// ---------------------------------------------------------------------------
// 13. FAQ ACCORDION HANDLER
// ---------------------------------------------------------------------------
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other open accordions
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question-btn')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ---------------------------------------------------------------------------
// 14. NEWSLETTER SUBSCRIPTION HANDLER
// ---------------------------------------------------------------------------
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');

  if (form && emailInput) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Store in localStorage for Admin view
      try {
        const subscribers = JSON.parse(localStorage.getItem('vg_subscribers') || '[]');
        if (!subscribers.includes(email)) {
          subscribers.push(email);
          localStorage.setItem('vg_subscribers', JSON.stringify(subscribers));
        }
      } catch (err) {}

      form.reset();
      showToast('Welcome to the Velvet Chronicle circle! (Front-end demo)', 'success');
    });
  }
}

// ---------------------------------------------------------------------------
// 15. BACK TO TOP BUTTON
// ---------------------------------------------------------------------------
function initBackToTop() {
  const topBtn = document.getElementById('back-to-top-btn');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------------------------------------------------------------------------
// 16. MODAL UTILITIES (OPEN / CLOSE / BACKDROP / ESCAPE)
// ---------------------------------------------------------------------------
function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('open');
  modalEl.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('open');
  modalEl.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function initModalClosers() {
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-backdrop');
      closeModal(parentModal);
    });
  });

  modalBackdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBackdrops.forEach(m => closeModal(m));
    }
  });
}

// ---------------------------------------------------------------------------
// 17. TOAST NOTIFICATION SYSTEM
// ---------------------------------------------------------------------------
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
  if (type === 'success') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4E7D59" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  } else if (type === 'error') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B84A39" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.35s ease';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// ---------------------------------------------------------------------------
// 18. INITIALIZE ALL MODULES ON DOMCONTENTLOADED
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initNavigation();
  initThemeToggle();
  initLookbook();
  initBeforeAfterSlider();
  initStylists();
  initTreatmentMenu();
  initBookingEngine();
  initGiftCards();
  initTestimonials();
  initFAQ();
  initNewsletter();
  initBackToTop();
  initModalClosers();

  // Set current footer year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
