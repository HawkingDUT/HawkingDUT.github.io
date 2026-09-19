(function () {
  "use strict";

  const data = window.RESUME;
  const app = document.querySelector("#app");
  const root = document.documentElement;
  const body = document.body;

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function sectionShell(id, kicker, title, lead, content, options) {
    const opts = options || {};
    const labelledby = opts.labelledby || `${id}-title`;
    const extra = opts.extraClass ? ` ${opts.extraClass}` : "";
    return `
      <section id="${id}" aria-labelledby="${labelledby}">
        <div class="container">
          <div class="section-head reveal">
            <p class="section-kicker">${escapeHTML(kicker)}</p>
            <h2 class="section-title" id="${labelledby}">${escapeHTML(title)}</h2>
            ${lead ? `<p class="section-lead">${escapeHTML(lead)}</p>` : ""}
          </div>
          ${content}
        </div>
      </section>
    `;
  }

  function renderList(items, className) {
    if (!items || !items.length) {
      return "";
    }
    return `<ul class="${className || ""}">${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
  }

  function renderAbout() {
    const p = data.profile;
    const content = `
      <div class="about-grid">
        <article class="glass-card profile-card reveal">
          <div class="avatar" aria-hidden="true">${escapeHTML(p.name.slice(0, 1))}</div>
          <div>
            <h3>${escapeHTML(p.name)}</h3>
            <p class="role-line">${escapeHTML(p.roleLine)}</p>
          </div>
          <ul class="highlight-list">
            <li>铁路通信网络</li>
            <li>铁路网络安全</li>
            <li>铁路数智化</li>
            <li>软件工程</li>
          </ul>
        </article>
        <article class="glass-card about-copy reveal">
          <h3>关于我</h3>
          <p>${escapeHTML(p.summary)}</p>
        </article>
      </div>
    `;
    return sectionShell("about", "ABOUT", "关于我", "以工程思维连接通信、安全与智能。", content);
  }

  function renderEducation() {
    const e = data.education;
    const content = `
      <div class="education-layout">
        <article class="glass-card education-main reveal">
          <p class="section-kicker">${escapeHTML(e.period)}</p>
          <h3>${escapeHTML(e.school)} · ${escapeHTML(e.department)}</h3>
          <p class="meta">${escapeHTML(e.major)} · ${escapeHTML(e.degree)}</p>
          <div class="stat-row">
            <div class="stat"><strong>${escapeHTML(e.gpa)}</strong><span>GPA</span></div>
            <div class="stat"><strong>${escapeHTML(e.gpaPercent)}</strong><span>百分制成绩</span></div>
            <div class="stat"><strong>${escapeHTML(e.rank)}</strong><span>专业排名</span></div>
          </div>
        </article>
        <article class="glass-card education-details reveal">
          <div class="detail-block">
            <h4>主修课程</h4>
            <div class="course-chips">${e.courses.map((course) => `<span class="chip">${escapeHTML(course)}</span>`).join("")}</div>
          </div>
          <div class="detail-block">
            <h4>外语能力</h4>
            <p>${escapeHTML(e.language)}</p>
          </div>
          <div class="detail-block">
            <h4>专业技术人员职业资格</h4>
            <p>${escapeHTML(e.certificate)}</p>
          </div>
        </article>
      </div>
    `;
    return sectionShell("education", "EDUCATION", "教育背景", "大连理工大学软件学院，软件工程专业，工学学士。", content);
  }

  function renderResearch() {
    const items = data.research
      .map((item, index) => {
        const link = item.link
          ? `<a class="inline-link" href="${escapeHTML(item.link.url)}" target="_blank" rel="noreferrer">↗ ${escapeHTML(item.link.label)}</a>`
          : "";
        return `
          <li class="timeline-item reveal">
            <span class="timeline-dot" aria-hidden="true"></span>
            <article class="glass-card timeline-card">
              <span class="period">${escapeHTML(item.period)}</span>
              <h3>${escapeHTML(item.title)}</h3>
              <h4>${escapeHTML(item.organization)} · ${escapeHTML(item.role)}</h4>
              <p class="summary">${escapeHTML(item.summary)}</p>
              ${renderList(item.highlights)}
              ${link}
            </article>
          </li>
        `;
      })
      .join("");
    const content = `<ol class="timeline">${items}</ol>`;
    return sectionShell("research", "RESEARCH", "科研经历", "从几何算法到医学影像、再到智能定价，保持对复杂系统的探究。", content);
  }

  function renderCampus() {
    const items = data.campus
      .map(
        (item) => `
          <article class="glass-card campus-item reveal">
            <span class="period">${escapeHTML(item.period)}</span>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.description)}</p>
          </article>
        `
      )
      .join("");
    const content = `<div class="campus-grid">${items}</div>`;
    return sectionShell("campus", "CAMPUS", "校园经历", "在组织、宣讲、支教与国际交流中拓展视野。", content);
  }

  function renderWork() {
    const w = data.work;
    const content = `
      <article class="glass-card work-card reveal">
        <div class="work-meta">
          <span class="period">${escapeHTML(w.period)}</span>
          <h3>${escapeHTML(w.role)}</h3>
          <h4>${escapeHTML(w.company)}</h4>
        </div>
        <div class="work-body">
          ${renderList(w.responsibilities)}
        </div>
      </article>
    `;
    return sectionShell("work", "WORK", "工作经历", "在真实生产环境中守护通信网络的安全与稳定。", content);
  }

  function renderSkills() {
    const cards = data.skills
      .map(
        (skill) => `
          <article class="glass-card skill-card reveal">
            <h3>${escapeHTML(skill.category)}</h3>
            <div class="skill-list">
              ${skill.items.map((item) => `<span class="skill-pill">${escapeHTML(item)}</span>`).join("")}
            </div>
          </article>
        `
      )
      .join("");
    const content = `<div class="skills-grid">${cards}</div>`;
    return sectionShell("skills", "SKILLS", "技能图谱", "以网络与安全为核心，融合算法、数学、工程与语言能力。", content);
  }

  function renderContact() {
    const c = data.contact;
    const content = `
      <div class="contact-grid">
        <article class="glass-card contact-card reveal">
          <h3>邮箱</h3>
          <p>期待与您交流技术、安全与数智化方向的机会。</p>
          <a class="contact-action" href="mailto:${escapeHTML(c.email)}">${escapeHTML(c.email)}</a>
          <div>
            <button class="copy-button" type="button" data-copy-email>
              <span aria-hidden="true">⧉</span> 复制邮箱
            </button>
          </div>
        </article>
        <article class="glass-card contact-card reveal">
          <h3>GitHub</h3>
          <p>本科毕业设计：SAM-guided-SSA，基于 SAM2 的手术技能评估分割增强学习。</p>
          <a class="contact-action" href="${escapeHTML(c.github.url)}" target="_blank" rel="noreferrer">↗ ${escapeHTML(c.github.url)}</a>
        </article>
      </div>
    `;
    return sectionShell("contact", "CONTACT", "保持联系", "欢迎通过邮件或 GitHub 与我联系。", content);
  }

  function renderApp() {
    if (!app) {
      return;
    }
    app.innerHTML = [renderAbout(), renderEducation(), renderResearch(), renderCampus(), renderWork(), renderSkills(), renderContact()].join("");

    const roleNode = document.querySelector("[data-profile-role]");
    const summaryNode = document.querySelector("[data-profile-summary]");
    if (roleNode) {
      roleNode.textContent = data.profile.roleLine;
    }
    if (summaryNode) {
      summaryNode.textContent = data.profile.summary;
    }
  }

  function initTypewriter() {
    const node = document.querySelector("[data-typewriter]");
    if (!node) {
      return;
    }

    const roles = data.profile.roles || [data.profile.roleLine];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = null;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches || body.classList.contains("no-animations");
    if (reduceMotion) {
      node.textContent = roles[0];
      return;
    }

    function tick() {
      const current = roles[roleIndex];
      node.textContent = current.slice(0, charIndex);

      if (!deleting) {
        charIndex += 1;
        if (charIndex > current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex -= 1;
        if (charIndex < 0) {
          deleting = false;
          charIndex = 0;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      timer = window.setTimeout(tick, deleting ? 34 : 78);
    }

    timer = window.setTimeout(tick, 400);
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
  }

  function initActiveNav() {
    const links = Array.from(document.querySelectorAll(".primary-nav a[href^='#']"));
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || !sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const id = `#${entry.target.id}`;
          links.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initMobileNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");
    if (!toggle || !nav) {
      return;
    }

    function close() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "打开导航菜单");
      nav.classList.remove("is-open");
    }

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "打开导航菜单" : "关闭导航菜单");
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        close();
      }
    });
  }

  function initTheme() {
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) {
      return;
    }

    const saved = localStorage.getItem("resume-theme");
    if (saved === "light" || saved === "dark") {
      root.setAttribute("data-theme", saved);
    }

    function sync() {
      const isDark = root.getAttribute("data-theme") === "dark";
      toggle.setAttribute("aria-pressed", String(!isDark));
      toggle.setAttribute("aria-label", isDark ? "切换为浅色主题" : "切换为深色主题");
    }

    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("resume-theme", next);
      sync();
    });

    sync();
  }

  function initMotionToggle() {
    const toggle = document.querySelector("[data-motion-toggle]");
    if (!toggle) {
      return;
    }

    const saved = localStorage.getItem("resume-motion-off") === "true";
    if (saved) {
      body.classList.add("no-animations");
    }

    function sync() {
      const off = body.classList.contains("no-animations");
      toggle.setAttribute("aria-pressed", String(off));
      toggle.setAttribute("aria-label", off ? "开启动画和粒子效果" : "关闭动画和粒子效果");
    }

    toggle.addEventListener("click", () => {
      const off = body.classList.toggle("no-animations");
      localStorage.setItem("resume-motion-off", String(off));
      sync();
      window.dispatchEvent(new CustomEvent("resume-motion-change"));
    });

    sync();
  }

  function initParticles() {
    const canvas = document.querySelector("#particle-canvas");
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const pointer = { x: null, y: null, active: false };
    const particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let running = false;
    let frame = 0;

    function colors() {
      const style = getComputedStyle(document.documentElement);
      return {
        dot: style.getPropertyValue("--accent").trim() || "#38e8ff",
        line: style.getPropertyValue("--accent-2").trim() || "#7c5cff"
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      particles.length = 0;
      const count = Math.min(105, Math.max(38, Math.floor((width * height) / 15000)));
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.4 + 0.6
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const palette = colors();

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        if (pointer.active && pointer.x !== null && pointer.y !== null) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 130 && distance > 0.01) {
            const force = (130 - distance) / 130;
            p.x += (dx / distance) * force * 2.4;
            p.y += (dy / distance) * force * 2.4;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = palette.dot;
        ctx.globalAlpha = 0.42;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSq = dx * dx + dy * dy;
          const maxDistance = 120;

          if (distanceSq > maxDistance * maxDistance) {
            continue;
          }

          const alpha = (1 - Math.sqrt(distanceSq) / maxDistance) * 0.14;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = palette.line;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.7;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      frame = window.requestAnimationFrame(draw);
    }

    function start() {
      if (running) {
        return;
      }
      running = true;
      resize();
      frame = window.requestAnimationFrame(draw);
    }

    function stop() {
      running = false;
      window.cancelAnimationFrame(frame);
      ctx.clearRect(0, 0, width, height);
    }

    function onPointerMove(event) {
      pointer.active = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }

    function onPointerLeave() {
      pointer.active = false;
      pointer.x = null;
      pointer.y = null;
    }

    window.addEventListener("resize", () => {
      if (running) {
        resize();
      }
    });

    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    window.addEventListener("resume-motion-change", () => {
      if (body.classList.contains("no-animations")) {
        stop();
      } else {
        start();
      }
    });

    if (!body.classList.contains("no-animations") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      start();
    }
  }

  function initCopyEmail() {
    const buttons = document.querySelectorAll("[data-copy-email]");
    const toast = document.querySelector("[data-toast]");
    if (!buttons.length) {
      return;
    }

    function showToast(message) {
      if (!toast) {
        return;
      }
      toast.textContent = message;
      toast.classList.add("is-visible");
      window.clearTimeout(showToast.timer);
      showToast.timer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
      }, 2200);
    }

    buttons.forEach((button) => {
      button.addEventListener("click", async () => {
        const email = data.contact.email;
        try {
          await navigator.clipboard.writeText(email);
          showToast("邮箱已复制到剪贴板");
        } catch (error) {
          const textarea = document.createElement("textarea");
          textarea.value = email;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          const copied = document.execCommand("copy");
          textarea.remove();
          showToast(copied ? "邮箱已复制到剪贴板" : "复制失败，请手动选择邮箱地址");
        }
      });
    });
  }

  function init() {
    renderApp();
    initTheme();
    initMotionToggle();
    initTypewriter();
    initReveal();
    initActiveNav();
    initMobileNav();
    initParticles();
    initCopyEmail();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
