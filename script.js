(() => {
  // ----------------------------
  // Run ONLY on Services page
  // ----------------------------
  const grid = document.querySelector(".services-grid");
  const links = Array.from(document.querySelectorAll(".service-link"));
  if (!grid || links.length === 0) return;

  // ----------------------------
  // Helpers (strings)
  // ----------------------------
  const normalize = (s) => (s || "").trim().replace(/\s+/g, " ");
  const capWords = (s) =>
    normalize(s)
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // ----------------------------
  // Click animation (DOM manipulation)
  // Keeps normal behavior for ctrl/cmd click
  // ----------------------------
  function wireCardClickAnimation() {
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        // allow open in new tab
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;

        e.preventDefault();
        const card = this.querySelector(".service-card");

        document.querySelectorAll(".service-card").forEach((c) => c.classList.remove("clicked"));
        card?.classList.add("clicked");

        setTimeout(() => {
          window.location.href = this.href;
        }, 250);
      });
    });
  }

  // ----------------------------
  // Build services array from DOM (ARRAY + OBJECTS + MAP)
  // ----------------------------
  const inferCategory = (title) => {
    const t = title.toLowerCase();
    if (t.includes("laborator") || t.includes("radiolog")) return "diagnostike";
    return "klinike";
  };

  const serviceMeta = {
    "Kardiologji": { tags: ["zemër", "gjoks", "presion", "rrahje", "EKG"] },
    "Pediatri": { tags: ["fëmijë", "temperaturë", "vaksina", "pediatri"] },
    "Ortopedi": { tags: ["kocka", "frakturë", "nyje", "sport", "dhimbje shpine"] },
    "Gjinekologji": { tags: ["shtatzëni", "kontroll", "gra", "ultrazë"] },
    "Laborator analizash": { tags: ["analiza", "gjak", "urinë", "kolesterol", "sheqer"] },
    "Radiologji": { tags: ["rreze x", "imazh", "ultrazë", "CT", "MRI"] },
    "Mjekësi familjare": { tags: ["kontroll i përgjithshëm", "këshillim", "referim", "familje"] },
    "Neurologji": { tags: ["dhimbje koke", "marramendje", "nerv", "mpirje", "migrenë"] }
  };

  const services = links.map((a) => {
    const title = normalize(a.querySelector("h3")?.textContent);
    return {
      title,
      href: a.getAttribute("href"),
      category: inferCategory(title),
      tags: serviceMeta[title]?.tags || []
    };
  });

  // ----------------------------
  // Quiz options (ARRAY of OBJECTS)
  // ----------------------------
  const quizOptions = [
    { id: "chest", label: "Dhimbje gjoksi / rrahje zemre", keywords: ["gjoks", "zemër", "presion", "rrahje", "EKG"] },
    { id: "head", label: "Dhimbje koke / marramendje", keywords: ["dhimbje koke", "marramendje", "migrenë", "nerv", "mpirje"] },
    { id: "bones", label: "Lëndim / frakturë / dhimbje nyjesh", keywords: ["kocka", "frakturë", "nyje", "sport", "dhimbje shpine"] },
    { id: "women", label: "Kontroll për gra / shtatzëni", keywords: ["gra", "shtatzëni", "kontroll", "ultrazë"] },
    { id: "kids", label: "Simptoma te fëmijët", keywords: ["fëmijë", "temperaturë", "vaksina", "pediatri"] },
    { id: "lab", label: "Dua analiza (gjak/urinë/biokimi)", keywords: ["analiza", "gjak", "urinë", "kolesterol", "sheqer"] },
    { id: "imaging", label: "Dua imazheri (X/Ultrazë/CT/MRI)", keywords: ["rreze x", "imazh", "ultrazë", "CT", "MRI"] },
    { id: "general", label: "Kontroll i përgjithshëm / këshillim", keywords: ["kontroll i përgjithshëm", "këshillim", "referim", "familje"] }
  ];

  // ----------------------------
  // Minimal jQuery loader (for fade/slide)
  // ----------------------------
  function loadjQuery(cb) {
    if (window.jQuery) return cb();
    const s = document.createElement("script");
    s.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    s.onload = cb;
    s.onerror = cb; // fallback to vanilla if blocked
    document.head.appendChild(s);
  }

  // ----------------------------
  // UI injection (DOM manipulation)
  // ----------------------------
  function injectUI() {
    const wrapper = document.createElement("section");
    wrapper.className = "service-finder";
    wrapper.innerHTML = `
      <div class="sf-head">
        <h2>Gjej shërbimin e duhur</h2>
        <p>Zgjidh disa opsione dhe sistemi të rekomandon shërbimin më të përshtatshëm.</p>
      </div>

      <div class="sf-grid" id="sfGrid"></div>

      <div class="sf-actions">
        <button type="button" id="sfBtn">Rekomando</button>
        <button type="button" id="sfClear" class="secondary">Pastro</button>
        <span class="sf-note" id="sfNote"></span>
      </div>

      <div class="sf-error" id="sfError" style="display:none;"></div>
      <div class="sf-result" id="sfResult" style="display:none;"></div>
    `;

    grid.parentElement.insertBefore(wrapper, grid);

    const sfGrid = wrapper.querySelector("#sfGrid");
    sfGrid.innerHTML = quizOptions
      .map(
        (o) => `
        <label class="sf-opt">
          <input type="checkbox" value="${o.id}" />
          <span>${o.label}</span>
        </label>
      `
      )
      .join("");

    const style = document.createElement("style");
    style.textContent = `
      .service-finder{background:#fff;border:1px solid #e8e8e8;border-radius:14px;padding:16px 16px 12px;margin:14px 0 16px;box-shadow:0 8px 25px rgba(0,0,0,.06)}
      .sf-head h2{margin:0 0 6px;color:#00645c;font-size:1.15rem}
      .sf-head p{margin:0 0 12px;opacity:.9}
      .sf-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-bottom:12px}
      .sf-opt{display:flex;gap:10px;align-items:flex-start;border:1px solid #eee;border-radius:12px;padding:10px 12px;cursor:pointer;background:#fafafa}
      .sf-opt input{margin-top:3px}
      .sf-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
      .sf-actions button{background:#00837b;color:#fff;border:0;border-radius:10px;padding:.65rem 1rem;cursor:pointer}
      .sf-actions button.secondary{background:#00645c}
      .sf-note{font-size:.9rem;opacity:.85}
      .sf-error{margin-top:10px;background:#ffe9e9;color:#7a1b1b;padding:10px 12px;border-radius:10px}
      .sf-result{margin-top:10px;background:#e7fff6;color:#0b5b43;padding:10px 12px;border-radius:10px}
      .recommended-card{outline:3px solid rgba(0,131,123,.35);transform:translateY(-2px);box-shadow:0 12px 30px rgba(0,0,0,.12)}
      .recommended-badge{display:inline-block;margin-left:8px;padding:4px 10px;border-radius:999px;background:#00837b;color:#fff;font-size:.78rem}
    `;
    document.head.appendChild(style);
  }

  // ----------------------------
  // Scoring (FILTER + REDUCE + CALLBACKS)
  // ----------------------------
  function getSelectedOptionIds() {
    return Array.from(document.querySelectorAll(".service-finder input[type='checkbox']:checked")).map(
      (c) => c.value
    );
  }

  function scoreServices(selectedIds) {
    const selected = quizOptions.filter((o) => selectedIds.includes(o.id)); // filter
    const selectedKeywords = selected.flatMap((o) => o.keywords.map((k) => k.toLowerCase()));

    const scored = services.map((s) => {
      const tags = (s.tags || []).map((t) => t.toLowerCase());
      const score = selectedKeywords.reduce((acc, kw) => acc + (tags.includes(kw) ? 2 : 0), 0); // reduce
      return { ...s, score };
    });

    return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  }

  function clearHighlights() {
    document.querySelectorAll(".service-card").forEach((c) => c.classList.remove("recommended-card"));
    document.querySelectorAll(".recommended-badge").forEach((b) => b.remove());
  }

  function highlightTop(scored) {
    clearHighlights();

    scored.slice(0, 2).forEach((s, idx) => {
      const link = links.find((a) => normalize(a.querySelector("h3")?.textContent) === s.title);
      const card = link?.querySelector(".service-card");
      const h3 = link?.querySelector("h3");
      if (!card || !h3) return;

      card.classList.add("recommended-card");

      const badge = document.createElement("span");
      badge.className = "recommended-badge";
      badge.textContent = idx === 0 ? "Rekomandim #1" : "Rekomandim #2";
      h3.appendChild(badge);
    });

    const first = scored[0];
    if (first) {
      const link = links.find((a) => normalize(a.querySelector("h3")?.textContent) === first.title);
      link?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // ----------------------------
  // Init
  // ----------------------------
  wireCardClickAnimation();
  loadjQuery(() => {
    injectUI();

    const btn = document.getElementById("sfBtn");
    const clearBtn = document.getElementById("sfClear");
    const note = document.getElementById("sfNote");

    // quick stats using reduce (again)
    const counts = services.reduce(
      (acc, s) => {
        acc.total++;
        acc[s.category] = (acc[s.category] || 0) + 1;
        return acc;
      },
      { total: 0 }
    );
    note.textContent = `Totali: ${counts.total} | Klinikë: ${counts.klinike || 0} | Diagnostikë: ${counts.diagnostike || 0}`;

    // jQuery if available, else fallback
    const hasJQ = !!window.jQuery;
    const $ = window.jQuery;

    const showError = (html) => {
      const el = document.getElementById("sfError");
      el.innerHTML = html;
      if (hasJQ) $(el).stop(true, true).slideDown(160);
      else el.style.display = "block";
    };

    const hideError = () => {
      const el = document.getElementById("sfError");
      if (hasJQ) $(el).stop(true, true).slideUp(120);
      else el.style.display = "none";
    };

    const showResult = (html) => {
      const el = document.getElementById("sfResult");
      el.innerHTML = html;
      if (hasJQ) $(el).stop(true, true).fadeIn(140);
      else el.style.display = "block";
    };

    const hideResult = () => {
      const el = document.getElementById("sfResult");
      if (hasJQ) $(el).stop(true, true).fadeOut(120);
      else el.style.display = "none";
    };

    // Validation + recommendation
    btn.addEventListener("click", () => {
      const selectedIds = getSelectedOptionIds();

      if (selectedIds.length === 0) {
        hideResult();
        showError("Zgjidh së paku <b>1 opsion</b> që të bëjmë rekomandimin.");
        return;
      }

      hideError();

      const scored = scoreServices(selectedIds);
      if (scored.length === 0) {
        clearHighlights();
        showResult("Nuk u gjet rekomandim i saktë. Provo me zgjedh opsione tjera.");
        return;
      }

      const top2 = scored.slice(0, 2);
      const html =
        `<b>Rekomandimi yt:</b><br>` +
        top2
          .map(
            (s, i) =>
              `${i + 1}) <a href="${s.href}">${capWords(s.title)}</a> <span style="opacity:.85">(Score: ${s.score})</span>`
          )
          .join("<br>");

      highlightTop(scored);
      showResult(html);
    });

    clearBtn.addEventListener("click", () => {
      document.querySelectorAll(".service-finder input[type='checkbox']").forEach((c) => (c.checked = false));
      hideError();
      hideResult();
      clearHighlights();
    });

    console.log("Services JS loaded ✅ (Service Finder + Click animation)");
  });
})();
