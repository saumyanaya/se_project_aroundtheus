const modalElement = document.querySelector(".modal");
const modalInput = modalElement.querySelector(".modal__input");
const modalError = modalElement.querySelector(`#${modalInput.id}-error`);

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

const isValid = (modalElement, modalInput) => {
  if (null != modalInput) {
    if (!modalInput.validity.valid) {
      showInputError(modalElement, modalInput, modalInput.validationMessage);
    } else {
      hideInputError(modalElement, modalInput);
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
  } else if (modalButton != null) {
    modalButton.classList.remove("modal__button_inactive");
  }
};

modalElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
});
modalInput.addEventListener("input", isValid);

const setEventListeners = (modalElement) => {
  const modalInputList = Array.from(
    modalElement.querySelectorAll(".modal__input")
  );
  const modalButton = modalElement.querySelector(".modal__button");
  toggleButtonState(modalInputList, modalButton);

  modalInputList.forEach((modalInput) => {
    modalInput.addEventListener("input", () => {
      isValid(modalElement, modalInput);
      toggleButtonState(modalInputList, modalButton);
    });
  });
};

const enableValidation = () => {
  const modalList = Array.from(document.querySelectorAll(".modal"));
  modalList.forEach((modalElement) => {
    modalElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(modalElement);
  });
};
enableValidation();
