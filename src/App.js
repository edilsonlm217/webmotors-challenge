import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

import { AiOutlineCar } from 'react-icons/ai';
import { MdMotorcycle } from 'react-icons/md';
import { GoLocation } from 'react-icons/go';

import StyledCombobox from './components/StyledCombobox/index';

import logo from './assets/webmotors-logo.png';

import './app.css';

function App() {
  const [searchingMode, setSearchingMode] = useState('car');

  const [allMakers, setAllMakers] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [allVersions, setAllVersions] = useState([]);

  const [state, dispatch] = useReducer(reducer, {
    makers: [],
    models: [],
    versions: [],

    SelectedMaker: 0,
    SelectedModel: 0,
    SelectedVersion: 0,
  });

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
    function getAllModelsFromAPI() {
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

    getAllModelsFromAPI();
  }, [allMakers]);

  useEffect(() => {
    function getAllVersionsFromAPI() {
      let all_versions_array = [];
      
      if (allModels.length !== 0) {
        const query_array = [];
        
        query_array.push(
          allModels.map(item => {
            return axios.get(
              `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=${item.ID}`)
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
              all_versions_array.push(response_array[0][i][j]);
            }
          }

          setAllVersions(all_versions_array);
          dispatch({ type: 'loadState',
            payload: {
              allMakers,
              allModels,
              allVersions: all_versions_array,
            }
          });
        }));
      }
    }

    getAllVersionsFromAPI();
  }, [allModels,allMakers]);


  function reducer(state, action) {
    switch (action.type) {
      case 'loadState':
        return {
          makers: action.payload.allMakers,
          models: action.payload.allModels,
          versions: action.payload.allVersions,

          SelectedMaker: 0,
          SelectedModel: 0,
          SelectedVersion: 0,
        }

      case 'setCurrentMakerID':
        let newModelsArray = [];
        let newVersionsArray = [];

        if (parseInt(action.selector.value) !== 0) {
          allModels.forEach(element => {
            if (element.MakeID === parseInt(action.selector.value)) {
              newModelsArray.push(element);
            }
          });

          allVersions.forEach(versionElement => {
            newModelsArray.forEach(modelElement => {
              if (versionElement.ModelID === modelElement.ID) {
                newVersionsArray.push(versionElement);
              }
            });
          });
        } else {
          newModelsArray = allModels;
          newVersionsArray = allVersions;
        }

        return {
          makers: allMakers,
          models: newModelsArray,
          versions: newVersionsArray,

          SelectedMaker: parseInt(action.selector.value),
          SelectedModel: 0,
          SelectedVersion: 0,
        };

      case 'setCurrentModelID':
        let _newVersionsArray = [];

        if (parseInt(action.selector.value) !== 0) {
          allVersions.forEach(element => {
            if (element.ModelID === parseInt(action.selector.value)) {
              _newVersionsArray.push(element);
            }
          });

        } else {
          allVersions.forEach(versionElement => {
            state.models.forEach(modelElement => {
              if (versionElement.ModelID === modelElement.ID) {
                _newVersionsArray.push(versionElement);
              }
            });
          });
        }
        
        return {
          makers: allMakers,
          models: state.models,
          versions: _newVersionsArray,

          SelectedMaker: state.SelectedMaker,
          SelectedModel: parseInt(action.selector.value),
          SelectedVersion: state.SelectedVersion,
        };
        
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
          <button 
            onClick={() => setSearchingMode('car')}
            className={searchingMode === 'car' ? 'buy_btns_active' : 'buy_btns'}
          >
            <div className="icon_style">
              <AiOutlineCar size={28} color={'#e31919'}/>
            </div>
            <div className="btn_label_style">
              <p className="sub_label">COMPRAR</p>
              <p className="main_label">CARROS</p>
            </div>
          </button>
          <button 
            onClick={() => setSearchingMode('moto')}
            className={searchingMode === 'moto' ? 'buy_btns_active' : 'buy_btns'}
          >
            <div className="icon_style">
              <MdMotorcycle size={28} color={'#e31919'}/>
            </div>
            <div className="btn_label_style">
              <p className="sub_label">COMPRAR</p>
              <p className="main_label">MOTOS</p>
            </div>
          </button>
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
                      onChange={e => dispatch({
                        type: 'setCurrentMakerID',
                        selector: {
                          value: e.target.value,
                        }
                      })}
                      className="selector_style"
                    >
                      <option value={0}>Todas</option>
                      { 
                        state.makers.map(item => (
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
                      onChange={e => dispatch({
                        type: 'setCurrentModelID',
                        selector: {
                          value: e.target.value,
                        }
                      })}
                      className="selector_style"
                    >
                      <option value={0}>Todos</option>
                      { 
                        state.models.map(item => (
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
                      onChange={e => dispatch({
                        type: 'setCurrentVersionID',
                        selector: {
                          value: e.target.value,
                        }
                      })}
                      className="selector_style"
                    >
                      <option>Todas</option>
                      { 
                        state.versions.map(item => (
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
              <label className="link_style"> > Busca avançada</label>
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
