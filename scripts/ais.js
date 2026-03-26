let currentBg = 'assets/bg_low.png'; // default background
let prevLevel = 'none'; // to track level changes for animation
const cardData = { // assigning point values to each card
    1: { pts: 3 },
    2: { pts: 4 },
    3: { pts: 2 },
    4: { pts: 3 },
    5: { pts: 3 }, 
    6: { pts: 2 }
}; 
const selected = {}; // tracking selected cards
function spawnRipple(card, e) { // creates a ripple effect on card click
    const rect = card.getBoundingClientRect(); // get card position and size
    const x = e.clientX - rect.left; // calculate click position relative to card
    const y = e.clientY - rect.top; // calculate click position relative to card
    const size = Math.max(rect.width, rect.height) * 1.2; // size of ripple based on card size
    const ripple = document.createElement('span'); // create ripple element
    ripple.className = 'ripple'; // assign ripple class for styling
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x - size / 2}px;top:${y - size / 2}px;`; // position and size ripple
    card.appendChild(ripple); // add ripple to card
    setTimeout(() => ripple.remove(), 600); // remove ripple after animation
}
function spawnToast(pts, adding, cardEl) { // creates a toast notification for points added or removed9
    const rect = cardEl.getBoundingClientRect(); // get card position and size for toast placement
    const toast = document.createElement('div');// create toast element
    toast.className = 'pts-toast' + (adding ? '' : ' neg'); // assign toast class and negative class if points are being removed
    toast.textContent = (adding ? '+' : '−') + pts + ' pts'; // set toast text to show points added or removed
    toast.style.cssText = `left:${rect.left + rect.width / 2 - 30}px;top:${rect.top + rect.height / 2 - 20}px;`;// position toast near the card
    document.body.appendChild(toast); // add toast to the document
    setTimeout(() => toast.remove(), 1000); // remove toast after animation
}
function toggle(id, e) { // handles card selection and updates feedback
    const card = document.getElementById('card' + id); // get card element by id
    if (e) spawnRipple(card, e); // trigger ripple effect on click
    const adding = !selected[id]; // determine if points are being added or removed based on current selection state
    if (selected[id]) { // if card is currently selected, deselect it and mark points as being removed
        selected[id] = false;
        card.classList.remove('selected');
    } else {
        selected[id] = true;
        card.classList.add('selected');
    }
    spawnToast(cardData[id].pts, adding, card); // show toast notification for points change
    updateFeedback(); // update feedback panel based on new selection state
}
function calcScore() { // calculates total score based on selected cards
    let total = 0; // initialize total score
    for (const id in selected) { // iterate through selected cards
        if (selected[id]) total += cardData[id].pts; // add points for each selected card
    }
    return total; // return total score
}
function countSelected() { // counts how many cards are currently selected
    return Object.values(selected).filter(Boolean).length; // count and return number of true values in selected object
}
const backgrounds = { // mapping of impact levels to background images
    none: 'assets/bg_low.png',
    low: 'assets/bg_low.png',
    mid: 'assets/bg_mid.png',
    high: 'assets/bg_high.png'
};
const messages = {// feedback messages and labels for each impact level
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
function updateFeedback() { // updates the feedback panel based on current score and selection
    const score = calcScore(); // calculate current score based on selected cards
    const count = countSelected(); // count how many cards are currently selected

    let level;
    if (score === 0) level = 'none'; // determine impact level based on score thresholds
    else if (score <= 5) level = 'low';
    else if (score <= 11) level = 'mid';
    else level = 'high';

    const data = messages[level]; // get feedback data for current impact level
    const scoreEl = document.getElementById('score'); // get score element to update points display
    scoreEl.classList.remove('pop'); // reset pop animation
    void scoreEl.offsetWidth; // reflow
    scoreEl.classList.add('pop');// trigger pop animation for score change
    scoreEl.textContent = score; // update score display with current points
    scoreEl.className = 'score pop' + (level !== 'none' ? ' impact-' + level : ''); // update score class for color change based on impact level
    const pct = Math.min((score / 17) * 100, 100); // calculate percentage for progress bar (assuming 17 is max score)
    document.getElementById('progressFill').style.width = pct + '%'; // update progress bar fill based on score percentage
    const badge = document.getElementById('level'); // get badge element to update impact level display
    badge.textContent = data.label; // update badge text to show current impact level label
    badge.className = 'impact-level-badge ' + (level === 'none' ? 'none' : level); // update badge class for styling based on impact level
    if (level !== prevLevel) { // if impact level has changed, trigger level-up animation on badge
        badge.classList.add('level-up');
        setTimeout(() => badge.classList.remove('level-up'), 600);
    }
    const msgEl = document.getElementById('message'); // get message element to update feedback message
    if (level !== prevLevel) { // if impact level has changed, fade out old message and fade in new message for smoother transition
        msgEl.style.opacity = '0';
        setTimeout(() => { msgEl.textContent = data.message; msgEl.style.opacity = '1'; }, 220); // delay message update to allow fade-out before changing text and fading back in
    } else {
        msgEl.textContent = data.message;// if level hasn't changed, just update message text without animation
    }
    document.getElementById('selcount').textContent = count; // update selected count display
    document.getElementById('oceanI').textContent = data.icon;  // update ocean icon based on impact level
    document.getElementById('oceant').textContent = data.ocean;  // update ocean description text based on impact level
    const oceanState = document.getElementById('oceanState'); // get ocean state element to update background and styling based on impact level
    oceanState.className = 'oceanBox' + (level !== 'none' ? ' impact-' + level : ''); // update ocean state class for styling
    const panel = document.getElementById('feed'); // get feedback panel element to update background and styling based on impact level
    panel.className = 'feed' + (level !== 'none' ? ' impact-' + level : ''); // update feedback panel class for styling
    const newSrc = backgrounds[level];// get new background source based on impact level
    if (currentBg !== newSrc) { // if background has changed, update background image with fade transition
        currentBg = newSrc;
        const bg = document.getElementById('sceneBg'); // get background image element to update source
        bg.style.opacity = '0'; // fade out current background before changing source
        setTimeout(() => {
            bg.src = newSrc; // change background image source
            bg.style.opacity = '1'; // fade in new background after changing source
        }, 500);
    }

    prevLevel = level; // update previous level to current level for next update comparison
}
function resetall() { // resets all selections and updates feedback to initial state
    for (const id in cardData) {
        selected[id] = false;
        const card = document.getElementById('card' + id); //  get card element by id to remove selected class
        card.classList.remove('selected'); // deselect card visually
    }
    updateFeedback(); // update feedback panel to reflect reset state
}
updateFeedback(); // initial feedback update to set everything to default state on page load