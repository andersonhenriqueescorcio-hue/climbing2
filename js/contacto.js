/* ============================================
   CONTACTO.JS — comportamento exclusivo da
   página de contacto: formulário e newsletter.
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.reset();
      const msg = document.getElementById('formMsg');
      if (msg) msg.style.display = 'block';
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const button = newsletterForm.querySelector('button');
      const input = newsletterForm.querySelector('input');
      button.textContent = 'Subscrito ✓';
      input.value = '';
    });
  }
});
