function addHeader(el) {
  const headerEl = document.createElement("header");

  headerEl.innerHTML = `
      <a href="/home/index.html" class="logo">ARRASCAETA</a>
            <nav class="header__links">
              <ul class="header__list">
                <li class="header__items">
                  <a href="../portfolio/portfolio.html" class="header__link">Portfolio</a>
                  <a href="/servicios/servicios.html" class="header__link">Servicios</a>
                  <a href="/contact/contact.html" class="header__link">Contacto</a>
                </li>
              </ul>
            </nav>
            <img
              src="/imgs/menu-icono.png"
              alt="header-icono"
              class="header__menu-icono"
            />
          </header>
          <div class="menu">
            <h2 class="menu__close">X</h2>
            <a href="/portfolio/portfolio.html" class="menu__option">Portfolio</a>
        <a href="/servicios/servicios.html" class="menu__option">Servicios</a>
        <a href="/contact/contact.html" class="menu__option">Contacto</a>
          </div>
      `;
  headerEl.classList.add("header");
  el.appendChild(headerEl);
}

function abrirYCerrarMenuWelcome() {
  const menuIconoEl = document.querySelector(".header__menu-icono");
  const menuCloseEl = document.querySelector(".menu__close");
  const menuEl = document.querySelector(".menu");

  menuIconoEl.addEventListener("click", (ev) => {
    menuEl.style.display = "block";
  });

  menuCloseEl.addEventListener("click", (ev) => {
    menuEl.style.display = "";
  });
}

function addFooter(el) {
  const footerEl = document.createElement("footer");

  footerEl.innerHTML = `
  <div class="footer__content">
    <p class="logo footer__logo">ARRASCAETA</p>
    <div class="footer__redes">
      <p class="footer__red insta">Instagram</p>
      <p class="footer__red linkedin">Linkedin</p>
      <p class="footer__red github">Github</p>
    </div>
  </div>
      `;
  footerEl.classList.add("footer");
  el.appendChild(footerEl);
}

function addContent(el) {
  const contentEl = document.createElement("div");

  contentEl.innerHTML = `
  <div class="section__cont"></div>
      <template id="content__template">
        <div class="content">
          <div class="content__cont-img">
            <img src="/imgs/service.png" alt="" class="content__img" />
          </div>
          <h3 class="content__title">Desarrollo de apps</h3>
          <p class="content__description parrafo">
            Algo interesante sobre mi Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nulla dui quam, sollicitudin at enim id, sodales
            vehicula.
          </p>
          <a href="" class="content__link"></a>
        </div>
      </template>
  `;

  contentEl.classList.add("section__div");
  el.appendChild(contentEl);
}

function sendFormInfo() {
  const formEl = document.querySelector(".contact__form");

  formEl.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const formData = new FormData(evento.target);
    const datosObj = Object.fromEntries(formData.entries());

    fetch("https://apx-api.vercel.app/api/utils/dwf", {
      method: "POST",
      headers: { "content-type": "application/json" },

      body: JSON.stringify({
        to: "facundoarrascaetacba@gmail.com",
        message: `
        Nombre: ${datosObj.name} <br> <br>
        Email: ${datosObj.email} <br> <br>
        Mensaje: ${datosObj.mensaje}
        `,
      }),
    });
    formEl.reset();
    alert(
      "Mensaje enviado correctamente. Gracias " +
        datosObj.name +
        " por comunicarte."
    );
  });
}

function addContact(el) {
  const contactEl = document.createElement("div");

  contactEl.innerHTML = `
        <h2 class="titulo titulo--sub contact__title">Escribime</h2>
        <form class="contact__form">
          <label class="contact__label">
            <h2 class="contact__subtitle" >Nombre</h2>
            <input type="text" class="contact__input" name="name" />
          </label>

          <label class="contact__label">
            <h2 class="contact__subtitle">Email</h2>
            <input type="email" class="contact__input" name="email"  />
          </label>

          <label class="contact__label">
            <h2 class="contact__subtitle">Mensaje</h2>
            <textarea
            name="mensaje"  
            class="contact__textarea contact__input"
              name="contact__textarea"
              cols="30"
              rows="8"
            ></textarea>
          </label>
          <button class="contact__button">Enviar</button>
        </form>
  `;

  contactEl.classList.add("contact__cont");
  el.appendChild(contactEl);
}
