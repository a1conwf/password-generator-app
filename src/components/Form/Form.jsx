import React from "react";

import Checkbox from "../../ui/Checkbox/Checkbox";

import styles from "./Form.module.scss";

const checkboxList = [
  {
    id: 1,
    value: "Uppercase",
    text: "Include Uppercase Letters",
  },
  {
    id: 2,
    value: "Lowercase",
    text: "Include Lowercase Letters",
  },
  {
    id: 3,
    value: "Numbers",
    text: "Include Numbers",
  },
  {
    id: 4,
    value: "Symbols",
    text: "Include Symbols",
  },
];

const strengthBarClasses = [
  styles.tooWeak,
  styles.weak,
  styles.medium,
  styles.strong,
];

const Form = (props) => {
  const {
    passwordLength,
    setPasswordLength,
    strengthText,
    handleGeneratePassword,
    handleCheck,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGeneratePassword();
  };

  const getSliderBackgroundSize = () => {
    return { backgroundSize: `${(passwordLength * 100) / 20}% 100%` };
  };

  const getStrengthBarClass = () => {
    let barClass = "";

    switch (strengthText) {
      case "Too weak!":
        barClass = strengthBarClasses[0];
        break;
      case "Weak":
        barClass = strengthBarClasses[1];
        break;
      case "Medium":
        barClass = strengthBarClasses[2];
        break;
      case "Strong":
        barClass = strengthBarClasses[3];
        break;
    }

    return barClass;
  };

  const strengthBarClass = getStrengthBarClass();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.passLength}>
        <div className={styles.header}>
          <p>Characters Length</p>
          <span>{passwordLength}</span>
        </div>

        <input
          type="range"
          className={styles.slider}
          min="0"
          max="20"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          style={getSliderBackgroundSize()}
        />
      </div>

      <div className={styles.passOptions}>
        {checkboxList.map((item) => (
          <Checkbox
            key={item.id}
            handleCheck={(e) => handleCheck(e)}
            {...item}
          />
        ))}
      </div>

      <div className={styles.passStrength}>
        <p>Strength</p>
        <div className={styles.strengthStates}>
          <p>{passwordLength <= 0 ? "" : strengthText}</p>
          <div className={`${styles.strengthBars} ${strengthBarClass}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      <button>
        Generate
        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#24232C"
            d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
          />
        </svg>
      </button>
    </form>
  );
};

export default Form;
