const root = document.documentElement;
let theme = "dark";
try { theme = localStorage.getItem("theme") || "dark"; } catch (e) {}
root.dataset.theme = theme;
root.classList.add("js");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const GH = '<svg viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
const LI = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';
const ML = '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></g></svg>';
const YY = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#fff" stroke="#888" stroke-width="3"/><path d="M50 2a48 48 0 0 1 0 96 24 24 0 0 1 0-48 24 24 0 0 0 0-48z" fill="#000"/><circle cx="50" cy="26" r="7" fill="#fff"/><circle cx="50" cy="74" r="7" fill="#000"/></svg>';

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  const links = [["about", "About.", "e-bl"], ["skills", "My Skills.", "e-br"], ["work", "Work", "e-left"], ["experience", "Experience", "e-right"], ["contact", "Say hi..", "e-top"]];
  const nav = links.map(([p, n, c]) => `<a class="${c}" href="${p}.html"${p === page ? ' aria-current="page"' : ""}>${n}</a>`).join("");
  const o = 'target="_blank" rel="noopener"';
  document.body.insertAdjacentHTML("afterbegin",
    `<a class="logo" href="index.html" aria-label="Home">MM</a><nav class="edge" aria-label="Main">${nav}</nav>` +
    `<aside class="rail"><a href="https://github.com/muzammilsharf" ${o} aria-label="GitHub">${GH}</a><a href="https://www.linkedin.com/in/muzammilsharf" ${o} aria-label="LinkedIn">${LI}</a><a href="mailto:sharfmuzamil@gmail.com" aria-label="Email">${ML}</a><span class="line"></span></aside>` +
    `<button class="yy" id="themeToggle" aria-label="Switch theme">${YY}</button>` +
    (page === "home" ? "" : '<canvas id="stars" aria-hidden="true"></canvas>'));

  document.getElementById("themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  // Starfield
  const c = document.getElementById("stars");
  if (c) {
    const x = c.getContext("2d");
    let W, H, S = [];
    const size = () => {
      W = c.width = innerWidth; H = c.height = innerHeight;
      S = Array.from({ length: Math.round(W * H / 9000) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + .3, v: Math.random() * .15 + .03, p: Math.random() * 6 }));
    };
    const draw = (t) => {
      x.clearRect(0, 0, W, H);
      if (root.dataset.theme === "dark") {
        x.fillStyle = "#fff";
        S.forEach((s) => {
          if (!reduce) { s.y += s.v; if (s.y > H) s.y = 0; }
          x.globalAlpha = .35 + .65 * Math.abs(Math.sin(t / 1200 + s.p));
          x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.3); x.fill();
        });
      }
      if (!reduce) requestAnimationFrame(draw);
    };
    size(); addEventListener("resize", size); requestAnimationFrame(draw);
  }

  // Bars
  const bars = document.querySelectorAll(".bars");
  if (reduce || !("IntersectionObserver" in window)) bars.forEach((b) => b.classList.add("in"));
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .4 });
    bars.forEach((b) => io.observe(b));
  }

  // Contact form (Formspree, email-app fallback until the form ID is set)
  const form = document.getElementById("contactForm");
  if (form) {
    const status = document.getElementById("formStatus");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const d = new FormData(form);
      if (d.get("_gotcha")) return;
      d.set("_subject", d.get("subject"));
      if (form.action.includes("YOUR_FORM_ID")) {
        const body = "Name: " + d.get("name") + "\nEmail: " + d.get("email") + "\n\n" + d.get("message");
        location.href = "mailto:sharfmuzamil@gmail.com?subject=" + encodeURIComponent(d.get("subject")) + "&body=" + encodeURIComponent(body);
        status.textContent = "Opening your email app...";
        return;
      }
      status.textContent = "Sending...";
      try {
        const r = await fetch(form.action, { method: "POST", body: d, headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error("failed");
        form.reset(); status.textContent = "Thanks! Your message was sent.";
      } catch (err) { status.textContent = "Something went wrong. Please email me at sharfmuzamil@gmail.com."; }
    });
  }
});