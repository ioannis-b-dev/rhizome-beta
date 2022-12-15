import React from "react";

const InputCheckbox = ({ name, checked, label, onChange }) => {
    return (
        <div className="input">
            <label htmlFor={name} className="input-label">
                {label}
            </label>
            <input
                type="checkbox"
                className="input-field"
                checked={checked}
                name={name}
                onChange={onChange}
            ></input>
        </div>
    );
};

export default InputCheckbox;
