import React from "react";
import logoSvg from "../images/logo/logo__pc.svg";
import { Link, Route, Routes } from "react-router-dom";
export default function Header({ email, onQuit }) {
  return (
    <header className="header page__header">
      <div className="header__flex">
        <div>
          <img className="header__logo" alt="логотип" src={logoSvg} />
        </div>
        <div>
          {email && <span className="header__email">{email}</span>}
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Link className="header__link" to={"/sign-in"}>
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link className="header__link" to={"/sign-up"}>
                  Регистрация
                </Link>
              }
            />
            <Route
              path="/"
              element={
                <Link className="header__link" onClick={onQuit} to={"/sign-in"}>
                  Выйти
                </Link>
              }
            />
          </Routes>
        </div>
      </div>
    </header>
  );
}
