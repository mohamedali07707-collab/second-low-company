document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
        ".hero-copy, .hero-image-wrap, .service-card, .about-copy, " +
        ".about-image-wrap, .inner-hero, .service-item, .about-page-copy, " +
        ".about-page-image, .story-layout > *, .value-item, " +
        ".contact-page-intro, .contact-page-content > *, .contact-content"
    );

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");
        element.style.setProperty(
            "--reveal-delay",
            `${(index % 4) * 90}ms`
        );
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navbar a[href]").forEach((link) => {
        const linkPage = new URL(link.href).pathname.split("/").pop();

        if (linkPage === currentPage) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    const footerText = document.querySelector(".site-footer p");

    if (footerText) {
        footerText.textContent = footerText.textContent.replace(
            /\b20\d{2}\b/,
            new Date().getFullYear()
        );
    }

    const header = document.querySelector(".site-header");

    if (header) {
        const updateHeader = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 12);
        };

        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }
});لا 