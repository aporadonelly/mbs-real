/**
 * @Name: PageHeader
 * @Description: header for page title and description
 * @Props:
 *      title: title of the page
 *      description: description of the page
 *      onItemCreate: function for creating an item of a page
 *      buttonText: text of the create button
 *      hideCreateButton: boolean when to hide the create button
 * @Return: View
 * @Author: Frances
 * @Last Update By: Frances
 */
import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { PageHeaderStyles } from './styles';
import { colors } from '../assets/styleGuide';

const PageHeader = ({ title, description, buttonText, onItemCreate, hideCreateButton }) => {
    const classes = PageHeaderStyles();
    return (
        <Grid container alignItems="center" className={classes.container}>
            <Grid item sm>
                <h3 data-testid="page-header-title" className={classes.pageTitle}>
                    {title}
                </h3>
                <span
                    style={{ color: colors.pageDescription }}
                    data-testid="page-header-description">
                    {description}
                </span>
            </Grid>
            {!hideCreateButton && (
                <Grid
                    container
                    item
                    sm
                    className={classes.btnContainer}
                    data-testid="create-button-container">
                    <Button
                        data-testid="page-create-item-button"
                        variant="contained"
                        size="medium"
                        color="primary"
                        type="button"
                        onClick={onItemCreate}
                        className={classes.btn}>
                        <Add fontSize="small" style={{ marginRight: '0.25rem' }} />
                        {buttonText}
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};

export default PageHeader;
