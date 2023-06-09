// import

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/formValidator.js";
import {
  openModal,
  closeModal,
  addCloseModalListener,
} from "../scripts/utils/utils.js";

//initial cards array

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//validation

const settings = {
  formSelector: ".modal",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  disabledButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type-error",
  errorClass: "modal__input-error_active",
};

const formValidators = {};

const enableValidation = (settings) => {
  const modalList = Array.from(
    document.querySelectorAll(settings.formSelector)
  );
  modalList.forEach((modalElement) => {
    const validator = new FormValidator(settings, modalElement);
    const formName = modalElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(settings);

//modal elements

const profileAddButton = document.querySelector("#profile__add-button");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileAddModal = document.querySelector("#profile__add-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileEditForm = document.querySelector("#profile__edit-form");
const profileAddForm = document.querySelector("#profile__add-form");
const profileTitleInput = document.querySelector("#profile__title-input");
const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);
const cardOpenModal = document.querySelector("#card-open-modal");
const cardTemplate = document.querySelector("#card").content;
const profileAddCloseButton = profileAddModal.querySelector(".modal__close");
const profileAddSubmitButton = profileAddModal.querySelector(".modal__button");
const cardModalCloseButton = cardOpenModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardTitleInput = document.querySelector("#card__title-input");
const cardUrlInput = document.querySelector("#card__url-input");
const cardUrl = document.querySelector(".card__url");
const cardTitle = document.querySelector(".card__title");

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileAddButton.addEventListener("click", function () {
  openModal(profileAddModal);
  profileAddSubmitButton.disabled = true;
  profileAddSubmitButton.classList.add("modal__button_inactive");
});
profileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  profileEditForm.reset();
});
profileAddForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const data = { name: cardTitleInput.value, link: cardUrlInput.value };
  const cardElement = new Card(data, "#card").generateCard();
  cardList.prepend(cardElement);
  closeModal(profileAddModal);
  profileAddForm.reset();
});
//render card function
const cardList = document.querySelector(".cards__list");
initialCards.forEach(function (card) {
  const data = card;
  const cardElement = new Card(data, "#card").generateCard();
  cardList.append(cardElement);
});

//clicking outside Modal window to close modal //

addCloseModalListener(profileEditModal);
addCloseModalListener(profileAddModal);
addCloseModalListener(cardOpenModal);
