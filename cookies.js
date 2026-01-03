document.addEventListener("DOMContentLoaded", function () {

  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const dismissBtn = document.getElementById("cookie-dismiss");

  if (!banner || !acceptBtn || !dismissBtn) return;

  const STORAGE_KEY = "carepoint_cookie_consent";

  function hasConsent() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function saveConsent(value) {
    localStorage.setItem(STORAGE_KEY, value);
    banner.hidden = true;
  }

  if (!hasConsent()) {
    banner.hidden = false;
  }

  acceptBtn.addEventListener("click", function () {
    saveConsent("accepted");
  });

  dismissBtn.addEventListener("click", function () {
    saveConsent("dismissed");
  });

});