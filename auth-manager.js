// auth-manager.js

const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const authError = document.getElementById('authError');
const loginScreen = document.getElementById('login-screen');
const dashboardContent = document.getElementById('dashboard-content');
const userEmailDisplay = document.getElementById('userEmailDisplay');

// وظيفة تسجيل الدخول
loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    authError.classList.add('hidden');

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Login successful:", userCredential.user.email);
            // يتم التعامل مع إظهار المحتوى عبر onAuthStateChanged
        })
        .catch((error) => {
            authError.textContent = 'خطأ في اسم المستخدم أو كلمة المرور.';
            authError.classList.remove('hidden');
            console.error("Login Error:", error.message);
        });
});

// وظيفة تسجيل الخروج
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        console.log("User signed out.");
    }).catch((error) => {
        console.error("Logout Error:", error.message);
    });
});

// إدارة حالة المستخدم (القلب النابض لتأمين التطبيق)
auth.onAuthStateChanged(user => {
    if (user) {
        // المستخدم سجل الدخول: أخفِ شاشة التسجيل وأظهِر محتوى التطبيق
        loginScreen.classList.add('hidden');
        dashboardContent.classList.remove('hidden');
        userEmailDisplay.textContent = `مرحباً، ${user.email}`;

        // ** استدعاء منطق التطبيق (app-logic.js) عند تسجيل الدخول **
        if (typeof initApp === 'function') {
             initApp(); 
        }

    } else {
        // المستخدم غير مسجل الدخول: أظهِر شاشة التسجيل وأخفِ محتوى التطبيق
        loginScreen.classList.remove('hidden'); 
        dashboardContent.classList.add('hidden');
        userEmailDisplay.textContent = '';
    }
});
