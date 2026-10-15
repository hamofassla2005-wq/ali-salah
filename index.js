

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// Reading progress bar
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
    const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress =
        scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

    scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});

updateScrollProgress();

// Reveal sections when they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}

// Project details
const projectDetails = {
    translation: {
        type: "TRANSLATION PRACTICE",
        title: "Meaning Across Languages",
        description:
            "Create a bilingual translation sample. Include the original text, your translation, and notes explaining your word choices, tone, and cultural context.",
        nextStep:
            "Choose a short text you are allowed to use, prepare your translation, revise it, and add a PDF or side-by-side comparison to the portfolio."
    },

    writing: {
        type: "WRITING PRACTICE",
        title: "One Idea, Two Audiences",
        description:
            "Rewrite one message for two different audiences. For example, turn the same idea into a friendly social media post and a formal email.",
        nextStep:
            "Present both versions and explain how the tone, vocabulary, and structure change according to the audience."
    },

    localization: {
        type: "LOCALIZATION PRACTICE",
        title: "Make It Feel Native",
        description:
            "Choose a small website, application screen, or interface and adapt its text for a different language or cultural audience.",
        nextStep:
            "Create before-and-after screenshots and explain three localization choices you made."
    }
};

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalDone = document.getElementById("modalDone");

function openProject(key) {
    const project = projectDetails[key];

    if (!project) return;

    document.getElementById("modalType").textContent = project.type;
    document.getElementById("modalTitle").textContent = project.title;
    document.getElementById("modalDescription").textContent =
        project.description;
    document.getElementById("modalNextStep").textContent =
        project.nextStep;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modalClose.focus();
}

function closeProject() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

document.querySelectorAll("[data-project]").forEach(button => {
    button.addEventListener("click", () => {
        openProject(button.dataset.project);
    });
});

modalClose.addEventListener("click", closeProject);
modalDone.addEventListener("click", closeProject);

modal.querySelectorAll("[data-close-modal]").forEach(element => {
    element.addEventListener("click", closeProject);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProject();
    }
});

// Toast notifications
const toast = document.getElementById("toast");
let toastTimeout;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3200);
}

// Placeholder social links
document.querySelectorAll(".placeholder-link").forEach(link => {
    link.addEventListener("click", event => {
        if (link.getAttribute("href") === "#") {
            event.preventDefault();

            showToast(
                `Add Ali's real ${link.dataset.social} link in index.html first.`
            );
        }
    });
});

// Placeholder email
const emailLink = document.getElementById("emailLink");

emailLink.addEventListener("click", event => {
    if (emailLink.getAttribute("href").includes("your.email@example.com")) {
        event.preventDefault();

        showToast(
            "Replace the placeholder email with Ali's real email first."
        );
    }
});