function main() {
  addHeader(document.querySelector(".section-header"));
  abrirYCerrarMenuWelcome();
  addContact(document.querySelector(".contact"));
  addFooter(document.querySelector(".section-footer"));
  sendFormInfo();

  document.querySelector(".contact__title").textContent = "Contacto";
}

main();
