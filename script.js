const firebaseConfig = { /* DÁN CẤU HÌNH CỦA BẠN VÀO ĐÂY */ };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Kiểm tra trạng thái đăng nhập
auth.onAuthStateChanged(user => {
  const adminEmail = "email_cua_ban@gmail.com"; 
  if (user) {
    document.getElementById('guest-nav').style.display = 'none';
    document.getElementById('btn-logout').style.display = 'block';
    if(user.email === adminEmail) document.getElementById('admin-nav').style.display = 'block';
  }
});

function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}

// Render bài viết (Chạy ở index.html)
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
