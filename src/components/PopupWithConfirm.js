import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupElement) {
    super({ popupElement }); // creates the popup element
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
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

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }
}
