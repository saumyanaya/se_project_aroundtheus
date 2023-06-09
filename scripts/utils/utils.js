// clicking escape to close Modal //

export function openModal(modal) {
  document.addEventListener("keydown", closeWithEscape);
  modal.classList.add("modal_opened");
}
export function closeModal(modal) {
  document.removeEventListener("keydown", closeWithEscape);
  modal.classList.remove("modal_opened");
}
export function closeWithEscape(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

// clicking outside Modal window to close modal //

export function addCloseModalListener(modal) {
  modal.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("modal") ||
      event.target.classList.contains("modal__close")
    ) {
      closeModal(modal);
    }
  });
}
