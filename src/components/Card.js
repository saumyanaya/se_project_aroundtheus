export default class Card {
  constructor(
    { name, link, likes, _id, userId, ownerId },
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
    this._ownerId = ownerId;
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
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    this.renderLikes();
    this._handleLikeClick();
    return this._cardElement;
  }
  _handleLikeButton() {
    this._handleCardLike({ _id: this._id, likes: this._likes });
  }
  toggleLikes() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, link: this._link })
    );
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick()
    );
    this._checkUserId();
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
    this._cardElement.querySelector(".card__like-counter").textContent =
      this._likes.length;
  }

  _handleLikeClick() {
    this._cardElement.querySelector(".card__like-counter").textContent;
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    }
  }
  _checkUserId() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.classList.add("card__delete-button_inactive");
    }
  }
  remove(_id) {
    this._cardElement.remove(_id);
  }
}
