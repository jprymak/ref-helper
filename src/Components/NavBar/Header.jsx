import React, { useState, useEffect } from "react";
import i18next from "i18next";
import { PL, GB } from "country-flag-icons/react/3x2";

import { FaInfoCircle } from "react-icons/fa";

import links from "../../Data/links";
import { NavLink } from "Components/NavBar/NavLink";
import { HelpMenu } from "Components/HelpMenu";

import { IconButton } from "Components/IconButton";

import "./index.scss";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [language, setLanguage] = useState("pl");

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pl" : "en"));
  };

  return (
    <header className="header">
      <h1 className="header__text">{t("sizePipe")}</h1>
      <nav className="navbar">
        <ul className="navbar__list">
          {links.map((link) => (
            <NavLink key={link.id} data={link} />
          ))}
        </ul>
      </nav>

      <button className="header__lang" onClick={toggleLanguage}>
        {language === "en" ? <PL title="Poland" /> : <GB title="England" />}
      </button>
      <IconButton
        className="navbar__button"
        icon={<FaInfoCircle style={{ color: "white" }} />}
        onClick={openModal}
      />
      <HelpMenu isModalOpen={isModalOpen} closeModal={closeModal} />
    </header>
  );
}
