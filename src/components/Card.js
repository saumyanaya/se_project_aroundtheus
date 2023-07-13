export default class Card {
  constructor(
    { name, link, likes, _id, userId },
    myId,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleCardLike
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likes = likes;
    this._id = _id;
    this._myId = myId;
    this._userId = userId;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLike = handleCardLike;
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
  _getData() {
    const data = {
      name: this._name,
      link: this._link,
    };
    return data;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likes.some((like) => {
      return like._id === this._myId;
    });
  }

  setLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  renderLikes() {
    this._element.querySelector(".card__like-counter").textContent =
      this._likes.length;
  }

  toggleLikes() {
    if (this.isLiked()) {
      this._element
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
    }
  }

  _handleLikeClick() {
    this._element.querySelector(".card__like-counter").textContent =
      this._likes.length;
    if (this.isLiked()) {
      this._element
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    }
  }

  _handleLikeIcon() {
    this._handleCardLike({ _id: this._id, likes: this._likes });
    this.renderLikes();
    this._handleLikeClick();
  }

  remove() {
    this._element.remove();
  }
}
