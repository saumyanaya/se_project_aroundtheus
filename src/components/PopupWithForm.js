import Popup from "../components/Popup.js";

export default class PopupWithFrom extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super({ popupElement });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputsObject = {};
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._inputList.forEach((input) => {
      if (input.value !== "") {
        inputsObject[input.name] = input.value;
      }
    });
    return inputsObject;
  }
  setLoading(isLoading, submitSave) {
    if (isLoading) {
      this._popupForm.querySelector(".modal__button").textContent = "Saving...";
    } else {
      this._popupForm.querySelector(".modal__button").textContent = submitSave;
    }
  }
  _submitForm = () => {
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._submitForm);
  }
}
