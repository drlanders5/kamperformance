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

/* ==========================================
   Reading Progress Bar
========================================== */

const readingProgress = document.querySelector(".reading-progress");

const updateReadingProgress = () => {
    if (!readingProgress) return;

    const scrollTop = window.scrollY;
    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / documentHeight) * 100;

    readingProgress.style.width = `${progress}%`;
};

window.addEventListener("scroll", updateReadingProgress);
window.addEventListener("load", updateReadingProgress);

/* ==========================================
   Automatic Article Table of Contents
========================================== */

const tocList = document.querySelector("#article-toc-list");
const articleHeadings = document.querySelectorAll(".article-section");

if (tocList && articleHeadings.length) {
    articleHeadings.forEach((heading, index) => {
        const headingId = `section-${index + 1}`;

        heading.id = headingId;

        tocList.innerHTML += `
            <li>
                <a href="#${headingId}">${heading.textContent}</a>
            </li>
        `;
    });
}

/* ==========================================
   Dynamic Previous / Next Guide Navigation
========================================== */

const guideArticle = document.querySelector(".guide-article");

if (guideArticle && typeof guides !== "undefined") {
    const currentGuideId = guideArticle.dataset.guideId;
    const currentGuideIndex = guides.findIndex((guide) => guide.id === currentGuideId);

    if (currentGuideIndex !== -1) {
        const previousGuide = guides[currentGuideIndex - 1];
        const nextGuide = guides[currentGuideIndex + 1];

        const previousLink = document.querySelector(".guide-nav-prev");
        const nextLink = document.querySelector(".guide-nav-next");

        if (previousLink && previousGuide) {
            previousLink.href = previousGuide.url;
            previousLink.textContent = `← ${previousGuide.title}`;
        }

        if (nextLink && nextGuide) {
            nextLink.href = nextGuide.url;
            nextLink.textContent = `${nextGuide.title} →`;
        }

        if (nextLink && !nextGuide) {
            nextLink.style.display = "none";
        }
    }
}

/* ==========================================
   Active Article Table of Contents
========================================== */

const tocLinks = document.querySelectorAll(".article-toc a");

const updateActiveTocLink = () => {
    if (!tocLinks.length || !articleHeadings.length) return;

    let activeHeading = articleHeadings[0];

    articleHeadings.forEach((heading) => {
        const headingTop = heading.getBoundingClientRect().top;

        if (headingTop <= 160) {
            activeHeading = heading;
        }
    });

    tocLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${activeHeading.id}`) {
            link.classList.add("active");
        }
    });
};

window.addEventListener("scroll", updateActiveTocLink);
window.addEventListener("load", updateActiveTocLink);

/* ==========================================
   Automatic Related Guides
========================================== */

const relatedGuideContainer = document.querySelector(".related-guide-list");

if (
    relatedGuideContainer &&
    guideArticle &&
    typeof guides !== "undefined"
) {
    const currentGuideId = guideArticle.dataset.guideId;

    const currentGuide = guides.find(
        guide => guide.id === currentGuideId
    );

    if (currentGuide) {

        const relatedGuides = guides
            .filter(guide =>
                guide.id !== currentGuide.id &&
                guide.category === currentGuide.category &&
                guide.status === "published"
            )
            .slice(0, 3);

        if (relatedGuides.length === 0) {

            relatedGuideContainer.innerHTML = `
                <p>No related guides yet.</p>
            `;

        } else {

            relatedGuideContainer.innerHTML = relatedGuides.map(guide => `
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

        }

    }
}

/* ==========================================
   Dynamic Article Metadata
========================================== */

const guideMetaElement = document.querySelector("[data-guide-meta]");

if (
    guideMetaElement &&
    guideArticle &&
    typeof guides !== "undefined"
) {
    const currentGuideId = guideArticle.dataset.guideId;

    const currentGuide = guides.find(
        (guide) => guide.id === currentGuideId
    );

    if (currentGuide) {
        guideMetaElement.textContent =
            `${currentGuide.category.toUpperCase()} • ${currentGuide.readTime} MIN READ`;
    }
}
