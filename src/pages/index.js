// imports

import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import {
  initialCards,
  settings,
  profileTitleSelector,
  profileDescriptionSelector,
  profileEditModal,
  profileEditButton,
  profileAddModal,
  profileAddButton,
  profileDescription,
  profileTitle,
  cardList,
  cardOpenModal,
} from "../utils/constants.js";

// profileEditForm.addEventListener("submit", function (evt) {
//   evt.preventDefault();
//   profileTitle.textContent = profileTitle.value;
//   profileDescription.textContent = profileDescription.value;
//   closeModal(profileEditModal);
//   profileEditForm.reset();
// });

// profileAddForm.addEventListener("submit", function (evt) {
//   evt.preventDefault();
//   const data = { name: cardTitleInput.value, link: cardUrlInput.value };
//   const newCard = createCard(data);
//   cardList.prepend(newCard);
//   profileAddForm.reset();
//   closeModal(profileAddModal);
// });

//card function

// const cardList = document.querySelector(".cards__list");

function createCard(cardData) {
  const card = new Card(cardData, "#card", handleCardClick).generateCard();
  return card;
}
initialCards.forEach((card) => {
  cardList.append(createCard(card));
});

//Form Validator

const addCardFormValidator = new FormValidator(settings, profileAddModal);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(settings, profileEditModal);
editProfileFormValidator.enableValidation();

//SECTION TO RENDER CARDS

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

const newCardPopup = new PopupWithForm(profileAddModal, submitCard);
newCardPopup.setEventListeners();

const cardOpenPopup = new PopupWithImage(cardOpenModal);
cardOpenPopup.setEventListeners();

//userInfo

const userInfo = new UserInfo(profileTitleSelector, profileDescriptionSelector);

const editProfilePopup = new PopupWithForm(profileEditModal, (inputsObject) => {
  userInfo.setUserInfo(inputsObject.title, inputsObject.description);
  editProfilePopup.close();
});

profileEditButton.addEventListener("click", openProfilePopup);

profileAddButton.addEventListener("click", () => {
  addCardFormValidator.disableButton();
  //addCardFormValidator.toggleButtonState();
  newCardPopup.open();
});

// profileEditButton.addEventListener("click", () {
//    profileTitle.value = profileTitle.textContent;
//    profileDescription.value = profileDescription.textContent;
//    popup
//  });

// profileAddButton.addEventListener("click", function () {
//   addCardFormValidator.disableButton();
//   newCardPopup.open();
// cardOpenModal(profileAddModal);
// });

function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitle.value = profileName;
  profileDescription.value = description;
  // editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
}
function submitCard({ title, url }) {
  alert("submit form index");
  const newCardData = { name: title, link: url };
  const newCard = createCard(newCardData); // creates "newCard" & stores the function returned execution of createCard fn
  cardListSection.prependItem(newCard); // prepend method from Section class
  newCardPopup.close();
}

function handleCardClick(name, link) {
  alert("handle card click");
  cardOpenPopup.open(name, link);
}
