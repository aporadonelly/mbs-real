/**
 * @Name: CustomErrorMessage
 * @Description: component for custom error message
 * @Props:
 *      renderCondition: boolean when to display the error message
 *      message: message to display when error occurs
 * @Return: View
 * @Author: Frances
 * @Last Update By: Frances
 */
import { Info } from '@material-ui/icons';
import React from 'react';
import { FormStyles } from './styles';

const CustomErrorMessage = ({ renderCondition, message }) => {
    const classes = FormStyles();
    return renderCondition ? (
        <div className={classes.customErrorContainer}>
            <Info color="error" style={{ marginRight: '0.25em' }} fontSize="small" />
            {message}
        </div>
    ) : (
        ''
    );
};

export default CustomErrorMessage;
