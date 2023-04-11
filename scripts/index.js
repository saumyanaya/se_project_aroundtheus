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
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileCloseButton = document.querySelector("#profile__close-button");
const profileEditForm = document.querySelector("#profile__edit-form");
const profileTitleInput = document.querySelector("#profile__title-input");
const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

profileEditButton.addEventListener("click", function () {
  profileEditModal.classList.add("modal_opened");
});
profileCloseButton.addEventListener("click", function () {
  profileEditModal.classList.remove("modal_opened");
});
profileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditModal.classList.remove("modal_opened");
});

function getCardElement(data) {
  let cardTemplate = document.querySelector("#card").content;
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  let cardTitle = cardElement.querySelector(".card__title");
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardElement.querySelector(".card__title").textContent = data.name;
  return cardElement;
}
let cardList = document.querySelector(".cards__list");
for (let cardData of initialCards) {
  let cardElement = getCardElement(cardData);
  cardList.append(cardElement);
}
