import React from 'react';
import spinner from './spinner.gif';
import './News.css'

const Spinner = () => {
    // Render a loading spinner
    return (
        <div className='spinner'>
            <img style={{ width: "50px", height: "50px" }} src={spinner} alt="Loading Icon" />
        </div>
    )
}

export default Spinner;
