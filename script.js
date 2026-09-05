const VALID_USER = "81";
const VALID_PASSWORD = "062395";

const loginScreen = document.getElementById("loginScreen");
const dashboardScreen = document.getElementById("dashboardScreen");
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const logoutButton = document.getElementById("logoutButton");

function showDashboard() {
  loginScreen.classList.add("hidden");
  dashboardScreen.classList.remove("hidden");
}

function showLogin() {
  dashboardScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  document.getElementById("password").value = "";
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username === VALID_USER && password === VALID_PASSWORD) {
    sessionStorage.setItem("authenticated", "true");
    errorMessage.textContent = "";
    showDashboard();
  } else {
    errorMessage.textContent = "Usuário ou senha inválidos.";
  }
});

logoutButton.addEventListener("click", function () {
  sessionStorage.removeItem("authenticated");
  showLogin();
});

if (sessionStorage.getItem("authenticated") === "true") {
  showDashboard();
} else {
  showLogin();
}
