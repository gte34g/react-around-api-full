import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onCardsUpdate }) {
  const [card, setCard] = React.useState({ name: "", link: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onCardsUpdate({
      name: card.name,
      link: card.link,
    });
  }
  React.useEffect(() => {
    setCard((card) => ({ ...card, name: "", link: "" }));
  }, [isOpen]);

  return (
    <PopupWithForm
      title="New place"
      name="add_place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Create"
    >
      <div className="popup__field">
        <input
          onChange={handleChange}
          value={card.name || ""}
          id="place-title-input"
          type="text"
          name="name"
          placeholder="Title"
          className="popup__input-text popup__input"
          required
          minLength="1"
          maxLength="30"
        />
        <span
          className="popup__error popup__input-error"
          id="input-place-error"
        ></span>
      </div>
      <div className="popup__field">
        <input
          onChange={handleChange}
          value={card.link || ""}
          id="input-url"
          type="url"
          name="link"
          placeholder="Image link"
          className="popup__input-text popup__input"
          required
        />
        <span className="form__input-error place-url-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
