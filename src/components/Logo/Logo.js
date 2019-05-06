import React from 'react';

import LogoImg from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css'

const logo = () => (
    <div className={classes.Logo}>
        <img src={LogoImg} alt="Logo"/>
    </div>
);

export default logo;