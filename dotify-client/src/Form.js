import './Form.css'
import { useState } from 'react';
import {triggerSearch} from './spotify';

const Form = ({ search }) => {
    const [searchEntry, setSearchEntry] = useState("");

    const handleChange = (e) => {
        setSearchEntry(e.target.value);
        triggerSearch(e.target.value);
    };

    return (
        <form>
            <input 
                type="text" name="search" onChange={(e) => handleChange(e) }
                value={ searchEntry } placeholder="Search for your favorite albums, songs, artists, etc."
            >
            </input>
            <button type="button">🔍</button>
        </form>
    )
};

export default Form;