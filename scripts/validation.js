const showInputError = (modalElement, modalInput, errorMessage) => {
  modalElement.classList.add("modal__input_type-error");
  const modalError = modalElement.querySelector(`#${modalInput.id}-error`);
  modalError.textContent = errorMessage;
  modalError.classList.add("modal__input-error_active");
};

const hideInputError = (modalElement, modalInput) => {
  modalElement.classList.remove("modal__input_type-error");
  const modalError = modalElement.querySelector(`#${modalInput.id}-error`);
  modalError.classList.remove("modal__input-error_active");
  modalError.textContent = "";
};

const isValid = (modalElement, modalInput, options) => {
  if (null != modalInput) {
    if (!modalInput.validity.valid) {
      showInputError(
        modalElement,
        modalInput,
        modalInput.validationMessage,
        options
      );
    } else {
      hideInputError(modalElement, modalInput, options);
    }
  }
};

const hasInvalidInput = (modalInputList) => {
  return modalInputList.some((modalInput) => {
    return !modalInput.validity.valid;
  });
};

const toggleButtonState = (modalInputList, modalButton) => {
  if (hasInvalidInput(modalInputList)) {
    modalButton.classList.add("modal__button_inactive");
    modalButton.disabled = true;
    return;
  } else if (modalButton != null) {
    modalButton.classList.remove("modal__button_inactive");
    modalButton.disabled = false;
  }
};

const setEventListeners = (modalElement, options) => {
  const modalInputList = Array.from(
    modalElement.querySelectorAll(".modal__input")
  );
  const modalButton = modalElement.querySelector(".modal__button");
  toggleButtonState(modalInputList, modalButton, options);

  modalInputList.forEach((modalInput) => {
    modalInput.addEventListener("input", () => {
      isValid(modalElement, modalInput, options);
      toggleButtonState(modalInputList, modalButton, options);
    });
  });
};

const enableValidation = (options) => {
  const modalList = Array.from(document.querySelectorAll(".modal"));
  modalList.forEach((modalElement) => {
    modalElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(modalElement, options);
  });
};
enableValidation();

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  disabledButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input_type_active",
};

enableValidation(config);
