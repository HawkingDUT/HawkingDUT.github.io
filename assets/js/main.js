(function () {
  "use strict";

  const data = window.RESUME;
  const app = document.querySelector("#app");
  const root = document.documentElement;

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function sectionShell(id, title, lead, content) {
    return `
      <section id="${id}" class="section" aria-labelledby="${id}-title">
        <div class="container section-grid">
          <header class="section-head">
            <h2 class="section-title" id="${id}-title">${escapeHTML(title)}</h2>
            ${lead ? `<p class="section-lead">${escapeHTML(lead)}</p>` : ""}
          </header>
          <div class="section-body">${content}</div>
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
    const paragraphs = data.about.paragraphs
      .map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`)
      .join("");
    const focus = p.roles.map((role) => `<li>${escapeHTML(role)}</li>`).join("");

    const content = `
      <div class="about-copy">
        ${paragraphs}
        <ul class="focus-list">${focus}</ul>
      </div>
    `;
    return sectionShell("about", "关于我", "以工程方法连接通信、安全与智能。", content);
  }

  function renderEducation() {
    const e = data.education;
    const stats = e.stats
      .map(
        (stat) => `
          <div class="stat">
            <strong>${escapeHTML(stat.value)}</strong>
            <span>${escapeHTML(stat.label)}</span>
          </div>
        `
      )
      .join("");
    const courses = e.courses.map((course) => `<li class="chip">${escapeHTML(course)}</li>`).join("");

    const content = `
      <div class="education-grid">
        <article class="panel">
          <p class="period">${escapeHTML(e.period)}</p>
          <h3>${escapeHTML(e.school)} · ${escapeHTML(e.department)}</h3>
          <p class="meta">${escapeHTML(e.major)} · ${escapeHTML(e.degree)}</p>
          <div class="stat-row">${stats}</div>
        </article>
        <article class="panel">
          <h4>主修课程</h4>
          <ul class="chip-list">${courses}</ul>
          <h4>外语能力</h4>
          <p>${escapeHTML(e.language)}</p>
          <h4>职业资格</h4>
          <p>${escapeHTML(e.certificate)}</p>
        </article>
      </div>
    `;
    return sectionShell("education", "教育背景", "大连理工大学软件学院，软件工程专业。", content);
  }

  function renderResearch() {
    const items = data.research
      .map((item) => {
        const link = item.link
          ? `<a class="text-link" href="${escapeHTML(item.link.url)}" target="_blank" rel="noreferrer">${escapeHTML(item.link.label)}</a>`
          : "";
        return `
          <li class="timeline-item">
            <span class="timeline-marker" aria-hidden="true"></span>
            <div class="timeline-content">
              <p class="period">${escapeHTML(item.period)}</p>
              <h3>${escapeHTML(item.title)}</h3>
              <p class="meta">${escapeHTML(item.organization)} · ${escapeHTML(item.role)}</p>
              <p class="summary">${escapeHTML(item.summary)}</p>
              ${renderList(item.highlights, "plain-list")}
              ${link}
            </div>
          </li>
        `;
      })
      .join("");

    const content = `<ol class="timeline">${items}</ol>`;
    return sectionShell("research", "科研经历", "从几何算法、医学影像到智能定价，保持对复杂系统的探究。", content);
  }

  function renderCampus() {
    const items = data.campus
      .map(
        (item) => `
          <li class="campus-item">
            <span class="period">${escapeHTML(item.period)}</span>
            <div>
              <h3>${escapeHTML(item.title)}</h3>
              <p>${escapeHTML(item.description)}</p>
            </div>
          </li>
        `
      )
      .join("");

    const content = `<ul class="campus-list">${items}</ul>`;
    return sectionShell("campus", "校园经历", "在组织、宣讲、支教与国际交流中拓展视野。", content);
  }

  function renderWork() {
    const w = data.work;
    const content = `
      <article class="panel work-panel">
        <div class="work-head">
          <p class="period">${escapeHTML(w.period)}</p>
          <h3>${escapeHTML(w.role)}</h3>
          <p class="meta">${escapeHTML(w.company)}</p>
        </div>
        <div class="work-body">
          ${renderList(w.responsibilities, "plain-list")}
        </div>
      </article>
    `;
    return sectionShell("work", "工作经历", "在真实生产环境中守护通信网络的安全与稳定。", content);
  }

  function renderSkills() {
    const groups = data.skills
      .map(
        (skill) => `
          <div class="skill-group">
            <h3>${escapeHTML(skill.category)}</h3>
            <ul class="chip-list">
              ${skill.items.map((item) => `<li class="chip">${escapeHTML(item)}</li>`).join("")}
            </ul>
          </div>
        `
      )
      .join("");

    const content = `<div class="skills-grid">${groups}</div>`;
    return sectionShell("skills", "技能图谱", "以网络与安全为核心，融合算法、数学、工程与语言。", content);
  }

  function renderContact() {
    const c = data.contact;
    const content = `
      <div class="contact-grid">
        <article class="panel">
          <h3>邮箱</h3>
          <p>欢迎交流技术、安全与数智化方向的机会。</p>
          <a class="contact-link" href="mailto:${escapeHTML(c.email)}">${escapeHTML(c.email)}</a>
          <div>
            <button class="button button-secondary copy-button" type="button" data-copy-email>复制邮箱</button>
          </div>
        </article>
        <article class="panel">
          <h3>GitHub</h3>
          <p>本科毕业设计：SAM-guided-SSA，基于 SAM2 的手术技能评估分割增强学习。</p>
          <a class="contact-link" href="${escapeHTML(c.github.url)}" target="_blank" rel="noreferrer">${escapeHTML(c.github.url)}</a>
        </article>
      </div>
    `;
    return sectionShell("contact", "保持联系", "欢迎通过邮件或 GitHub 联系。", content);
  }

  function renderApp() {
    if (!app) {
      return;
    }
    app.innerHTML = [
      renderAbout(),
      renderEducation(),
      renderResearch(),
      renderCampus(),
      renderWork(),
      renderSkills(),
      renderContact()
    ].join("");

    const roleNode = document.querySelector("[data-profile-role]");
    const summaryNode = document.querySelector("[data-profile-summary]");
    if (roleNode) {
      roleNode.textContent = data.profile.role;
    }
    if (summaryNode) {
      summaryNode.textContent = data.profile.summary;
    }
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
    initActiveNav();
    initMobileNav();
    initCopyEmail();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
