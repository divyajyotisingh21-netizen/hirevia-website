const jobSearch = document.getElementById("jobSearch");
const searchBtn = document.getElementById("searchBtn");
const jobCards = document.querySelectorAll(".job-card");
const resultMessage = document.getElementById("resultMessage");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const applyModal = document.getElementById("applyModal");
const closeModal = document.getElementById("closeModal");
const selectedJob = document.getElementById("selectedJob");
const applyForm = document.getElementById("applyForm");
const formMessage = document.getElementById("formMessage");

// Search jobs
function searchJobs(keyword = jobSearch.value) {
    const searchText = keyword.trim().toLowerCase();
    let visibleCount = 0;

    jobCards.forEach((card) => {
        const jobTitle = card.dataset.title.toLowerCase();
        const jobText = card.textContent.toLowerCase();

        const matches =
            searchText === "" ||
            jobTitle.includes(searchText) ||
            jobText.includes(searchText);

        card.style.display = matches ? "" : "none";

        if (matches) {
            visibleCount++;
        }
    });

    if (searchText === "") {
        resultMessage.textContent = "";
    } else {
        resultMessage.textContent = visibleCount
            ? `${visibleCount} job(s) found for "${keyword.trim()}".`
            : `No jobs found for "${keyword.trim()}". Try another keyword.`;
    }

    document.getElementById("jobs").scrollIntoView({
        behavior: "smooth"
    });
}

searchBtn.addEventListener("click", () => {
    searchJobs();
});

jobSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchJobs();
    }
});

// Popular search links
document.querySelectorAll("[data-search]").forEach((link) => {
    link.addEventListener("click", () => {
        const keyword = link.dataset.search;
        jobSearch.value = keyword;
        searchJobs(keyword);
    });
});

// Mobile navigation
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });
});

// Open application form
document.querySelectorAll(".apply-btn").forEach((button) => {
    button.addEventListener("click", () => {
        selectedJob.textContent = button.dataset.job;
        formMessage.textContent = "";
        applyModal.classList.add("show");
    });
});

// Close application form
closeModal.addEventListener("click", () => {
    applyModal.classList.remove("show");
});

applyModal.addEventListener("click", (event) => {
    if (event.target === applyModal) {
        applyModal.classList.remove("show");
    }
});

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        applyModal.classList.remove("show");
    }
});

// Demo application submission
applyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const applicantName =
        document.getElementById("applicantName").value.trim();

    const applicantEmail =
        document.getElementById("applicantEmail").value.trim();

    if (!applicantName || !applicantEmail) {
        formMessage.textContent = "Please fill in all required fields.";
        return;
    }

    formMessage.textContent =
        "Demo submitted successfully! This is a frontend prototype; " +
        "your application has not been sent to a real company.";

    applyForm.reset();
});
