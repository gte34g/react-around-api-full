import React from "react";
import successIcon from "../images/Success.svg";
import failIcon from "../images/Fail.svg"

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <div className={`popup_infoToolTip popup ${isOpen && "popup_active"}`}>
      <div className="popup__content">
        <form className="popup__form">
          <button type="button" className="popup__btn-close" onClick={onClose}>
            &#10006;
          </button>
          {status === "success" ? (
            <div className="login__content">
              <img className="login__image" src={successIcon} alt="" />
              <p className="popup__register-text">
                Success! You have now been registered
              </p>
            </div>
          ) : (
            <div className="login__content">
              <img className="login__image" src={failIcon} alt="" />
              <p className="popup__register-text">
                Oops, something went wrong! Please try again
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default InfoTooltip;