// LTech — scripts do site

document.addEventListener("DOMContentLoaded", function () {
  setActiveNavLink();
  setFooterYear();
  initMobileNav();
  initFaq();
  initProductFilters();
  initContactForm();
  initLogout();
  initDepoimentos();
  initDepoimentoForm();
});

// Depoimentos reais publicados no site.
// Para adicionar um novo depois que o cliente enviar pelo formulário,
// inclua um objeto neste array no formato abaixo:
// { nome: "Nome Completo", contexto: "Cliente notebook", texto: "Texto do depoimento.", nota: 5 }
var depoimentos = [];

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

// Renderiza os depoimentos reais (ou uma mensagem convidando o primeiro)
function initDepoimentos() {
  var grid = document.getElementById("depoimentos-grid");
  if (!grid) return;

  if (!depoimentos.length) {
    grid.innerHTML =
      '<div class="quote-card" style="grid-column:1/-1;text-align:center;">' +
      "<p>Ainda não temos depoimentos publicados. Seja a primeira pessoa a contar sua experiência com a LTech!</p>" +
      "</div>";
    return;
  }

  grid.innerHTML = depoimentos
    .map(function (d) {
      var initials = d.nome
        .split(" ")
        .map(function (p) {
          return p[0];
        })
        .slice(0, 2)
        .join("")
        .toUpperCase();

      var stars = "";
      for (var i = 0; i < 5; i++) {
        stars +=
          '<svg class="icon" viewBox="0 0 24 24"' +
          (i < d.nota ? "" : ' style="opacity:0.25;"') +
          '><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9"/></svg>';
      }

      return (
        '<div class="quote-card">' +
        '<div class="stars">' + stars + "</div>" +
        "<p>&quot;" + d.texto + "&quot;</p>" +
        '<div class="quote-author">' +
        '<span class="avatar">' + initials + "</span>" +
        "<div><strong>" + d.nome + "</strong><span>" + d.contexto + "</span></div>" +
        "</div>" +
        "</div>"
      );
    })
    .join("");
}

// Formulário de depoimento: monta uma mensagem e abre o WhatsApp
function initDepoimentoForm() {
  var form = document.getElementById("depoimento-form");
  if (!form) return;

  var whatsappNumber = "5500000000000"; // TODO: substituir pelo número real (com DDI+DDD)

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var nome = form.querySelector("#dep-nome").value.trim();
    var servico = form.querySelector("#dep-servico").value;
    var nota = form.querySelector("#dep-nota").value;
    var texto = form.querySelector("#dep-texto").value.trim();

    var mensagem =
      "Olá, LTech! Quero deixar um depoimento. Nome: " + nome +
      ". Serviço: " + servico +
      ". Nota: " + nota + " estrelas" +
      ". Depoimento: " + texto;

    var url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(mensagem);

    var successBox = document.getElementById("depoimento-success");
    if (successBox) successBox.classList.add("visible");

    window.open(url, "_blank");
    form.reset();
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
