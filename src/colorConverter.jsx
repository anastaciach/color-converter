import { useState } from "react";
import "./ColorConverter.css";

function ColorConverter() {
  const [rgb, setRgb] = useState(["", "", ""]);
  const [hex, setHex] = useState("");

  const rgbToHex = (r, g, b) => {
    if (r > 255 || g > 255 || b > 255) return "";
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
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
    <div className="color-converter" style={{ backgroundColor: hex }}>
      <h2>Конвертер цветов</h2>
      <label>RGB:</label>
      <div>
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
      <label>HEX:</label>
      <input
        type="text"
        value={hex}
        onChange={handleHexChange}
        placeholder="#FF0000"
        maxLength={7}
      />
    </div>
  );
}

export default ColorConverter;
