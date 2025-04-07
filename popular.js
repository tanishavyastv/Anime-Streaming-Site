const showMoreBtn = document.getElementById('showMoreBtn');
const hiddenCards = document.querySelectorAll('.extra-card');

showMoreBtn.addEventListener('click', () => {
    hiddenCards.forEach(card => card.classList.remove('d-none'));
    showMoreBtn.style.display = 'none'; // hide button after click
});