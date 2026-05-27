// 1. Cấu hình & Khởi tạo
const firebaseConfig = {
  apiKey: "AIzaSyAq5o5ub-RvJdgKQqUph7VcawHFry4sF9o",
  authDomain: "bloglua-9898e.firebaseapp.com",
  projectId: "bloglua-9898e",
  storageBucket: "bloglua-9898e.firebasestorage.app",
  messagingSenderId: "173694829368",
  appId: "1:173694829368:web:a684f15bd97217b39d77cd"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 2. Kiểm tra trạng thái đăng nhập (Gộp làm một)
auth.onAuthStateChanged(user => {
  const adminEmail = "vanluait@gmail.com"; // Email Admin của bạn
  
  const guestNav = document.getElementById('guest-nav');
  const logoutBtn = document.getElementById('btn-logout');
  const adminNav = document.getElementById('admin-nav');

  if (user) {
    // Nếu đã đăng nhập
    if(guestNav) guestNav.style.display = 'none';
    if(logoutBtn) logoutBtn.style.display = 'block';
    // Kiểm tra quyền Admin
    if(adminNav) adminNav.style.display = (user.email === adminEmail) ? 'block' : 'none';
  } else {
    // Nếu chưa đăng nhập
    if(guestNav) guestNav.style.display = 'block';
    if(logoutBtn) logoutBtn.style.display = 'none';
    if(adminNav) adminNav.style.display = 'none';
  }
});

// 3. Hàm đăng xuất
function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}

// 4. Render bài viết (Chỉ chạy khi ở trang index.html)
if(document.getElementById('post-list')) {
  db.collection("posts").onSnapshot(snapshot => {
    const list = document.getElementById('post-list');
    list.innerHTML = "";
    snapshot.forEach(doc => {
      const p = doc.data();
      list.innerHTML += `<div class="post-card"><h2>${p.title}</h2></div>`;
    });
  });
}
