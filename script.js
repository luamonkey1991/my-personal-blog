// 1. Cấu hình
const firebaseConfig = {
  apiKey: "AIzaSyAq5o5ub-RvJdgKQqUph7VcawHFry4sF9o",
  authDomain: "bloglua-9898e.firebaseapp.com",
  projectId: "bloglua-9898e",
  storageBucket: "bloglua-9898e.firebasestorage.app",
  messagingSenderId: "173694829368",
  appId: "1:173694829368:web:a684f15bd97217b39d77cd"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
var quill = new Quill('#editor-container', { theme: 'snow' });

// 2. Logic điều hướng
function switchTab(tab) {
  document.getElementById('home-view').style.display = (tab === 'home') ? 'block' : 'none';
  document.getElementById('admin-panel').style.display = (tab === 'admin') ? 'block' : 'none';
}

// 3. Sự kiện
document.getElementById('btn-home').onclick = () => switchTab('home');
document.getElementById('btn-admin').onclick = () => switchTab('admin');

document.getElementById('btn-publish').onclick = () => {
  db.collection("posts").add({
    title: document.getElementById('post-title').value,
    content: quill.root.innerHTML,
    date: new Date().toLocaleDateString()
  }).then(() => alert("Đăng thành công!"));
};

// 4. Auth
auth.onAuthStateChanged(user => {
  document.getElementById('btn-admin').style.display = user ? 'block' : 'none';
  document.getElementById('btn-login').style.display = user ? 'none' : 'block';
  document.getElementById('btn-logout').style.display = user ? 'block' : 'none';
});

document.getElementById('btn-login').onclick = () => {
  const email = prompt("Email:");
  const pass = prompt("Mật khẩu:");
  auth.signInWithEmailAndPassword(email, pass).catch(e => alert(e.message));
};
document.getElementById('btn-logout').onclick = () => auth.signOut();