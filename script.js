// Redirect to profile selection if no profile chosen
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("index.html")) {
        const profile = localStorage.getItem("netflyProfile");
        if (!profile) {
            window.location.href = "profiles.html";
        } else {
            document.getElementById("profile-name").innerText = profile;
        }
    }
});

// Profile selection
function selectProfile(name){
    localStorage.setItem("netflyProfile", name);
    window.location.href = "index.html";
}

// Logout / switch profile
function switchProfile(){
    localStorage.removeItem("netflyProfile");
    window.location.href = "profiles.html";
}
