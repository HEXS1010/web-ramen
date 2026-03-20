function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("active");
  document.querySelector(".sidebar-overlay").classList.toggle("active");
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}
