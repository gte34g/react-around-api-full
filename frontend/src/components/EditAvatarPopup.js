import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onAvatarUpdate }) {
  const avatarRef = React.useRef();

React.useEffect(() => {
  avatarRef.current.value = "";
}, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAvatarUpdate({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Change Profile Picture"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <div className="form popup__form popup__form-avatar">
        <input
          ref={avatarRef}
          id="avatar-url"
          type="url"
          name="link"
          placeholder="Profile Image link"
          className="popup__input-text popup__input"
          required
        />
        <span
          className="popup__error popup__input-error"
          id="avatar-url-error"
        ></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
