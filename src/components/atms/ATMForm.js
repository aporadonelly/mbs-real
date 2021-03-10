/**
 * @Name: ATMForm
 * @Description: Form component of ATMs
 * @Props:
 *      onFormSubmit: submit fuction of the form
 * @Return: View
 * @Author: Everard
 * @Last Update By: Everard
 */
import React, { useRef, useReducer, useEffect } from 'react';
import { Grid, IconButton, Button, MenuItem } from '@material-ui/core';
import { ArrowBack, InfoOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { TextValidator, ValidatorForm, SelectValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { BranchFormStyles, FormStyles } from '../styles';
import { colors } from '../../assets/styleGuide';
import ErrorMessage from '../ErrorMessage';
import { fetchCities } from '../../actions';

const ATMForm = ({ onFormSubmit }) => {
    const classes = { ...FormStyles(), ...BranchFormStyles() };
    const history = useHistory();
    const dispatch = useDispatch();
    const address = useSelector(state => state.address);

    const formRef = useRef(null);

    const initialState = {
        atmName: '',
        landmark: '',
        longitude: null,
        latitude: null,
        locationStreet: '',
        locationProvinceOrState: '',
        locationCity: '',
        locationPostalOrZipCode: ''
    };

    // set values for reducer
    const [formValues, setFormValues] = useReducer(
        (currentValues, newValues) => ({ ...currentValues, ...newValues }),
        initialState
    );

    const {
        atmName,
        landmark,
        latitude,
        longitude,
        locationStreet,
        locationProvinceOrState,
        locationCity,
        locationPostalOrZipCode
    } = formValues;

    // Select element values
    const provinces = address.provinceList;
    const cities = address.cityList.length > 0 ? address.cityList : [];

    const handleUpdateField = event => {
        const { name, value } = event.target;
        setFormValues({ [name]: value });
    };

    useEffect(async () => {
        setFormValues({ locationProvinceOrState: address.provinceList[0]?.id });
        await dispatch(fetchCities(address.provinceList[0]?.id));
    }, [address.provinceList]);

    useEffect(() => {
        setFormValues({ locationCity: address.cityList[0]?.id });
    }, [address.cityList]);

    const handleProvinceChange = event => {
        const { value } = event.target;

        setFormValues({ locationProvinceOrState: value });
        if (event.target.value === '') {
            setFormValues({ locationCity: value });
        } else {
            dispatch(fetchCities(value));
        }
    };

    const selectedProvince = locationProvinceOrState
        ? provinces.find(province => province.id === locationProvinceOrState)
        : { provinceName: '' };

    const selectedCity = locationCity
        ? cities.find(city => city.id === locationCity)
        : { cityName: '' };

    const handleSubmitForm = async (event, atmValues) => {
        const formValidity = await formRef.current.isFormValid();
        if (formValidity) {
            onFormSubmit(event, atmValues);
        }
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <IconButton
                        aria-label="back"
                        disableRipple
                        onClick={() => history.push('/atms')}
                        className={classes.backBtn}
                        data-testid="back-btn">
                        <ArrowBack style={{ color: colors.text }} />
                    </IconButton>
                    <h3 className={classes.title}>Create New ATM</h3>
                </Grid>
                <Grid item xs={12}>
                    <ValidatorForm
                        data-testid="atm-form"
                        noValidate
                        onSubmit={e => handleSubmitForm(e, formValues)}
                        ref={formRef}>
                        <Grid item sm={5} xs={12} className={classes.fieldSpacing}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>
                                    Name <span style={{ color: colors.error }}>*</span>
                                </div>
                                <TextValidator
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleUpdateField}
                                    name="atmName"
                                    type="text"
                                    placeholder="Enter ATM Name"
                                    validators={['required']}
                                    errorMessages={[ErrorMessage('This field is required.')]}
                                    value={atmName}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.fieldSpacing}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>
                                    Street address <span style={{ color: colors.error }}>*</span>
                                </div>
                                <TextValidator
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleUpdateField}
                                    name="locationStreet"
                                    type="text"
                                    placeholder="Street name, Blk, Lot and etc."
                                    validators={['required']}
                                    errorMessages={[ErrorMessage('This field is required.')]}
                                    value={locationStreet}
                                />
                            </div>
                        </Grid>
                        <Grid container item xs={12} sm={10}>
                            <Grid item sm={6} xs={12} className={classes.fieldSpacing}>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.label}>
                                        State / Province
                                        <span style={{ color: colors.error }}> *</span>
                                    </div>
                                    <SelectValidator
                                        name="locationProvinceOrState"
                                        onChange={handleProvinceChange}
                                        fullWidth
                                        variant="outlined"
                                        validators={['required']}
                                        value={locationProvinceOrState}
                                        placeholder="Select a province"
                                        errorMessages={[ErrorMessage('This field is required.')]}
                                        className={classes.selectValidator}>
                                        <MenuItem value="" disabled>
                                            Select a province
                                        </MenuItem>
                                        {provinces.map(province => (
                                            <MenuItem key={province.id} value={province.id}>
                                                {province.provinceName}
                                            </MenuItem>
                                        ))}
                                    </SelectValidator>
                                </div>
                            </Grid>
                            <Grid item sm={6} xs={12} className={classes.fieldSpacing}>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.label}>
                                        City / Municipality
                                        <span style={{ color: colors.error }}> *</span>
                                    </div>
                                    <SelectValidator
                                        name="locationCity"
                                        onChange={handleUpdateField}
                                        fullWidth
                                        variant="outlined"
                                        validators={['required']}
                                        value={locationCity}
                                        errorMessages={[ErrorMessage('This field is required.')]}
                                        className={classes.selectValidator}>
                                        <MenuItem value="" disabled>
                                            Select a city
                                        </MenuItem>
                                        {cities.map(city => (
                                            <MenuItem key={city.id} value={city.id}>
                                                {city.cityName}
                                            </MenuItem>
                                        ))}
                                    </SelectValidator>
                                    {locationProvinceOrState === '' ? (
                                        <div
                                            className={classes.customErrorContainer}
                                            style={{ color: colors.text }}>
                                            <InfoOutlined
                                                color="secondary"
                                                style={{ marginRight: '0.25em' }}
                                                fontSize="small"
                                            />
                                            Select a province first
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item sm={5} xs={12} className={classes.fieldSpacing}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>
                                    Postal Code / ZIP <span style={{ color: colors.error }}>*</span>
                                </div>
                                <TextValidator
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleUpdateField}
                                    name="locationPostalOrZipCode"
                                    type="text"
                                    placeholder="Enter postal code/zip"
                                    validators={['required', 'matchRegexp:^[0-9]*$']}
                                    errorMessages={[
                                        ErrorMessage('This field is required.'),
                                        ErrorMessage('Invalid format.')
                                    ]}
                                    value={locationPostalOrZipCode}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} className={classes.fieldSpacing}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>Address Preview:</div>
                                {locationStreet &&
                                locationProvinceOrState &&
                                locationCity &&
                                locationPostalOrZipCode ? (
                                    <div
                                        data-testid="address-text"
                                        className={classes.label}
                                        style={{
                                            fontFamily: 'Inter Regular'
                                        }}>
                                        {`${locationStreet}, ${selectedCity?.cityName}, ${selectedProvince.provinceName}, ${locationPostalOrZipCode}`}
                                    </div>
                                ) : (
                                    <div
                                        data-testid="address-text-preview"
                                        className={classes.addressPreview}>
                                        No available preview yet.
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid container item xs={12} sm={10}>
                            <Grid item sm={6} xs={12} className={classes.fieldSpacing}>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.label}>Landmark</div>
                                    <TextValidator
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleUpdateField}
                                        name="landmark"
                                        type="text"
                                        placeholder="Enter Landmark"
                                        value={landmark}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={10}>
                            <Grid item sm={6} xs={12} className={classes.fieldSpacing}>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.label}>
                                        Latitude <span style={{ color: colors.error }}>*</span>
                                    </div>
                                    <TextValidator
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleUpdateField}
                                        name="latitude"
                                        type="number"
                                        placeholder="ex. 14.558445983138848"
                                        validators={['required']}
                                        errorMessages={[ErrorMessage('This field is required.')]}
                                        value={latitude}
                                    />
                                </div>
                            </Grid>
                            <Grid item sm={6} xs={12} className={classes.fieldSpacing}>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.label}>
                                        Longitude <span style={{ color: colors.error }}>*</span>
                                    </div>
                                    <TextValidator
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleUpdateField}
                                        name="longitude"
                                        type="number"
                                        placeholder="ex. 121.0335484553275"
                                        validators={['required']}
                                        errorMessages={[ErrorMessage('This field is required.')]}
                                        value={longitude}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            sm={10}
                            justify="flex-end"
                            className={classes.fieldSpacing}>
                            <div className={classes.formBtnContainer}>
                                <Button
                                    data-testid="submit-btn"
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    type="submit"
                                    style={{ marginRight: '1.5rem' }}
                                    className={classes.formBtn}>
                                    Save
                                </Button>
                                <Button
                                    data-testid="cancel-btn"
                                    variant="outlined"
                                    size="large"
                                    color="secondary"
                                    type="button"
                                    className={classes.cancelBtn}
                                    onClick={() => history.push('/atms')}>
                                    Cancel
                                </Button>
                            </div>
                        </Grid>
                    </ValidatorForm>
                </Grid>
            </Grid>
        </>
    );
};
export default ATMForm;
