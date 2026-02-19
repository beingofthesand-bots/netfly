// ===============================
// PROFILE REDIRECT LOGIC
// ===============================
document.addEventListener("DOMContentLoaded", function() {

    const currentPage = window.location.pathname;
    const profile = localStorage.getItem("netflyProfile");

    // If on home page and no profile selected → go to profile page
    if(currentPage.includes("home.html") && !profile){
        window.location.href = "index.html";
    }

});


// ===============================
// PROFILE SELECTION
// ===============================
function selectProfile(name){
    localStorage.setItem("netflyProfile", name);
    window.location.href = "home.html";
}


// ===============================
// SWITCH PROFILE
// ===============================
function switchProfile(){
    localStorage.removeItem("netflyProfile");
    window.location.href = "index.html";
}


// ===============================
// MUTE BUTTON (Emoji Version)
// ===============================
function toggleMute(){
    const video = document.getElementById("heroVideo");
    const button = document.querySelector(".mute-btn");

    if(!video || !button) return;

    video.muted = !video.muted;

    button.textContent = video.muted ? "🔇" : "🔊";
}


// ===============================
// AUTO PAUSE HERO ON SCROLL
// ===============================
window.addEventListener("scroll", function(){
    const video = document.getElementById("heroVideo");
    const heroSection = document.querySelector(".hero");

    if(!video || !heroSection) return;

    const rect = heroSection.getBoundingClientRect();

    if(rect.bottom <= 0){
        video.pause();
    } else {
        video.play();
    }
});


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================
window.addEventListener("scroll", function(){
    const navbar = document.querySelector(".navbar");

    if(!navbar) return;

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
