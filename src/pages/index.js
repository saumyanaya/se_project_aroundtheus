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
// import { data } from "autoprefixer";

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
// let cardListSection;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setProfileAvatar(userData.avatar);
    cardListSection = new Section(
      {
        items: initialCards,
        renderer: ({ data }) => {
          const newCard = createCard({ data });
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
  handleProfileAvatarSubmit
);

// avatar form submit function

function handleProfileAvatarSubmit(url) {
  alert(handleProfileAvatarSubmit);
  editAvatarPopup.setLoading(true);
  api
    .setUserAvatar(url)
    .then((userData) => {
      userInfo.setProfileAvatar(userData.avatar);
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

const deleteCardModalSelector = document.querySelector("#delete-card-modal");
const deleteButtonIcon = document.querySelector("#modal__delete-card-button");

//calling delete popup
deleteButtonIcon.addEventListener("click", () => {
  deleteImagePopup.open();
});

// delete card popup instance

const deleteImagePopup = new PopupWithConfirm(
  deleteCardModalSelector,
  handleCardDelete
);

// function for delete card

function handleCardDelete() {
  alert(handleCardDelete);
  deleteImagePopup.setSubmitAction(() => {
    deleteImagePopup.setLoading(true);
    api
      .deleteCard(data._id)
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
//document
//object
//function
//response
//call
//new card open popup instance
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

const cardOpenPopup = new PopupWithImage(cardOpenModal);
cardOpenPopup.setEventListeners();

function createCard(data) {
  alert(createCard);
  const newCard = new Card(
    data,
    userId,
    "#card",
    function handleCardClick() {
      cardOpenPopup.open(data);
    },
    // function createCard(cardData) {
    //   const card = new Card(cardData, "#card", handleCardClick).generateCard();
    //   return card;
    // }
    // function handleCardClick(name, link) {
    //   cardOpenPopup.open(name, link);
    // }

    //card like count function

    function handleCardLikeClick(data) {
      alert(handleCardLikeClick);
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
  alert(submitCard);
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
  alert(handleEditFormSubmit);
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
