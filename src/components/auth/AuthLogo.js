/**
 * @Name: AuthLogo
 * @Description: component for logo
 * @Props: None
 * @Return: View
 * @Author: Frances
 * @Last Update By: Frances
 */
import React from 'react';
import logo from '../../assets/logo/cms_logo.png';
import { FormStyles } from '../styles';

const AuthLogo = () => {
    const classes = FormStyles();
    return <img alt="cms-logo" src={logo} className={classes.logo} />;
};

export default AuthLogo;
