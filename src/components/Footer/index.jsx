import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <div className="footer">
      <hr />
      <p className="container">
        direitos de imagem a Netflix, dados TMDB <br />
        desenvolvido por
        <a href="https://github.com/gusmorini" target="_blank">
          Gustavo Morini
        </a>
      </p>
    </div>
  );
};

export default Footer;
