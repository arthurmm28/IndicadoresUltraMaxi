/* ================================
   USUÁRIOS E PERMISSÕES
================================ */

const USERS = {
    "81": { p: "062395", s: [1,2,3,4,5] },
    "Patryck": { p: "Patryck6197", s: [1] },
    "Mileny": { p: "Mileny9086", s: [2] },
    "Nayara": { p: "Nayara0165", s: [3] },
    "Athos": { p: "Athos9753", s: [4] },
    "Cátia": { p: "Cátia8510", s: [5] },
    "Micaelen": { p: "Micaelen9632", s: [1,2,3,4,5] },
    "Maria Luiza": { p: "11761", s: [1,2,3,4,5] },
    "Rodrigo": { p: "076197", s: [1,2,3,4,5] },
    "Dimas": { p: "Dimas136", s: [1,2,3,4,5] },
};


/* ================================
   RELATÓRIOS
================================ */

const REPORTS = {
    1: {
        title: "Meta mensal Loja 1",
        url: "https://app.powerbi.com/view?r=eyJrIjoiZmM1MzY4OTUtZDMxMi00ZWI4LTllYTYtNGViMmY4YTAyNDZmIiwidCI6IjJmN2ZlNjE5LWQ0M2EtNDQ0Yy04OGNmLWQwYjlhN2YzODUxYiJ9"
    },
    2: {
        title: "Meta mensal Loja 2",
        url: "https://app.powerbi.com/view?r=eyJrIjoiMDM5NGYxYmYtYzliMS00NDNlLTljYTgtYTM5YjQwNzBjZjkxIiwidCI6IjJmN2ZlNjE5LWQ0M2EtNDQ0Yy04OGNmLWQwYjlhN2YzODUxYiJ9"
    },
    3: {
        title: "Meta mensal Loja 3",
        url: "https://app.powerbi.com/view?r=eyJrIjoiODA5NDdhOWEtZDA0OC00ZDQxLThhNDYtNTk4ZDNiNWEwOWNjIiwidCI6IjJmN2ZlNjE5LWQ0M2EtNDQ0Yy04OGNmLWQwYjlhN2YzODUxYiJ9"
    },
    4: {
        title: "Meta mensal Loja 4",
        url: "https://app.powerbi.com/view?r=eyJrIjoiOGQzMWM1YTQtZTUxOC00MzA5LWFmZDctNWU4MDQ0MThkY2UwIiwidCI6IjJmN2ZlNjE5LWQ0M2EtNDQ0Yy04OGNmLWQwYjlhN2YzODUxYiJ9"
    },
    5: {
        title: "Meta mensal Loja 5",
        url: "https://app.powerbi.com/view?r=eyJrIjoiNWI5ODE5YTgtM2RlZi00NDY2LWJkZDctMzhkMTk2MzUyYWU1IiwidCI6IjJmN2ZlNjE5LWQ0M2EtNDQ0Yy04OGNmLWQwYjlhN2YzODUxYiJ9"
    }
};


/* ================================
   ELEMENTOS
================================ */

const loginScreen = document.getElementById("loginScreen");
const appScreen = document.getElementById("appScreen");
const salesScreen = document.getElementById("salesScreen");
const infoScreen = document.getElementById("infoScreen");
const reportScreen = document.getElementById("reportScreen");

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");

const loggedUser = document.getElementById("loggedUser");
const welcomeUser = document.getElementById("welcomeUser");
const currentDate = document.getElementById("currentDate");

const storesGrid = document.getElementById("storesGrid");

const reportTitle = document.getElementById("reportTitle");
const powerbiFrame = document.getElementById("powerbiFrame");
const reportLoading = document.getElementById("reportLoading");


/* ================================
   LOGIN
================================ */

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const user = USERS[username];

    if (!user || user.p !== password) {
        loginError.textContent = "Usuário ou senha inválidos.";
        passwordInput.value = "";
        passwordInput.focus();
        return;
    }

    loginError.textContent = "";
    sessionStorage.setItem("user", username);
    showHome(username);
});


/* ================================
   NAVEGAÇÃO
================================ */

function hideAllScreens() {
    loginScreen.classList.add("hidden");
    appScreen.classList.add("hidden");
    salesScreen.classList.add("hidden");
    infoScreen.classList.add("hidden");
    reportScreen.classList.add("hidden");
}

function showHome(username) {
    hideAllScreens();

    appScreen.classList.remove("hidden");

    loggedUser.textContent = "Usuário: " + username;
    welcomeUser.textContent = username;

    updateDate();
}

function showSales() {
    const username = sessionStorage.getItem("user");
    const user = USERS[username];

    if (!user) {
        logout();
        return;
    }

    hideAllScreens();
    salesScreen.classList.remove("hidden");

    renderStores(user.s);
}

function showInfo(section) {
    const data = {
        campaigns: {
            title: "Campanhas em Aberto",
            subtitle: "Ações comerciais e oportunidades",
            icon: "★",
            className: "info-campaigns",
            text: "Esta área será utilizada para concentrar as campanhas comerciais que estão em andamento, facilitando o acompanhamento das ações pelas lojas.",
            badge: "EM BREVE"
        },
        birthdays: {
            title: "Aniversariantes do Mês",
            subtitle: "Datas especiais da equipe",
            icon: "🎂",
            className: "info-birthdays",
            text: "Aqui ficará o calendário de aniversariantes do mês, ajudando a equipe a acompanhar e valorizar as datas especiais dos colaboradores.",
            badge: "EM BREVE"
        },
        focus: {
            title: "Produtos em Foco",
            subtitle: "Prioridades e produtos de destaque",
            icon: "◆",
            className: "info-focus",
            text: "Nesta área serão destacados os produtos que precisam de atenção especial, campanhas de venda, prioridades e oportunidades comerciais.",
            badge: "EM BREVE"
        }
    };

    const item = data[section];
    if (!item) return;

    hideAllScreens();

    infoScreen.classList.remove("hidden");

    document.getElementById("infoHeaderTitle").textContent = item.title;
    document.getElementById("infoHeaderSubtitle").textContent = item.subtitle;

    document.getElementById("infoMain").innerHTML = `
        <div class="info-box ${item.className}">
            <div class="big-icon">${item.icon}</div>
            <h2>${item.title}</h2>
            <p>${item.text}</p>
            <span class="coming">${item.badge}</span>
        </div>
    `;
}


/* ================================
   MENU PRINCIPAL
================================ */

document.querySelectorAll(".menu-card").forEach(function(card) {
    card.addEventListener("click", function() {
        const section = card.dataset.section;

        if (section === "sales") {
            showSales();
        } else {
            showInfo(section);
        }
    });
});


/* ================================
   LOJAS
================================ */

function renderStores(storeList) {
    storesGrid.innerHTML = "";

    storeList.forEach(function(storeNumber) {
        const report = REPORTS[storeNumber];

        const card = document.createElement("button");
        card.className = "store-card";
        card.type = "button";

        card.innerHTML = `
            <div class="store-icon">${storeNumber}</div>
            <h3>Loja ${storeNumber}</h3>
            <p>${report.title}</p>
        `;

        card.addEventListener("click", function() {
            openReport(storeNumber);
        });

        storesGrid.appendChild(card);
    });
}


/* ================================
   POWER BI
================================ */

function openReport(storeNumber) {
    const report = REPORTS[storeNumber];

    if (!report) return;

    hideAllScreens();
    reportScreen.classList.remove("hidden");

    reportTitle.textContent = report.title;
    reportLoading.style.display = "block";

    powerbiFrame.src = report.url;

    powerbiFrame.onload = function() {
        setTimeout(function() {
            reportLoading.style.display = "none";
        }, 900);
    };
}


/* ================================
   VOLTAR
================================ */

document.getElementById("salesHomeButton").addEventListener("click", function() {
    const username = sessionStorage.getItem("user");
    if (username) showHome(username);
});

document.getElementById("infoHomeButton").addEventListener("click", function() {
    const username = sessionStorage.getItem("user");
    if (username) showHome(username);
});

document.getElementById("backButton").addEventListener("click", function() {
    powerbiFrame.src = "about:blank";
    showSales();
});


/* ================================
   LOGOUT
================================ */

function logout() {
    sessionStorage.removeItem("user");

    powerbiFrame.src = "about:blank";

    hideAllScreens();
    loginScreen.classList.remove("hidden");

    usernameInput.value = "";
    passwordInput.value = "";
    loginError.textContent = "";

    usernameInput.focus();
}

document.getElementById("logoutButton").addEventListener("click", logout);
document.getElementById("salesLogoutButton").addEventListener("click", logout);
document.getElementById("infoLogoutButton").addEventListener("click", logout);
document.getElementById("reportLogoutButton").addEventListener("click", logout);


/* ================================
   DATA
================================ */

function updateDate() {
    const now = new Date();

    currentDate.textContent = now.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}


/* ================================
   RESTAURAR SESSÃO
================================ */

window.addEventListener("DOMContentLoaded", function() {
    const savedUser = sessionStorage.getItem("user");

    if (savedUser && USERS[savedUser]) {
        showHome(savedUser);
    } else {
        loginScreen.classList.remove("hidden");
        usernameInput.focus();
    }
});
