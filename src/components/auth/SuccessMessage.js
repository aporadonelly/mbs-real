/**
 * @Name: SuccessMessage
 * @Description: component displaying success message for forgot password
 * @Props: None
 * @Return: View
 * @Author: Frances
 * @Last Update By: Frances
 */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, CardContent, CardHeader, IconButton } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import AuthLogo from './AuthLogo';
import { FormStyles, SuccessMessageStyles } from '../styles';
import { colors } from '../../assets/styleGuide';
import { updateAuth } from '../../actions';
import { userStatus } from '../../reducers/constants';

const SuccessMessage = ({ renderLogo, message }) => {
    const classes = { ...FormStyles(), ...SuccessMessageStyles() };
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateAuth('status', userStatus.CHANGING_PASSWORD));
    }, []);

    return (
        <div className={classes.pageContainer}>
            <div className={classes.container}>
                <div className={classes.card}>
                    {renderLogo && <CardHeader className={classes.header} component={AuthLogo} />}
                    <CardContent>
                        <IconButton disabled className={classes.iconBackground}>
                            <Check style={{ color: colors.successIcon }} />
                        </IconButton>
                        <div>
                            <h2 className={classes.title}>Password successfully changed </h2>
                            <p className={classes.subTitleContainer}>{message}</p>
                        </div>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            type="submit"
                            className={classes.btn}
                            data-testid="success-message-button"
                            onClick={() => {
                                localStorage.clear();
                                history.replace('login');
                            }}>
                            Back to login
                        </Button>
                    </CardContent>
                </div>
            </div>
        </div>
    );
};

export default SuccessMessage;
