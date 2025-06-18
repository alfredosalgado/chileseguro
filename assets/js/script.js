document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector('.whatsapp-btn');

  if (btn) {
    btn.addEventListener('click', function (event) {
      event.preventDefault(); // Evita que el navegador siga el enlace `href`
      const phone = '56941277580'; // Número de teléfono
      const message = 'Hola, me interesa obtener más información.';
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
  } else {
    console.error("No se encontró el botón de WhatsApp en el DOM.");
  }
});

// Obtén el botón de "Subir"
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Cuando el usuario haga scroll hacia abajo, muestra el botón
window.onscroll = function () {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollToTopBtn.style.display = "flex"; // Muestra el botón
  } else {
    scrollToTopBtn.style.display = "none"; // Oculta el botón
  }
};

// Cuando el usuario haga clic en el botón, realiza el desplazamiento suave
scrollToTopBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Evita la acción predeterminada de ancla

  // Desplazamiento suave hasta la parte superior
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Añade la transición suave
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const titulos = document.querySelectorAll(".titulo-animado");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("titulo-visible"); // Agrega la animación cuando es visible
      } else {
        entry.target.classList.remove("titulo-visible"); // Quita la animación cuando deja de ser visible
      }
    });
  }, { threshold: 0.2 });

  titulos.forEach(titulo => observer.observe(titulo));
});



document.addEventListener("DOMContentLoaded", () => {
  const textos = document.querySelectorAll(".texto-fade");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("texto-visible"); // Activa la animación
      } else {
        entry.target.classList.remove("texto-visible"); // Permite que se repita
      }
    });
  }, { threshold: 0.2 });

  textos.forEach(texto => observer.observe(texto));
});





function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const isMoney = counter.classList.contains('money');
  let count = 0;
  const increment = target / 100; // Ajusta la velocidad de animación

  const updateCounter = () => {
    count += increment;

    if (count < target) {
      counter.textContent = isMoney ? `+ ${Math.floor(count).toLocaleString('es-CL')}` : Math.floor(count).toLocaleString('es-CL');
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = isMoney ? `+ ${target.toLocaleString('es-CL')}` : target.toLocaleString('es-CL');
    }
  };

  updateCounter();
}

// Observer para detectar cuando los contadores sean visibles
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counterBox = entry.target;
      counterBox.classList.add("visible"); // Aparece suavemente

      const counters = counterBox.querySelectorAll(".counter");
      counters.forEach(counter => {
        counter.textContent = "0"; // Reinicia el conteo cada vez que es visible
        animateCounter(counter);
      });
    }
  });
}, { threshold: 0.5 }); // Se activa cuando al menos el 50% del elemento es visible

// Aplicar el observer a cada contador
document.querySelectorAll('.counter-box').forEach(counterBox => observer.observe(counterBox));





document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popupModal");
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");
  const closeSpan = document.querySelector(".close-btn");

  // 🚀 Hacer que el pop-up aparezca automáticamente al cargar la página
  setTimeout(() => {
    popup.style.display = "flex";
  }, 2000); // Espera 2 segundos antes de mostrarlo (puedes cambiar el tiempo)

  // Abrir el pop-up con el botón (opcional, sigue funcionando)
  openBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  // Cerrar el pop-up con el botón
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Cerrar el pop-up con la "X"
  closeSpan.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Cerrar el pop-up al hacer clic fuera de él
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});





// Espera a que todo el contenido del HTML (DOM) esté completamente cargado antes de ejecutar el script.
// Esto previene errores de "elemento no encontrado".
document.addEventListener('DOMContentLoaded', function () {
    
  // ===================================
  // CONFIGURACIÓN DE EMPRESAS
  // ===================================
  // Aquí defines las empresas. Para agregar una nueva, simplemente añade un objeto al array.
  // 'id': Debe coincidir con el nombre de la carpeta en ./assets/img/empresas/
  // 'name': El nombre que se mostrará en la tarjeta.
  // 'logo': La ruta al logo de la empresa.
  // 'photoCount': El número total de fotos en la carpeta de esa empresa.
  const companies = [
      {
          id: 'parking_cordillera',
          name: 'Parking Cordillera',
          logo: './assets/img/empresas/parking_cordillera/logopc.jpeg', // Ruta real: ./assets/img/empresas/constructora_gomez/logo.png
          photoCount: 5
      }
  ];

  // ===================================
  // SELECCIÓN DE ELEMENTOS DEL DOM
  // ===================================
  // Guardamos en constantes los elementos del HTML con los que vamos a interactuar.
  const companyGrid = document.getElementById('company-grid');
  const modal = document.getElementById('gallery-modal');
  const modalContent = document.getElementById('modal-content');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const imageCounter = document.getElementById('image-counter');

  // ===================================
  // ESTADO DE LA APLICACIÓN
  // ===================================
  // Variables para saber qué empresa y qué imagen se están mostrando en el modal.
  let currentCompany = null;
  let currentImageIndex = 0;

  // ===================================
  // FUNCIONES
  // ===================================

  /**
   * Crea y muestra las tarjetas de las empresas en la página principal.
   */
  function renderCompanyCards() {
      if (!companyGrid) return; // Salir si el contenedor no existe
      companyGrid.innerHTML = ''; // Limpiar la cuadrícula para evitar duplicados

      companies.forEach(company => {
          const card = document.createElement('div');
          // Clases de Tailwind para el estilo de la tarjeta
          card.className = 'company-card bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer';
          // Guardamos el 'id' de la empresa en el elemento para saber cuál abrir
          card.dataset.companyId = company.id;

          // Atributo 'onerror' para mostrar un placeholder si el logo no carga
          const logoFallback = `onerror="this.onerror=null;this.src='https://placehold.co/200x100/e2e8f0/4a5568?text=${company.name.split(' ')[0]}';"`;
          
          // Estructura interna de la tarjeta
          card.innerHTML = `
              <div class="p-6 flex flex-col items-center justify-center text-center h-full">
                  <img class="h-16 object-contain mb-4" src="${company.logo}" alt="Logo de ${company.name}" ${logoFallback}>
                  <h3 class="text-lg font-semibold text-gray-800">${company.name}</h3>
                  <p class="mt-auto pt-4 text-sm text-blue-600 font-semibold">Ver Galería</p>
              </div>
          `;
          companyGrid.appendChild(card);
      });
  }

  /**
   * Muestra una imagen específica en el modal según su índice.
   * @param {number} index - El índice de la imagen a mostrar (empezando en 0).
   */
  function showImage(index) {
      if (!currentCompany) return;
      
      currentImageIndex = index;
      const photoNumber = index + 1; // El número de foto para el usuario (empezando en 1)
      const imagePath = `./assets/img/empresas/${currentCompany.id}/${photoNumber}.jpg`;
      
      modalImage.src = imagePath;

      // Si la imagen de la galería no se encuentra, muestra un placeholder
      modalImage.onerror = function() {
          this.onerror = null;
          this.src = `https://placehold.co/800x600/fecaca/991b1b?text=Imagen+${photoNumber}+no+encontrada`;
      };
      
      // Actualiza el texto del contador (ej: "Imagen 1 de 5")
      imageCounter.textContent = `Imagen ${photoNumber} de ${currentCompany.photoCount}`;
      
      // Deshabilita/habilita los botones de navegación si es la primera o última imagen
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === currentCompany.photoCount - 1;
      prevBtn.classList.toggle('opacity-50', prevBtn.disabled);
      nextBtn.classList.toggle('opacity-50', nextBtn.disabled);
  }

  /**
   * Abre el modal de la galería para una empresa específica.
   * @param {string} companyId - El ID de la empresa a mostrar.
   */
  function openModal(companyId) {
      currentCompany = companies.find(c => c.id === companyId);
      if (!currentCompany || currentCompany.photoCount === 0) {
          alert('Esta empresa no tiene galería para mostrar.');
          return;
      }
      
      modalTitle.textContent = `Galería de ${currentCompany.name}`;
      modal.classList.remove('hidden'); // Hace visible el modal
      
      // Aplica las clases de animación de entrada
      modalContent.classList.add('modal-enter', 'modal-enter-active');
      modalContent.addEventListener('transitionend', () => {
          modalContent.classList.remove('modal-enter', 'modal-enter-active');
      }, { once: true });
      
      showImage(0); // Muestra la primera imagen
      document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
  }
  
  /**
   * Cierra el modal de la galería.
   */
  function closeModal() {
      // Aplica las clases de animación de salida
      modalContent.classList.add('modal-leave', 'modal-leave-active');
      
      // Espera a que termine la animación para ocultar el modal
      modalContent.addEventListener('transitionend', () => {
          modal.classList.add('hidden');
          modalContent.classList.remove('modal-leave', 'modal-leave-active');
          document.body.style.overflow = 'auto'; // Restaura el scroll
          currentCompany = null; // Limpia el estado
      }, { once: true });
  }

  // ===================================
  // MANEJADORES DE EVENTOS (LISTENERS)
  // ===================================

  // 1. Clic en una tarjeta de empresa para abrir el modal
  companyGrid.addEventListener('click', function (e) {
      const card = e.target.closest('.company-card');
      if (card && card.dataset.companyId) {
          openModal(card.dataset.companyId);
      }
  });

  // 2. Clics para cerrar el modal
  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
      // Cierra el modal solo si se hace clic en el fondo oscuro, no en el contenido
      if (e.target === modal) {
          closeModal();
      }
  });

  // 3. Clics para la navegación de la galería
  prevBtn.addEventListener('click', () => !prevBtn.disabled && showImage(currentImageIndex - 1));
  nextBtn.addEventListener('click', () => !nextBtn.disabled && showImage(currentImageIndex + 1));

  // 4. Navegación con el teclado
  document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('hidden')) return; // No hacer nada si el modal está cerrado

      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
  });

  // ===================================
  // INICIALIZACIÓN
  // ===================================
  // Llama a la función para crear las tarjetas cuando la página carga.
  renderCompanyCards();
});
