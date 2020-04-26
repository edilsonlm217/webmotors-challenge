import React from 'react';

import './styles.css';

export default function StyledCombobox({ combo_label }) {
  return (
    <div className="brand_menu_style">
      <div style={{display: 'flex', width: '100%', alignItems: 'center', height: 30}}>
        <label className="brand_label_style">{combo_label}:</label>
        <select className="selector_style">
          <option></option>
          <option>50km</option>
          <option>100km</option>
          <option>150km</option>
          <option>200km</option>
        </select>
      </div>
    </div>
  );
}
