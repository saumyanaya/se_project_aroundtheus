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

//CARD FUNCTIONS

function createCard(cardData) {
  const card = new Card(cardData, "#card", handleCardClick).generateCard();
  return card;
}

//FORM VALIDATOR

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

// //POPUP WITH FORM

const newCardPopup = new PopupWithForm(profileAddModal, submitCard);
newCardPopup.setEventListeners();

const cardOpenPopup = new PopupWithImage(cardOpenModal);
cardOpenPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  profileEditModal,
  handleEditFormSubmit
);
editProfilePopup.setEventListeners();

//PROFILE INFO

const userInfo = new UserInfo(profileTitleSelector, profileDescriptionSelector);

profileAddButton.addEventListener("click", () => {
  addCardFormValidator.disableButton();
  newCardPopup.open();
});
profileEditButton.addEventListener("click", openProfilePopup);

//FUNCTIONS TO OPEN/CLOSE POPUP

function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitle.value = profileName;
  profileDescription.value = description;
  editProfilePopup.open();
}
function submitCard({ title, url }) {
  const newCardData = { name: title, link: url };
  const newCard = createCard(newCardData);
  cardListSection.prependItem(newCard);
  newCardPopup.close();
}

function handleCardClick(name, link) {
  cardOpenPopup.open(name, link);
}
function handleEditFormSubmit(inputObj) {
  userInfo.setUserInfo(inputObj.title, inputObj.description);
  editProfilePopup.close();
}
