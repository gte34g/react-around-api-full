import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  children,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup_${name} 
      ${isOpen ? "popup_active" : ""}`}
    >
      <div className="popup__content">
        <form className="form popup__form" onSubmit={onSubmit}>
          <button
            className="button popup__btn-close"
            type="button"
            onClick={onClose}
          >
            &#10006;
          </button>
          <h2 className="popup__header">{title}</h2>
          {children}
          <button className="button popup__btn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
