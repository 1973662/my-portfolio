// ===== 导航栏：滚动变色 + 移动端菜单 =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// 滚动时给导航栏加阴影
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 移动端菜单切换
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
});

// 点击链接后关闭菜单 + 高亮当前项
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

// ===== 滚动时高亮导航项 =====
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', highlightNavOnScroll);

// ===== 元素滚动出现动画 =====
const revealTargets = document.querySelectorAll(
    '.section-title, .skill-card, .project-card, .about-image, .about-text, .contact-form, .social-links'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealTargets.forEach(el => observer.observe(el));

// ===== 表单提交（演示用，无后端） =====
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        feedback.style.color = '#ef4444';
        feedback.textContent = '请填写必填字段';
        return;
    }

    // 模拟发送
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '发送中...';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        feedback.style.color = '';
        feedback.textContent = `✓ 谢谢 ${name}，消息已发送！我会尽快回复你。`;
        form.reset();
        setTimeout(() => { feedback.textContent = ''; }, 4000);
    }, 800);
});

// ===== 平滑滚动到锚点（兼容老浏览器） =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('%c👋 欢迎来到我的作品集！', 'font-size:16px;color:#6366f1;font-weight:bold;');
