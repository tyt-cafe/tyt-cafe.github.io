/* TYT — main.js : all interactivity, zero dependencies */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------------------------------------------------------------
     NAVBAR: shrink + blur on scroll, active link highlight, scroll progress
  --------------------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const mobileLinks = document.querySelectorAll(".mobile-menu a[href^='#']");
  const actionbarLinks = document.querySelectorAll(".mobile-actionbar a[href^='#']");
  const scrollProgress = document.getElementById("scrollProgress");

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);

    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      scrollProgress.style.width = Math.min(100, Math.max(0, pct)) + "%";
    }

    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
    mobileLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
    actionbarLinks.forEach((link) => {
      link.classList.toggle("actionbar-item--current", link.getAttribute("href") === `#${current}`);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     HERO PARALLAX: subtle mouse-follow + scroll depth on decorative
     elements and the logo. Desktop (fine-pointer) only; fully skipped for
     touch devices and prefers-reduced-motion.
  --------------------------------------------------------------------- */
  const heroSection = document.getElementById("home");
  const heroDecor = document.getElementById("heroDecor");
  const heroLogoWrap = document.getElementById("heroLogoWrap");

  if (heroSection && canHover && !prefersReducedMotion) {
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;
    let scrollOffset = 0;
    let rafId = null;

    function applyParallax() {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      if (heroDecor) {
        heroDecor.style.transform = `translate3d(${curX * 1}px, ${curY * 0.75 - scrollOffset * 0.15}px, 0)`;
      }
      if (heroLogoWrap) {
        heroLogoWrap.style.transform = `translate3d(${curX * 0.5}px, ${curY * 0.4 - scrollOffset * 0.06}px, 0)`;
      }
      if (Math.abs(targetX - curX) > 0.05 || Math.abs(targetY - curY) > 0.05) {
        rafId = requestAnimationFrame(applyParallax);
      } else {
        rafId = null;
      }
    }
    function requestFrame() {
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    }

    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;   // -1..1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;   // -1..1
      targetX = nx * 8;  // ±8px
      targetY = ny * 6;  // ±6px
      requestFrame();
    });
    heroSection.addEventListener("mouseleave", () => {
      targetX = 0; targetY = 0;
      requestFrame();
    });
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        scrollOffset = y;
        requestFrame();
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------
     PREMIUM CARD 3D TILT: very subtle mouse-follow tilt on experience
     and offer cards. Desktop only, rAF-throttled, disabled for touch
     devices and prefers-reduced-motion.
  --------------------------------------------------------------------- */
  if (canHover && !prefersReducedMotion) {
    const tiltCards = document.querySelectorAll(".exp-card, .offer-card");
    tiltCards.forEach((card) => {
      let ticking = false;
      let pendingEvent = null;

      function updateTilt() {
        ticking = false;
        if (!pendingEvent) return;
        const rect = card.getBoundingClientRect();
        const px = (pendingEvent.clientX - rect.left) / rect.width;   // 0..1
        const py = (pendingEvent.clientY - rect.top) / rect.height;   // 0..1
        const rotY = (px - 0.5) * 6;   // ±3deg
        const rotX = (0.5 - py) * 6;   // ±3deg
        card.style.setProperty("--tiltX", rotX.toFixed(2) + "deg");
        card.style.setProperty("--tiltY", rotY.toFixed(2) + "deg");
      }

      card.addEventListener("mousemove", (e) => {
        pendingEvent = e;
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateTilt);
        }
      });
      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--tiltX", "0deg");
        card.style.setProperty("--tiltY", "0deg");
      });
    });
  }

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
     FIREBASE DATA: use admin-managed data when available; fall back to the
     bundled menu/offers data if Firestore is unavailable.
  --------------------------------------------------------------------- */
  let REMOTE_MENU = null;
  let REMOTE_OFFERS = null;

  async function loadRemoteData() {
    try {
      const [{ initializeApp }, authMod, fsMod] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js"),
        import("https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js")
      ]);
      const firebaseConfig = {
        apiKey: "AIzaSyA_iRaVTZwvi25XabH_PfC8cKK_BeYYRPY",
        authDomain: "tyt-cafe-8c2ae.firebaseapp.com",
        projectId: "tyt-cafe-8c2ae",
        storageBucket: "tyt-cafe-8c2ae.firebasestorage.app",
        messagingSenderId: "298823761893",
        appId: "1:298823761893:web:7652134d929a5466c9f90c",
        measurementId: "G-FPYN8MT74C"
      };

      initializeApp(firebaseConfig);
      const db = fsMod.getFirestore();
      const menuSnap = await fsMod.getDocs(fsMod.collection(db, "menu"));
      const categorySnap = await fsMod.getDocs(fsMod.collection(db, "menuCategories"));

      // Categories are additive/override data. If Firebase has no category
      // documents, the original MENU_DATA categories remain exactly as-is.
      const baseCategories = (typeof MENU_DATA !== "undefined" ? MENU_DATA : []).map(cat => ({
        ...cat,
        items: [],
        __base: true
      }));
      const categoryMap = new Map(baseCategories.map(cat => [cat.id, { ...cat }]));
      const categoryOrder = baseCategories.map(cat => cat.id);

      categorySnap.forEach(d => {
        const x = d.data();
        const current = categoryMap.get(d.id);
        if (x.deleted === true) {
          categoryMap.delete(d.id);
          return;
        }
        if (current) {
          categoryMap.set(d.id, {
            ...current,
            ...x,
            id: d.id,
            items: []
          });
        } else {
          categoryMap.set(d.id, {
            id: d.id,
            name: x.name || "New Category",
            icon: x.icon || "extra",
            description: x.description || "",
            items: [],
            ...x,
            __base: false
          });
        }
      });

      // Keep original category order, then append admin-created categories
      // using their saved order when available.
      const categories = [...categoryMap.values()].sort((a, b) => {
        const ai = categoryOrder.indexOf(a.id);
        const bi = categoryOrder.indexOf(b.id);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return Number(a.order ?? 999999) - Number(b.order ?? 999999);
      });

      // Base menu is ALWAYS the full bundled menu.
      // Each bundled item gets a stable identity based on category id +
      // original item name (not array position and not the editable name).
      const menuKeyPart = (value) => String(value ?? "")
        .trim()
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const canonicalKey = (catId, itemName) => `menu:${catId}:${menuKeyPart(itemName)}`;

      const baseMenu = (typeof MENU_DATA !== "undefined" ? MENU_DATA : []).map(cat => ({
        ...cat,
        items: (cat.items || []).map((item) => ({
          ...item,
          __sourceKey: canonicalKey(cat.id, item.name),
          __baseName: item.name,
          __baseCategoryId: cat.id,
          __baseCategoryName: cat.name
        }))
      }));

      const byKey = new Map();
      const legacyLookup = new Map();
      const legacyKeyLookup = new Map();

      baseMenu.forEach(cat => {
        cat.items.forEach(item => {
          byKey.set(item.__sourceKey, item);
          legacyLookup.set(
            `${String(cat.name).trim().toLowerCase()}||${String(item.__baseName).trim().toLowerCase()}`,
            item.__sourceKey
          );
          legacyLookup.set(
            `${String(cat.id).trim().toLowerCase()}||${String(item.__baseName).trim().toLowerCase()}`,
            item.__sourceKey
          );
          legacyKeyLookup.set(`menu:${cat.id}:${menuKeyPart(item.__baseName)}`, item.__sourceKey);
          legacyKeyLookup.set(`menu:${cat.id}:${cat.items.indexOf(item)}`, item.__sourceKey);
        });
      });

      const extras = [];

      menuSnap.forEach(d => {
        const x = d.data();

        if (x.deleted === true) {
          const deletedKey =
            legacyKeyLookup.get(String(x.sourceKey || "")) ||
            legacyLookup.get(`${String(x.category || "").trim().toLowerCase()}||${String(x.originalName || x.name || "").trim().toLowerCase()}`) ||
            legacyLookup.get(`${String(x.categoryId || "").trim().toLowerCase()}||${String(x.originalName || x.name || "").trim().toLowerCase()}`);
          if (deletedKey && byKey.has(deletedKey)) byKey.delete(deletedKey);
          return;
        }

        let key = legacyKeyLookup.get(String(x.sourceKey || "")) || "";
        const originalName = String(x.originalName || x.baseName || "").trim();

        if (!key && originalName) {
          key =
            legacyLookup.get(`${String(x.categoryId || "").trim().toLowerCase()}||${originalName.toLowerCase()}`) ||
            legacyLookup.get(`${String(x.category || "").trim().toLowerCase()}||${originalName.toLowerCase()}`) || "";
        }

        if (!key) {
          key =
            legacyLookup.get(`${String(x.categoryId || "").trim().toLowerCase()}||${String(x.name || "").trim().toLowerCase()}`) ||
            legacyLookup.get(`${String(x.category || "").trim().toLowerCase()}||${String(x.name || "").trim().toLowerCase()}`) || "";
        }

        if (key && byKey.has(key)) {
          byKey.set(key, {
            ...byKey.get(key),
            ...x,
            __sourceKey: key,
            __baseName: byKey.get(key).__baseName,
            __baseCategoryId: byKey.get(key).__baseCategoryId,
            __baseCategoryName: byKey.get(key).__baseCategoryName
          });
        } else {
          extras.push({ ...x, __sourceKey: `remote:${d.id}` });
        }
      });

      // Rebuild the visible menu from active categories. An item's categoryId
      // is authoritative for moves; otherwise it stays in its original
      // category. This changes only the menu system.
      REMOTE_MENU = categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon || "extra",
        description: cat.description || "",
        items: []
      }));

      const ensureFallbackCategory = () => {
        let fallback = REMOTE_MENU.find(c => c.id === "other");
        if (!fallback) {
          fallback = { id: "other", name: "Other", icon: "extra", items: [] };
          REMOTE_MENU.push(fallback);
        }
        return fallback;
      };

      baseMenu.forEach(baseCat => {
        baseCat.items.forEach(baseItem => {
          const item = byKey.get(baseItem.__sourceKey);
          if (!item) return;
          const targetId = item.categoryId || item.__baseCategoryId || baseCat.id;
          let target = REMOTE_MENU.find(c => c.id === targetId);
          if (!target) target = ensureFallbackCategory();
          target.items.push({
            ...item,
            categoryId: target.id,
            category: target.name
          });
        });
      });

      // Append manually-created items only. They use their saved categoryId.
      extras.forEach(x => {
        const targetId = x.categoryId || "";
        let target = REMOTE_MENU.find(c => c.id === targetId);
        if (!target) {
          const byName = REMOTE_MENU.find(c =>
            String(c.name).trim().toLowerCase() === String(x.category || "").trim().toLowerCase()
          );
          target = byName || ensureFallbackCategory();
        }
        target.items.push({
          ...x,
          categoryId: target.id,
          category: target.name
        });
      });

      // Keep the existing working offers system exactly as it is.
      const offersSnap = await fsMod.getDocs(fsMod.collection(db, "offers"));
      REMOTE_OFFERS = [];
      offersSnap.forEach(d => {
        const x = d.data();
        if (x.deleted !== true && x.active === true) REMOTE_OFFERS.push(x);
      });
    } catch (e) {
      console.info("TYT Firebase data unavailable; using bundled data.", e);
    }
  }

  /* ---------------------------------------------------------------------
     MENU: render categories/tabs from MENU_DATA, wire search + filter
  --------------------------------------------------------------------- */
  const menuContainer = document.getElementById("menuContainer");
  const menuTabs = document.getElementById("menuTabs");
  const menuSearch = document.getElementById("menuSearch");
  const menuEmpty = document.getElementById("menuEmpty");

  let activeCategory = "all";
  let menuSource = (typeof MENU_DATA !== "undefined") ? MENU_DATA : [];

  // Resolves once the menu has been rendered into the DOM at least once.
  // Menu rendering happens after an async Firebase check (see
  // initDataDrivenSections below), so anything that needs to find a live
  // .menu-item element — like the Best Sellers "View in menu" links —
  // awaits this first instead of racing the initial page load.
  let resolveMenuReady;
  const menuReadyPromise = new Promise((resolve) => { resolveMenuReady = resolve; });

  /* Small line-icon set, one per menu category "icon" key in menu-data.js.
     All share the same stroke style so they read as one cohesive family.
     `food` / `dessert` / `hot-drink` / `cold-drink` / `other` are the
     admin-facing "category type" keys (see admin.html) — picking a type
     there automatically maps to one of these icons, so nobody has to
     hand-pick a matching visual. */
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
    dessert: '<path d="M4 20h16"/><path d="M6 20v-6a6 6 0 0 1 12 0v6"/><path d="M12 8V4"/><circle cx="12" cy="3" r="1.1"/>',
    extra: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'
  };

  /* Category-type → icon aliases used by the Admin Dashboard's "category
     type" and "offer type" pickers (food / dessert / hot-drink / cold-drink
     / other). Kept separate from MENU_ICONS so existing bundled categories
     (bean, tea, citrus, smoothie, frappe, soda…) are completely unaffected. */
  const ICON_ALIASES = { food: "croissant", "hot-drink": "coffee", "cold-drink": "iced", other: "extra" };

  function iconSvg(key) {
    const resolvedKey = MENU_ICONS[key] ? key : (ICON_ALIASES[key] || "extra");
    const paths = MENU_ICONS[resolvedKey] || MENU_ICONS.extra;
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  }

  function tt(key, fallback) {
    return window.TYT_I18N ? window.TYT_I18N.t(key) : fallback;
  }

  function renderTabs() {
    menuTabs.innerHTML = "";
    const all = document.createElement("button");
    all.className = "menu-tab active";
    all.type = "button";
    all.textContent = tt("menu.all", "All");
    all.dataset.target = "all";
    all.setAttribute("role", "tab");
    all.setAttribute("aria-selected", "true");
    menuTabs.appendChild(all);

    menuSource.forEach((cat) => {
      const catL10n = window.TYT_I18N ? window.TYT_I18N.translateCategory(cat) : cat;
      const tab = document.createElement("button");
      tab.className = "menu-tab";
      tab.type = "button";
      tab.textContent = catL10n.name;
      tab.dataset.target = cat.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", "false");
      menuTabs.appendChild(tab);
    });

    // Re-select whichever category was active before this (re-)render
    // (used when the tabs are rebuilt on a language switch), defaulting
    // back to "All" if that category no longer exists.
    const stillExists = activeCategory === "all" || menuSource.some((c) => c.id === activeCategory);
    const targetTarget = stillExists ? activeCategory : "all";
    menuTabs.querySelectorAll(".menu-tab").forEach((t) => {
      const isActive = t.dataset.target === targetTarget;
      t.classList.toggle("active", isActive);
      t.setAttribute("aria-selected", String(isActive));
    });
    activeCategory = targetTarget;
  }

  let menuTabsListenerBound = false;
  function bindMenuTabsListener() {
    if (menuTabsListenerBound || !menuTabs) return;
    menuTabsListenerBound = true;
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
      animateMenuFilterSwitch(() => filterMenu(menuSearch.value));
    });
  }

  function esc(str) {
    return String(str ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }

  /* Item badges ("New" / "Best Seller" / "Popular") are set per-item from
     the Admin Dashboard and travel with the item's own data (Firestore
     `badge` field, merged in above) — never hardcoded to a name or
     position here. "none" / missing / unrecognized values render nothing. */
  const BADGE_LABELS = {
    "new": "New",
    "best-seller": "⭐ Best Seller",
    "popular": "Popular"
  };

  function badgeHtml(item) {
    const key = String(item.badge || "none").trim().toLowerCase();
    const label = (window.TYT_I18N && window.TYT_I18N.translateBadgeLabel(key)) || BADGE_LABELS[key];
    if (!label) return "";
    return `<span class="menu-item-badge menu-item-badge--${key}">${label}</span>`;
  }

  function renderMenu() {
    menuContainer.innerHTML = "";
    menuSource.forEach((cat, catIndex) => {
      const catL10n = window.TYT_I18N ? window.TYT_I18N.translateCategory(cat) : cat;
      const countLabel = window.TYT_I18N
        ? window.TYT_I18N.itemCountLabel(cat.items.length)
        : `${cat.items.length} ${cat.items.length === 1 ? "item" : "items"}`;

      const section = document.createElement("div");
      section.className = "menu-category";
      section.id = `cat-${cat.id}`;
      section.dataset.categoryId = cat.id;
      section.setAttribute("data-reveal", "");

      section.innerHTML = `
        <div class="menu-category-head">
          <span class="menu-category-num" aria-hidden="true">${String(catIndex + 1).padStart(2, "0")}</span>
          <div class="menu-category-heading">
            <h3>${catL10n.name}</h3>
            ${catL10n.description ? `<p class="menu-category-note">${catL10n.description}</p>` : ""}
          </div>
          <span class="count">${countLabel}</span>
        </div>
        <div class="menu-list">
          ${cat.items
            .map((item) => {
              const itemL10n = window.TYT_I18N ? window.TYT_I18N.translateItem(cat.id, item) : item;
              return `
            <button type="button" class="menu-item"
              data-name="${itemL10n.name.toLowerCase()}"
              data-desc="${(itemL10n.description || "").toLowerCase()}"
              data-item-name="${esc(itemL10n.name)}"
              data-item-desc="${esc(itemL10n.description || "")}"
              data-item-price="${esc(item.price)}"
              data-item-category="${esc(catL10n.name)}"
              data-item-icon="${esc(cat.icon)}"
              data-item-image="${esc(item.image || "")}"
              data-item-badge="${esc(item.badge || "none")}">
              <span class="menu-item-media">
                <span class="menu-item-icon">${item.image ? `<img src="${esc(item.image)}" alt="" loading="lazy">` : iconSvg(cat.icon)}</span>
                ${badgeHtml(item)}
              </span>
              <span class="menu-item-body">
                <span class="menu-item-row">
                  <span class="menu-item-name">${itemL10n.name}</span>
                  <span class="menu-item-dots" aria-hidden="true"></span>
                  <span class="menu-item-price">${item.price}</span>
                </span>
                ${itemL10n.description ? `<span class="menu-item-desc">${itemL10n.description}</span>` : ""}
              </span>
            </button>`;
            })
            .join("")}
        </div>
      `;
      menuContainer.appendChild(section);
      revealObserver.observe(section);
    });
  }

  /* ---------------------------------------------------------------------
     MENU ITEM QUICK VIEW MODAL (details only, no ordering)
  --------------------------------------------------------------------- */
  const itemModalOverlay = document.getElementById("itemModalOverlay");
  const itemModalClose = document.getElementById("itemModalClose");
  const itemModalIcon = document.getElementById("itemModalIcon");
  const itemModalCategory = document.getElementById("itemModalCategory");
  const itemModalName = document.getElementById("itemModalName");
  const itemModalDesc = document.getElementById("itemModalDesc");
  const itemModalPrice = document.getElementById("itemModalPrice");
  let lastFocusedEl = null;

  function openItemModal(btn) {
    const d = btn.dataset;
    itemModalIcon.innerHTML = d.itemImage ? `<img src="${d.itemImage}" alt="">` : iconSvg(d.itemIcon);
    itemModalCategory.textContent = d.itemCategory || "";
    itemModalName.textContent = d.itemName || "";
    itemModalDesc.textContent = d.itemDesc || tt("modal.defaultDesc", "A TYT favorite, made fresh to order.");
    itemModalPrice.textContent = d.itemPrice || "";
    lastFocusedEl = btn;
    itemModalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
    itemModalClose.focus();
  }

  function closeItemModal() {
    itemModalOverlay.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocusedEl) lastFocusedEl.focus({ preventScroll: true });
  }

  if (menuContainer) {
    menuContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".menu-item");
      if (btn) openItemModal(btn);
    });
  }
  if (itemModalClose) itemModalClose.addEventListener("click", closeItemModal);
  if (itemModalOverlay) {
    itemModalOverlay.addEventListener("click", (e) => {
      if (e.target === itemModalOverlay) closeItemModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && itemModalOverlay && itemModalOverlay.classList.contains("open")) {
      closeItemModal();
    }
  });

  /* ---------------------------------------------------------------------
     MENU FILTER SWITCH ANIMATION: on category-tab change, fade+shrink the
     currently visible items out, then run the real filter, then fade+rise
     the newly visible items back in with a light stagger. Skipped entirely
     for prefers-reduced-motion (filter just applies instantly).
  --------------------------------------------------------------------- */
  function animateMenuFilterSwitch(applyFn) {
    if (!menuContainer || prefersReducedMotion) { applyFn(); return; }

    const currentlyVisible = Array.from(menuContainer.querySelectorAll(".menu-item"))
      .filter((el) => el.style.display !== "none");

    if (!currentlyVisible.length) { applyFn(); return; }

    currentlyVisible.forEach((el) => el.classList.add("menu-item-filter-out"));

    window.setTimeout(() => {
      applyFn();
      currentlyVisible.forEach((el) => el.classList.remove("menu-item-filter-out"));

      const newlyVisible = Array.from(menuContainer.querySelectorAll(".menu-item"))
        .filter((el) => el.style.display !== "none");

      newlyVisible.forEach((el, i) => {
        el.classList.add("menu-item-filter-in");
        el.style.animationDelay = Math.min(i, 8) * 30 + "ms";
        el.addEventListener("animationend", function handler() {
          el.classList.remove("menu-item-filter-in");
          el.style.animationDelay = "";
          el.removeEventListener("animationend", handler);
        });
      });
    }, 220);
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

  async function initDataDrivenSections() {
    await loadRemoteData();
    if (REMOTE_MENU) menuSource = REMOTE_MENU;
    if (menuContainer) {
      renderTabs();
      bindMenuTabsListener();
      renderMenu();
      filterMenu(menuSearch.value);
      menuSearch.addEventListener("input", (e) => filterMenu(e.target.value));
    }
    resolveMenuReady();
    renderOffers();
  }

  /* ---------------------------------------------------------------------
     LANGUAGE SWITCH: re-render the dynamically-built menu + offers in the
     newly selected language. Called by i18n.js after it flips the page's
     static [data-i18n] text and dir/lang attributes.
  --------------------------------------------------------------------- */
  window.TYT_rerenderMenu = function () {
    if (menuContainer) {
      renderTabs();
      renderMenu();
      filterMenu(menuSearch.value);
    }
    renderOffers();
  };

  /* ---------------------------------------------------------------------
     BEST SELLERS → MENU: "View in menu" jumps to the exact matching card
     instead of just the top of the Menu section. Each link in index.html
     carries data-menu-category + data-menu-item, which are matched against
     the rendered .menu-item's category section + name — a stable, data-
     driven link rather than one based on the item's position on the page,
     so it keeps working even if items are reordered, added, or edited.
  --------------------------------------------------------------------- */
  async function goToMenuItem(categoryId, itemName) {
    await menuReadyPromise;
    if (!menuContainer) return;

    const normalizedName = String(itemName || "").trim().toLowerCase();
    if (!normalizedName) return;

    // Locate the item first (category section scope preferred, whole-menu
    // fallback in case the item ever moves to a different category).
    const catSection = categoryId ? document.getElementById(`cat-${categoryId}`) : null;
    const searchScope = catSection || menuContainer;
    let targetItem = Array.from(searchScope.querySelectorAll(".menu-item")).find(
      (el) => el.dataset.name === normalizedName
    );
    if (!targetItem) {
      targetItem = Array.from(menuContainer.querySelectorAll(".menu-item")).find(
        (el) => el.dataset.name === normalizedName
      );
    }
    if (!targetItem) return;

    // Make sure the item's category + search filter aren't hiding it: clear
    // any active search text and switch tabs to the item's own category
    // (falling back to "All" if that category can't be resolved).
    const actualCategoryId = targetItem.closest(".menu-category")?.dataset.categoryId || categoryId;
    if (menuSearch) menuSearch.value = "";
    if (menuTabs) {
      const tabs = Array.from(menuTabs.querySelectorAll(".menu-tab"));
      const targetTab = tabs.find((t) => t.dataset.target === actualCategoryId) ||
        tabs.find((t) => t.dataset.target === "all");
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      if (targetTab) {
        targetTab.classList.add("active");
        targetTab.setAttribute("aria-selected", "true");
        activeCategory = targetTab.dataset.target;
      }
    }
    filterMenu("");

    // Smoothly scroll the card into view, centered so it's clearly visible
    // above sticky headers/toolbars on both mobile and desktop.
    targetItem.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

    // Brief highlight so the user immediately sees which card they landed on.
    targetItem.classList.remove("menu-item-highlight"); // restart if clicked twice in a row
    void targetItem.offsetWidth; // force reflow so the animation replays
    targetItem.classList.add("menu-item-highlight");
    window.setTimeout(() => targetItem.classList.remove("menu-item-highlight"), 1600);

    // Open that exact item's existing details popup automatically, once the
    // smooth scroll has had a moment to bring it into view. The overlay is
    // semi-transparent/blurred (existing modal design), so the highlighted
    // card stays visible behind it. Uses the item's own dataset — the same
    // unique reference used to find it above — never its on-page position.
    window.setTimeout(() => openItemModal(targetItem), 450);
  }

  /* ---------------------------------------------------------------------
     OFFERS: render cards from Firebase when available, otherwise fallback
  --------------------------------------------------------------------- */
  const offersGrid = document.getElementById("offersGrid");
  const offersNote = document.getElementById("offersNote");

  /* Offer Type (set in Admin, required) → automatic fallback icon/visual.
     Admin only picks a type; it does not need to hand-pick a matching
     image every time. A custom `image` (if the admin adds one) always
     wins over this automatic visual. */
  const OFFER_TYPE_ICON = { food: "🍽️", dessert: "🍰", "hot-drink": "☕", "cold-drink": "🥤" };

  function renderOffers() {
    if (!offersGrid) return;
    // Never use the bundled offers-data.js for the public site.
    // Offers exist only when an active offer exists in Firebase.
    const offersSource = Array.isArray(REMOTE_OFFERS) ? REMOTE_OFFERS : [];

    const offersSection = document.getElementById("offers");
    if (!offersSource.length) {
      if (offersSection) offersSection.style.display = "none";
      document.querySelectorAll('a[href="#offers"]').forEach((a) => {
        a.style.display = "none";
      });
      offersGrid.innerHTML = "";
      offersGrid.style.display = "none";
      if (offersNote) offersNote.textContent = "";
      return;
    }

    if (offersSection) offersSection.style.display = "";
    document.querySelectorAll('a[href="#offers"]').forEach((a) => {
      a.style.display = "";
    });
    offersGrid.style.display = "";

    offersGrid.innerHTML = offersSource.map((offer) => {
      const badgeClass = offer.badgeStyle === "limited" ? "offer-badge limited" : "offer-badge";
      const media = offer.image
        ? `<img src="${offer.image}" alt="${offer.name}" loading="lazy" />`
        : `<span class="offer-icon">${offer.icon || OFFER_TYPE_ICON[offer.offerType] || "☕"}</span>`;
      const discount = offer.discount ? `<span class="offer-discount">${offer.discount}</span>` : "";
      const oldPrice = offer.oldPrice ? `<span class="offer-price-old">${offer.oldPrice} EGP</span>` : "";
      const mediaTypeClass = offer.offerType ? ` offer-media--${offer.offerType}` : "";
      const badgeText = window.TYT_I18N ? window.TYT_I18N.translateOfferField("badge", offer.badge) : offer.badge;
      const ctaText = window.TYT_I18N
        ? window.TYT_I18N.translateOfferField("cta", offer.cta || "Order Now")
        : (offer.cta || "Order Now");

      return `
        <article class="offer-card" data-reveal>
          <div class="offer-media${mediaTypeClass}">
            ${media}
            ${offer.badge ? `<span class="${badgeClass}">${badgeText}</span>` : ""}
            ${discount}
          </div>
          <div class="offer-body">
            <h3>${offer.name}</h3>
            <p>${offer.description || ""}</p>
            <div class="offer-price-row">
              <span class="offer-price-new">${offer.newPrice} EGP</span>
              ${oldPrice}
            </div>
            <a href="#location" class="btn btn-primary">${ctaText}</a>
          </div>
        </article>`;
    }).join("");

    // Newly-injected [data-reveal] cards need to be picked up by the observer.
    offersGrid.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

    if (offersNote) {
      offersNote.textContent = tt("offers.note", "Offers shown are current promotions and may change without notice.");
    }
  }

  initDataDrivenSections();

  /* ---------------------------------------------------------------------
     MISC
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

