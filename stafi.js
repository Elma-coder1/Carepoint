// Funksioni për efektin e klikimit në kartat e stafit
document.addEventListener('DOMContentLoaded', function() {
    const staffCards = document.querySelectorAll('.staff-card');
    
    staffCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Shtojmë klasën 'clicked' për efekt
            this.classList.add('clicked');
            
            // Heqim klasën pas 300ms
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
});