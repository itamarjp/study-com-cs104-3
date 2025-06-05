document.addEventListener('DOMContentLoaded', function() {
  // Toggle do menu responsivo
  function setupNavToggle() {
    var navToggle = document.getElementById('nav-toggle');
    var navLinksSmall = document.getElementById('navLinksSmall');
    if (navToggle && navLinksSmall) {
      navToggle.onclick = function() {
        navLinksSmall.classList.toggle('w3-hide');
      };
    }
  }

  // Links de navegação dinâmicos
  function setupNavLinks(selector) {
    var navLinks = document.querySelectorAll(selector);
    var mainContent = document.getElementById('main-content');
    var navLinksSmall = document.getElementById('navLinksSmall');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        // Remove destaque de todos os links
        document.querySelectorAll('.nav-link').forEach(function(l) {
          l.classList.remove('w3-text-blue');
        });
        // Destaca o link clicado
        this.classList.add('w3-text-blue');
        // Carrega o conteúdo
        var page = this.getAttribute('data-page');
        if (mainContent && page) {
          fetch(page)
            .then(res => res.text())
            .then(html => {
              mainContent.innerHTML = html;
              // Esconde o menu responsivo após clique
              if (window.innerWidth < 993 && navLinksSmall) {
                navLinksSmall.classList.add('w3-hide');
              }
              // Reatribui eventos após carregar conteúdo
              setupNavToggle();
              setupNavLinks('#navLinks a.nav-link');
              setupNavLinks('#navLinksSmall a.nav-link');
              // CHAMA A VALIDAÇÃO AQUI
              setupContactFormValidation();
            });
        }
      });
    });
  }

  setupNavToggle();
  setupNavLinks('#navLinks a.nav-link');
  setupNavLinks('#navLinksSmall a.nav-link');

  // Carrega home por padrão
  var mainContent = document.getElementById('main-content');
  if (mainContent) {
    fetch('home.html')
      .then(res => res.text())
      .then(html => {
        mainContent.innerHTML = html;
      });
  }
});

function setupContactFormValidation() {
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.onsubmit = function(event) {
      event.preventDefault();
      var valid = true;
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var message = document.getElementById('message');
      var feedback = document.getElementById('formFeedback');
      feedback.innerHTML = '';
      name.classList.remove('w3-border-red');
      email.classList.remove('w3-border-red');
      message.classList.remove('w3-border-red');

      if (!name.value.trim()) {
        name.classList.add('w3-border-red');
        valid = false;
      }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('w3-border-red');
        valid = false;
      }
      if (!message.value.trim()) {
        message.classList.add('w3-border-red');
        valid = false;
      }

      if (!valid) {
        feedback.innerHTML = '<div class="w3-panel w3-red">Please fill out all required fields correctly.</div>';
      } else {
        feedback.innerHTML = '<div class="w3-panel w3-green">Message sent successfully!</div>';
        contactForm.reset();
      }
    };
  }
}

function openModal(img) {
  document.getElementById('imgModal').style.display = 'block';
  document.getElementById('modalImg').src = img.src;
  document.getElementById('modalCaption').innerText = img.alt;
}

function closeModal() {
  document.getElementById('imgModal').style.display = 'none';
}

// Prevent modal from closing when clicking on the image itself
window.onload = function() {
  var modalImg = document.getElementById('modalImg');
  if (modalImg) {
    modalImg.onclick = function(event) {
      event.stopPropagation();
    }
  }
}

function accordionToggle(id) {
  var x = document.getElementById(id);
  if (x) {
    if (x.classList.contains("w3-show")) {
      x.classList.remove("w3-show");
      x.classList.add("w3-hide");
    } else {
      x.classList.remove("w3-hide");
      x.classList.add("w3-show");
    }
  }
}