// Redirect to profile selection if no profile chosen
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("home.html")) {
        const profile = localStorage.getItem("netflyProfile");
        if (!profile) {
            window.location.href = "index.html";
        } else {
            document.getElementById("profile-name").innerText = profile;
        }
    }
});

// Profile selection
function selectProfile(name){
    localStorage.setItem("netflyProfile", name);
    window.location.href = "home.html";
}

// Logout / switch profile
function switchProfile(){
    localStorage.removeItem("netflyProfile");
    window.location.href = "index.html";
}
function toggleMute(){
    const video = document.getElementById("heroVideo");
    const soundOn = document.getElementById("iconSoundOn");
    const muted = document.getElementById("iconMuted");

    video.muted = !video.muted;

    if(video.muted){
        soundOn.style.display = "none";
        muted.style.display = "block";
    } else {
        soundOn.style.display = "block";
        muted.style.display = "none";
    }
}

window.addEventListener("scroll", function(){
    const video = document.getElementById("heroVideo");
    const heroSection = document.querySelector(".hero");

    if(!video || !heroSection) return;

    const rect = heroSection.getBoundingClientRect();

    // If hero is out of view
    if(rect.bottom <= 0){
        video.pause();
    } else {
        video.play();
    }
});

