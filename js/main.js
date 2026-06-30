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
    if (!siteHeader) return;

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

if (guideCountElements.length && typeof getGuideCount === "function") {
    guideCountElements.forEach((element) => {
        const category = element.dataset.category;
        const count = getGuideCount(category);

        element.textContent =
            `${count} ${count === 1 ? "Guide" : "Guides"} Available`;
    });
}

/* ==========================================
   Dynamic Guide Lists
========================================== */

const guideLists = document.querySelectorAll(".guide-list");

if (guideLists.length && typeof guides !== "undefined") {
    guideLists.forEach((list) => {
        const category = list.dataset.category;

        const matchingGuides = guides.filter((guide) =>
            guide.category === category &&
            guide.status === "published"
        );

        if (matchingGuides.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    Guides are being added to this category.
                </div>
            `;
            return;
        }

        list.innerHTML = matchingGuides.map((guide) => `
            <a href="${guide.url}" class="guide-card">
                <p class="guide-topic">● ${guide.topic}</p>

                <h3>${guide.title}</h3>

                <p>${guide.summary}</p>

                <div class="guide-meta">
                    <span>${guide.readTime} min read</span>
                    <strong>Read Guide →</strong>
                </div>
            </a>
        `).join("");
    });
}
