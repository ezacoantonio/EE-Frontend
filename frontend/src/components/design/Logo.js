import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../../assets/1.png";
import logo2 from "../../assets/2.png";
import logo3 from "../../assets/3.png";
import logo4 from "../../assets/4.png";

const Logo = ({ logoNumber, isLinked = true }) => {
  let logoUrl;
  switch (logoNumber) {
    case 1:
      logoUrl = logo1;
      break;
    case 2:
      logoUrl = logo2;
      break;
    case 3:
      logoUrl = logo3;
      break;
    case 4:
      logoUrl = logo4;
      break;
    default:
      logoUrl = logo1; // Default logo if no number or invalid number is provided
  }

  const logoImage = (
    <img
      src={logoUrl}
      alt={`Logo ${logoNumber}`}
      style={{ height: "100%", maxHeight: "64px" }}
    />
  );

  return isLinked ? <Link to="/">{logoImage}</Link> : logoImage;
};

export default Logo;
