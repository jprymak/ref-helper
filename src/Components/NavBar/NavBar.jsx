import React from "react";

import { FaInfoCircle } from "react-icons/fa";

import links from "../../Data/links";
import { NavLink } from "Components/NavBar/NavLink";
import { HelpMenu } from "Components/HelpMenu";

import { IconButton } from "Components/IconButton";

import "./index.scss";

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {links.map((link) => (
          <NavLink key={link.id} data={link} />
        ))}
      </ul>
      <IconButton
        className="navbar__button"
        icon={<FaInfoCircle style={{ color: "white" }} />}
        onClick={openModal}
      />
      <HelpMenu isModalOpen={isModalOpen} closeModal={closeModal} />
    </nav>
  );
}
