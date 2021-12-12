function addWelcomeTemplate(params = {}) {
  const welcomeTemplate = document.querySelector("#welcome__template");
  const welcomeContainer = document.querySelector(".welcome__titulos");

  welcomeTemplate.content.querySelector(".welcome__titulo").textContent =
    params.title;
  welcomeTemplate.content.querySelector(".welcome__subtitulo").textContent =
    params.subtitle;

  const welcomeClone = document.importNode(welcomeTemplate.content, true);
  welcomeContainer.appendChild(welcomeClone);
}

function getWelcome() {
  return fetch(
    "https://preview.contentful.com/spaces/9h5pwb9sna3t/environments/master/entries?access_token=8174ltNBqVxU2Q_Ye_emF4yKjYRM7AyHl012NREWo7M&&content_type=welcome"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const welcomeCollections = data.items.map((item) => {
        const objeto = {
          title: item.fields.title,
          subtitle: item.fields.subtitle,
        };
        return objeto;
      });
      return welcomeCollections;
    });
}

function addPresentationTemplate(params = {}) {
  const presentationTemplate = document.querySelector(
    "#presentation__template"
  );
  const presentationContainer = document.querySelector(".presentation__cont");

  presentationTemplate.content.querySelector(
    ".presentation__titulo"
  ).textContent = params.title;
  presentationTemplate.content.querySelector(
    ".presentation__parrafo"
  ).textContent = params.description;
  presentationTemplate.content.querySelector(".presentation__persona").src =
    params.image;

  const presentationClone = document.importNode(
    presentationTemplate.content,
    true
  );
  presentationContainer.appendChild(presentationClone);
}

function getPresentation() {
  return fetch(
    "https://preview.contentful.com/spaces/9h5pwb9sna3t/environments/master/entries?access_token=8174ltNBqVxU2Q_Ye_emF4yKjYRM7AyHl012NREWo7M&&content_type=presentation"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const presentationCollections = data.items.map((item) => {
        const objeto = {
          title: item.fields.title,
          description: item.fields.description,
          imageID: item.fields.persona.sys.id,
          includes: data.includes.Asset,
        };
        return objeto;
      });
      presentationCollections.forEach((x) => {
        let idEncontrado = buscarAsset(x.imageID, x.includes);
        x.image = "https:" + idEncontrado.fields.file.url;
      });
      return presentationCollections;
    });
}

function buscarAsset(assetID, includes) {
  const encontrado = includes.find((inc) => {
    return inc.sys.id == assetID;
  });
  return encontrado;
}

function addServicesTemplate(params = {}) {
  const servicesTemplate = document.querySelector("#services__template");
  const servicesContainer = document.querySelector(".services__cont");

  servicesTemplate.content.querySelector(".service__title").textContent =
    params.title;
  servicesTemplate.content.querySelector(".service__parrafo").textContent =
    params.description;
  servicesTemplate.content.querySelector(".service__image").src = params.image;

  const servicesClone = document.importNode(servicesTemplate.content, true);
  servicesContainer.appendChild(servicesClone);
}

function getServices() {
  return fetch(
    "https://preview.contentful.com/spaces/9h5pwb9sna3t/environments/master/entries?access_token=8174ltNBqVxU2Q_Ye_emF4yKjYRM7AyHl012NREWo7M&&content_type=services"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const servicesCollections = data.items.map((item) => {
        const objeto = {
          title: item.fields.title,
          description: item.fields.description,
          imageID: item.fields.imagen.sys.id,
          includes: data.includes.Asset,
        };
        return objeto;
      });
      servicesCollections.forEach((x) => {
        let idEncontrado = buscarAsset(x.imageID, x.includes);
        x.image = "https:" + idEncontrado.fields.file.url;
      });
      return servicesCollections;
    });
}

function main() {
  addContact(document.querySelector(".contact"));
  addHeader(document.querySelector(".section-header"));
  addFooter(document.querySelector(".section-footer"));
  abrirYCerrarMenuWelcome();
  sendFormInfo();

  getWelcome().then(function (welcome) {
    for (const w of welcome) {
      addWelcomeTemplate(w);
    }
  });

  getPresentation().then(function (selection) {
    for (const s of selection) {
      addPresentationTemplate(s);
    }
  });

  getServices().then(function (services) {
    for (const s of services) {
      addServicesTemplate(s);
    }
  });
}

main();
