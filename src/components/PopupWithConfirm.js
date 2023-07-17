import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super({ popupElement });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  setLoading(isLoading, submitSave) {
    if (isLoading) {
      this._popupForm.querySelector(".modal__button").textContent =
        "Deleting...";
    } else {
      this._popupForm.querySelector(".modal__button").textContent = submitSave;
    }
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);
  }
  setId(id) {
    this._id = id;
  }
  setCard(card) {
    this._card = card;
  }
  getId() {
    console.log(this);
    return this._id;
  }
  remove() {
    this._card.remove();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }
}
