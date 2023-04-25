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
  profileEditModal.classList.add("modal_opened");
});
profileAddButton.addEventListener("click", function () {
  profileAddModal.classList.add("modal_opened");
});
profileEditCloseButton.addEventListener("click", function () {
  profileEditModal.classList.remove("modal_opened");
});

profileAddCloseButton.addEventListener("click", function () {
  profileAddModal.classList.remove("modal_opened");
});
cardModalCloseButton.addEventListener("click", function () {
  cardOpenModal.classList.remove("modal_opened");
});
profileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditModal.classList.remove("modal_opened");
});
profileAddForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({ name, link });
  cardList.prepend(cardElement);
  profileAddModal.classList.remove("modal_opened");
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_active");
  });
  const modalImage = document.querySelector("#modal__image");
  const modalText = document.querySelector("#modal__text");
  cardImage.addEventListener("click", function () {
    modalImage.src = data.link;
    modalText.alt = data.name;
    modalText.textContent = data.name;
    cardOpenModal.classList.add("modal_opened");
  });
  const trashButton = cardElement.querySelector(".card__trash-button");
  const cardList = cardElement.querySelector(".card");
  trashButton.addEventListener("click", function () {
    cardList.remove("card");
  });
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}
const cardList = document.querySelector(".cards__list");
initialCards.forEach(function (card) {
  const data = card;
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});
