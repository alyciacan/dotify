import './Form.css'
import { useState } from 'react';
import {triggerSearch} from './spotify';

const Form = () => {
    const [searchEntry, setSearchEntry] = useState("");

    const handleChange = (e) => {
        setSearchEntry(e.target.value);
        triggerSearch(e.target.value);
    };

    return (
        <form className="form">
            <div className="form-box">
                <input 
                    type="text" name="search" onChange={(e) => handleChange(e) }
                    value={ searchEntry } placeholder="Search for your favorites here!"
                >
                </input>
                <button type="button">🔍</button>
            </div>
        </form>
    )
};

export default Form;