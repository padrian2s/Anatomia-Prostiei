/* ═══════════════════════════════════════════════════
   ANATOMIA PROSTIEI - Simulator Engines
   Motoare pentru toate simulatoarele interactive
   ═══════════════════════════════════════════════════ */

// ===== CONSTANTS =====
const COLORS = {
    primary: '#14b8a6',
    secondary: '#06b6d4',
    orange: '#f59e0b',
    blue: '#3b82f6',
    purple: '#a855f7',
    green: '#22c55e',
    yellow: '#eab308',
    pink: '#ec4899',
    dark: '#0a0a0f'
};

// ═════════════════════════════════════════════════════════════
// ECHO CHAMBER SIMULATOR
// ═════════════════════════════════════════════════════════════
class EchoChamberSimulator {
    constructor(containerId, statsContainer) {
        this.container = document.getElementById(containerId);
        this.statsContainer = statsContainer;
        this.posts = [];
        this.interval = null;
        this.stats = { agree: 0, disagree: 0, hidden: 0 };
        this.bias = 0.5;
        this.postIndex = 0;

        this.samplePosts = [
            { text: "Tehnologia X e clar viitorul!", agree: true },
            { text: "Studiu: X are probleme de scalabilitate", agree: false },
            { text: "Am implementat X si e fantastic!", agree: true },
            { text: "Y e mai potrivit pentru 80% din cazuri", agree: false },
            { text: "Companiile mari adopta X in masa!", agree: true },
            { text: "Atentie: X are costuri ascunse", agree: false },
            { text: "Tutorial: Invata X in 10 minute", agree: true },
            { text: "Cand NU ar trebui sa folosesti X", agree: false },
            { text: "Eu folosesc X de 2 ani, e perfect!", agree: true },
            { text: "Alternativa Z rezolva problemele lui X", agree: false },
        ];
    }

    start() {
        this.reset();
        this.interval = setInterval(() => this.addPost(), 1500);
    }

    reset() {
        if (this.interval) clearInterval(this.interval);
        this.container.innerHTML = '';
        this.stats = { agree: 0, disagree: 0, hidden: 0 };
        this.bias = 0.5;
        this.postIndex = 0;
        this.updateStats();
    }

    addPost() {
        if (this.postIndex >= this.samplePosts.length) {
            clearInterval(this.interval);
            return;
        }

        const post = this.samplePosts[this.postIndex];
        const showPost = post.agree ?
            Math.random() < this.bias + 0.3 :
            Math.random() < (1 - this.bias);

        if (showPost) {
            const div = document.createElement('div');
            div.className = `echo-post ${post.agree ? 'agree' : 'disagree'}`;
            div.innerHTML = `
                <p>${post.text}</p>
                <button onclick="echoSim.like(this, ${post.agree})"
                        style="background:none;border:none;cursor:pointer;color:var(--text-secondary);margin-top:0.5rem;">
                    👍 Like
                </button>
            `;
            this.container.insertBefore(div, this.container.firstChild);
            post.agree ? this.stats.agree++ : this.stats.disagree++;
        } else {
            this.stats.hidden++;
        }

        this.postIndex++;
        this.updateStats();
    }

    like(btn, isAgree) {
        btn.style.color = COLORS.primary;
        btn.textContent = '👍 Liked!';
        this.bias = isAgree ?
            Math.min(this.bias + 0.15, 0.95) :
            Math.max(this.bias - 0.1, 0.2);
    }

    updateStats() {
        if (this.statsContainer) {
            document.getElementById('echo-agree').textContent = this.stats.agree;
            document.getElementById('echo-disagree').textContent = this.stats.disagree;
            document.getElementById('echo-hidden').textContent = this.stats.hidden;
        }
    }
}

// ═════════════════════════════════════════════════════════════
// VIRAL SPREAD SIMULATOR
// ═════════════════════════════════════════════════════════════
class ViralSpreadSimulator {
    constructor(containerId, statsContainer) {
        this.container = document.getElementById(containerId);
        this.statsContainer = statsContainer;
        this.grid = [];
        this.interval = null;
        this.stats = { infected: 0, immune: 0, pending: 400 };
        this.gridSize = 20;
        this.immunityRate = 0.15;
    }

    init() {
        this.container.innerHTML = '';
        this.grid = [];

        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'viral-cell';
            this.container.appendChild(cell);
            this.grid.push({
                el: cell,
                state: 'pending',
                immune: Math.random() < this.immunityRate
            });
        }
    }

    start() {
        this.reset();
        // Start with 3 random infections
        for (let i = 0; i < 3; i++) {
            this.infect(Math.floor(Math.random() * this.grid.length));
        }
        this.interval = setInterval(() => this.spread(), 200);
    }

    reset() {
        if (this.interval) clearInterval(this.interval);
        this.stats = { infected: 0, immune: 0, pending: this.gridSize * this.gridSize };
        this.init();
        this.updateStats();
    }

    infect(idx) {
        const cell = this.grid[idx];
        if (cell.state !== 'pending') return;

        if (cell.immune) {
            cell.state = 'immune';
            cell.el.classList.add('immune');
            this.stats.immune++;
        } else {
            cell.state = 'infected';
            cell.el.classList.add('infected');
            this.stats.infected++;
        }
        this.stats.pending--;
        this.updateStats();
    }

    spread() {
        const newInfections = [];

        this.grid.forEach((cell, idx) => {
            if (cell.state === 'infected') {
                this.getNeighbors(idx).forEach(n => {
                    if (this.grid[n].state === 'pending' && Math.random() < 0.3) {
                        newInfections.push(n);
                    }
                });
            }
        });

        newInfections.forEach(idx => this.infect(idx));

        if (newInfections.length === 0) {
            clearInterval(this.interval);
        }
    }

    getNeighbors(idx) {
        const neighbors = [];
        const row = Math.floor(idx / this.gridSize);
        const col = idx % this.gridSize;

        if (row > 0) neighbors.push(idx - this.gridSize);
        if (row < this.gridSize - 1) neighbors.push(idx + this.gridSize);
        if (col > 0) neighbors.push(idx - 1);
        if (col < this.gridSize - 1) neighbors.push(idx + 1);

        return neighbors;
    }

    updateStats() {
        if (this.statsContainer) {
            document.getElementById('viral-infected').textContent = this.stats.infected;
            document.getElementById('viral-immune').textContent = this.stats.immune;
            document.getElementById('viral-pending').textContent = this.stats.pending;
        }
    }
}

// ═════════════════════════════════════════════════════════════
// GROUP DECISION SIMULATOR
// ═════════════════════════════════════════════════════════════
class GroupDecisionSimulator {
    constructor(containerId, statsContainer) {
        this.container = document.getElementById(containerId);
        this.statsContainer = statsContainer;
        this.participants = [];
        this.interval = null;
        this.stats = { independent: 0, conforming: 0, correct: '-' };
        this.gridSize = 10;
    }

    init() {
        this.container.innerHTML = '';
        this.participants = [];

        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'group-cell';
            this.container.appendChild(cell);
            this.participants.push({
                el: cell,
                correctAnswer: Math.random() < 0.7, // 70% know the right answer
                independence: Math.random(),
                decided: false,
                decision: null
            });
        }
    }

    start() {
        this.reset();
        // First person speaks (wrong answer - starts conformity cascade)
        const first = this.participants[0];
        first.decided = true;
        first.decision = false;
        first.el.style.background = COLORS.orange;

        this.interval = setInterval(() => this.simulate(), 100);
    }

    reset() {
        if (this.interval) clearInterval(this.interval);
        this.stats = { independent: 0, conforming: 0, correct: '-' };
        this.init();
        this.updateStats();
    }

    simulate() {
        const undecided = this.participants.filter(p => !p.decided);

        if (undecided.length === 0) {
            clearInterval(this.interval);
            this.calculateResult();
            return;
        }

        const person = undecided[Math.floor(Math.random() * undecided.length)];
        person.decided = true;

        // Calculate group pressure
        const wrongCount = this.participants.filter(p => p.decided && !p.decision).length;
        const rightCount = this.participants.filter(p => p.decided && p.decision).length;
        const total = wrongCount + rightCount;

        // Decision based on independence vs conformity
        if (person.independence > 0.7) {
            // Independent thinker - goes with their knowledge
            person.decision = person.correctAnswer;
        } else {
            // Susceptible to group pressure
            const pressure = total > 0 ? wrongCount / total : 0.5;
            person.decision = pressure > 0.5 + (person.independence * 0.3) ? false : person.correctAnswer;
        }

        person.el.style.background = person.decision ? COLORS.green : COLORS.orange;

        this.stats.independent = this.participants.filter(p => p.decided && p.independence > 0.7).length;
        this.stats.conforming = this.participants.filter(p => p.decided && p.independence <= 0.7).length;
        this.updateStats();
    }

    calculateResult() {
        const correctCount = this.participants.filter(p => p.decision).length;
        const el = document.getElementById('stat-correct');
        el.textContent = correctCount > 50 ? '✓ DA' : '✗ NU';
        el.style.color = correctCount > 50 ? COLORS.green : COLORS.orange;
    }

    updateStats() {
        if (this.statsContainer) {
            document.getElementById('stat-independent').textContent = this.stats.independent;
            document.getElementById('stat-conform').textContent = this.stats.conforming;
        }
    }
}

// ═════════════════════════════════════════════════════════════
// MEETING SIMULATOR
// ═════════════════════════════════════════════════════════════
class MeetingSimulator {
    constructor(containerId, statsContainer) {
        this.container = document.getElementById(containerId);
        this.statsContainer = statsContainer;
        this.participants = [];
        this.interval = null;
        this.currentSpeaker = 0;
        this.stats = { speakFirst: 0, changedMind: 0, stayedTrue: 0 };

        this.roles = [
            { name: 'Manager', icon: '👔', influence: 0.9, opinion: 'wrong', independence: 0.8 },
            { name: 'Senior Dev', icon: '💻', influence: 0.7, opinion: 'correct', independence: 0.6 },
            { name: 'Junior Dev 1', icon: '🧑‍💻', influence: 0.3, opinion: 'correct', independence: 0.3 },
            { name: 'Junior Dev 2', icon: '👩‍💻', influence: 0.3, opinion: 'correct', independence: 0.4 },
            { name: 'QA', icon: '🔍', influence: 0.4, opinion: 'correct', independence: 0.5 },
            { name: 'PM', icon: '📋', influence: 0.6, opinion: 'wrong', independence: 0.2 },
        ];

        this.opinions = {
            wrong: "Kubernetes e solutia perfecta pentru proiectul nostru mic.",
            correct: "Pentru 3 useri, un simplu server ar fi mai eficient.",
            conformed: "...da, probabil Kubernetes e mai bun..."
        };
    }

    init() {
        this.container.innerHTML = '';
        this.participants = [];

        this.roles.forEach(role => {
            const div = document.createElement('div');
            div.className = 'meeting-participant';
            div.innerHTML = `
                <div class="participant-avatar" style="background: ${role.opinion === 'correct' ? COLORS.green : COLORS.orange}20;">
                    ${role.icon}
                </div>
                <div class="participant-info">
                    <div class="participant-name">${role.name}</div>
                    <div class="participant-opinion">...</div>
                </div>
            `;
            this.container.appendChild(div);
            this.participants.push({
                el: div,
                ...role,
                spoken: false,
                finalOpinion: role.opinion
            });
        });
    }

    start() {
        this.reset();
        this.currentSpeaker = 0;
        this.interval = setInterval(() => this.nextSpeaker(), 2000);
    }

    reset() {
        if (this.interval) clearInterval(this.interval);
        this.stats = { speakFirst: 0, changedMind: 0, stayedTrue: 0 };
        this.currentSpeaker = 0;
        this.init();
        this.updateStats();
    }

    nextSpeaker() {
        if (this.currentSpeaker >= this.participants.length) {
            clearInterval(this.interval);
            return;
        }

        // Clear previous speaker highlight
        this.participants.forEach(p => p.el.classList.remove('speaking'));

        const speaker = this.participants[this.currentSpeaker];
        speaker.el.classList.add('speaking');
        speaker.spoken = true;

        // Calculate conformity pressure
        const wrongVoices = this.participants
            .filter(p => p.spoken && p.finalOpinion === 'wrong')
            .reduce((sum, p) => sum + p.influence, 0);

        const rightVoices = this.participants
            .filter(p => p.spoken && p.finalOpinion === 'correct')
            .reduce((sum, p) => sum + p.influence, 0);

        // Decide if they conform or stay true
        let finalOpinion = speaker.opinion;
        let opinionText = this.opinions[speaker.opinion];

        if (speaker.opinion === 'correct' && wrongVoices > rightVoices * 1.5) {
            if (Math.random() > speaker.independence) {
                finalOpinion = 'conformed';
                opinionText = this.opinions.conformed;
                speaker.el.classList.add('conforming');
                this.stats.changedMind++;
            } else {
                this.stats.stayedTrue++;
            }
        }

        speaker.finalOpinion = finalOpinion;
        speaker.el.querySelector('.participant-opinion').textContent = opinionText;

        this.currentSpeaker++;
        this.updateStats();
    }

    updateStats() {
        if (this.statsContainer) {
            document.getElementById('meeting-changed').textContent = this.stats.changedMind;
            document.getElementById('meeting-stayed').textContent = this.stats.stayedTrue;
        }
    }
}

// ═════════════════════════════════════════════════════════════
// FAMILY DINNER SIMULATOR
// ═════════════════════════════════════════════════════════════
class FamilyDinnerSimulator {
    constructor(containerId, statsContainer) {
        this.container = document.getElementById(containerId);
        this.statsContainer = statsContainer;
        this.members = [];
        this.interval = null;
        this.currentTurn = 0;
        this.topic = '';

        this.familyMembers = [
            { name: 'Bunicul', icon: '👴', authority: 0.9, openness: 0.2, age: 'old' },
            { name: 'Bunica', icon: '👵', authority: 0.8, openness: 0.3, age: 'old' },
            { name: 'Tata', icon: '👨', authority: 0.7, openness: 0.4, age: 'adult' },
            { name: 'Mama', icon: '👩', authority: 0.7, openness: 0.5, age: 'adult' },
            { name: 'Fiul', icon: '🧑', authority: 0.3, openness: 0.8, age: 'young' },
            { name: 'Fiica', icon: '👧', authority: 0.2, openness: 0.9, age: 'young' },
        ];

        this.topics = [
            {
                subject: 'Vaccinuri',
                oldView: 'Pe vremea noastra nu erau si eram sanatosi!',
                modernView: 'Studiile arata clar ca vaccinurile salveaza vieti.',
                outcome: 'traditional'
            },
            {
                subject: 'Munca de acasa',
                oldView: 'Trebuie sa mergi la birou ca sa muncesti serios!',
                modernView: 'Productivitatea e aceeasi, ba chiar mai buna uneori.',
                outcome: 'mixed'
            }
        ];
    }

    init() {
        this.container.innerHTML = '';
        this.members = [];
        this.topic = this.topics[Math.floor(Math.random() * this.topics.length)];

        // Topic header
        const topicDiv = document.createElement('div');
        topicDiv.className = 'highlight-box orange';
        topicDiv.style.marginBottom = '1rem';
        topicDiv.innerHTML = `<strong>Subiect la masa:</strong> ${this.topic.subject}`;
        this.container.appendChild(topicDiv);

        // Family members
        const tableDiv = document.createElement('div');
        tableDiv.style.display = 'grid';
        tableDiv.style.gridTemplateColumns = 'repeat(3, 1fr)';
        tableDiv.style.gap = '0.5rem';

        this.familyMembers.forEach(member => {
            const div = document.createElement('div');
            div.className = 'meeting-participant';
            div.style.flexDirection = 'column';
            div.style.textAlign = 'center';
            div.innerHTML = `
                <span style="font-size: 2rem;">${member.icon}</span>
                <div class="participant-name">${member.name}</div>
                <div class="participant-opinion" style="font-size: 0.8rem;">...</div>
            `;
            tableDiv.appendChild(div);
            this.members.push({
                el: div,
                ...member,
                spoken: false,
                opinion: null
            });
        });

        this.container.appendChild(tableDiv);
    }

    start() {
        this.reset();
        this.currentTurn = 0;
        this.interval = setInterval(() => this.nextTurn(), 1800);
    }

    reset() {
        if (this.interval) clearInterval(this.interval);
        this.currentTurn = 0;
        this.init();
    }

    nextTurn() {
        if (this.currentTurn >= this.members.length) {
            clearInterval(this.interval);
            this.showOutcome();
            return;
        }

        const member = this.members[this.currentTurn];
        member.spoken = true;
        member.el.classList.add('speaking');

        // Calculate pressure from elders
        const elderPressure = this.members
            .filter(m => m.spoken && m.age === 'old')
            .reduce((sum, m) => sum + m.authority, 0);

        let opinion;
        if (member.age === 'old') {
            opinion = this.topic.oldView;
            member.opinion = 'traditional';
        } else if (member.openness > elderPressure * 0.5) {
            opinion = this.topic.modernView;
            member.opinion = 'modern';
        } else {
            opinion = 'Poate aveti dreptate...';
            member.opinion = 'conformed';
            member.el.style.opacity = '0.6';
        }

        member.el.querySelector('.participant-opinion').textContent = opinion;
        this.currentTurn++;
    }

    showOutcome() {
        const conformed = this.members.filter(m => m.opinion === 'conformed').length;
        const resultDiv = document.createElement('div');
        resultDiv.className = 'highlight-box';
        resultDiv.style.marginTop = '1rem';
        resultDiv.innerHTML = `
            <strong>Rezultat:</strong> ${conformed} persoane si-au schimbat parerea sub presiunea autoritatii familiale.
            <br><small style="color: var(--text-secondary);">Traditia castiga prin autoritate, nu prin argumente.</small>
        `;
        this.container.appendChild(resultDiv);
    }
}

// ═════════════════════════════════════════════════════════════
// GROUP CHAT SIMULATOR
// ═════════════════════════════════════════════════════════════
class GroupChatSimulator {
    constructor(containerId, statsContainer) {
        this.container = document.getElementById(containerId);
        this.statsContainer = statsContainer;
        this.messages = [];
        this.interval = null;
        this.messageIndex = 0;
        this.stats = { agreements: 0, challenges: 0 };

        this.chatScript = [
            { sender: 'Alex', text: 'Ati vazut stirea? E incredibil!', type: 'starter' },
            { sender: 'Maria', text: 'Da!! Nu pot sa cred!', type: 'agree' },
            { sender: 'Andrei', text: 'Sincer, pare cam exagerata...', type: 'challenge' },
            { sender: 'Alex', text: 'Cum sa fie exagerata?? E peste tot!', type: 'defend' },
            { sender: 'Maria', text: 'Exact, toata lumea vorbeste despre asta', type: 'agree' },
            { sender: 'Ioana', text: 'Eu am verificat si pare fake...', type: 'challenge' },
            { sender: 'Alex', text: 'Lol, tu mereu esti sceptica', type: 'dismiss' },
            { sender: 'Maria', text: 'Da, relaxeaza-te Ioana 😅', type: 'pressure' },
            { sender: 'Andrei', text: 'Ok, poate aveti dreptate...', type: 'conform' },
            { sender: 'Ioana', text: '...', type: 'silence' },
        ];
    }

    init() {
        this.container.innerHTML = '';
        this.messages = [];
        this.messageIndex = 0;
        this.stats = { agreements: 0, challenges: 0 };
    }

    start() {
        this.init();
        this.interval = setInterval(() => this.addMessage(), 1200);
    }

    reset() {
        if (this.interval) clearInterval(this.interval);
        this.init();
        this.updateStats();
    }

    addMessage() {
        if (this.messageIndex >= this.chatScript.length) {
            clearInterval(this.interval);
            this.showAnalysis();
            return;
        }

        const msg = this.chatScript[this.messageIndex];
        const div = document.createElement('div');
        div.className = `chat-message ${msg.sender === 'Tu' ? 'own' : 'other'}`;

        let bgColor = 'rgba(255,255,255,0.1)';
        if (msg.type === 'agree' || msg.type === 'pressure') {
            bgColor = `${COLORS.green}30`;
            this.stats.agreements++;
        } else if (msg.type === 'challenge') {
            bgColor = `${COLORS.orange}30`;
            this.stats.challenges++;
        } else if (msg.type === 'conform') {
            bgColor = `${COLORS.purple}30`;
        }

        div.style.background = bgColor;
        div.innerHTML = `
            <div class="sender">${msg.sender}</div>
            ${msg.text}
        `;

        this.container.appendChild(div);
        this.container.scrollTop = this.container.scrollHeight;

        this.messageIndex++;
        this.updateStats();
    }

    showAnalysis() {
        const div = document.createElement('div');
        div.className = 'highlight-box';
        div.style.marginTop = '1rem';
        div.innerHTML = `
            <strong>Analiza:</strong><br>
            • ${this.stats.agreements} mesaje de conformare<br>
            • ${this.stats.challenges} incercari de a contesta (ignorate)<br>
            • Presiunea sociala a redus la tacere vocile critice
        `;
        this.container.appendChild(div);
    }

    updateStats() {
        if (document.getElementById('chat-agree')) {
            document.getElementById('chat-agree').textContent = this.stats.agreements;
            document.getElementById('chat-challenge').textContent = this.stats.challenges;
        }
    }
}

// ═════════════════════════════════════════════════════════════
// NEIGHBOR RUMOR SIMULATOR
// ═════════════════════════════════════════════════════════════
class NeighborRumorSimulator {
    constructor(containerId, statsContainer) {
        this.container = document.getElementById(containerId);
        this.statsContainer = statsContainer;
        this.apartments = [];
        this.interval = null;
        this.stats = { heard: 0, believed: 0, verified: 0 };
        this.gridCols = 5;
        this.gridRows = 4;
    }

    init() {
        this.container.innerHTML = '';
        this.apartments = [];

        // Create apartment building grid
        const building = document.createElement('div');
        building.style.display = 'grid';
        building.style.gridTemplateColumns = `repeat(${this.gridCols}, 1fr)`;
        building.style.gap = '4px';
        building.style.padding = '1rem';

        for (let i = 0; i < this.gridCols * this.gridRows; i++) {
            const apt = document.createElement('div');
            apt.style.cssText = `
                aspect-ratio: 1;
                background: rgba(255,255,255,0.1);
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                transition: all 0.3s ease;
            `;
            apt.textContent = '🏠';
            building.appendChild(apt);

            this.apartments.push({
                el: apt,
                state: 'unaware',
                skepticism: Math.random()
            });
        }

        this.container.appendChild(building);
    }

    start() {
        this.reset();
        // Start rumor from one apartment
        const starter = Math.floor(Math.random() * this.apartments.length);
        this.spreadTo(starter, true);
        this.interval = setInterval(() => this.spread(), 400);
    }

    reset() {
        if (this.interval) clearInterval(this.interval);
        this.stats = { heard: 0, believed: 0, verified: 0 };
        this.init();
        this.updateStats();
    }

    spreadTo(idx, isSource = false) {
        const apt = this.apartments[idx];
        if (apt.state !== 'unaware') return;

        apt.state = 'heard';
        this.stats.heard++;

        if (isSource || apt.skepticism < 0.3) {
            // Believes without verification
            apt.state = 'believed';
            apt.el.style.background = COLORS.orange;
            apt.el.textContent = '😱';
            this.stats.believed++;
        } else if (apt.skepticism > 0.7) {
            // Verifies and rejects
            apt.state = 'verified';
            apt.el.style.background = COLORS.green;
            apt.el.textContent = '🤔';
            this.stats.verified++;
        } else {
            // Heard but uncertain
            apt.el.style.background = COLORS.yellow + '50';
            apt.el.textContent = '👀';
        }

        this.updateStats();
    }

    spread() {
        const spreading = [];

        this.apartments.forEach((apt, idx) => {
            if (apt.state === 'believed') {
                this.getNeighbors(idx).forEach(n => {
                    if (this.apartments[n].state === 'unaware' && Math.random() < 0.4) {
                        spreading.push(n);
                    }
                });
            }
        });

        if (spreading.length === 0) {
            clearInterval(this.interval);
            return;
        }

        spreading.forEach(idx => this.spreadTo(idx));
    }

    getNeighbors(idx) {
        const neighbors = [];
        const row = Math.floor(idx / this.gridCols);
        const col = idx % this.gridCols;

        if (row > 0) neighbors.push(idx - this.gridCols);
        if (row < this.gridRows - 1) neighbors.push(idx + this.gridCols);
        if (col > 0) neighbors.push(idx - 1);
        if (col < this.gridCols - 1) neighbors.push(idx + 1);

        return neighbors;
    }

    updateStats() {
        if (document.getElementById('rumor-believed')) {
            document.getElementById('rumor-believed').textContent = this.stats.believed;
            document.getElementById('rumor-verified').textContent = this.stats.verified;
            document.getElementById('rumor-pending').textContent =
                this.apartments.length - this.stats.heard;
        }
    }
}

// ═════════════════════════════════════════════════════════════
// CLASSROOM SIMULATOR
// ═════════════════════════════════════════════════════════════
class ClassroomSimulator {
    constructor(containerId, statsContainer) {
        this.container = document.getElementById(containerId);
        this.statsContainer = statsContainer;
        this.students = [];
        this.interval = null;
        this.currentQuestion = 0;
        this.stats = { conformers: 0, independent: 0, correctAnswers: 0 };

        this.rows = 4;
        this.cols = 5;
    }

    init() {
        this.container.innerHTML = '';
        this.students = [];

        // Teacher
        const teacher = document.createElement('div');
        teacher.style.cssText = `
            text-align: center;
            padding: 1rem;
            margin-bottom: 1rem;
            font-size: 2rem;
        `;
        teacher.innerHTML = '👩‍🏫 <span style="font-size: 1rem;">Profesoara</span>';
        this.container.appendChild(teacher);

        // Question
        this.questionDiv = document.createElement('div');
        this.questionDiv.className = 'highlight-box blue';
        this.questionDiv.style.marginBottom = '1rem';
        this.questionDiv.innerHTML = '<strong>Intrebare:</strong> Cat fac 2 + 2?';
        this.container.appendChild(this.questionDiv);

        // Classroom grid
        const classroom = document.createElement('div');
        classroom.style.display = 'grid';
        classroom.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        classroom.style.gap = '8px';

        for (let i = 0; i < this.rows * this.cols; i++) {
            const student = document.createElement('div');
            student.style.cssText = `
                aspect-ratio: 1;
                background: rgba(255,255,255,0.1);
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0.5rem;
                transition: all 0.3s ease;
            `;
            student.innerHTML = `
                <span style="font-size: 1.5rem;">🧑‍🎓</span>
                <span class="answer" style="font-size: 0.9rem; margin-top: 0.3rem;">?</span>
            `;
            classroom.appendChild(student);

            this.students.push({
                el: student,
                knows: Math.random() < 0.8, // 80% know the correct answer
                confidence: Math.random(),
                answered: false,
                answer: null
            });
        }

        this.container.appendChild(classroom);
    }

    start() {
        this.reset();

        // First student answers wrong (popular kid)
        const first = this.students[0];
        first.answered = true;
        first.answer = 5;
        first.el.querySelector('.answer').textContent = '5';
        first.el.style.background = COLORS.orange + '30';
        first.el.querySelector('span').textContent = '😎'; // Cool kid

        this.interval = setInterval(() => this.nextAnswer(), 500);
    }

    reset() {
        if (this.interval) clearInterval(this.interval);
        this.stats = { conformers: 0, independent: 0, correctAnswers: 0 };
        this.init();
        this.updateStats();
    }

    nextAnswer() {
        const unanswered = this.students.filter(s => !s.answered);
        if (unanswered.length === 0) {
            clearInterval(this.interval);
            this.showResult();
            return;
        }

        const student = unanswered[Math.floor(Math.random() * unanswered.length)];
        student.answered = true;

        // Count previous answers
        const wrongAnswers = this.students.filter(s => s.answered && s.answer !== 4).length;
        const rightAnswers = this.students.filter(s => s.answered && s.answer === 4).length;

        // Conformity pressure
        const pressure = wrongAnswers / (wrongAnswers + rightAnswers + 0.1);

        if (student.confidence > 0.6 || pressure < 0.3) {
            // Answers based on knowledge
            student.answer = student.knows ? 4 : 5;
            this.stats.independent++;
        } else {
            // Conforms to majority
            student.answer = pressure > 0.5 ? 5 : 4;
            if (student.knows && student.answer === 5) {
                this.stats.conformers++;
            }
        }

        student.el.querySelector('.answer').textContent = student.answer;
        student.el.style.background = student.answer === 4 ?
            COLORS.green + '30' : COLORS.orange + '30';

        if (student.answer === 4) this.stats.correctAnswers++;
        this.updateStats();
    }

    showResult() {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'highlight-box';
        resultDiv.style.marginTop = '1rem';
        const wrongPercent = Math.round((1 - this.stats.correctAnswers / this.students.length) * 100);
        resultDiv.innerHTML = `
            <strong>Rezultat:</strong> ${wrongPercent}% din clasa a raspuns gresit!<br>
            <small>${this.stats.conformers} elevi stiau raspunsul corect dar s-au conformat grupului.</small>
        `;
        this.container.appendChild(resultDiv);
    }

    updateStats() {
        if (document.getElementById('class-conform')) {
            document.getElementById('class-conform').textContent = this.stats.conformers;
            document.getElementById('class-independent').textContent = this.stats.independent;
            document.getElementById('class-correct').textContent = this.stats.correctAnswers;
        }
    }
}

// ═════════════════════════════════════════════════════════════
// POLITICAL DEBATE SIMULATOR
// ═════════════════════════════════════════════════════════════
class PoliticalDebateSimulator {
    constructor(containerId, statsContainer) {
        this.container = document.getElementById(containerId);
        this.statsContainer = statsContainer;
        this.participants = [];
        this.interval = null;
        this.round = 0;
        this.stats = { leftPolarized: 0, rightPolarized: 0, moderate: 0 };
    }

    init() {
        this.container.innerHTML = '';
        this.participants = [];

        // Create spectrum
        const spectrum = document.createElement('div');
        spectrum.style.cssText = `
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            padding: 0.5rem;
            background: linear-gradient(90deg, ${COLORS.blue}, ${COLORS.purple}, ${COLORS.orange});
            border-radius: 8px;
        `;
        spectrum.innerHTML = `
            <span>← Stanga</span>
            <span>Centru</span>
            <span>Dreapta →</span>
        `;
        this.container.appendChild(spectrum);

        // Participants on a line
        const line = document.createElement('div');
        line.style.cssText = `
            position: relative;
            height: 60px;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
            margin: 1rem 0;
        `;
        line.id = 'political-line';
        this.container.appendChild(line);

        // Create 20 participants
        for (let i = 0; i < 20; i++) {
            const position = 30 + Math.random() * 40; // Start mostly in center
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: absolute;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: ${COLORS.purple};
                top: 50%;
                transform: translateY(-50%);
                left: ${position}%;
                transition: left 0.5s ease;
            `;
            line.appendChild(dot);

            this.participants.push({
                el: dot,
                position: position,
                tribe: null
            });
        }

        // Round counter
        this.roundDiv = document.createElement('div');
        this.roundDiv.className = 'highlight-box';
        this.roundDiv.innerHTML = '<strong>Runda:</strong> 0 - Pozitii initiale (moderate)';
        this.container.appendChild(this.roundDiv);
    }

    start() {
        this.reset();
        this.interval = setInterval(() => this.simulateRound(), 1500);
    }

    reset() {
        if (this.interval) clearInterval(this.interval);
        this.round = 0;
        this.stats = { leftPolarized: 0, rightPolarized: 0, moderate: 0 };
        this.init();
        this.updateStats();
    }

    simulateRound() {
        this.round++;

        if (this.round > 10) {
            clearInterval(this.interval);
            this.showResult();
            return;
        }

        // Each participant moves toward their nearest group
        this.participants.forEach(p => {
            // Find nearby participants
            const nearby = this.participants.filter(other =>
                Math.abs(other.position - p.position) < 20 && other !== p
            );

            if (nearby.length > 0) {
                // Move toward group average, but with polarization bias
                const avg = nearby.reduce((sum, n) => sum + n.position, 0) / nearby.length;
                const pullStrength = 0.1;

                // Add polarization: tendency to move away from center
                const centerDistance = Math.abs(p.position - 50);
                const polarizationPull = (p.position < 50 ? -1 : 1) * 0.05 * this.round;

                p.position += (avg - p.position) * pullStrength + polarizationPull;
                p.position = Math.max(5, Math.min(95, p.position));
                p.el.style.left = p.position + '%';

                // Color based on position
                if (p.position < 35) {
                    p.el.style.background = COLORS.blue;
                    p.tribe = 'left';
                } else if (p.position > 65) {
                    p.el.style.background = COLORS.orange;
                    p.tribe = 'right';
                } else {
                    p.el.style.background = COLORS.purple;
                    p.tribe = 'center';
                }
            }
        });

        this.roundDiv.innerHTML = `<strong>Runda ${this.round}:</strong> Polarizarea creste...`;
        this.updateStats();
    }

    showResult() {
        this.stats.leftPolarized = this.participants.filter(p => p.position < 35).length;
        this.stats.rightPolarized = this.participants.filter(p => p.position > 65).length;
        this.stats.moderate = this.participants.filter(p => p.position >= 35 && p.position <= 65).length;

        this.roundDiv.innerHTML = `
            <strong>Rezultat final:</strong><br>
            Stanga extrema: ${this.stats.leftPolarized} |
            Moderati: ${this.stats.moderate} |
            Dreapta extrema: ${this.stats.rightPolarized}<br>
            <small>Discutia in grup a dus la polarizare, nu la consens.</small>
        `;
        this.updateStats();
    }

    updateStats() {
        if (document.getElementById('pol-left')) {
            document.getElementById('pol-left').textContent =
                this.participants.filter(p => p.position < 35).length;
            document.getElementById('pol-right').textContent =
                this.participants.filter(p => p.position > 65).length;
            document.getElementById('pol-center').textContent =
                this.participants.filter(p => p.position >= 35 && p.position <= 65).length;
        }
    }
}

// ═════════════════════════════════════════════════════════════
// EXPORTS / GLOBAL INSTANCES
// ═════════════════════════════════════════════════════════════

// Global simulator instances (initialized on page load)
let echoSim, viralSim, groupSim, meetingSim, familySim, chatSim, neighborSim, classSim, politicalSim;

// Initialize simulators when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if the containers exist on the page
    if (document.getElementById('echo-feed')) {
        echoSim = new EchoChamberSimulator('echo-feed', true);
    }
    if (document.getElementById('viral-grid')) {
        viralSim = new ViralSpreadSimulator('viral-grid', true);
        viralSim.init();
    }
    if (document.getElementById('group-grid')) {
        groupSim = new GroupDecisionSimulator('group-grid', true);
        groupSim.init();
    }
    if (document.getElementById('meeting-room')) {
        meetingSim = new MeetingSimulator('meeting-room', true);
        meetingSim.init();
    }
    if (document.getElementById('family-table')) {
        familySim = new FamilyDinnerSimulator('family-table', true);
        familySim.init();
    }
    if (document.getElementById('chat-container')) {
        chatSim = new GroupChatSimulator('chat-container', true);
    }
    if (document.getElementById('neighbor-building')) {
        neighborSim = new NeighborRumorSimulator('neighbor-building', true);
        neighborSim.init();
    }
    if (document.getElementById('classroom')) {
        classSim = new ClassroomSimulator('classroom', true);
        classSim.init();
    }
    if (document.getElementById('political-arena')) {
        politicalSim = new PoliticalDebateSimulator('political-arena', true);
        politicalSim.init();
    }
});

// Simulator control functions (called from HTML buttons)
function startEchoSim() { if (echoSim) echoSim.start(); }
function resetEchoSim() { if (echoSim) echoSim.reset(); }

function startViralSim() { if (viralSim) viralSim.start(); }
function resetViralSim() { if (viralSim) viralSim.reset(); }

function startGroupSim() { if (groupSim) groupSim.start(); }
function resetGroupSim() { if (groupSim) groupSim.reset(); }

function startMeetingSim() { if (meetingSim) meetingSim.start(); }
function resetMeetingSim() { if (meetingSim) meetingSim.reset(); }

function startFamilySim() { if (familySim) familySim.start(); }
function resetFamilySim() { if (familySim) familySim.reset(); }

function startChatSim() { if (chatSim) chatSim.start(); }
function resetChatSim() { if (chatSim) chatSim.reset(); }

function startNeighborSim() { if (neighborSim) neighborSim.start(); }
function resetNeighborSim() { if (neighborSim) neighborSim.reset(); }

function startClassSim() { if (classSim) classSim.start(); }
function resetClassSim() { if (classSim) classSim.reset(); }

function startPoliticalSim() { if (politicalSim) politicalSim.start(); }
function resetPoliticalSim() { if (politicalSim) politicalSim.reset(); }
