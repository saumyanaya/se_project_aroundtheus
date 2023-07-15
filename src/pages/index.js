//IMPORTS

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
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import { data } from "autoprefixer";

//-----------------------------------------------------------API---------------------------------------------------------------------------------------------------------------------
//api instance

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "6960473d-b35e-4d3c-8ef0-2e694acf306b",
    "Content-Type": "application/json",
  },
});

let userId;
let cardListSection;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setProfileAvatar(userData.avatar);
    cardListSection = new Section(
      {
        items: initialCards,
        renderer: ({ name, link, _id }) => {
          const newCard = createCard({ name, link, _id });
          cardListSection.addItem(newCard);
        },
      },
      cardList
    );
    cardListSection.renderItems();
  })
  .catch(() => (err) => console.log(err));
//--------------------------------------------------------------AVATAR-------------------------------------------------------------------------------------
//new avatar constants

const profileAvatarModalSelector = document.querySelector(
  "#update-avatar-modal"
);
const profileAvatarPeniclIcon = document.querySelector(
  ".profile__icon-edit-button"
);

//avatar form validator instance

const avatarFormValidator = new FormValidator(
  settings,
  profileAvatarModalSelector
);
avatarFormValidator.enableValidation();

//edit avatar popup instance

const editAvatarPopup = new PopupWithForm(
  profileAvatarModalSelector,
  handleAvatarFormSubmit
);
editAvatarPopup.setEventListeners();

// avatar form submit function

function handleAvatarFormSubmit({ url }) {
  editAvatarPopup.setLoading(true);
  api
    .updateUserInfo(url)
    .then(() => {
      userInfo.setUserInfo(url);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarPopup.setLoading(false, "Save");
    });
}

//calling avatar popup

profileAvatarPeniclIcon.addEventListener("click", () => {
  editAvatarPopup.open();
});

//--------------------------------------------------DELETE-----------------------------------------------------------------------------------
// new delete card const

const deleteCardModalSelector = document.querySelector("#delete-confirm-modal");

// delete card popup instance

const deleteImagePopup = new PopupWithConfirm(
  deleteCardModalSelector,
  handleCardDelete
);
deleteImagePopup.setEventListeners();

// function for delete card

function handleCardDelete() {
  deleteImagePopup.setLoading(true);
  const id = deleteImagePopup.getId();
  api
    .deleteCard(id)
    .then((res) => {
      newCard.remove(res._id);
      deleteImagePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      deleteImagePopup.setLoading(false, "Yes");
    });
  deleteImagePopup.open(data._id);
}

//delete card validator instance

const deleteCardFormValidator = new FormValidator(
  settings,
  deleteCardModalSelector
);
deleteCardFormValidator.enableValidation();

//-----------------------------------------------------------------CARDS--------------------------------------------------------------------

const cardOpenPopup = new PopupWithImage(cardOpenModal);
cardOpenPopup.setEventListeners();

function createCard(data) {
  const newCard = new Card(
    data,
    userId,
    "#card",
    function handleCardClick(data) {
      cardOpenPopup.open(data);
    },

    function handleDeleteClick() {
      console.log(this);
      deleteImagePopup.open();
      deleteImagePopup.setId(data._id);
    },

    //card like count function

    function handleCardLikeClick(data) {
      // alert("handleCardLike");
      api
        .changeLikeCardStatus(data._id, newCard.isLiked())
        .then((res) => {
          const likes = res.likes || [];
          newCard.setLikes(likes);
          newCard.toggleLikes();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  );
  return newCard.generateCard();
}
//-----------------------------------------------------ADD------------------------------------------------------------------------------------------------------------------------------

//add form validator instance

const addCardFormValidator = new FormValidator(settings, profileAddModal);
addCardFormValidator.enableValidation();

//calling new card popup

profileAddButton.addEventListener("click", () => {
  addCardFormValidator.disableButton();
  newCardPopup.open();
});
//function add submit

function submitCard({ title, url }) {
  newCardPopup.setLoading(true);
  api
    .addCard(title, url)
    .then((card) => {
      const newCard = createCard(card);
      cardListSection.prependItem(newCard);
      newCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopup.setLoading(false, "Create");
    });
}
// add profile popup instance

const newCardPopup = new PopupWithForm(profileAddModal, submitCard);
newCardPopup.setEventListeners();

//-----------------------------------------------------EDIT----------------------------------------------------------------------------------------------------------------------------
//user info instance

const userInfo = new UserInfo(
  profileTitleSelector,
  profileDescriptionSelector,
  profileAvatarModalSelector
);

// calling edit popup

profileEditButton.addEventListener("click", openProfilePopup);

//function for edit popup open

function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitle.value = profileName;
  profileDescription.value = description;
  editProfilePopup.open();
}

//edit form validator instance

const editProfileFormValidator = new FormValidator(settings, profileEditModal);
editProfileFormValidator.enableValidation();

// edit profile popup instance

const editProfilePopup = new PopupWithForm(
  profileEditModal,
  handleEditFormSubmit
);
editProfilePopup.setEventListeners();

// function of edit submit

function handleEditFormSubmit({ title, description }) {
  editProfilePopup.setLoading(true);
  api
    .updateUserInfo(title, description)
    .then(() => {
      userInfo.setUserInfo(title, description);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.setLoading(false, "Save");
    });
}
