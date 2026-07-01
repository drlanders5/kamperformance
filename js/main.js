/* ==========================================
   Scroll Reveal
========================================== */

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

/* ==========================================
   Mobile Navigation
========================================== */

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navOverlay = document.querySelector(".nav-overlay");

const closeMobileNav = () => {
    if (!navToggle || !navLinks) return;

    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");

    if (navOverlay) {
        navOverlay.classList.remove("open");
    }
};

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        navToggle.classList.toggle("active", isOpen);
        navToggle.setAttribute("aria-expanded", isOpen);

        if (navOverlay) {
            navOverlay.classList.toggle("open", isOpen);
        }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileNav);
    });

    if (navOverlay) {
        navOverlay.addEventListener("click", closeMobileNav);
    }
}

/* ==========================================
   Sticky Header
========================================== */

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
   URL / Guide / Category Lookup
========================================== */

const guideArticle = document.querySelector(".guide-article");
const urlParams = new URLSearchParams(window.location.search);
const metaDescription = document.querySelector("meta[name='description']");

const currentGuideId =
    guideArticle?.dataset.guideId ||
    urlParams.get("id");

const currentGuide =
    typeof guides !== "undefined" && currentGuideId
        ? guides.find((guide) => guide.id === currentGuideId)
        : null;

const currentGuideIndex =
    typeof guides !== "undefined" && currentGuideId
        ? guides.findIndex((guide) => guide.id === currentGuideId)
        : -1;

const currentCategoryId = urlParams.get("id");

const currentCategory =
    typeof guideCategories !== "undefined" && currentCategoryId
        ? guideCategories.find((category) => category.id === currentCategoryId)
        : null;

const categoryPageMap = {
    foundations: "category.html?id=foundations",
    pain: "category.html?id=pain",
    mobility: "category.html?id=mobility",
    performance: "category.html?id=performance",
    exercises: "category.html?id=exercises",
    research: "category.html?id=research"
};

/* ==========================================
   Dynamic Category Page
========================================== */

const categoryEyebrowElement = document.querySelector("[data-category-eyebrow]");
const categoryTitleElement = document.querySelector("[data-category-title]");
const categoryDescriptionElement = document.querySelector("[data-category-description]");
const categoryTopicsElement = document.querySelector("[data-category-topics]");
const categoryGuideHeadingElement = document.querySelector("[data-category-guide-heading]");
const categoryGuideList = document.querySelector(".guide-list[data-category='']");

if (currentCategory) {
    if (categoryEyebrowElement) {
        categoryEyebrowElement.textContent = currentCategory.title.toUpperCase();
    }

    if (categoryTitleElement) {
        categoryTitleElement.textContent = currentCategory.heroTitle;
    }

    if (categoryDescriptionElement) {
        categoryDescriptionElement.textContent = currentCategory.description;
    }

    if (categoryTopicsElement) {
        categoryTopicsElement.innerHTML = currentCategory.topics
            .map((topic) => `<li>${topic}</li>`)
            .join("");
    }

    if (categoryGuideHeadingElement) {
        categoryGuideHeadingElement.textContent = `${currentCategory.title} Guides`;
    }

    if (categoryGuideList) {
        categoryGuideList.dataset.category = currentCategory.id;
    }

    document.title = `${currentCategory.title} | KamPerformance`;

    if (metaDescription) {
        metaDescription.setAttribute("content", currentCategory.description);
    }
}

/* ==========================================
   Dynamic Library Category Cards
========================================== */

const libraryCategoryContainer = document.querySelector("[data-library-categories]");

if (
    libraryCategoryContainer &&
    typeof guideCategories !== "undefined"
) {
    libraryCategoryContainer.innerHTML = guideCategories.map((category) => {
        const count = getGuideCount(category.id);

        return `
            <a href="${category.url}" class="knowledge-card">
                <p class="library-category">${category.title}</p>

                <h2>${category.cardTitle}</h2>

                <p>
                    ${category.cardDescription}
                </p>

                <p class="guide-count" data-category="${category.id}">
                    ${count} ${count === 1 ? "Guide" : "Guides"} Available
                </p>

                <span>Explore Guides →</span>
            </a>
        `;
    }).join("");
}

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

    const progress = documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    readingProgress.style.width = `${progress}%`;
};

window.addEventListener("scroll", updateReadingProgress);
window.addEventListener("load", updateReadingProgress);

/* ==========================================
   Article Table of Contents
========================================== */

const buildArticleToc = () => {
    const tocList = document.querySelector("#article-toc-list");
    const articleHeadings = document.querySelectorAll(".article-section");

    if (!tocList || !articleHeadings.length) return;

    tocList.innerHTML = "";

    articleHeadings.forEach((heading, index) => {
        const headingId = `section-${index + 1}`;

        heading.id = headingId;

        tocList.innerHTML += `
            <li>
                <a href="#${headingId}">${heading.textContent.trim()}</a>
            </li>
        `;
    });
};

const updateActiveTocLink = () => {
    const tocLinks = document.querySelectorAll(".article-toc a");
    const articleHeadings = document.querySelectorAll(".article-section");

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
   Dynamic Article Body
========================================== */

const articleContentContainer = document.querySelector("#article-content");

const loadArticleContent = () => {
    if (
        articleContentContainer &&
        typeof window.articleContent !== "undefined"
    ) {
        articleContentContainer.innerHTML = window.articleContent;

        buildArticleToc();
        updateActiveTocLink();
        updateReadingProgress();
    }
};

if (currentGuideId && guideArticle) {
    const articleScript = document.createElement("script");

    articleScript.src = `articles/${currentGuideId}.js`;
    articleScript.onload = loadArticleContent;

    document.body.appendChild(articleScript);
}

/* ==========================================
   Dynamic Previous / Next Guide Navigation
========================================== */

if (currentGuide && currentGuideIndex !== -1 && typeof guides !== "undefined") {
    const previousGuide = guides[currentGuideIndex - 1];
    const nextGuide = guides[currentGuideIndex + 1];

    const previousLink = document.querySelector(".guide-nav-prev");
    const nextLink = document.querySelector(".guide-nav-next");

    if (previousLink && previousGuide) {
        previousLink.href = previousGuide.url;
        previousLink.textContent = `← ${previousGuide.title}`;
    }

    if (previousLink && !previousGuide) {
        previousLink.href =
            categoryPageMap[currentGuide.category] || "library.html";

        previousLink.textContent =
            `← Back to ${currentGuide.category.charAt(0).toUpperCase() + currentGuide.category.slice(1)}`;
    }

    if (nextLink && nextGuide) {
        nextLink.href = nextGuide.url;
        nextLink.textContent = `${nextGuide.title} →`;
    }

    if (nextLink && !nextGuide) {
        nextLink.style.display = "none";
    }
}

/* ==========================================
   Automatic Related Guides
========================================== */

const relatedGuideContainer = document.querySelector(".related-guide-list");

if (relatedGuideContainer && currentGuide && typeof guides !== "undefined") {
    const relatedGuides = guides
        .filter((guide) =>
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
        relatedGuideContainer.innerHTML = relatedGuides.map((guide) => `
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

/* ==========================================
   Dynamic Article Metadata
========================================== */

const guideMetaElement = document.querySelector("[data-guide-meta]");
const readTimeElement = document.querySelector("[data-read-time]");
const updatedDateElement = document.querySelector("[data-updated-date]");
const guideTitleElements = document.querySelectorAll("[data-guide-title]");
const guideSummaryElement = document.querySelector("[data-guide-summary]");
const guideCategoryElement = document.querySelector("[data-guide-category]");
const guideCategoryLink = document.querySelector("[data-guide-category-link]");

if (currentGuide) {
    const categoryLabel =
        currentGuide.category.charAt(0).toUpperCase() +
        currentGuide.category.slice(1);

    if (guideMetaElement) {
        guideMetaElement.textContent =
            `${currentGuide.category.toUpperCase()} • ${currentGuide.readTime} MIN READ`;
    }

    if (readTimeElement) {
        readTimeElement.textContent = `${currentGuide.readTime} min`;
    }

    if (updatedDateElement) {
        updatedDateElement.textContent = new Date(currentGuide.updated)
            .toLocaleDateString("en-US", {
                month: "long",
                year: "numeric"
            });
    }

    guideTitleElements.forEach((element) => {
        element.textContent = currentGuide.title;
    });

    if (guideSummaryElement) {
        guideSummaryElement.textContent = currentGuide.summary;
    }

    if (guideCategoryElement) {
        guideCategoryElement.textContent = currentGuide.category.toUpperCase();
    }

    if (guideCategoryLink) {
        guideCategoryLink.textContent = categoryLabel;
        guideCategoryLink.href =
            categoryPageMap[currentGuide.category] || "library.html";
    }

    document.title = `${currentGuide.title} | KamPerformance`;

   if (metaDescription) {
    metaDescription.setAttribute("content", currentGuide.summary);
   }
}
   
/* ==========================================
   Active Navigation Link
========================================== */

const currentPath = window.location.pathname.split("/").pop() || "index.html";
const navLinkElements = document.querySelectorAll(".nav-links a");

navLinkElements.forEach((link) => {
    const linkPath = link.getAttribute("href");

    if (linkPath === currentPath) {
        link.classList.add("active");
    }

    if (
        currentPath === "category.html" ||
        currentPath === "article.html"
    ) {
        if (linkPath === "library.html") {
            link.classList.add("active");
        }
    }
});

/* ==========================================
   Scroll To Top Button
========================================== */

const scrollTopButton = document.querySelector(".scroll-top");

if (scrollTopButton) {

    const updateScrollTopButton = () => {
        if (window.scrollY > 500) {
            scrollTopButton.classList.add("visible");
        } else {
            scrollTopButton.classList.remove("visible");
        }
    };

    window.addEventListener("scroll", updateScrollTopButton);
    window.addEventListener("load", updateScrollTopButton);

    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

}
