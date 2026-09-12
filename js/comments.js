/**
 * TYT – Comments (Guestbook)
 * -----------------------------------------------------------------
 * A simple public guestbook, backed by the same Firebase project
 * already used for the live Menu/Offers (tyt-cafe-8c2ae). Anyone can
 * leave a name + comment; comments appear immediately, newest first,
 * and sync live for every visitor (no page reload needed).
 * -----------------------------------------------------------------
 */
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyA_iRaVTZwvi25XabH_PfC8cKK_BeYYRPY",
    authDomain: "tyt-cafe-8c2ae.firebaseapp.com",
    projectId: "tyt-cafe-8c2ae",
    storageBucket: "tyt-cafe-8c2ae.firebasestorage.app",
    messagingSenderId: "298823761893",
    appId: "1:298823761893:web:7652134d929a5466c9f90c",
    measurementId: "G-FPYN8MT74C"
  };

  function tt(key, fallback) {
    return (window.TYT_I18N && window.TYT_I18N.t(key)) || fallback;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(ts) {
    try {
      const d = ts && ts.toDate ? ts.toDate() : null;
      if (!d) return "";
      const lang = window.TYT_I18N && window.TYT_I18N.getLang() === "ar" ? "ar-EG" : "en-GB";
      return d.toLocaleDateString(lang, { day: "numeric", month: "short", year: "numeric" });
    } catch (e) {
      return "";
    }
  }

  function initComments() {
    const form = document.getElementById("commentForm");
    const nameInput = document.getElementById("commentName");
    const messageInput = document.getElementById("commentMessage");
    const submitBtn = document.getElementById("commentSubmitBtn");
    const statusEl = document.getElementById("commentStatus");
    const listEl = document.getElementById("commentsList");
    const emptyEl = document.getElementById("commentsEmpty");

    if (!form || !listEl) return;

    let db;
    try {
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      db = getFirestore(app);
    } catch (e) {
      console.info("TYT Comments: Firebase unavailable.", e);
      return;
    }

    const commentsRef = collection(db, "comments");
    const commentsQuery = query(commentsRef, orderBy("createdAt", "desc"), limit(100));

    function renderComments(docs) {
      if (!docs.length) {
        listEl.innerHTML = "";
        if (emptyEl) emptyEl.classList.add("show");
        return;
      }
      if (emptyEl) emptyEl.classList.remove("show");
      listEl.innerHTML = docs
        .map((d) => {
          const c = d.data();
          const initial = escapeHtml((c.name || "?").trim().charAt(0).toUpperCase() || "?");
          return `
          <article class="comment-card">
            <div class="comment-card-head">
              <span class="comment-avatar">${initial}</span>
              <div class="comment-meta">
                <span class="comment-name">${escapeHtml(c.name)}</span>
                <span class="comment-date">${formatDate(c.createdAt)}</span>
              </div>
            </div>
            <p class="comment-message">${escapeHtml(c.message)}</p>
          </article>`;
        })
        .join("");
    }

    onSnapshot(
      commentsQuery,
      (snap) => renderComments(snap.docs),
      (err) => console.info("TYT Comments: live sync unavailable.", err)
    );

    let submitting = false;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (submitting) return;

      const name = nameInput.value.trim();
      const message = messageInput.value.trim();
      if (!name || !message) {
        if (statusEl) {
          statusEl.classList.add("is-error");
          statusEl.textContent = tt("comments.errorFields", "Please fill in your name and comment.");
        }
        return;
      }

      submitting = true;
      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = tt("comments.submitting", "Posting…");
      if (statusEl) {
        statusEl.classList.remove("is-error");
        statusEl.textContent = "";
      }

      try {
        await addDoc(commentsRef, {
          name: name.slice(0, 40),
          message: message.slice(0, 500),
          createdAt: serverTimestamp()
        });
        form.reset();
        if (statusEl) {
          statusEl.classList.remove("is-error");
          statusEl.textContent = tt("comments.success", "Thanks! Your comment has been posted.");
        }
      } catch (err) {
        console.info("TYT Comments: failed to post.", err);
        if (statusEl) {
          statusEl.classList.add("is-error");
          statusEl.textContent = tt("comments.error", "Something went wrong — please try again.");
        }
      } finally {
        submitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initComments);
  } else {
    initComments();
  }
})();
