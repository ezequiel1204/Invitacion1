document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. FUNCIÓN DE CONTADOR =====


    
    function startCountdown() {
        // !!! IMPORTANTE: Cambia esta fecha por la fecha de tu fiesta !!!
       const eventDate = new Date('2025-12-13T17:13:00').getTime();

        const countdownElement = document.getElementById('countdown');

        if (!countdownElement) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            // Cálculos
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Mostrar en el HTML
            countdownElement.innerHTML = `
                <div>
                    <span>${days}</span>
                    <p>Días</p>
                </div>
                <div>
                    <span>${hours}</span>
                    <p>Horas</p>
                </div>
                <div>
                    <span>${minutes}</span>
                    <p>Minutos</p>
                </div>
                <div>
                    <span>${seconds}</span>
                    <p>Segundos</p>
                </div>
            `;

            // Si la fiesta ya pasó
            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "<h2>¡El gran día llegó!</h2>";
            }
        }, 1000);
    }

    // ===== 2. ANIMACIONES AL HACER SCROLL =====
    function setupScrollAnimations() {
        const sections = document.querySelectorAll('.scroll-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: deja de observar una vez que es visible
                    // observer.unobserve(entry.target); 
                } else {
                     // Opcional: quita la clase si sale de la vista
                     // entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1 // La animación se activa cuando el 10% es visible
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

  // ===== 3. ANIMACIÓN DE MARIPOSAS (Versión con PNG) =====
function createButterflies() {
    const container = document.querySelector('.butterfly-container');
    if (!container) return;

    const butterflyCount = 10; // Número de mariposas

    // Bucle para crear cada mariposa
    for (let i = 0; i < butterflyCount; i++) {
        
        // 1. Crea el 'div' contenedor
        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');

        // 2. Crea el elemento de imagen <img>
        const butterflyImg = document.createElement('img');
        
        // 3. Asigna tu archivo .png
        butterflyImg.src = ''; // <-- ¡IMPORTANTE: Usa el nombre de tu archivo!

        // 4. Añade la imagen al 'div'
        butterfly.appendChild(butterflyImg);

        // 5. Asigna posiciones y animaciones aleatorias (esto no cambia)
        butterfly.style.top = `${Math.random() * 100}vh`;
        butterfly.style.left = `${Math.random() * -10}vw`; // Empieza fuera de la pantalla
        butterfly.style.animationDuration = `${Math.random() * 10 + 10}s`; // Duración aleatoria
        butterfly.style.animationDelay = `${Math.random() * 5}s`; // Delay aleatorio

        // 6. Añade la mariposa completa al contenedor principal
        container.appendChild(butterfly);
    }
}
    // Iniciar todas las funciones
    startCountdown();
    setupScrollAnimations();
    createButterflies();

});

document.addEventListener('DOMContentLoaded', () => {
    // CAMBIO: Ahora solo seleccionamos las fotos para la animación de scroll
    const animatedElements = document.querySelectorAll('.animated-photo');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Dejar de observar una vez que se ha animado
            }
        });
    }, {
        threshold: 0.2 // Cuando el 20% del elemento es visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});


/* ===== LÓGICA DEL REPRODUCTOR DE MÚSICA ===== */

// Espera a que todo el contenido de la página esté cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // Encuentra los elementos que necesitamos
    const songPlayer = document.getElementById('songPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    // Si no encuentra los elementos, no hace nada (para evitar errores)
    if (!songPlayer || !playPauseBtn) return;

    const iconPlay = playPauseBtn.querySelector('.icon-play');
    const iconPause = playPauseBtn.querySelector('.icon-pause');

    // Añade un "oyente" al botón de play
    playPauseBtn.addEventListener('click', () => {
        
        // Comprueba si la canción está pausada
        if (songPlayer.paused) {
            // Si está pausada, la reproduce
            songPlayer.play();
            // Muestra el icono de pausa
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
        } else {
            // Si está sonando, la pausa
            songPlayer.pause();
            // Muestra el icono de play
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
        }
    });

    // Opcional: Para algunos navegadores (como Chrome)
    // No se permite que la música suene sola al inicio.
    // El usuario DEBE hacer clic primero.
    // Este código hace que la canción intente sonar,
    // y si falla, espera a que el usuario haga clic en CUALQUIER LUGAR
    // para empezar la música.
    
    songPlayer.play().catch(error => {
        console.log("El navegador bloqueó el autoplay. Esperando interacción del usuario.");
        
        // Función para iniciar la música con el primer clic
        const startMusicOnFirstClick = () => {
            songPlayer.play();
            // Muestra el icono de pausa
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
            // Remueve este "oyente" para que no se active con cada clic
            document.body.removeEventListener('click', startMusicOnFirstClick);
        };
        
        // Agrega el "oyente" al cuerpo de la página
        document.body.addEventListener('click', startMusicOnFirstClick);
    });

});