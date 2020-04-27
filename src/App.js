import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { AiOutlineCar } from 'react-icons/ai';
import { MdMotorcycle } from 'react-icons/md';
import { GoLocation } from 'react-icons/go';

import StyledCombobox from './components/StyledCombobox/index';

import logo from './assets/webmotors-logo.png';

import './app.css';

function App() {
  const [allMakers, setAllMakers] = useState([]);
  const [allModels, setAllModels] = useState([]);


  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);

  const [currentMakerID, setCurrentMakerID] = useState(null);
  const [currentModelID, setCurrentModelID] = useState(null);
  const [currentVersionID, setCurrentVersionID] = useState(null);

  useEffect(() => {
    async function getAllMakersFromAPI() {
      const response = await axios.get(
        'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make'
      );

      setAllMakers(response.data);
    }

    getAllMakersFromAPI();
  }, []);

  useEffect(() => {
    function getAllVersionsFromAPI() {
      let all_models_array = [];
      
      if (allMakers.length !== 0) {
        const query_array = [];
        
        query_array.push(
          allMakers.map(item => {
            return axios.get(
              `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=${item.ID}`)
          }
        ));
        
        axios
        .all(query_array[0])
        .then(axios.spread((...responses) => {
          
          let response_array = [];

          response_array.push(
            responses.map(response => {
              return response.data
            })
          );
          
          for (let i = 0; i < response_array[0].length; i++) {        
            for (let j = 0; j < response_array[0][i].length; j++) {   
              all_models_array.push(response_array[0][i][j]);
            }
          }

          setAllModels(all_models_array);
        }));
      }
    }

    getAllVersionsFromAPI();
  }, [allMakers]);

  useEffect(() => {
    async function getModelsFromAPI() {
      if (currentMakerID) {
        const response = await axios.get(
          `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=${currentMakerID}`
        );
        setModels(response.data);
      }
    }

    getModelsFromAPI()
  }, [currentMakerID]);

  useEffect(() => {
    async function getVersionFromAPI() {
      if (currentModelID) {
        const response = await axios.get(
          `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=${currentModelID}`
        );
        setVersions(response.data);
      }
    }

    getVersionFromAPI();
  }, [currentModelID]);
  
  function handleOnChange(e, action) {
    switch (action) {
      case 'setCurrentMakerID':
        if (e.target.value === 0) {

        }
        setCurrentMakerID(e.target.value);
        break;

      case 'setCurrentModelID':
        setCurrentModelID(e.target.value);
        break;

      case 'setCurrentVersionID':
        setCurrentVersionID(e.target.value);
        break;
    
      default:
        break;
    }
  }
  
  return (
    <div className="container">
      <header>
          <img className="logo_style" src={logo} alt="webmotors-logo"/>
      </header>
      <nav className="nav_style">
        <div className="buy_btns_container">
          <div className="buy_btns">
            <div className="icon_style">
              <AiOutlineCar size={28} color={'#e31919'}/>
            </div>
            <div className="btn_label_style">
              <p className="sub_label">COMPRAR</p>
              <p className="main_label">CARROS</p>
            </div>
          </div>
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
                  <div style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%'
                  }}>
                    <label className="location_label_style">Onde:</label>
                    <input className="text_input_style"/>
                  </div>
                </div>
                <div className="location_menu_style_part_2">
                  <div style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%'
                  }}>
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
                <div className="brand_menu_style">
                  <div style={{
                    display: 'flex',
                    width: '100%', 
                    alignItems: 'center', 
                    height: 30
                  }}>
                    <label className="brand_label_style">Marca:</label>
                    <select
                      onChange={e => handleOnChange(e, 'setCurrentMakerID')} 
                      className="selector_style"
                    >
                      <option value={0}>Todas</option>
                      { 
                        allMakers.map(item => (
                          <option
                            key={item.ID} 
                            value={item.ID}
                          >
                            {item.Name}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="brand_menu_style">
                  <div style={{
                    display: 'flex', 
                    width: '100%', 
                    alignItems: 'center', 
                    height: 30
                  }}>
                    <label className="brand_label_style">Modelo:</label>
                    <select 
                      onChange={e => handleOnChange(e, 'setCurrentModelID')} 
                      className="selector_style"
                    >
                      <option>Todas</option>
                      { 
                        models.map(item => (
                          <option
                            key={item.ID} 
                            value={item.ID}
                          >
                            {item.Name}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>
            </li>
            <li className="li_style">
              <div className="option_container">
                  <StyledCombobox combo_label="Ano Desejado"/>
                  <StyledCombobox combo_label="Faixa de preço"/>
              </div>
            </li>
            <li className="li_style">
              <div className="option_container">
                <div className="brand_menu_style">
                  <div style={{
                    display: 'flex', 
                    width: '100%', 
                    alignItems: 'center', 
                    height: 30
                  }}>
                    <label className="brand_label_style">Versão:</label>
                    <select
                      onChange={e => handleOnChange(e, 'setCurrentVersionID')} 
                      className="selector_style"
                    >
                      <option>Todas</option>
                      { 
                        versions.map(item => (
                          <option
                            key={item.ID} 
                            value={item.ID}
                          >
                            {item.Name}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>
            </li>
            <li className="li_style">
              <a className="link_style"> > Busca avançada</a>
            </li>
            <li className="li_style">
              <div className="search_op_style">
                <button className="clear_filter_btn">Limpar Filtros</button>
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
