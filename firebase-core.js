// =============================================================
// firebase-core.js — ملف التهيئة المركزي لمشروع Smart HSR
// =============================================================
// هذا الملف يُستخدم في جميع الصفحات (login.html, admin.html, index.html)
// لتهيئة Firebase واستدعاء الخدمات الموحّدة (Auth + Firestore)
// =============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

// ✅ تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// ✅ خدمات Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ إعداد الجلسة لتبقى بعد الإغلاق (Local Persistence)
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log('✅ Local persistence enabled'))
  .catch(err => console.warn('⚠️ Persistence setup failed:', err));

// ✅ تصدير العناصر لاستخدامها في الصفحات الأخرى
export {
  app,
  auth,
  db,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
};
