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

document.getElementById('btn-home').onclick = () => switchTab('home');
document.getElementById('btn-admin').onclick = () => switchTab('admin');

// 3. Logic đăng bài
document.getElementById('btn-publish').onclick = () => {
  db.collection("posts").add({
    title: document.getElementById('post-title').value,
    content: quill.root.innerHTML,
    date: new Date().toLocaleDateString()
  }).then(() => {
    alert("Đăng thành công!");
    document.getElementById('post-title').value = "";
    quill.root.innerHTML = "";
    switchTab('home');
  });
};

// 4. Logic Auth (Đăng ký, Đăng nhập, Đăng xuất)
document.getElementById('btn-register').onclick = () => {
  const email = prompt("Email đăng ký:");
  const pass = prompt("Mật khẩu:");
  if (email && pass) auth.createUserWithEmailAndPassword(email, pass)
    .then(() => alert("Đăng ký thành công!"))
    .catch(e => alert(e.message));
};

document.getElementById('btn-login').onclick = () => {
  const email = prompt("Email đăng nhập:");
  const pass = prompt("Mật khẩu:");
  if (email && pass) auth.signInWithEmailAndPassword(email, pass)
    .catch(e => alert(e.message));
};

document.getElementById('btn-logout').onclick = () => auth.signOut();

// 5. Kiểm tra quyền Admin khi trạng thái đăng nhập thay đổi
auth.onAuthStateChanged(user => {
  const adminEmail = "email_cua_ban@gmail.com"; // THAY BẰNG EMAIL CỦA BẠN
  
  if (user && user.email === adminEmail) {
    document.getElementById('btn-admin').style.display = 'block';
  } else {
    document.getElementById('btn-admin').style.display = 'none';
  }
  
  document.getElementById('btn-login').style.display = user ? 'none' : 'block';
  document.getElementById('btn-register').style.display = user ? 'none' : 'block';
  document.getElementById('btn-logout').style.display = user ? 'block' : 'none';
});
