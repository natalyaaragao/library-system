import { useState } from "react";
import './FormInput.css'

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, style, ...otherProps } = props;
    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="formInput" style={props.style}>
            <div className="labelForm"> {label} </div>
            { props.multiline ? 
                <textarea className="inputForm"
                    {...otherProps}
                    onChange={onChange} 
                    onBlur={handleFocus}
                    focused = {focused.toString()}/>
                : <input className="inputForm"
                    {...otherProps}
                    onChange={onChange} 
                    onBlur={handleFocus}
                    focused = {focused.toString()}
                />
            }
            
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;