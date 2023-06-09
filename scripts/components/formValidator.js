// contain formValidator class
// exported
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
  }

  _showInputError = (modalElement, modalInput, errorMessage) => {
    modalElement.classList.add(this._modalInputTypeError);
    const modalError = this._modalElement.querySelector(
      `#${modalInput.id}-error`
    );
    modalError.textContent = errorMessage;
    modalError.classList.add(this._modalInputErrorActive);
  };

  _hideInputError = (modalElement, modalInput) => {
    this._modalElement.classList.remove(this._modalInputTypeError);
    const modalError = modalElement.querySelector(`#${modalInput.id}-error`);
    modalError.classList.remove(this._modalInputErrorActive);
    modalError.textContent = "";
  };

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

  _toggleButtonState = (modalInputList, modalButton) => {
    if (this._hasInvalidInput(modalInputList)) {
      this._modalButton.classList.add(this._modalButtonInactive);
      this._modalButton.disabled = true;
      return;
    } else if (modalButton != null) {
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
