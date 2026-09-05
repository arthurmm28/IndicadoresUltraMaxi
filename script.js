const VALID_USER = "81";
const VALID_PASSWORD = "062395";

const loginScreen = document.getElementById("loginScreen");
const dashboardScreen = document.getElementById("dashboardScreen");
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const logoutButton = document.getElementById("logoutButton");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

function showDashboard(){
  loginScreen.classList.add("hidden");
  dashboardScreen.classList.remove("hidden");
}

function showLogin(){
  dashboardScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  passwordInput.value = "";
}

loginForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const user=document.getElementById("username").value.trim();
  const pass=passwordInput.value;

  if(user===VALID_USER && pass===VALID_PASSWORD){
    sessionStorage.setItem("authenticated","true");
    errorMessage.textContent="";
    showDashboard();
  }else{
    errorMessage.textContent="Usuário ou senha inválidos.";
    passwordInput.focus();
  }
});

togglePassword.addEventListener("click",()=>{
  const isPassword=passwordInput.type==="password";
  passwordInput.type=isPassword?"text":"password";
  togglePassword.textContent=isPassword?"◉":"◌";
});

logoutButton.addEventListener("click",()=>{
  sessionStorage.removeItem("authenticated");
  showLogin();
});

if(sessionStorage.getItem("authenticated")==="true") showDashboard();
else showLogin();
