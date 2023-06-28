import Popup from "./Popup.js";
import { modalImage } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImageElement = modalImage;
    this._previewImageCaption = document.querySelector(".modal__text");
  }

  open({ name, link }) {
    alert("popup with image open");
    this._previewImageElement.alt = name;
    this._previewImageCaption.textContent = name;
    this._previewImageElement.src = link;
    super.open();
  }
}
