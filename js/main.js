// LTech — scripts do site

document.addEventListener("DOMContentLoaded", function () {
  setActiveNavLink();
  setFooterYear();
  initMobileNav();
  initFaq();
  initProductFilters();
  initContactForm();
  initLogout();
});

// Marca o link do menu correspondente à página atual
function setActiveNavLink() {
  var current = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

function setFooterYear() {
  var el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// Menu mobile (hambúrguer)
function initMobileNav() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
    });
  });
}

// Accordion de perguntas frequentes
function initFaq() {
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// Filtro de categorias na página de Produtos
function initProductFilters() {
  var buttons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll("[data-category]");
  if (!buttons.length || !cards.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      var filter = btn.getAttribute("data-filter");

      cards.forEach(function (card) {
        var match = filter === "todos" || card.getAttribute("data-category") === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });
}

// Encerra a sessão local e volta para a tela de login
function initLogout() {
  var link = document.getElementById("logout-link");
  if (!link) return;

  link.addEventListener("click", function (event) {
    event.preventDefault();
    sessionStorage.removeItem("ltech_auth");
    window.location.replace("login.html");
  });
}

// Formulário de contato: monta uma mensagem e abre o WhatsApp
function initContactForm() {
  var form = document.querySelector(".contact-form");
  if (!form) return;

  var whatsappNumber = "5500000000000"; // TODO: substituir pelo número real (com DDI+DDD)

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.querySelector("#nome").value.trim();
    var phone = form.querySelector("#telefone").value.trim();
    var subject = form.querySelector("#assunto").value;
    var message = form.querySelector("#mensagem").value.trim();

    var text =
      "Olá, LTech! Meu nome é " + name +
      ". Assunto: " + subject +
      ". Telefone: " + phone +
      ". Mensagem: " + message;

    var url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);

    var successBox = form.querySelector(".form-success");
    if (successBox) successBox.classList.add("visible");

    window.open(url, "_blank");
    form.reset();
  });
}
