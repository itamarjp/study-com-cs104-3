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