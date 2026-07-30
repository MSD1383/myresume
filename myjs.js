
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
let W, H;
const pts = [];

function resizeP() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeP);
resizeP();

for (let i = 0; i < 70; i++) {
    pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.4 + 0.05
    });
}

function drawP() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 176, 255, ${p.o})`;
        ctx.fill();
    });

    for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.strokeStyle = `rgba(167, 139, 250, ${0.03 * (1 - dist / 130)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(drawP);
}
drawP();

const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
});

sections.forEach(sec => observer.observe(sec));
const fills = document.querySelectorAll('.skill-wave-fill');

const fillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const w = el.style.getPropertyValue('--w');
            el.style.width = '0%';
            setTimeout(() => {
                el.style.width = w;
            }, 120);
        }
    });
}, { threshold: 0.2 });

fills.forEach(f => fillObserver.observe(f));
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    document.querySelectorAll('.floating-card').forEach((card, i) => {
        const factor = 0.8 + i * 0.02;
        card.style.transform =
            `perspective(1200px) rotateY(${x * 1.2 * factor}deg) rotateX(${-y * 0.8 * factor}deg)`;
    });
});


