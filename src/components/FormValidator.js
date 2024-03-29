export default class FormValidator {
  constructor(settings, modalElement) {
    this._modalElement = modalElement;
    this._modal = settings.formSelector;
    this._modalInput = settings.inputSelector;
    this._modalButton = this._modalElement.querySelector(
      settings.submitButtonSelector
    );
    this._modalButtonInactive = settings.disabledButtonClass;
    this._modalInputTypeError = settings.inputErrorClass;
    this._modalInputErrorActive = settings.errorClass;
    this._modalInputInvalid = settings.invalidSelector;
  }

  _showInputError = (modalElement, modalInput, errorMessage) => {
    modalElement.classList.add(this._modalInputTypeError);
    const modalError = this._modalElement.querySelector(
      `#${modalInput.id}-error`
    );
    modalError.textContent = errorMessage;
    modalInput.classList.add(this._modalInputInvalid);
    modalError.classList.add(this._modalInputErrorActive);
  };

  _hideInputError = (modalElement, modalInput) => {
    this._modalElement.classList.remove(this._modalInputTypeError);
    const modalError = modalElement.querySelector(`#${modalInput.id}-error`);
    modalInput.classList.remove(this._modalInputInvalid);
    modalError.classList.remove(this._modalInputErrorActive);
    modalError.textContent = "";
  };

  disableButton() {
    this._modalButton.classList.add(this._modalButtonInactive);
    this._modalButton.disabled = true;
  }

  _isValid = (modalElement, modalInput) => {
    if (null != modalInput) {
      if (!modalInput.validity.valid) {
        this._showInputError(
          modalElement,
          modalInput,
          modalInput.validationMessage
        );
      } else {
        this._hideInputError(modalElement, modalInput);
      }
    }
  };
  _hasInvalidInput = () => {
    return this._modalInputList.some((modalInput) => {
      return !modalInput.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._modalButton.classList.remove(this._modalButtonInactive);
      this._modalButton.disabled = false;
    }
  };

  _setEventListeners = () => {
    this._modalInputList = Array.from(
      this._modalElement.querySelectorAll(this._modalInput)
    );

    this._modalInputList.forEach((modalInput) => {
      modalInput.addEventListener("input", () => {
        this._isValid(this._modalElement, modalInput);
        this._toggleButtonState();
      });
    });
  };
  enableValidation = () => {
    this._modalElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
