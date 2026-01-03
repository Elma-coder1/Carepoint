document.addEventListener("DOMContentLoaded", function () {
    // SCROLL I BUTË NGA "SHIKO MË POSHTË"
    const scrollLink = document.querySelector(".scroll-link");

    if (scrollLink) {
        scrollLink.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const top = target.offsetTop - 80;
                    window.scrollTo({ top, behavior: "smooth" });
                }
            }
        });
    }

    // ANIMACIONET FADE-IN
    const fadeElements = document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        fadeElements.forEach((el) => observer.observe(el));
    } else {
        fadeElements.forEach((el) => el.classList.add("in-view"));
    }

    // VALIDIMI I FORMËS
    const form = document.getElementById("contact-form");
    const messageBox = document.getElementById("form-message");

    if (form && messageBox) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const phone = form.phone.value.trim();
            const message = form.message.value.trim();

            messageBox.textContent = "";
            messageBox.classList.remove("error", "success");

            if (!name || !email || !phone || !message) {
                messageBox.textContent = "Ju lutem plotësoni fushat e detyrueshme.";
                messageBox.classList.add("error");
                return;
            }

            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
                messageBox.textContent = "Ju lutem shkruani një adresë të vlefshme emaili.";
                messageBox.classList.add("error");
                return;
            }

            messageBox.textContent =
                "Faleminderit për mesazhin. Ekipi i CarePoint do t’ju kontaktojë së shpejti.";
            messageBox.classList.add("success");

            form.reset();
        });
    }

    // OVERLAY I HARTËS – LARGOJE KUR PREKET
    const mapHint = document.getElementById("map-hint");

    function hideMapHint() {
        if (!mapHint) return;
        mapHint.classList.add("hidden");
    }

    if (mapHint) {
        // hiqet kur klikon
        mapHint.addEventListener("click", hideMapHint);

        // hiqet edhe në scroll mbi overlay
        mapHint.addEventListener(
            "wheel",
            () => {
                hideMapHint();
            },
            { passive: true }
        );
    }
});

