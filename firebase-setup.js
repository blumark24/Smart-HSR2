// firebase-setup.js

// **هذه الإعدادات عامة ويمكن استخدامها للوصول إلى Firebase**
const firebaseConfig = {
    apiKey: "AIzaSyC5HTAq-LeJn4GObn08REwKdqIeokKmwds",
    authDomain: "smart-hsr.firebaseapp.com",
    projectId: "smart-hsr",
    storageBucket: "smart-hsr.firebasestorage.app",
    messagingSenderId: "885545362431",
    appId: "1:885545362431:web:2487096393f0fcbf29bdca",
    measurementId: "G-NH7J83MWT9"
};

const app = firebase.initializeApp(firebaseConfig);

// تعريف الخدمات الرئيسية كمتغيرات عامة
const db = app.firestore();       // قاعدة البيانات
const auth = app.auth();         // المصادقة
const storage = app.storage();   // التخزين

console.log("Firebase services initialized: db, auth, and storage are ready.");
