document.addEventListener('DOMContentLoaded', function() {
    const clock = document.getElementById('clock');
    const dateDisplay = document.getElementById('date');
    const format24h = document.getElementById('format24h');
    const format12h = document.getElementById('format12h');
    const particlesContainer = document.getElementById('particles');

    let is24hFormat = true;

    function createParticles() {
        const particlesCount = 50;
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const animationDuration = Math.random() * 15 + 10;
            const animationDelay = Math.random() * 5;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particle.style.animation = `float ${animationDuration}s ease-in-out ${animationDelay}s infinite`;

            particlesContainer.appendChild(particle);
        }
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(0); }
            75% { transform: translateY(-20px) translateX(-10px); }
            100% { transform: translateY(0) translateX(0); }
        }
    `;
    document.head.appendChild(style);

    format24h.addEventListener('click', function() {
        is24hFormat = true;
        format24h.classList.add('active');
        format12h.classList.remove('active');
        updateTime();
    });

    format12h.addEventListener('click', function() {
        is24hFormat = false;
        format12h.classList.add('active');
        format24h.classList.remove('active');
        updateTime();
    });

    function updateTime() {
        const now = new Date();

        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let ampm = '';

        if (!is24hFormat) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12 || 12;
        }

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        clock.innerHTML = `${hours}:${minutes}:${seconds}`;
        if (!is24hFormat) {
            clock.innerHTML += `<span class="ampm">${ampm}</span>`;
        }

        const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        dateDisplay.textContent = `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
    }

    createParticles();
    updateTime();
    setInterval(updateTime, 1000);

    const clockCard = document.querySelector('.clock-card');
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        clockCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        clockCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
        clockCard.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            clockCard.style.transition = '';
        }, 500);
    });
});
