import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  likeCounter,
  name,
  link,
  onCardClick,
  onDeleteClick,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn
    ? "place__btn-trash"
    : "place__btn-trash_hidden";

  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = isLiked
    ? "place__btn-hart_active"
    : "place__btn-hart";

  function handleClick() {
    onCardClick(card);
  }
  function handleRemoveModal() {
    onDeleteClick(card);
  }
  function handleCardLike() {
    onCardLike(card);
  }

  return (
    <div className="place__item">
      <img
        className="place__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <button
        className={`place__btn-trash ${cardDeleteButtonClassName}`}
        onClick={handleRemoveModal}
      ></button>
      <div className="place__info">
        <h2 className="place__text">{card.name}</h2>
        <div className="likes-wrapper">
          <button
            className={`place__btn-hart ${cardLikeButtonClassName}`}
            onClick={handleCardLike}
            type="button"
          ></button>
          <p className="place__hart-counts">{likeCounter}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
