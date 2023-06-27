export const initialCards = [
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

export const settings = {
  formSelector: ".modal",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  disabledButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type-error",
  errorClass: "modal__input-error_active",
};

//modal elements

export const profileEditButton = document.querySelector(
  "#profile__edit-button"
);
export const profileEditModal = document.querySelector("#profile__edit-modal");
export const profileAddModal = document.querySelector("#profile__add-modal");
export const profileEditCloseButton =
  profileEditModal.querySelector(".modal__close");
export const profileEditForm = document.querySelector("#profile__edit-form");
export const profileAddForm = document.querySelector("#profile__add-form");
export const profileTitle = document.querySelector("#profile__title-input");
export const profileDescription = document.querySelector(
  "#profile__description-input"
);
export const profileAddButton = document.querySelector(".profile__add-button");

export const cardOpenModal = document.querySelector("#card-open-modal");
export const cardTemplate = document.querySelector("#card").content;
export const profileAddCloseButton =
  profileAddModal.querySelector(".modal__close");
export const profileAddSubmitButton =
  profileAddModal.querySelector(".modal__button");
export const cardModalCloseButton =
  cardOpenModal.querySelector(".modal__close");
export const profileTitleSelector = document.querySelector(".profile__title");
export const profileDescriptionSelector = document.querySelector(
  ".profile__description"
);
export const cardTitleInput = document.querySelector("#card__title-input");
export const cardUrlInput = document.querySelector("#card__url-input");
export const cardUrl = document.querySelector(".card__url");
export const cardTitle = document.querySelector(".card__title");
export const modalButton = document.querySelector(".modal__button");
export const cardList = document.querySelector(".cards__list");
export const modalImage = document.querySelector("#modal__image");
