import React from 'react'; 
import logo from '../assets/img/logo.jpg';
import './css/main.css';

export const CLogo = () => {
    return (
        <div className="logo"> 
            <img className='img' src={logo}/> 
        </div>
    )
}
