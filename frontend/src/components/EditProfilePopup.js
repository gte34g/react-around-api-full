import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about } = currentUser;
  const [userInfo, setUserInfo] = React.useState({ name, about });

  function handleTextChange(e) {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  React.useEffect(() => {
    setUserInfo({ name, about });
  }, [name, about, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: userInfo.name,
      about: userInfo.about,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Edit profile"
      name="Edit Profile Text"
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          onChange={handleTextChange}
          value={userInfo.name || ""}
          id="name-input"
          type="text"
          name="name"
          placeholder="Name"
          className="popup__input-text"
          minLength={2}
          maxLength={40}
          required
        />
        <span
          className="popup__error popup__input-error"
          id="input-name-error"
        />
      </div>
      <div className="popup__field">
        <input
          onChange={handleTextChange}
          value={userInfo.about || ""}
          id="title-input"
          type="text"
          name="about"
          placeholder="About me"
          className="popup__input-text"
          minLength={2}
          maxLength={200}
          required
        />
        <span
          className="popup__error popup__input-error"
          id="input-about-error"
        ></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
