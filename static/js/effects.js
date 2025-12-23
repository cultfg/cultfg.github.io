/* ================= STARFIELD ================= */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let w, h, stars = [];

function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    const count = innerWidth < 600 ? 80 : 160;
    stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 1.5 + .5
    }));
}
window.addEventListener("resize", resize);
resize();

(function drawStars() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#fff";
    stars.forEach(s => {
        ctx.globalAlpha = s.z;
        ctx.fillRect(s.x, s.y, s.z * 2, s.z * 2);
        s.y += s.z * 0.15;
        if (s.y > h) s.y = 0;
    });
    requestAnimationFrame(drawStars);
})();

/* ================= CURSOR ================= */
const core = document.getElementById("cursorCore");
const aura = document.getElementById("cursorAura");

let mx = innerWidth / 2, my = innerHeight / 2;
let ax = mx, ay = my;

window.addEventListener("mousemove", e => {
    mx = e.clientX;
    my = e.clientY;
    core.style.left = mx + "px";
    core.style.top = my + "px";
});

(function cursorLoop() {
    ax += (mx - ax) * 0.18;
    ay += (my - ay) * 0.18;
    aura.style.left = ax + "px";
    aura.style.top = ay + "px";
    requestAnimationFrame(cursorLoop);
})();

document.querySelectorAll("button,a").forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

window.addEventListener("mousedown", () => document.body.classList.add("cursor-click"));
window.addEventListener("mouseup", () => document.body.classList.remove("cursor-click"));

/* ================= FIREFOX SCROLLBAR SYNC ================= */
window.addEventListener("scroll", () => {
    const colors = ["#00f0ff", "#6f5aff", "#ff2bd6"];
    const idx = Math.floor((scrollY / (document.body.scrollHeight - innerHeight)) * colors.length);
    document.documentElement.style.setProperty("--scroll-rgb", colors[idx] || colors[0]);
});
