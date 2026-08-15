/* TYT — main.js : all interactivity, zero dependencies */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     NAVBAR: shrink + blur on scroll, active link highlight
  --------------------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);

    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     MOBILE MENU
  --------------------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMobileMenu() {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMobileMenu));

  /* ---------------------------------------------------------------------
     SCROLL REVEAL
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------------------------
     MENU: render categories/tabs from MENU_DATA, wire search + filter
  --------------------------------------------------------------------- */
  const menuContainer = document.getElementById("menuContainer");
  const menuTabs = document.getElementById("menuTabs");
  const menuSearch = document.getElementById("menuSearch");
  const menuEmpty = document.getElementById("menuEmpty");

  let activeCategory = "all";

  /* Small line-icon set, one per menu category "icon" key in menu-data.js.
     All share the same stroke style so they read as one cohesive family. */
  const MENU_ICONS = {
    all: '<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>',
    coffee: '<path d="M3 8h13v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2"/><path d="M7.5 2.8c-.6 1 .5 1.4-.1 2.4M11.5 2.8c-.6 1 .5 1.4-.1 2.4"/>',
    iced: '<path d="M6 4h12l-1.2 15.2A2 2 0 0 1 14.8 21H9.2a2 2 0 0 1-2-1.8L6 4Z"/><path d="M6.6 9.2h10.8"/><path d="M14.5 2.2 13.8 6"/>',
    bean: '<path d="M12 3.2C7 3.2 4.2 8 4.2 12.8s2.8 8 7.8 8 7.8-3.9 7.8-8-2.8-9.6-7.8-9.6Z"/><path d="M12 5.4c2.8 2.6 2.8 9.6 0 15"/>',
    tea: '<path d="M3 8h13v5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Z"/><path d="M16 9h2a2 2 0 1 1 0 4h-2"/><rect x="9" y="2" width="3" height="3" rx="0.6"/>',
    citrus: '<circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3 6.3 17.7"/>',
    smoothie: '<path d="M7.2 4h9.6l-1.1 14.4a2 2 0 0 1-2 1.8h-3.4a2 2 0 0 1-2-1.8L7.2 4Z"/><path d="M6.2 4h11.6"/><path d="M15.5 2 16.5 6"/>',
    shake: '<path d="M8 6h8l-1.1 13.2A2 2 0 0 1 12.9 21h-1.8a2 2 0 0 1-2-1.8L8 6Z"/><path d="M7 6h10"/><path d="M13 2v4"/><path d="M13 2c1.3 0 2.2.7 2.2 1.6"/>',
    frappe: '<path d="M8 5h8l-1 14.2a2 2 0 0 1-2 1.8h-2a2 2 0 0 1-2-1.8L8 5Z"/><path d="M7 5h10"/><path d="M16 3l1.4 3.8"/><path d="M10.2 9.4h3.6M10.2 13.2h3.6"/>',
    soda: '<rect x="7" y="3" width="10" height="18" rx="3"/><path d="M7 8.5h10M7 15h10"/>',
    croissant: '<path d="M3 15c3-9 8-11 12-9 3 1.5 4.5 5 3 8-1 2-3 3-5 2.5"/><path d="M6 13c2-4 5-5 7-4"/>',
    extra: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'
  };

  function iconSvg(key) {
    const paths = MENU_ICONS[key] || MENU_ICONS.extra;
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  }

  function renderTabs() {
    const all = document.createElement("button");
    all.className = "menu-tab active";
    all.type = "button";
    all.innerHTML = `<span class="menu-tab-icon">${iconSvg("all")}</span><span>All</span>`;
    all.dataset.target = "all";
    all.setAttribute("role", "tab");
    all.setAttribute("aria-selected", "true");
    menuTabs.appendChild(all);

    MENU_DATA.forEach((cat) => {
      const tab = document.createElement("button");
      tab.className = "menu-tab";
      tab.type = "button";
      tab.innerHTML = `<span class="menu-tab-icon">${iconSvg(cat.icon)}</span><span>${cat.name}</span>`;
      tab.dataset.target = cat.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", "false");
      menuTabs.appendChild(tab);
    });

    menuTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".menu-tab");
      if (!btn) return;
      menuTabs.querySelectorAll(".menu-tab").forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      activeCategory = btn.dataset.target;
      btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      filterMenu(menuSearch.value);
    });
  }

  function renderMenu() {
    menuContainer.innerHTML = "";
    MENU_DATA.forEach((cat) => {
      const section = document.createElement("div");
      section.className = "menu-category";
      section.id = `cat-${cat.id}`;
      section.dataset.categoryId = cat.id;

      section.innerHTML = `
        <div class="menu-category-head">
          <span class="menu-category-icon">${iconSvg(cat.icon)}</span>
          <div class="menu-category-heading">
            <h3>${cat.name}</h3>
            ${cat.description ? `<p class="menu-category-note">${cat.description}</p>` : ""}
          </div>
          <span class="count">${cat.items.length} items</span>
        </div>
        <div class="menu-grid">
          ${cat.items
            .map(
              (item) => `
            <div class="menu-item" data-name="${item.name.toLowerCase()}" data-desc="${(item.description || "").toLowerCase()}">
              <div class="menu-item-row">
                <span class="menu-item-name">${item.name}</span>
                <span class="menu-item-dots" aria-hidden="true"></span>
                <span class="menu-item-price">${item.price}</span>
              </div>
              ${item.description ? `<div class="menu-item-desc">${item.description}</div>` : ""}
            </div>`
            )
            .join("")}
        </div>
      `;
      menuContainer.appendChild(section);
    });
  }

  function filterMenu(query) {
    const q = query.trim().toLowerCase();
    let visibleCount = 0;

    document.querySelectorAll(".menu-category").forEach((catEl) => {
      const catMatches = activeCategory === "all" || catEl.dataset.categoryId === activeCategory;

      let catVisible = 0;
      catEl.querySelectorAll(".menu-item").forEach((item) => {
        const searchMatch = !q || item.dataset.name.includes(q) || item.dataset.desc.includes(q);
        const show = catMatches && searchMatch;
        item.style.display = show ? "" : "none";
        if (show) { catVisible++; visibleCount++; }
      });
      catEl.style.display = catVisible ? "" : "none";
    });

    menuEmpty.classList.toggle("show", visibleCount === 0);
  }

  if (menuContainer && typeof MENU_DATA !== "undefined") {
    renderTabs();
    renderMenu();
    filterMenu(menuSearch.value);
    menuSearch.addEventListener("input", (e) => filterMenu(e.target.value));
  }

  /* ---------------------------------------------------------------------
     OFFERS: render cards from OFFERS_DATA (demo/placeholder data)
  --------------------------------------------------------------------- */
  const offersGrid = document.getElementById("offersGrid");
  const offersNote = document.getElementById("offersNote");

  function renderOffers() {
    if (!offersGrid || typeof OFFERS_DATA === "undefined") return;

    if (!OFFERS_DATA.length) {
      offersGrid.style.display = "none";
      if (offersNote) offersNote.textContent = "No current offers — check back soon.";
      return;
    }

    offersGrid.innerHTML = OFFERS_DATA.map((offer) => {
      const badgeClass = offer.badgeStyle === "limited" ? "offer-badge limited" : "offer-badge";
      const media = offer.image
        ? `<img src="${offer.image}" alt="${offer.name}" loading="lazy" />`
        : `<span class="offer-icon">${offer.icon || "☕"}</span>`;
      const discount = offer.discount ? `<span class="offer-discount">${offer.discount}</span>` : "";
      const oldPrice = offer.oldPrice ? `<span class="offer-price-old">${offer.oldPrice} EGP</span>` : "";

      return `
        <article class="offer-card" data-reveal>
          <div class="offer-media">
            ${media}
            ${offer.badge ? `<span class="${badgeClass}">${offer.badge}</span>` : ""}
            ${discount}
          </div>
          <div class="offer-body">
            <h3>${offer.name}</h3>
            <p>${offer.description || ""}</p>
            <div class="offer-price-row">
              <span class="offer-price-new">${offer.newPrice} EGP</span>
              ${oldPrice}
            </div>
            <a href="#location" class="btn btn-primary">${offer.cta || "Order Now"}</a>
          </div>
        </article>`;
    }).join("");

    // Newly-injected [data-reveal] cards need to be picked up by the observer.
    offersGrid.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

    if (offersNote) {
      offersNote.textContent = "Offers shown are current promotions and may change without notice.";
    }
  }

  renderOffers();

  /* ---------------------------------------------------------------------
     MISC
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
