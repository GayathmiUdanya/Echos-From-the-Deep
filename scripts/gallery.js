
// Select elements
const cards = document.querySelectorAll('.card');
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.getElementById('closeModal');
const modalTarget = document.getElementById('modalTarget');

// Hover Interaction Logic (JavaScript handled)
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = "#49aec0";
        card.style.transform = "translateY(-10px)";
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = "#1f2d42";
        card.style.transform = "translateY(0)";
    });

    // Click-to-expand Interaction
    card.addEventListener('click', () => {
        const imgSource = card.querySelector('img').src;
        const altText = card.querySelector('img').alt;
        const titleText = card.querySelector('h2').innerText;
        const descriptionText = card.querySelector('.card-description').innerText;

        // Populate the extended view
        modalImg.src = imgSource;
        modalImg.alt = altText;
        modalTitle.innerText = titleText;
        modalDesc.innerText = descriptionText;

        modal.style.display = 'flex';
    });
});

// Close/Collapse logic
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    // Reset styles when closing
    modalTarget.classList.remove('alt-font-active', 'alt-color-active');
});

// Click outside modal to close
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// User Customization 
document.getElementById('btnFont').addEventListener('click', () => {
    modalTarget.classList.toggle('alt-font-active');
});

document.getElementById('btnColor').addEventListener('click', () => {
    modalTarget.classList.toggle('alt-color-active');
});

