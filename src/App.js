import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { AiOutlineCar } from 'react-icons/ai';
import { MdMotorcycle } from 'react-icons/md';
import { GoLocation } from 'react-icons/go';

import StyledCombobox from './components/StyledCombobox/index';


import logo from './assets/webmotors-logo.png';
import './app.css';

function App() {
  const [makers, setMakers] = useState([]);

  useEffect(() => {
    async function getMakersFromAPI() {
      const all_makers_response = await axios.get('http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make');
      setMakers(all_makers_response.data);
    }

    getMakersFromAPI();
  }, []);
  
  return (
    <div className="container">
      <header>
          <img className="logo_style" src={logo} alt="webmotors-logo"/>
      </header>
      <nav className="nav_style">
        <div className="buy_btns_container">
          <button className="buy_btns">
            <div className="icon_style">
              <AiOutlineCar size={28} color={'#e31919'}/>
            </div>
            <div className="btn_label_style">
              <p className="sub_label">COMPRAR</p>
              <p className="main_label">CARROS</p>
            </div>
          </button>
          <div className="buy_btns">
            <div className="icon_style">
              <MdMotorcycle size={28} color={'#e31919'}/>
            </div>
            <div className="btn_label_style">
              <p className="sub_label">COMPRAR</p>
              <p className="main_label">MOTOS</p>
            </div>
          </div>
        </div>
        <div className="sell_btn_container">
          <button className="sell_btn_style">
            <b>Vender meu carro</b>
          </button>
        </div>        
      </nav>
      <main>
        <div className="body_container">
          <div className="checkbox_container">
            <div>
              <input
                name="new"
                type="checkbox"
                // checked={this.state.isGoing}
                // onChange={this.handleInputChange}
              />
              <label className="checkbox_label_style">Novos</label>
            </div>
            <div style={{paddingLeft: 15}}>
              <input
                name="used"
                type="checkbox"
                // checked={this.state.isGoing}
                // onChange={this.handleInputChange}
              />
              <label className="checkbox_label_style">Usados</label>
            </div>
          </div>
          
          <ul className="ul_style">
            <li className="li_style">
              <div className="option_container">
                <div className="location_menu_style_part_1">
                  <div className="location_icon_style">
                    <GoLocation size={20} color={'#e31919'}/>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                    <label className="location_label_style">Onde:</label>
                    <input className="text_input_style"/>
                  </div>
                </div>
                <div className="location_menu_style_part_2">
                  <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                    <label className="location_label_style">Raio:</label>
                    <select className="select_style">
                      <option></option>
                      <option>50km</option>
                      <option>100km</option>
                      <option>150km</option>
                      <option>200km</option>
                    </select>
                  </div>
                </div>
              </div>
            </li> 
            <li className="li_style">
              <div className="option_container">
                  <StyledCombobox data={makers} combo_label="Marca"/>
                  {/* <StyledCombobox combo_label="Modelo"/> */}
              </div>
            </li>
            <li className="li_style">
              <div className="option_container">
                  {/* <StyledCombobox combo_label="Ano Desejado"/> */}
                  {/* <StyledCombobox combo_label="Faixa de preço"/> */}
              </div>
            </li>
            <li className="li_style">
              <div className="option_container">
                  {/* <StyledCombobox combo_label="Versão"/> */}
              </div>
            </li>
            <li className="li_style">
              {/* <a className="link_style"> > Busca avançada</a> */}
            </li>
            <li className="li_style">
              <div className="search_op_style">
                <label className="location_label_style">Limpar Filtros</label>
                <button className="search_btn">
                  <b>VER OFERTAS</b>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
