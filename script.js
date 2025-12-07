// Efekt i lezetshëm kur klikon në një shërbim
document.querySelectorAll(".service-link").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); // mos hap direkt faqen

        const card = this.querySelector(".service-card");

        // hiqe klasën nga kartat tjera
        document.querySelectorAll(".service-card").forEach(c => c.classList.remove("clicked"));

        // shto animacionin te karta e klikuar
        card.classList.add("clicked");

        // pas 300ms (0.3 sekonda) hap faqen
        setTimeout(() => {
            window.location.href = this.href;
        }, 300);
    });
});

console.log("Sherbimet mjekesore - JS animacion aktiv");

