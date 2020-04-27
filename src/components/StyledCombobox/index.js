import React from 'react';

import './styles.css';

export default function StyledCombobox(props) {
  return (
    <div className="brand_menu_style">
      <div style={{display: 'flex', width: '100%', alignItems: 'center', height: 30}}>
        <label className="brand_label_style">{props.combo_label}:</label>
        <select className="selector_style">
          <option>Todas</option>
        </select>
      </div>
    </div>
  );
}
