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

        url: "article.html?id=movement-education-foundations"
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

        url: "article.html?id=understanding-pain"
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

        url: "article.html?id=intro-to-mobility"
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

        url: "article.html?id=training-smarter"
    }

];

/* ==================================================
   Library Categories
   ================================================ */

const guideCategories = [

    {
        id: "foundations",
        title: "Foundations",

        cardTitle:
            "Movement Science Basics",

        heroTitle:
            "Build the base for better movement.",

        cardDescription:
            "Learn the core concepts behind pain science, biomechanics, recovery, load management, and movement education.",

        description:
            "Learn the core concepts behind pain science, biomechanics, recovery, load management, and movement education.",

        topics: [
            "Pain Science",
            "Biomechanics",
            "Motor Learning",
            "Recovery",
            "Load Management"
        ],

        url: "category.html?id=foundations"
    },

    {
        id: "pain",
        title: "Pain",

        cardTitle:
            "Understand Pain Better",

        heroTitle:
            "Understand pain with more clarity.",

        cardDescription:
            "Explore evidence-based guides on pain science, injury, recovery, and the role movement can play in feeling better.",

        description:
            "Explore evidence-based guides on pain science, injury, recovery, and the role movement can play in feeling better.",

        topics: [
            "Pain Science",
            "Neck Pain",
            "Low Back Pain",
            "Shoulder Pain",
            "Knee Pain"
        ],

        url: "category.html?id=pain"
    },

    {
        id: "mobility",
        title: "Mobility",

        cardTitle:
            "Move With More Control",

        heroTitle:
            "Move with more freedom and control.",

        cardDescription:
            "Learn how mobility, flexibility, joint motion, and movement quality work together to improve performance and everyday movement.",

        description:
            "Learn how mobility, flexibility, joint motion, and movement quality work together to improve performance and everyday movement.",

        topics: [
            "Mobility",
            "Flexibility",
            "Joint Motion",
            "Movement Quality",
            "Warm-Ups"
        ],

        url: "category.html?id=mobility"
    },

    {
        id: "performance",
        title: "Performance",

        cardTitle:
            "Train Smarter",

        heroTitle:
            "Train smarter with better principles.",

        cardDescription:
            "Learn how strength, power, conditioning, recovery, and training decisions connect to better performance.",

        description:
            "Learn how strength, power, conditioning, recovery, and training decisions connect to better performance.",

        topics: [
            "Strength",
            "Power",
            "Running",
            "Recovery",
            "Training Principles"
        ],

        url: "category.html?id=performance"
    },

    {
        id: "exercises",
        title: "Exercises",

        cardTitle:
            "Exercise Library",

        heroTitle:
            "Master movement through better exercise.",

        cardDescription:
            "Explore exercise technique, regressions, progressions, and movement demonstrations designed to improve confidence and performance.",

        description:
            "Explore exercise technique, regressions, progressions, and movement demonstrations designed to improve confidence and performance.",

        topics: [
            "Exercise Technique",
            "Progressions",
            "Regressions",
            "Movement Patterns",
            "Programming"
        ],

        url: "category.html?id=exercises"
    },

    {
        id: "research",
        title: "Research Reviews",

        cardTitle:
            "Evidence Made Practical",

        heroTitle:
            "Turn research into practical movement knowledge.",

        cardDescription:
            "Read evidence summaries, myth breakdowns, and clinical research reviews translated into practical movement education.",

        description:
            "Read evidence summaries, myth breakdowns, and clinical research reviews translated into practical movement education.",

        topics: [
            "Research Reviews",
            "Clinical Updates",
            "Myth Busting",
            "Evidence Summaries",
            "Practice Applications"
        ],

        url: "category.html?id=research"
    }

];

/* ==================================================
   Helper Functions
   ================================================ */

function getGuidesByCategory(category) {
    return guides.filter((guide) => guide.category === category);
}

function getFeaturedGuides() {
    return guides.filter((guide) => guide.featured);
}

function getPublishedGuides() {
    return guides.filter((guide) => guide.status === "published");
}

function getGuideCount(category) {
    return getGuidesByCategory(category).length;
}
