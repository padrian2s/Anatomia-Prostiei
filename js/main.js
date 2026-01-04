/* ═══════════════════════════════════════════════════
   ANATOMIA PROSTIEI - Main JavaScript
   Funcționalități comune pentru toate paginile
   ═══════════════════════════════════════════════════ */

// ===== NAVIGATION =====
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');
    window.scrollTo(0, 0);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

// ===== EXPANDABLE CARDS =====
function toggleCard(card) {
    card.classList.toggle('expanded');
}

// ===== PYRAMID LEVELS =====
function showPyramidLevel(level) {
    document.querySelectorAll('.pyramid-level').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.pyramid-detail').forEach(d => d.classList.remove('visible'));

    const levelEl = document.querySelector('.pyramid-level-' + level);
    const detailEl = document.getElementById('pyramid-detail-' + level);

    if (levelEl) levelEl.classList.add('active');
    if (detailEl) detailEl.classList.add('visible');
}

// ===== DUNNING-KRUGER SLIDER =====
function updateDKPosition(value) {
    const position = document.getElementById('dk-position');
    const info = document.getElementById('dk-info');

    if (!position || !info) return;

    const x = 50 + (value / 100) * 430;
    let y;

    if (value < 25) {
        y = 210 - (value / 25) * 160;
    } else if (value < 40) {
        y = 50 + ((value - 25) / 15) * 140;
    } else if (value < 70) {
        y = 190 - ((value - 40) / 30) * 50;
    } else {
        y = 140 - ((value - 70) / 30) * 70;
    }

    position.setAttribute('cx', x);
    position.setAttribute('cy', y);

    const phases = [
        {
            name: "Faza 1: Nu stii ca nu stii",
            color: "var(--accent-orange)",
            desc: 'Incredere maxima, competenta minima. "E simplu, ce mare lucru."'
        },
        {
            name: "Faza 2: Stii ca nu stii",
            color: "var(--accent-blue)",
            desc: 'Prabusirea increderii. Valea disperarii.'
        },
        {
            name: "Faza 3: Competenta in crestere",
            color: "var(--accent-purple)",
            desc: 'Incredere calibrata. Stii ce stii si ce nu.'
        },
        {
            name: "Faza 4: Expert",
            color: "var(--accent-green)",
            desc: 'Competenta reala. "Depinde" e adesea raspunsul.'
        }
    ];

    let phase;
    if (value < 25) {
        phase = phases[0];
    } else if (value < 45) {
        phase = phases[1];
    } else if (value < 75) {
        phase = phases[2];
    } else {
        phase = phases[3];
    }

    info.innerHTML = `
        <div class="dk-phase-name" style="color: ${phase.color};">${phase.name}</div>
        <p>${phase.desc}</p>
    `;
}

// ===== SELF TEST =====
function toggleSelfTest(opt) {
    opt.classList.toggle('selected');
    const checkbox = opt.querySelector('span');
    if (checkbox) {
        checkbox.textContent = opt.classList.contains('selected') ? '☑' : '☐';
    }

    const selected = document.querySelectorAll('#self-test-questions .selected').length;
    const result = document.getElementById('self-test-result');

    if (!result) return;

    if (!selected) {
        result.classList.remove('show');
        return;
    }

    result.classList.add('show');

    if (selected === 5) {
        result.style.background = 'rgba(34, 197, 94, 0.2)';
        result.innerHTML = '<strong style="color:var(--accent-green);">Felicitari!</strong> Probabil chiar stii.';
    } else if (selected >= 3) {
        result.style.background = 'rgba(245, 158, 11, 0.2)';
        result.innerHTML = '<strong style="color:var(--accent-orange);">Aproape.</strong> Sunt goluri.';
    } else {
        result.style.background = 'rgba(236, 72, 153, 0.2)';
        result.innerHTML = '<strong style="color:var(--accent-pink);">Sincer:</strong> ai familiaritate, nu cunoastere.';
    }
}

// ===== DIAGNOSTIC =====
function showDiagnostic(type) {
    const result = document.getElementById('diagnostic-result');
    if (!result) return;

    result.classList.add('show');

    const diagnostics = {
        1: {
            title: "🏔️ Dunning-Kruger",
            color: "var(--accent-orange)",
            strategy: "Lasa-l sa implementeze. Realitatea e cel mai bun profesor."
        },
        2: {
            title: "🛡️ Ego si Defensivitate",
            color: "var(--accent-yellow)",
            strategy: "Ofera o cale eleganta. 'Ideea ta de baza e buna, dar daca am ajusta...'"
        },
        3: {
            title: "🧩 Lipsa Fundamentelor",
            color: "var(--accent-blue)",
            strategy: "Coboara la baza. Construieste de acolo."
        },
        4: {
            title: "📜 Dogma (Bonhoefferian)",
            color: "var(--accent-purple)",
            strategy: "Forteaza confruntarea cu realitatea. Argumentele nu penetreaza dogma."
        }
    };

    const d = diagnostics[type];

    result.innerHTML = `
        <h4 style="color:${d.color}; margin-bottom:0.5rem;">${d.title}</h4>
        <p><strong>Strategia:</strong> ${d.strategy}</p>
    `;
    result.style.cssText = `
        background: rgba(255,255,255,0.05);
        border: 1px solid ${d.color};
        border-radius: 12px;
        padding: 1.5rem;
    `;
}

// ===== MECHANISM ANIMATION =====
function animateMechanisms() {
    const mechanisms = document.querySelectorAll('.mechanism-item');
    mechanisms.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// ===== SCROLL TO SECTION =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', function() {
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        const menuBtn = document.querySelector('.mobile-menu-btn');

        if (sidebar && menuBtn) {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Initialize any animated elements
    if (document.querySelector('.mechanism-item')) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateMechanisms();
                    observer.disconnect();
                }
            });
        });

        const mechanismsSection = document.querySelector('.mechanism-list');
        if (mechanismsSection) {
            observer.observe(mechanismsSection);
        }
    }
});

// ===== UTILITY FUNCTIONS =====
function formatPercentage(value, total) {
    return Math.round((value / total) * 100);
}

function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ===== PAGE NAVIGATION =====
function navigateTo(page) {
    window.location.href = page;
}

// ===== QUIZ SYSTEM =====
class Quiz {
    constructor(containerId, questions) {
        this.container = document.getElementById(containerId);
        this.questions = questions;
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
    }

    start() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.showQuestion();
    }

    showQuestion() {
        const q = this.questions[this.currentQuestion];
        this.container.innerHTML = `
            <div class="card">
                <h3 style="margin-bottom: 1rem;">Intrebarea ${this.currentQuestion + 1}/${this.questions.length}</h3>
                <p style="margin-bottom: 1.5rem; font-size: 1.1rem;">${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((opt, i) => `
                        <div class="quiz-option" onclick="quiz.selectAnswer(${i})">
                            ${opt}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    selectAnswer(index) {
        const q = this.questions[this.currentQuestion];
        this.answers.push(index);

        if (index === q.correct) {
            this.score++;
        }

        // Show feedback
        const options = this.container.querySelectorAll('.quiz-option');
        options.forEach((opt, i) => {
            if (i === q.correct) {
                opt.style.borderColor = 'var(--accent-green)';
                opt.style.background = 'rgba(34, 197, 94, 0.1)';
            } else if (i === index && index !== q.correct) {
                opt.style.borderColor = 'var(--accent-orange)';
                opt.style.background = 'rgba(245, 158, 11, 0.1)';
            }
            opt.style.pointerEvents = 'none';
        });

        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < this.questions.length) {
                this.showQuestion();
            } else {
                this.showResults();
            }
        }, 1500);
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        let message, color;

        if (percentage >= 80) {
            message = 'Excelent! Ai o buna intelegere a fenomenelor cognitive.';
            color = 'var(--accent-green)';
        } else if (percentage >= 60) {
            message = 'Bine! Mai sunt lucruri de invatat, dar ai o baza solida.';
            color = 'var(--accent-blue)';
        } else if (percentage >= 40) {
            message = 'Mediocru. Merita sa aprofundezi subiectul.';
            color = 'var(--accent-orange)';
        } else {
            message = 'Ai nevoie de mai multa cercetare. Citeste mai mult!';
            color = 'var(--accent-pink)';
        }

        this.container.innerHTML = `
            <div class="card" style="text-align: center;">
                <h3 style="margin-bottom: 1rem;">Rezultate</h3>
                <div style="font-size: 3rem; color: ${color}; margin: 1rem 0;">${percentage}%</div>
                <p style="font-size: 1.1rem;">${this.score}/${this.questions.length} raspunsuri corecte</p>
                <p style="margin-top: 1rem; color: ${color};">${message}</p>
                <button class="sim-btn primary" style="margin-top: 1.5rem;" onclick="quiz.start()">
                    Incearca din nou
                </button>
            </div>
        `;
    }
}

// Global quiz instance
let quiz;
