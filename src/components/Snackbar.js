/**
 * @Name: Snackbar
 * @Description: success message when creating an item of a page
 * @Props:
 *      showSnackbar: boolean if the snackbar should appear
 *      message: string message to be displayed
 *      resetTrigger: function to reset when to show the snackbar
 * @Return: View
 * @Author: Frances
 * @Last Update By: Frances
 */
import React, { useEffect, useState } from 'react';
import { IconButton, Snackbar as SnackbarUI, Grid } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarStyles } from './styles';

const Snackbar = ({ showSnackbar, message, resetTrigger }) => {
    const classes = SnackbarStyles();
    let renderSnackbar = showSnackbar;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        renderSnackbar && setOpen(true);
    }, [renderSnackbar]);

    useEffect(
        () => () => {
            handleClose();
        },
        []
    );

    const handleClose = () => {
        setOpen(false);
        renderSnackbar = false;
        resetTrigger();
    };

    return (
        <SnackbarUI
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            ContentProps={{ className: classes.container }}
            autoHideDuration={2000}
            className={classes.snackbar}
            open={open}
            onClose={handleClose}
            message={
                <Grid container item xs={12} style={{ alignItems: 'center' }}>
                    <Grid style={{ display: 'flex' }}>
                        <CheckCircleIcon />
                    </Grid>
                    <Grid style={{ padding: '0 1rem' }}>
                        <span data-testid="snackbar-message">{message}</span>
                    </Grid>
                </Grid>
            }
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                    data-testid="close-btn">
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        />
    );
};
export default Snackbar;
