// 1. Cấu hình & Khởi tạo
const firebaseConfig = {
  apiKey: "AIzaSyAq5o5ub-RvJdgKQqUph7VcawHFry4sF9o",
  authDomain: "bloglua-9898e.firebaseapp.com",
  projectId: "bloglua-9898e",
  storageBucket: "bloglua-9898e.firebasestorage.app",
  messagingSenderId: "173694829368",
  appId: "1:173694829368:web:a684f15bd97217b39d77cd"
};

// Khởi tạo Firebase nếu chưa được khởi tạo
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// 2. Kiểm tra trạng thái đăng nhập
auth.onAuthStateChanged(user => {
  const adminEmail = "vanluait@gmail.com"; 
  const guestNav = document.getElementById('guest-nav');
  const logoutBtn = document.getElementById('btn-logout');
  const adminNav = document.getElementById('admin-nav');

  if (user) {
    if(guestNav) guestNav.style.display = 'none';
    if(logoutBtn) logoutBtn.style.display = 'block';
    if(adminNav) adminNav.style.display = (user.email === adminEmail) ? 'block' : 'none';
  } else {
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
      const post = doc.data();
      const id = doc.id;
      
      // Kiểm tra xem user có phải là Admin không
      const user = auth.currentUser;
      const isAdmin = user && user.email === "vanluait@gmail.com";
      
      // Nút xóa chỉ hiện nếu là Admin
      const deleteBtn = isAdmin ? `<button onclick="deletePost('${id}')" style="background:red; color:white; border:none; padding:5px; cursor:pointer;">🗑️ Xóa bài</button>` : '';

      list.innerHTML += `
        <div class="post-card">
            <h2>${post.title}</h2>
            <p>${post.content.substring(0, 100)}...</p>
            <a href="post.html?id=${id}">Đọc tiếp...</a>
            <br><br>
            ${deleteBtn}
        </div>
      `;
    });
  });
}

// Hàm xóa bài
function deletePost(id) {
    if(confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
        db.collection("posts").doc(id).delete().then(() => {
            alert("Đã xóa bài!");
        }).catch(err => alert("Lỗi khi xóa: " + err.message));
    }
}
