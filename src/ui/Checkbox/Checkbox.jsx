import React from "react";

import styles from "./Checkbox.module.scss";

const Checkbox = ({ text, value, handleCheck }) => {
  return (
    <label className={styles.customCheckbox}>
      {text}
      <input type="checkbox" value={value} onChange={handleCheck} />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
