import React from "react";

import {
  uppercaseLetters,
  lowercaseLetters,
  symbols,
  numbers,
} from "./utils/characters";

import Form from "./components/Form/Form";

import "./App.scss";

const App = () => {
  const [password, setPassword] = React.useState("");
  const [passwordLength, setPasswordLength] = React.useState(0);
  const [passwordOptions, setPasswordOptions] = React.useState([]);
  const [strengthText, setStrengthText] = React.useState("");
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    handlePasswordStrength();
  }, [passwordLength, passwordOptions]);

  const handleGeneratePassword = () => {
    setIsCopied(false);

    let charactersList = "";

    for (let i = 0; i < passwordOptions.length; i++) {
      switch (passwordOptions[i]) {
        case "Uppercase":
          charactersList += uppercaseLetters;
          break;
        case "Lowercase":
          charactersList += lowercaseLetters;
          break;
        case "Numbers":
          charactersList += numbers;
          break;
        case "Symbols":
          charactersList += symbols;
          break;
      }
    }

    setPassword(handleCreateNewPassword(charactersList));
  };

  const handleCreateNewPassword = (charactersList) => {
    let password = "";
    const charactersListLength = charactersList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * charactersListLength);
      password += charactersList.charAt(characterIndex);
    }

    return password;
  };

  const handlePasswordStrength = () => {
    let strengthText = "";

    switch (true) {
      case passwordLength > 0 && passwordLength < 7:
        strengthText = "Too weak!";
        break;
      case passwordLength >= 7 && passwordLength < 9:
        strengthText = "Weak";
        break;
      case passwordLength >= 9 && passwordLength < 11:
        strengthText = "Medium";
        break;
      case passwordLength >= 11:
        strengthText = "Strong";
        break;
    }

    setStrengthText(strengthText);
  };

  const handleCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setPasswordOptions((prev) => [...prev, value]);
    } else {
      setPasswordOptions((prev) => prev.filter((e) => e !== value));
    }
  };

  const handleCopyToClipboard = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Password Generator</h1>
        <main>
          <div className="output">
            <input
              type="text"
              placeholder="P4$5W0rD!"
              value={password}
              readOnly
            />

            <div className="copy">
              <p>{password.length > 0 && isCopied ? "Copied" : ""}</p>
              <svg
                onClick={handleCopyToClipboard}
                width="21"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
                  fill="#A4FFAF"
                />
              </svg>
            </div>
          </div>

          <Form
            passwordLength={passwordLength}
            setPasswordLength={setPasswordLength}
            handleGeneratePassword={handleGeneratePassword}
            handleCheck={handleCheck}
            strengthText={strengthText}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
