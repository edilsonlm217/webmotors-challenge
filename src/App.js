import React from 'react';
import { AiOutlineCar } from 'react-icons/ai';
import { MdMotorcycle } from 'react-icons/md';


import logo from './assets/webmotors-logo.png';
import './app.css';

function App() {
  return (
    <div className="container">
      <header className="header_style">
          <img className="logo_style" src={logo} alt="webmotors-logo"/>
      </header>
      <nav className="nav_style">
        <div className="buy_btns_container">
          <div className="buy_btns">
            <div className="icon_style">
              <AiOutlineCar size={30} color={'#e31919'}/>
            </div>
            <div className="btn_label_style">
              <p className="sub_label">COMPRAR</p>
              <p className="main_label">CARROS</p>
            </div>
          </div>
          <div className="buy_btns">
            <div className="icon_style">
              <MdMotorcycle size={30} color={'#e31919'}/>
            </div>
            <div className="btn_label_style">
              <p className="sub_label">COMPRAR</p>
              <p className="main_label">MOTOS</p>
            </div>
          </div>
        </div>        
        <button>
          <text>Vender meu carro</text>
        </button>
      </nav>
      <body>
      </body>
    </div>
  );
}

export default App;
