import { useState } from "react";
import "./colorConverter.css"; // Подключаем стили

function ColorConverter() {

  return (
    <div className="color-converter" >
      <h2>Конвертер цветов</h2>
      <label>RGB:</label>
      <input
        type="text"
        value={}
        onChange={}
        placeholder="Например: 255, 0, 0"
      />
      <label>HEX:</label>
      <input
        type="text"
        value={hex}
        onChange={}
        placeholder="Например: #ff0000"
      />
    </div>
  );
}

export default ColorConverter;