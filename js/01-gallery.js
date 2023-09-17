import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

gallery.innerHTML = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}">
    </a>
    </li>`;
  })
  .join("");

gallery.addEventListener("click", handleClick);
let instance = "";

function handleClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  //   const { original, description } = galleryItems.find(({ description }) => {
  //     return description === event.target.getAttribute("alt");
  //   });
  const description = event.target.getAttribute("alt");
  const original = event.target.dataset.source;
  instance = basicLightbox.create(
    `
  <img src="${original}" alt="${description}">
  `,
    {
      onShow: () => {
        document.addEventListener("keydown", handleClose);
      },
      onClose: () => {
        document.removeEventListener("keydown", handleClose);
      },
    }
  );
  instance.show();
}

function handleClose(event) {
  if (event.key !== "Escape") {
    return;
  }
  instance.close();
}
