function ImagePopup(props) {
  return (
    <div
      className={`popup popup-preview ${props.isOpen ? "popup_active" : ""}`}
    >
      <div className="popup__content popup__window-large">
        <button
          className="button popup__btn-close popup__close-preview"
          onClick={props.onClose}
        >
          &#10006;
        </button>
        <img
          className="popup__img"
          src={`${props.card.link}`}
          alt={props.card.name}
        />
        <p className="popup__description">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
