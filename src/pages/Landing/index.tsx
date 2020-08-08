import React, { useState, useEffect } from "react";
import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClasses from "../../assets/images/icons/give-classes.svg";
import purpleHeart from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../components/Loading";

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  /*   async function getTotal() {
    const total = await api.get("connections");
    return total;
  }
 */
  useEffect(() => {
    api.get("connections").then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="landing">
      <div id="landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="proff" />
          <h2>Your platform to study!</h2>
        </div>

        <img src={landingImg} alt="study platform" className="hero-image" />

        <div className="buttons-container">
          <Link to="study" className="study">
            <img src={studyIcon} alt="Study" />
          </Link>

          <Link to="give-classes" className="give-classes">
            <img src={giveClasses} alt="Give Classes" />
          </Link>
        </div>
        <span className="total-connections">
          {!totalConnections ? (
            <Loading typeOf="bubbles" color="#d4c2ff" w="50" h="50" />
          ) : (
            `Total of ${totalConnections} connections`
          )}
          <img src={purpleHeart} alt="purple heart" />
        </span>
      </div>
    </div>
  );
};

export default Landing;
