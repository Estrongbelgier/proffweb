import React from "react";
import backIcon from "../../assets/images/icons/back.svg";
import logoImg from "../../assets/images/logo.svg";

import "./styles.css";

import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description?: string; // TIP prop opcinal
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="back" />
        </Link>
        <img src={logoImg} alt="proff" />
      </div>
      <div className="header-content">
        <strong>{props.title}</strong>
        {props.children}
        {props.description && <p>{props.description}</p>}
      </div>
    </header>
  );
};

export default PageHeader;
