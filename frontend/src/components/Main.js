import React from "react";
import editBtn from "../images/Edit-Button.svg";
import plusButton from "../images/plusButton.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onDeleteClick,
  onCardLike,
}) {
  const cards = React.useContext(CardsContext);
  const [userInfo, setUserInfo] = React.useState({});
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setUserInfo({
      name: currentUser.name,
      about: currentUser.about,
      avatar: currentUser.avatar,
    });
  }, [currentUser]);

  return (
    <div>
      <main className="main">
        <section className="profile">
          <div className="profile-wrapper">
            <button
              type="button"
              className="button profile__btn-avatar"
              onClick={onEditAvatarClick}
            >
              <img
                src={userInfo.avatar}
                alt="User avatar"
                className="profile__image"
              />
            </button>
            <div className="profile__info">
              <div className="profile__content">
                <h1 className="profile__name" id="heroName">
                  {userInfo.name}
                </h1>
                <button
                  type="button"
                  className="button profile__btn-edit"
                  id="editButton"
                  onClick={onEditProfileClick}
                >
                  <img className="profile__icon" src={editBtn} alt="Edit" />
                </button>
              </div>
              <p className="profile__title" id="heroTitle">
                {userInfo.about}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="button profile__btn-add"
            onClick={onAddPlaceClick}
          >
            <img src={plusButton} alt="A white plus sign" />
          </button>
        </section>
        <section className="photo-grid">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                link={card.link}
                caption={card.name}
                likeCounter={card.likes.length}
                onCardClick={onCardClick}
                onDeleteClick={onDeleteClick}
                onCardLike={() => {
                  onCardLike(card);
                }}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default Main;
