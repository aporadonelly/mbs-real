import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Hidden } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { ReactComponent as LoginPagePreview } from '../assets/images/page_1.svg';
import { ReactComponent as DashBoardPreview } from '../assets/images/page_2.svg';
import { ReactComponent as DiscoverPreview } from '../assets/images/page_3.svg';

import { PageHeader, Snackbar } from '../components';
import { colors } from '../assets/styleGuide';
import { ThemeManagerStyles } from './styles';
import { fetchThemeColors, fetchTheme, updateTheme, updateThemeReducer } from '../actions';

const ThemeManager = () => {
    const classes = ThemeManagerStyles();
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme);

    const [selectedColor, setSelectedColor] = useState('');

    useEffect(async () => {
        await dispatch(fetchThemeColors());
        await dispatch(fetchTheme());
    }, []);

    const { colorList, primaryColor } = theme;

    useEffect(() => {
        const initialColorObj = colorList.filter(value => value.hexColor === primaryColor);
        if (initialColorObj.length > 0) {
            setSelectedColor(initialColorObj[0].hexColor);
        } else {
            setSelectedColor(colorList[0]?.hexColor);
        }
    }, [primaryColor]);

    const handleSelectColor = hexColor => {
        setSelectedColor(hexColor);
    };

    const handleApplyChanges = async () => {
        const themePayload = {
            primaryColor: selectedColor,
            walletFeatures: []
        };
        dispatch(updateTheme(themePayload));
        await dispatch(fetchThemeColors());
    };

    return (
        <div data-testid="theme-manager-component">
            <Snackbar
                showSnackbar={theme.isUpdateSuccess}
                message="Theme successfully updated."
                resetTrigger={() => dispatch(updateThemeReducer('isUpdateSuccess', false))}
            />
            <Grid container>
                <Grid item lg={8} xs={12}>
                    <PageHeader
                        title="Theme Manager"
                        description="Customize your mobile app."
                        hideCreateButton
                    />
                    <Grid item style={{ margin: '3rem 0 2rem' }}>
                        <h4 data-testid="page-header-title" className={classes.title}>
                            Theme Color
                        </h4>
                        <span
                            style={{ color: colors.pageDescription }}
                            data-testid="page-header-description">
                            Please pick one to be your app&apos;s main color.
                        </span>
                    </Grid>
                    <Grid item container className={classes.colorsContainer}>
                        {colorList.map(({ id, hexColor, name }) => (
                            <Grid item xs={3} sm={2} key={id} className={classes.colorContainer}>
                                <IconButton
                                    data-testid={`color-button-${name}`}
                                    aria-label="add to shopping cart"
                                    style={{
                                        background: hexColor,
                                        borderColor:
                                            selectedColor === hexColor
                                                ? colors.selectedColorBorder
                                                : colors.white
                                    }}
                                    className={classes.colorBtn}
                                    onClick={() => handleSelectColor(hexColor)}>
                                    <Check
                                        style={{
                                            color:
                                                selectedColor === hexColor ? colors.white : hexColor
                                        }}
                                    />
                                </IconButton>
                                <div className={classes.colorText}>{name}</div>
                            </Grid>
                        ))}
                    </Grid>
                    <Hidden mdDown>
                        <Grid item container>
                            <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                type="button"
                                className={classes.btn}
                                onClick={handleApplyChanges}
                                data-testid="apply-changes-button-lg">
                                Apply Changes
                            </Button>
                        </Grid>
                    </Hidden>
                </Grid>
                <Grid item lg={4} xs={12} className={classes.previewContainer}>
                    <div className={classes.previewContent}>
                        <div className={classes.previewText}>Preview</div>
                        <div>
                            <Carousel className={classes.carouselContainer} showThumbs={false}>
                                <div className={classes.phoneContainer}>
                                    <LoginPagePreview fill={selectedColor} />
                                </div>
                                <div className={classes.phoneContainer}>
                                    <DashBoardPreview fill={selectedColor} />
                                </div>
                                <div className={classes.phoneContainer}>
                                    <DiscoverPreview fill={selectedColor} />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </Grid>
                <Hidden lgUp>
                    <Grid item lg={8} xs={12}>
                        <Button
                            variant="outlined"
                            size="large"
                            color="primary"
                            type="button"
                            className={classes.btn}
                            onClick={handleApplyChanges}
                            data-testid="apply-changes-button-xs">
                            Apply Changes
                        </Button>
                    </Grid>
                </Hidden>
            </Grid>
        </div>
    );
};

export default ThemeManager;
