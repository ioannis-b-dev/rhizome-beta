import React from "react";

const InputText = ({ name, value, label, onChange }) => {
    return (
        <div className="input">
            <label className="input-label" htmlFor={name}>
                {label}
            </label>
            <input
                className="input-field"
                type="text"
                placeholder="START HERE"
                value={value}
                name={name}
                onChange={onChange}
            ></input>
        </div>
    );
};

export default InputText;
