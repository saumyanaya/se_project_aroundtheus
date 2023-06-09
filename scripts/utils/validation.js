// const showInputError = (modalElement, modalInput, errorMessage, options) => {
//   modalElement.classList.add(options.inputErrorClass);
//   const modalError = modalElement.querySelector(`#${modalInput.id}-error`);
//   modalError.textContent = errorMessage;
//   modalError.classList.add(options.errorClass);
// };

// const hideInputError = (modalElement, modalInput, options) => {
//   modalElement.classList.remove(options.inputErrorClass);
//   const modalError = modalElement.querySelector(`#${modalInput.id}-error`);
//   modalError.classList.remove(options.errorClass);
//   modalError.textContent = "";
// };

// const isValid = (modalElement, modalInput, options) => {
//   if (null != modalInput) {
//     if (!modalInput.validity.valid) {
//       showInputError(
//         modalElement,
//         modalInput,
//         modalInput.validationMessage,
//         options
//       );
//     } else {
//       hideInputError(modalElement, modalInput, options);
//     }
//   }
// };

// const hasInvalidInput = (modalInputList) => {
//   return modalInputList.some((modalInput) => {
//     return !modalInput.validity.valid;
//   });
// };

// const toggleButtonState = (modalInputList, modalButton, options) => {
//   if (hasInvalidInput(modalInputList)) {
//     modalButton.classList.add(options.disabledButtonClass);
//     modalButton.disabled = true;
//     return;
//   } else if (modalButton != null) {
//     modalButton.classList.remove(options.disabledButtonClass);
//     modalButton.disabled = false;
//   }
// };

// const setEventListeners = (modalElement, options) => {
//   const modalInputList = Array.from(
//     modalElement.querySelectorAll(options.inputSelector)
//   );
//   const modalButton = modalElement.querySelector(options.submitButtonSelector);

//   modalInputList.forEach((modalInput) => {
//     modalInput.addEventListener("input", () => {
//       isValid(modalElement, modalInput, options);
//       toggleButtonState(modalInputList, modalButton, options);
//     });
//   });
// };

// const enableValidation = (options) => {
//   const modalList = Array.from(document.querySelectorAll(options.formSelector));
//   modalList.forEach((modalElement) => {
//     modalElement.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(modalElement, options);
//   });
// };

// const config = {
//   formSelector: ".modal",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   disabledButtonClass: "modal__button_inactive",
//   inputErrorClass: "modal__input_type-error",
//   errorClass: "modal__input-error_active",
// };

// enableValidation(config);
