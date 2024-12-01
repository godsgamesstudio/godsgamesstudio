document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const navbarMenu = document.getElementById("navbar-default");

    toggleButton.addEventListener("click", function () {
        // Alterna a classe 'hidden' no menu ao clicar no botão
        navbarMenu.classList.toggle("hidden");
    });
});

// navbar configuration
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // Remove o '#' do ID
        const targetElement = document.getElementById(targetId);
        const offset = 80; // Altura do navbar fixo

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        }
    });
});

// Moldais
async function loadModal(id) {
    // Verifica se a modal já existe no DOM para evitar duplicação
    if (document.getElementById(`modal-${id}`)) {
        document.getElementById(`modal-${id}`).classList.remove("hidden");
        return;
    }

    // Carrega o conteúdo da modal dinamicamente
    const response = await fetch(`./src/pages/utils/modal/modal-${id}.html`);
    const modalContent = await response.text();

    // Insere a modal no corpo do documento
    document.body.insertAdjacentHTML("beforeend", modalContent);

    // Remove a classe "hidden" para exibir a modal
    document.getElementById(`modal-${id}`).classList.remove("hidden");
    document.getElementById(`modal-${id}`).classList.add("flex");
    document.getElementById('btn-back').classList.add("hidden")
    document.getElementById('btn-next').classList.add("hidden")

    // Adiciona um evento para fechar a modal ao clicar fora dela
    const modalElement = document.getElementById(`modal-${id}`);
    modalElement.addEventListener("click", (event) => {
        if (event.target.id === `modal-${id}`) {
            closeModal(id);
        }
    });
}

function closeModal(id) {
    const modalElement = document.getElementById(`modal-${id}`);
    if (modalElement) {
        modalElement.classList.add("hidden");
        modalElement.classList.remove('flex')
        modalElement.remove(); // Remove a modal do DOM ao fechar
        document.getElementById('btn-back').classList.remove("hidden")
        document.getElementById('btn-next').classList.remove("hidden")
    }
}

// Índice do slide atual
let slideIndex = 0;

// Função para mostrar os slides atuais
function showSlides() {
    const slides = document.querySelectorAll('.carousel-item');
    const isMediumScreen = window.matchMedia('(min-width: 768px)').matches; // Verifica se é tela média ou maior
    slides.forEach((slide, index) => {
        if (isMediumScreen) {
            // Em telas médias, mostrar dois slides consecutivos
            if (index === slideIndex || index === (slideIndex + 1) % slides.length) {
                slide.classList.remove('hidden');
                slide.classList.add('block');
            } else {
                slide.classList.remove('block');
                slide.classList.add('hidden');
            }
        } else {
            // Em telas menores, mostrar apenas um slide
            if (index === slideIndex) {
                slide.classList.remove('hidden');
                slide.classList.add('block');
            } else {
                slide.classList.remove('block');
                slide.classList.add('hidden');
            }
        }
    });
}

// Função para ir ao próximo slide
function nextSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;

    if (isMediumScreen) {
        // Avança dois slides em telas médias ou maiores
        slideIndex = (slideIndex + 2) % slides.length;
    } else {
        // Avança um slide em telas menores
        slideIndex = (slideIndex + 1) % slides.length;
    }

    showSlides();
}

// Função para voltar ao slide anterior
function prevSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;

    if (isMediumScreen) {
        // Retrocede dois slides em telas médias ou maiores
        slideIndex = (slideIndex - 2 + slides.length) % slides.length;
    } else {
        // Retrocede um slide em telas menores
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    }

    showSlides();
}

// Inicializar os slides
showSlides();

// Atualizar slides ao redimensionar a janela
window.addEventListener('resize', showSlides);

function updateImage() {
    const banner = document.getElementById('banner-inicio');
    if (window.innerWidth >= 1450) {
        banner.src = './src/images/banner3.png'
    } else {
        banner.src = './src/images/banner2.png';
    }
}

// Verificar a largura inicial da tela
updateImage();

// Adicionar evento ao redimensionar a janela
window.addEventListener('resize', updateImage);