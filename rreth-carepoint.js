
$(document).ready(function () {

  /* =====================================================
     Estimator i kohës së pritjes (Location)
     ===================================================== */
  (function waitingTimeEstimator() {
    const $section = $(".location-section");
    if ($section.length === 0) return;

    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = e diel

    // Model i thjeshtë realist
    const rules = [
      { from: 8, to: 11, wait: [5, 10] },
      { from: 11, to: 14, wait: [10, 15] },
      { from: 14, to: 17, wait: [15, 25] },
      { from: 17, to: 20, wait: [20, 30] }
    ];

    let estimate = [30, 45];
    rules.forEach(r => {
      if (hour >= r.from && hour < r.to) estimate = r.wait;
    });

    if (day === 0) estimate = [30, 60]; // e diel

    const panel = $(`
      <div class="waiting-estimator" style="display:none; margin:1rem 0; padding:1rem; border-radius:12px; background:#f5f9ff;">
        <div style="font-weight:600; margin-bottom:.4rem;">🕒 Koha e pritjes për konsultë sot</div>
        <div class="wait-time" style="font-size:1.4rem; font-weight:700;">0–0 minuta</div>
        <div style="font-size:.9rem; margin-top:.4rem;">Vlerësim informativ bazuar në ngarkesën aktuale</div>
      </div>
    `);

    const $title = $section.find(".section-title").first();
    $title.after(panel);
    panel.slideDown(300);

    // Animacion numerik
    $({ a: 0, b: 0 }).animate(
      { a: estimate[0], b: estimate[1] },
      {
        duration: 700,
        step: function (now) {
          const min = Math.floor(this.a);
          const max = Math.floor(this.b);
          panel.find(".wait-time").text(`${min}–${max} minuta`);
        },
        complete: function () {
          panel.find(".wait-time").text(`${estimate[0]}–${estimate[1]} minuta`);
        }
      }
    );
  })();

  /* =====================================================
    Animated Counters (Achievements)
     ===================================================== */
  (function achievementsCounters() {
    const $section = $(".achievements-section");
    if ($section.length === 0) return;

    const $numbers = $section.find(".achievement-number");
    if ($numbers.length === 0) return;

    const foundedYear = 2009;
    const years = new Date().getFullYear() - foundedYear;

    // vendos vitet dinamike
    $numbers.eq(0).text(`${years}+`);

    function format(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const targets = [];
    $numbers.each(function () {
      const raw = $(this).text();
      targets.push(parseInt(raw.replace(/\D/g, "")));
      $(this).text("0");
    });

    let started = false;

    function inView() {
      const t = $section.offset().top;
      const b = t + $section.outerHeight();
      const vt = $(window).scrollTop();
      const vb = vt + $(window).height();
      return t < vb - 80 && b > vt + 80;
    }

    function start() {
      if (started || !inView()) return;
      started = true;

      $numbers.each(function (i) {
        const $el = $(this);
        const target = targets[i];

        $({ count: 0 }).animate(
          { count: target },
          {
            duration: 900,
            step: function (now) {
              const val = Math.floor(now);
              $el.text(`${format(val)}+`);
            },
            complete: function () {
              $el.text(`${format(target)}+`);
            }
          }
        );
      });
    }

    start();
    $(window).on("scroll resize", start);
  })();

});
