import { useState } from "react";
import "./normalize.css";
import "./colorConverter.css";

function ColorConverter() {
  const [rgb, setRgb] = useState(["", "", ""]);
  const [hex, setHex] = useState("");

  const rgbToHex = (r, g, b) => {
    if (r > 255 || g > 255 || b > 255) return "";

    const toHex = (c) => {
      let hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return "#" + toHex(r) + toHex(g) + toHex(b);
  };

  const hexToRgb = (hex) => {
    if (hex.length !== 6) return "";
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return [r, g, b];
  };

  const handleRgbChange = (index, value) => {
    let newValue = value.replace(/[^0-9]/g, "");
    if (newValue > 255) newValue = "255";
    const newRgb = [...rgb];
    newRgb[index] = newValue;
    setRgb(newRgb);

    if (newRgb.every((num) => num !== "")) {
      setHex(rgbToHex(...newRgb.map(Number)));
    } else {
      setHex("");
    }
  };

  const handleHexChange = (e) => {
    let value = e.target.value.replace(/[^0-9A-Fa-f]/g, "").toUpperCase();
    if (value.length > 6) return;
    setHex("#" + value);
    if (value.length === 6) {
      setRgb(hexToRgb(value).map(String));
    } else {
      setRgb(["", "", ""]);
    }
  };

  return (
    <div className="color-converter__container">
      <div className="color-converter" style={{ backgroundColor: hex }}>
        <h1 className="color-converter__title">Конвертер цветов</h1>
        <div className="color-converter__inputs">
          <label className="color-converter__label">RGB:</label>
          {rgb.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleRgbChange(index, e.target.value)}
              placeholder={["R", "G", "B"][index]}
              maxLength={3}
            />
          ))}
        </div>
        <div className="color-converter__inputs">
          <label className="color-converter__label">HEX:</label>
          <input
            type="text"
            value={hex}
            onChange={handleHexChange}
            placeholder="#FF0000"
            maxLength={7}
          />
        </div>
      </div>
      <div className="color-converter__info">
        <div className="color-converter__info-block">
          <h2 className="color-converter__info-title">
            Что такое конвертер цветов?
          </h2>
          <p className="color-converter__info-text">
            Конвертер цветов — это инструмент, который позволяет преобразовывать
            цвета из одного формата в другой. Наиболее распространенные форматы
            — HEX (шестнадцатеричный) и RGB (красный, зеленый, синий).
          </p>
        </div>

        <div className="color-converter__info-block">
          <h2 className="color-converter__info-title">Форматы цветов</h2>
          <p className="color-converter__info-text">
            HEX — это шестнадцатеричное представление цвета, состоящее из шести
            символов (например, #FF0000 — красный).RGB — это десятичное
            представление цвета, где каждая компонента (красный, зеленый, синий)
            имеет значение от 0 до 255 (например, rgb(255, 0, 0) — красный).
          </p>
        </div>
      </div>
    </div>
  );
}

export default ColorConverter;
