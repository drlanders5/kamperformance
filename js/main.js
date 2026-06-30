const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2,
        rootMargin: "0px 0px -60px 0px"
    }
);

document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
});

const siteHeader = document.querySelector(".site-header");

const updateHeaderOnScroll = () => {
    if (window.scrollY > 80) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }
};

window.addEventListener("scroll", updateHeaderOnScroll);
window.addEventListener("load", updateHeaderOnScroll);

/* ==========================================
   Guide Counter
========================================== */

const guideCountElements = document.querySelectorAll(".guide-count");

guideCountElements.forEach(element => {

    const category = element.dataset.category;

    const count = getGuideCount(category);

    element.textContent =
        `${count} ${count === 1 ? "Guide" : "Guides"} Available`;

});
