import React from "react";
const InputSlider = ({ name, value, onChange, min, max, label }) => {
    return (
        <div className="panelSlider">
            <p className="slider__title">{label}</p>
            <input
                className="slider"
                type="range"
                min={min}
                max={max}
                value={value}
                name={name}
                onChange={onChange}
            ></input>
            <p className="slider__value">{value}</p>
        </div>
    );
};
export default InputSlider;
