document.addEventListener('DOMContentLoaded', () => {
  // --- CMS LOGIC ---
  const urlParams = new URLSearchParams(window.location.search);
  const isPreview = urlParams.has('preview');
  const storageKey = isPreview ? 'ozeDraftData' : 'ozePublishedData';
  const data = JSON.parse(localStorage.getItem(storageKey));

  if (data) {
    // Hero
    if(data.heroTitle) document.getElementById('hero-title').innerHTML = data.heroTitle;
    if(data.heroSubtitle) document.getElementById('hero-subtitle').innerHTML = data.heroSubtitle;
    if(data.heroTags) document.getElementById('hero-tags').innerText = data.heroTags;
    if(data.heroImage) document.getElementById('hero-img').src = data.heroImage;

    // About
    if(data.aboutText) document.getElementById('about-content').innerHTML = data.aboutText;

    // Contact
    if(data.email) {
      const emailEl = document.getElementById('contact-email');
      emailEl.href = `mailto:${data.email}`;
      emailEl.innerText = data.email;
    }
    if(data.phone) {
      const phoneEl = document.getElementById('contact-phone');
      phoneEl.href = `tel:${data.phone.replace(/\s/g,'')}`;
      phoneEl.innerText = data.phone;
    }

    // Social
    if(data.instagram) document.getElementById('social-insta').href = data.instagram;
    if(data.whatsapp) document.getElementById('social-wa').href = data.whatsapp;
    if(data.email) document.getElementById('social-mail').href = `mailto:${data.email}`;

    // Services
    if(data.services) {
      const servicesList = document.getElementById('services-list');
      const items = data.services.split('\n').filter(s => s.trim() !== '');
      servicesList.innerHTML = items.map(item => `<div class="service-item">${item}</div>`).join('');
    }
  }

  // --- ORIGINAL INTERACTIVITY ---
  const header = document.querySelector('header');
  window.addEventListener('scroll',()=>{
    header.classList.toggle('scrolled', window.scrollY > 30);
  });

  const reveals = document.querySelectorAll('.hero-text, .hero-image, .trust, .gallery h2, .grid img, footer, .about-section, .contact-section');
  reveals.forEach(el=>el.classList.add('reveal'));

  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
  },{threshold:0.15});
  reveals.forEach(el=>io.observe(el));

  const heroImg = document.querySelector('.hero-image img');
  window.addEventListener('mousemove',(e)=>{
    const x = (e.clientX / window.innerWidth - .5) * 6;
    const y = (e.clientY / window.innerHeight - .5) * 6;
    heroImg.style.transform = `translate(${x}px, ${y}px)`;
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.grid img').forEach(img=>{
    img.addEventListener('click',()=>{
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  lightbox.addEventListener('click',()=>{
    lightbox.style.display = 'none';
  });

  const servicesLink = Array.from(document.querySelectorAll('nav a')).find(a => a.textContent.trim() === 'Services');
  const servicesOverlay = document.getElementById('servicesOverlay');
  if(servicesLink){
    servicesLink.addEventListener('click', (e) => {
      e.preventDefault();
      servicesOverlay.classList.toggle('active');
    });
  }

  const bookingBtn = document.querySelector('.btn-solid');
  const bookingModal = document.getElementById('bookingModal');
  const closeBooking = document.getElementById('closeBooking');
  const bookingForm = document.getElementById('bookingForm');

  if(bookingBtn) bookingBtn.addEventListener('click', (e) => { e.preventDefault(); bookingModal.classList.add('active'); });
  const closeBookingModal = () => bookingModal.classList.remove('active');
  if(closeBooking) closeBooking.addEventListener('click', closeBookingModal);
  bookingModal.addEventListener('click', (e) => { if(e.target === bookingModal) closeBookingModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && bookingModal.classList.contains('active')) closeBookingModal(); });

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = document.getElementById('b-service').value;
    const date = document.getElementById('b-date').value;
    const location = document.getElementById('b-location').value;
    const phone = document.getElementById('b-phone').value;
    const text = `Hello Oze Photography,%0A%0AI would like to book a session.%0A%0AService: ${service}%0ADate: ${date}%0ALocation: ${location}%0APhone: ${phone}`;
    window.open(`https://wa.me/250780321661?text=${text}`, '_blank');
    closeBookingModal();
    bookingForm.reset();
  });

  const ham = document.getElementById('hamburger');
  const nv = document.querySelector('nav');
  if(ham && nv){
    ham.addEventListener('click', () => { ham.classList.toggle('active'); nv.classList.toggle('active'); document.body.style.overflow = nv.classList.contains('active') ? 'hidden' : ''; });
    nv.querySelectorAll('a').forEach(l => l.addEventListener('click', () => { ham.classList.remove('active'); nv.classList.remove('active'); document.body.style.overflow = ''; }));
  }
});