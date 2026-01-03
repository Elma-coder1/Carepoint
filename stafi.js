// stafi.js

// ----------------- DATA (arrays/objects) -----------------
const staffData = [
  { name: "Dr. Arben Hoxha", specialty: "Kardiolog", file: "kardiolog-1.html" },
  { name: "Dr. Dritan Shala", specialty: "Kardiolog", file: "kardiolog-2.html" },
  { name: "Dr. Fatmir Krasniqi", specialty: "Neurologjist", file: "neurologjist-1.html" },
  { name: "Dr. Liridona Berisha", specialty: "Neurologjiste", file: "neurologjiste.html" },
  { name: "Dr. Elona Gashi", specialty: "Gjinekologe", file: "gjinekologe-1.html" },
  { name: "Dr. Anisa Bytyqi", specialty: "Gjinekologe", file: "gjinekologe-2.html" },
  { name: "Dr. Shkumbin Rexhepi", specialty: "Laborant", file: "laborant.html" },
  { name: "Dr. Valmira Jakupi", specialty: "Laborante", file: "laborante.html" },
  { name: "Dr. Agron Bajrami", specialty: "Radiologjist", file: "radiologjist.html" },
  { name: "Dr. Ramadan Luma", specialty: "Mjek Familjar", file: "mjek-familjar.html" },
  { name: "Dr. Vlora Morina", specialty: "Pediatre", file: "pediatre.html" },
  { name: "Dr. Agim Hoxha", specialty: "Ortoped", file: "ortoped.html" }
];

// map(): krijo slug (manipulim strings)
const staffSlugs = staffData.map(s =>
  s.name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "-")
);

console.log("Staff slugs (map):", staffSlugs);

// reduce(): numro specialitetet
const specialtyCounts = staffData.reduce((acc, s) => {
  acc[s.specialty] = (acc[s.specialty] || 0) + 1;
  return acc;
}, {});

console.log("Specialty counts (reduce):", specialtyCounts);

document.addEventListener('DOMContentLoaded', function() {

  // ----------------- DOM: Search / Filter -----------------
  const searchInput = document.getElementById("staffSearch");
  const staffCards = document.querySelectorAll(".staff-card");
  const statsBox = document.getElementById("staffStats");

  // Vendos statistikat
  if (statsBox) {
    const uniqueSpecialties = Object.keys(specialtyCounts).length;
    statsBox.textContent = `${staffData.length} staf • ${uniqueSpecialties} specialitete`;
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const q = this.value.trim().toLowerCase();

      staffCards.forEach(card => {
        const name = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const spec = card.querySelector(".staff-specialty")?.textContent.toLowerCase() || "";

        // filter logic
        const match = name.includes(q) || spec.includes(q);
        card.closest(".staff-link").style.display = match ? "block" : "none";
      });
    });
  }

  // ----------------- Click effect (timeout/callback) -----------------
  staffCards.forEach(card => {
    card.addEventListener("click", function() {
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 300);
    });
  });

});
