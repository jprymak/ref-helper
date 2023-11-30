import { useEffect, useRef } from "react";
import React from "react";
import "./index.scss";
import { IoMdClose } from "react-icons/io";
import { IconButton } from "Components/IconButton";
import { useTranslation } from "react-i18next";

interface HelpMenuProps {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

function HelpMenu({ isModalOpen, closeModal, children }: HelpMenuProps) {
  const { t } = useTranslation();
  const ref = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isModalOpen]);

  return (
    <dialog className="menu" ref={ref} onCancel={closeModal}>
      <div className="menu__icon-button">
        <IconButton icon={<IoMdClose />} onClick={closeModal} />
      </div>
      <section>
        <h3>{t("tableLegend")}</h3>
        <ul className="menu__list">
          <li className="menu__list-item">
            <div className="dot dot--green"></div>
            <p>{t("recommended")}</p>
          </li>
          <li className="menu__list-item">
            <div className="dot dot--white"></div>
            <p>{t("acceptable")}</p>
          </li>
          <li className="menu__list-item">
            <div className="dot dot--red"></div>
            <p>{t("diameterTooLow")}</p>
          </li>
          <li className="menu__list-item">
            <div className="dot dot--orange"></div>
            <p>{t("diameterTooWide")}</p>
          </li>
        </ul>
      </section>
      {children}
    </dialog>
  );
}

export default HelpMenu;
