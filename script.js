// ===============================
// PROFILE REDIRECT LOGIC
// ===============================
document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname;
    const profile = localStorage.getItem("netflyProfile");

    // If on home page and no profile selected -> go to profile page
    if (currentPage.includes("home.html") && !profile) {
        window.location.href = "index.html";
    }

    // Profile selection buttons
    const profileButtons = document.querySelectorAll(".profile-card[data-profile]");
    profileButtons.forEach((button) => {
        button.addEventListener("click", function() {
            const name = button.getAttribute("data-profile");
            if (name) {
                selectProfile(name);
            }
        });
    });

    // Mute button
    const muteButton = document.querySelector(".mute-btn");
    if (muteButton) {
        muteButton.addEventListener("click", toggleMute);
    }

    // Login form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("email");
            const password = document.getElementById("password");

            if (!email || !password) return;
            if (email.value.trim() && password.value.trim()) {
                localStorage.setItem("netflyUser", email.value.trim());
                window.location.href = "index.html";
            }
        });
    }

    // Mobile nav toggle
    const navToggle = document.querySelector(".nav-toggle");
    if (navToggle) {
        navToggle.addEventListener("click", function() {
            const isOpen = document.body.classList.toggle("nav-open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }

    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function() {
            document.body.classList.remove("nav-open");
            if (navToggle) {
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Render home rows if present
    renderHome();

    // Sync mute button state on load
    const video = document.getElementById("heroVideo");
    if (video && muteButton) {
        syncMuteState(video, muteButton);
    }
});

// ===============================
// PROFILE SELECTION
// ===============================
function selectProfile(name) {
    localStorage.setItem("netflyProfile", name);
    window.location.href = "home.html";
}

// ===============================
// SWITCH PROFILE
// ===============================
function switchProfile() {
    localStorage.removeItem("netflyProfile");
    window.location.href = "index.html";
}

// ===============================
// MUTE BUTTON
// ===============================
function syncMuteState(video, button) {
    const isMuted = !!video.muted;
    button.classList.toggle("is-muted", isMuted);
    button.setAttribute("aria-label", isMuted ? "Unmute" : "Mute");
}

function toggleMute() {
    const video = document.getElementById("heroVideo");
    const button = document.querySelector(".mute-btn");

    if (!video || !button) return;

    video.muted = !video.muted;
    syncMuteState(video, button);
}

// ===============================
// RENDER HOME FROM DATA
// ===============================
function renderHome() {
    const rowsContainer = document.getElementById("rows");
    if (!rowsContainer || !window.NETFLY_DATA || !Array.isArray(window.NETFLY_DATA.rows)) return;

    const hero = window.NETFLY_DATA.hero;
    if (hero) {
        const heroTitle = document.getElementById("heroTitle");
        const heroEyebrow = document.getElementById("heroEyebrow");
        const heroMeta = document.getElementById("heroMeta");
        const heroDesc = document.getElementById("heroDesc");
        const heroVideo = document.getElementById("heroVideo");

        if (heroTitle) heroTitle.textContent = hero.title || "";
        if (heroEyebrow) heroEyebrow.textContent = hero.eyebrow || "";
        if (heroMeta) heroMeta.textContent = hero.meta || "";
        if (heroDesc) heroDesc.textContent = hero.description || "";

        if (heroVideo) {
            const source = heroVideo.querySelector("source");
            if (source && hero.video) {
                source.src = hero.video;
                heroVideo.load();
            }
            if (hero.poster) {
                heroVideo.setAttribute("poster", hero.poster);
            }
        }
    }

    rowsContainer.innerHTML = "";

    window.NETFLY_DATA.rows.forEach((row) => {
        const section = document.createElement("section");
        section.className = "content-row";

        const header = document.createElement("div");
        header.className = "row-header";

        const title = document.createElement("h2");
        title.textContent = row.title;
        header.appendChild(title);

        const scroll = document.createElement("div");
        scroll.className = "row-scroll";

        const posters = document.createElement("div");
        posters.className = "row-posters";

        row.items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "poster-card";
            card.setAttribute("role", "button");
            card.setAttribute("tabindex", "0");
            card.setAttribute("aria-label", item.title);

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.title;
            img.loading = "lazy";

            const overlay = document.createElement("div");
            overlay.className = "poster-overlay";

            if (item.badge) {
                const badge = document.createElement("div");
                badge.className = "poster-badge";
                badge.textContent = item.badge;
                overlay.appendChild(badge);
            }

            const infoWrap = document.createElement("div");
            infoWrap.className = "poster-info";

            const posterTitle = document.createElement("div");
            posterTitle.className = "poster-title";
            posterTitle.textContent = item.title;

            const meta = document.createElement("div");
            meta.className = "poster-meta";
            const seasonsLabel = item.seasons === 1 ? "Season" : "Seasons";
            meta.textContent = `${item.year} • ${item.seasons} ${seasonsLabel}`;

            const desc = document.createElement("div");
            desc.className = "poster-desc";
            desc.textContent = item.description || "";

            const actions = document.createElement("div");
            actions.className = "poster-actions";

            const play = document.createElement("button");
            play.type = "button";
            play.className = "poster-action";
            play.setAttribute("aria-label", `Play ${item.title}`);
            play.textContent = "▶";

            const add = document.createElement("button");
            add.type = "button";
            add.className = "poster-action";
            add.setAttribute("aria-label", `Add ${item.title}`);
            add.textContent = "+";

            const info = document.createElement("button");
            info.type = "button";
            info.className = "poster-action";
            info.setAttribute("aria-label", `More info about ${item.title}`);
            info.textContent = "i";

            actions.appendChild(play);
            actions.appendChild(add);
            actions.appendChild(info);

            infoWrap.appendChild(posterTitle);
            infoWrap.appendChild(meta);
            infoWrap.appendChild(desc);
            infoWrap.appendChild(actions);

            overlay.appendChild(infoWrap);

            card.appendChild(img);
            card.appendChild(overlay);

            posters.appendChild(card);
        });

        scroll.appendChild(posters);
        section.appendChild(header);
        section.appendChild(scroll);
        rowsContainer.appendChild(section);
    });
}

// ===============================
// SCROLL EFFECTS
// ===============================
window.addEventListener("scroll", function() {
    const video = document.getElementById("heroVideo");
    const heroSection = document.querySelector(".hero");
    const navbar = document.querySelector(".navbar");

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    if (!video || !heroSection) return;

    const rect = heroSection.getBoundingClientRect();
    if (rect.bottom <= 0) {
        video.pause();
    } else {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(function() {});
        }
    }
});
