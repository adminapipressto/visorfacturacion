import React from 'react';
import Image from 'react-bootstrap/Image';
import logo from '../assets/img/logo.jpg';
import './css/main.css';

export const CLogo = () => {
    return (
        <div className='logo'>
            <Image className='img' src={logo} fluid />
        </div>
    )
}
