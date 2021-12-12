function addContentTemplate(params = {}) {
  const contentTemplate = document.querySelector("#content__template");
  const contentContainer = document.querySelector(".section__cont");

  contentTemplate.content.querySelector(".content__link").textContent =
  params.url;
  contentTemplate.content.querySelector(".content__link").href =
    params.url;
  contentTemplate.content.querySelector(".content__title").textContent =
    params.title;
  contentTemplate.content.querySelector(".content__description").textContent =
    params.description;
  contentTemplate.content.querySelector(".content__img").src = params.image;

  const contentClone = document.importNode(contentTemplate.content, true);
  contentContainer.appendChild(contentClone);
}

function getContent() {
  return fetch(
    "https://preview.contentful.com/spaces/9h5pwb9sna3t/environments/master/entries?access_token=8174ltNBqVxU2Q_Ye_emF4yKjYRM7AyHl012NREWo7M&&content_type=portfolio"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const contentCollections = data.items.map((item) => {
        const objeto = {
          title: item.fields.title,
          description: item.fields.description,
          imageID: item.fields.image.sys.id,
          includes: data.includes.Asset,
          url: item.fields.link,
        };
        return objeto;
      });
      contentCollections.forEach((x) => {
        let idEncontrado = buscarAsset(x.imageID, x.includes);
        x.image = "https:" + idEncontrado.fields.file.url;
      });
      return contentCollections;
    });
}

function buscarAsset(assetID, includes) {
  const encontrado = includes.find((inc) => {
    return inc.sys.id == assetID;
  });
  return encontrado;
}

function main() {
  addHeader(document.querySelector(".section-header"));
  abrirYCerrarMenuWelcome();
  addContent(document.querySelector(".section"));
  addFooter(document.querySelector(".section-footer"));

  getContent().then(function (content) {
    for (const c of content) {
      addContentTemplate(c);
    }
  });
}

main();
