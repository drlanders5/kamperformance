/* ==================================================
   KamPerformance Guide Database
   ================================================ */

const guides = [

       {
        id: "movement-education-foundations",
        title: "Movement Education Foundations",
        category: "foundations",
        topic: "Movement Science",

        summary:
            "Learn the core ideas behind movement, pain, recovery, and why understanding comes before intervention.",

        difficulty: "Beginner",
        readTime: 6,

        featured: true,
        status: "published",

        tags: [
            "movement",
            "education",
            "foundations"
        ],

        author: "KamPerformance",

        published: "2026-01-01",
        updated: "2026-01-01",

        url: "#"
    },
   
    {
        id: "understanding-pain",
        title: "Understanding Pain",
        category: "pain",
        topic: "Pain Science",

        summary:
            "Learn what pain is, what influences it, and why movement still matters.",

        difficulty: "Beginner",
        readTime: 8,

        featured: true,
        status: "published",

        tags: [
            "pain",
            "pain science",
            "education"
        ],

        author: "KamPerformance",

        published: "2026-01-01",
        updated: "2026-01-01",

        url: "#"
    },

    {
        id: "intro-to-mobility",
        title: "Introduction to Mobility",
        category: "mobility",
        topic: "Movement Quality",

        summary:
            "Understand mobility, movement quality, and why both matter for long-term health.",

        difficulty: "Beginner",
        readTime: 6,

        featured: true,
        status: "published",

        tags: [
            "mobility",
            "movement"
        ],

        author: "KamPerformance",

        published: "2026-01-01",
        updated: "2026-01-01",

        url: "#"
    },

    {
        id: "training-smarter",
        title: "Training Smarter",
        category: "performance",
        topic: "Strength & Performance",

        summary:
            "Evidence-based principles to improve strength, performance, and confidence.",

        difficulty: "Beginner",
        readTime: 7,

        featured: true,
        status: "published",

        tags: [
            "performance",
            "strength"
        ],

        author: "KamPerformance",

        published: "2026-01-01",
        updated: "2026-01-01",

        url: "#"
    }

];

/* ==================================================
   Library Categories
   ================================================ */

const guideCategories = [

    {
        id: "foundations",
        title: "Foundations",

        description:
            "Build your understanding of pain science, biomechanics, motor learning, recovery, and movement fundamentals."
    },

    {
        id: "pain",
        title: "Pain",

        description:
            "Evidence-based education about pain, injury, and movement."
    },

    {
        id: "mobility",
        title: "Mobility",

        description:
            "Improve movement quality, control, and mobility through practical education."
    },

    {
        id: "performance",
        title: "Performance",

        description:
            "Train smarter with research-backed performance principles."
    },

    {
        id: "exercises",
        title: "Exercises",

        description:
            "Exercise technique, regressions, progressions, and movement demonstrations."
    },

    {
        id: "research",
        title: "Research Reviews",

        description:
            "Research summaries, myth busting, and evidence updates."
    }

];

/* ==================================================
   Helper Functions
   ================================================ */

function getGuidesByCategory(category) {
    return guides.filter(guide => guide.category === category);
}

function getFeaturedGuides() {
    return guides.filter(guide => guide.featured);
}

function getPublishedGuides() {
    return guides.filter(guide => guide.status === "published");
}

function getGuideCount(category) {
    return getGuidesByCategory(category).length;
}
