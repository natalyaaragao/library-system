import { useState } from "react";
import './FormInput.css'

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...otherProps } = props;
    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="formInput">
            <label className="labelForm"> {label} </label>
            <input className="inputForm" style={props.style} {...otherProps}
                onChange={onChange} 
                onBlur={handleFocus}
                focused = {focused.toString()}
            />
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;