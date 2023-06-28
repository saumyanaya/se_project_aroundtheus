export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardOpenModal = document.querySelector("#card-open-modal");
    this._modalImage = this._cardOpenModal.querySelector("#modal__image");
    this._modalText = this._cardOpenModal.querySelector("#modal__text");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
  _handleTrashButton() {
    this._cardElement.remove();
  }
  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, link: this._link })
    );
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._trashButton.addEventListener("click", () =>
      this._handleTrashButton()
    );
  }
}
