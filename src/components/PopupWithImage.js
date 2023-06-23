import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._modalImage = document.querySelector(".modal__image");
    this._modalText = document.querySelector(".modal__text");
  }

  open({ name, link }) {
    this._modalImage.alt = name;
    this._modalText.textContent = name;
    this._modalImage.src = link;
    super.open();
  }
}
