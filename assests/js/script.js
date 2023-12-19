function openNavbar() {
  var navbar = document.getElementById("navbar");
  navbar.style.display = "block";
  navbar.style.height = "100vh";
  document.getElementById("navigationUl").style.display = "flex";
  document.getElementById("navCloseButton").style.display = "block";
  document.getElementById("navOpenButton").style.display = "none";
  document.getElementById("bookingButton").style.display = "block";
}

function closeNavbar() {
  var navbar = document.getElementById("navbar");
  navbar.style.display = "flex";
  navbar.style.flexDirection = "row";
  navbar.style.height = "max-content";
  document.getElementById("navigationUl").style.display = "none";
  document.getElementById("navCloseButton").style.display = "none";
  document.getElementById("navOpenButton").style.display = "block";
  document.getElementById("bookingButton").style.display = "none";
}

function openTab(tabName) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tab-content");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  document.getElementById(tabName).style.display = "block";
}
