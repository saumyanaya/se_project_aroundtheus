// imports

import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import {
  openModal,
  closeModal,
  addCloseModalListener,
} from "../utils/utils.js";

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

//modal elements

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
const profileAddButton = document.querySelector(".profile__add-button");

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
const modalButton = document.querySelector(".modal__button");

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileAddButton.addEventListener("click", function () {
  addCardFormValidator.disableButton();
  openModal(profileAddModal);
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
  const newCard = createCard(data);
  cardList.prepend(newCard);
  profileAddForm.reset();
  closeModal(profileAddModal);
});

//card function

const cardList = document.querySelector(".cards__list");

function createCard(cardData) {
  const card = new Card(cardData, "#card").generateCard();
  return card;
}
initialCards.forEach((card) => {
  cardList.append(createCard(card));
});

//clicking outside Modal window to close modal //

addCloseModalListener(profileEditModal);
addCloseModalListener(profileAddModal);
addCloseModalListener(cardOpenModal);

//Form Validator

const addCardFormValidator = new FormValidator(settings, profileAddModal);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(settings, profileEditModal);
editProfileFormValidator.enableValidation();

//Section Class

const cardListSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const newCard = createCard({ name, link });
      cardListSection.addItem(newCard);
    },
  },
  cardList
);

cardListSection.renderItems();

// //Popup with form

const newCardPopup = new PopupWithForm(profileAddModal);
const previewImageModal = new PopupWithImage("#modal__image");
previewImageModal.setEventListeners();

profileAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

//userInfo

const userInfo = new UserInfo(profileTitle, profileDescription);

const editProfilePopup = new PopupWithForm(profileEditModal, (inputsObject) => {
  userInfo.setUserInfo(inputsObject.title, inputsObject.description);
  editProfilePopup.close();
});

profileEditButton.addEventListener("click", openProfilePopup);

function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitle.value = profileName;
  profileDescription.value = description;
  editProfilePopup.open();
}
