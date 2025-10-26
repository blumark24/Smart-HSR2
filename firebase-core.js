// firebase-core.js — توحيد تهيئة Firebase عبر كل الصفحات
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, setPersistence, browserLocalPersistence 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// ✅ تهيئة آمنة (لن يُعاد تشغيل Firebase في كل صفحة)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ تفعيل حفظ الجلسة محليًا بشكل دائم (المفتاح لحل المشكلة)
await setPersistence(auth, browserLocalPersistence);

export { app, auth, db };
