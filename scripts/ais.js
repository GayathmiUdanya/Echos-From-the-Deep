let currentBg = 'assets/bg_low.png';
let prevLevel = 'none';
const cardData = {
    1: { pts: 3 },
    2: { pts: 4 },
    3: { pts: 2 },
    4: { pts: 3 },
    5: { pts: 3 },
    6: { pts: 2 }
};
const selected = {};
function spawnRipple(card, e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 1.2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x - size / 2}px;top:${y - size / 2}px;`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}
function spawnToast(pts, adding, cardEl) {
    const rect = cardEl.getBoundingClientRect();
    const toast = document.createElement('div');
    toast.className = 'pts-toast' + (adding ? '' : ' neg');
    toast.textContent = (adding ? '+' : '−') + pts + ' pts';
    toast.style.cssText = `left:${rect.left + rect.width / 2 - 30}px;top:${rect.top + rect.height / 2 - 20}px;`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1000);
}
function toggle(id, e) {
    const card = document.getElementById('card' + id);
    if (e) spawnRipple(card, e);
    const adding = !selected[id];
    if (selected[id]) {
        selected[id] = false;
        card.classList.remove('selected');
    } else {
        selected[id] = true;
        card.classList.add('selected');
    }
    spawnToast(cardData[id].pts, adding, card);
    updateFeedback();
}
function calcScore() {
    let total = 0;
    for (const id in selected) {
        if (selected[id]) total += cardData[id].pts;
    }
    return total;
}
function countSelected() {
    return Object.values(selected).filter(Boolean).length;
}
const backgrounds = {
    none: 'assets/bg_low.png',
    low: 'assets/bg_low.png',
    mid: 'assets/bg_mid.png',
    high: 'assets/bg_high.png'
};
const messages = {
    none: {
        badge: 'none',
        label: 'Awaiting Your Choices',
        message: 'The ocean is listening. Select actions below to begin.',
        ocean: 'The ocean is dark and heavy with waste. It needs your help.',
        icon: '🌊'
    },
    low: {
        badge: 'low',
        label: 'Low Impact',
        message: 'Every action counts — you\'ve made a start. The ocean is still struggling, but your choices are the first ripple of change.',
        ocean: 'The storm is heavy. Pollution covers the shore. But somewhere, something stirs.',
        icon: '🌧️'
    },
    mid: {
        badge: 'mid',
        label: 'Medium Impact',
        message: 'You\'re making a real difference. The tide is beginning to turn — your commitment is helping the ocean find its breath again.',
        ocean: 'The sky is clearing. The water is calmer. The ocean remembers what it once was.',
        icon: '🌅'
    },
    high: {
        badge: 'high',
        label: 'High Impact',
        message: 'Ocean hero. Your dedication is extraordinary. The dolphins are returning, the reefs are breathing — this is what the ocean looks like when we choose to care.',
        ocean: 'Crystal water. Dolphins leaping. Coral alive with colour. This is what you saved.',
        icon: '🐬'
    }
};
function updateFeedback() {
    const score = calcScore();
    const count = countSelected();

    let level;
    if (score === 0) level = 'none';
    else if (score <= 5) level = 'low';
    else if (score <= 11) level = 'mid';
    else level = 'high';

    const data = messages[level];
    const scoreEl = document.getElementById('score');
    scoreEl.classList.remove('pop');
    void scoreEl.offsetWidth; // reflow
    scoreEl.classList.add('pop');
    scoreEl.textContent = score;
    scoreEl.className = 'score pop' + (level !== 'none' ? ' impact-' + level : '');
    const pct = Math.min((score / 17) * 100, 100);
    document.getElementById('progressFill').style.width = pct + '%';
    const badge = document.getElementById('level');
    badge.textContent = data.label;
    badge.className = 'impact-level-badge ' + (level === 'none' ? 'none' : level);
    if (level !== prevLevel) {
        badge.classList.add('level-up');
        setTimeout(() => badge.classList.remove('level-up'), 600);
    }
    const msgEl = document.getElementById('message');
    if (level !== prevLevel) {
        msgEl.style.opacity = '0';
        setTimeout(() => { msgEl.textContent = data.message; msgEl.style.opacity = '1'; }, 220);
    } else {
        msgEl.textContent = data.message;
    }
    document.getElementById('selcount').textContent = count;
    document.getElementById('oceanI').textContent = data.icon;
    document.getElementById('oceant').textContent = data.ocean;
    const oceanState = document.getElementById('oceanState');
    oceanState.className = 'oceanBox' + (level !== 'none' ? ' impact-' + level : '');
    const panel = document.getElementById('feed');
    panel.className = 'feed' + (level !== 'none' ? ' impact-' + level : '');
    const newSrc = backgrounds[level];
    if (currentBg !== newSrc) {
        currentBg = newSrc;
        const bg = document.getElementById('sceneBg');
        bg.style.opacity = '0';
        setTimeout(() => {
            bg.src = newSrc;
            bg.style.opacity = '1';
        }, 500);
    }

    prevLevel = level;
}
function resetall() {
    for (const id in cardData) {
        selected[id] = false;
        const card = document.getElementById('card' + id);
        card.classList.remove('selected');
    }
    updateFeedback();
}
updateFeedback();