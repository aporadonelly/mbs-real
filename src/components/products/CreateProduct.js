/**
 * @Name: CreateProductForm
 * @Description: component for adding new product
 * @Props:
 *      onSubmit: function when submitting the form
 *      onChange/onHandleChangeReqDesc: function for updating text fields
 * @Return: Form
 * @Author: Nelly
 * @Last Update By: Nelly
 */

import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Grid, FormControl, Button, MenuItem, FormHelperText } from '@material-ui/core';
import { ArrowBack, Info } from '@material-ui/icons';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { getCategory, createNewProduct } from '../../actions';
import { FormStyles, ProductFormStyles, RequirementInputStyles } from '../styles';
import { colors } from '../../assets/styleGuide';
import ProductFormOverrideStyles from '../styles/ProductFormOverride';
import { RequirementInput } from './RequirementInput';

const initialValues = {
    productName: '',
    prodDescription: '',
    productCategory: '',
    productRequirements: []
};

const CreateProduct = () => {
    const classes = { ...ProductFormStyles(), ...FormStyles(), ...RequirementInputStyles() };
    const history = useHistory();
    const dispatch = useDispatch();
    const prod = useSelector(state => state.products);
    const { result } = prod;
    const [formData, setFormData] = useState(initialValues);
    const { productName, prodDescription, productCategory } = formData;
    const [requirements, setRequirements] = useState([]);
    const [mainRequirement, setMainRequirement] = useState({ description: '' });
    const [mainRequirementName, setMainRequirementName] = useState({ name: '' });
    const [errors, setErrors] = useState({
        productName: '',
        prodDescription: '',
        productCategory: '',
        name: '',
        quillValue: ''
    });

    useEffect(() => {
        dispatch(getCategory());
    }, []);

    useEffect(() => {
        result === 'Success' && handleClick();
    }, [result]);

    const handleClick = () => {
        history.push('/products');
    };

    const handleAdd = addedRequirement => {
        setRequirements([...requirements, addedRequirement]);
    };

    const onMainRequestEdited = (_, editedRequest) => {
        setErrors({ ...errors, description: '' });
        setMainRequirement(editedRequest);
    };
    const onMainRequestEditedName = (_, editedRequestName) => {
        setErrors({ ...errors, name: '' });
        setMainRequirementName(editedRequestName);
    };

    const onRequestsEdited = (index, editedRequest) => {
        const data = [...requirements];
        data[index] = editedRequest;
        setRequirements(data);
    };

    const onDelete = index => {
        const newData = requirements.filter((req, i) => i !== index);
        setRequirements(newData);
    };
    const validateName = () => {
        if (formData.productName.length <= 0) return 'Name is required.';
    };
    const validateDescription = () => {
        if (formData.prodDescription.length <= 0) return 'Description is required.';
    };
    const validateProductCategory = () => {
        if (formData.productCategory.length <= 0) return 'Product Type is required.';
    };
    const validateReqName = () => {
        if (mainRequirementName.name.length <= 0) return 'Requirement Name is required.';
    };
    const validateReqDesc = () => {
        if (mainRequirement.description.length <= 0) return 'Requirement Description is required.';
    };

    const handleChange = e => {
        setErrors({ ...errors, [e.target.name]: '' });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        const nameValidatorError = validateName();
        const descriptionValidatorError = validateDescription();
        const categoryValidatorError = validateProductCategory();
        const reqNameValidatorError = validateReqName();
        const reqDescValidatorError = validateReqDesc();

        setErrors({
            productName: nameValidatorError,
            prodDescription: descriptionValidatorError,
            productCategory: categoryValidatorError,
            name: reqNameValidatorError,
            description: reqDescValidatorError
        });

        const finalRequirements = [...requirements, mainRequirement];
        dispatch(
            createNewProduct({
                name: productName,
                description: prodDescription,
                productCategory,
                productRequirements: finalRequirements
            })
        );
    };

    return (
        <div className={classes.root} data-testid="reqInput">
            <ArrowBack className={classes.backArrow} onClick={() => handleClick()} />
            <Fragment>
                <ValidatorForm onSubmit={e => onSubmit(e)}>
                    <h3 className={classes.createNew}>Create New Product</h3>
                    <Grid container spacing={3} item xs={12}>
                        <div className={classes.root} style={{ display: 'flex' }}>
                            <Grid item xs={12} sm={5} style={{ padding: '1rem' }}>
                                <div className={classes.div}>
                                    Name <span style={{ color: colors.error }}>*</span>
                                </div>
                                <TextValidator
                                    fullWidth
                                    inputProps={{ minLength: 1 }}
                                    error={errors.productName}
                                    variant="outlined"
                                    onChange={e => handleChange(e)}
                                    name="productName"
                                    type="text"
                                    placeholder="Enter Product Name"
                                    value={productName}
                                />
                                {errors.productName && (
                                    <div className={classes.div} style={{ margin: '0em 0.3em' }}>
                                        <span className={classes.errorContainer}>
                                            <Info color="error" fontSize="small" />{' '}
                                            <FormHelperText
                                                style={{
                                                    color: '#EB5B5B',
                                                    marginLeft: '0.2em'
                                                }}>
                                                {validateName()}
                                            </FormHelperText>
                                        </span>
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={5} style={{ padding: '1rem' }}>
                                <FormControl className={classes.margin} style={{ display: 'flex' }}>
                                    <div className={classes.div}>
                                        Product Type <span style={{ color: colors.error }}>*</span>
                                    </div>
                                    <ThemeProvider theme={ProductFormOverrideStyles}>
                                        <FormControl className={classes.formControl}>
                                            <SelectValidator
                                                native="true"
                                                defaultValue=" Select Product Type..."
                                                searchable="true"
                                                variant="outlined"
                                                style={{ marginLeft: '1px' }}
                                                fullWidth
                                                value={productCategory}
                                                error={errors.productCategory}
                                                onChange={e => handleChange(e)}
                                                name="productCategory">
                                                {prod.categories.map(item => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.label}
                                                    </MenuItem>
                                                ))}
                                            </SelectValidator>
                                            {errors.productCategory && (
                                                <div
                                                    className={classes.div}
                                                    style={{ margin: '0em 0.3em' }}>
                                                    <span className={classes.errorContainer}>
                                                        <Info color="error" fontSize="small" />{' '}
                                                        <FormHelperText
                                                            style={{
                                                                color: '#EB5B5B',
                                                                marginLeft: '0.2em'
                                                            }}>
                                                            {validateProductCategory()}
                                                        </FormHelperText>
                                                    </span>
                                                </div>
                                            )}
                                        </FormControl>
                                    </ThemeProvider>
                                </FormControl>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid container spacing={3} item xs={10}>
                        <div className={classes.root} style={{ display: 'flex' }}>
                            <Grid item xs={12} sm={12} style={{ padding: '1rem' }}>
                                <div className={classes.div}>
                                    Description <span style={{ color: colors.error }}>*</span>
                                </div>
                                <FormControl className={classes.margin} style={{ display: 'flex' }}>
                                    <ThemeProvider theme={ProductFormOverrideStyles}>
                                        <TextValidator
                                            inputProps={{ minLength: 1 }}
                                            variant="outlined"
                                            placeholder="Write description here..."
                                            multiline
                                            rows={5}
                                            rowsMax={10}
                                            name="prodDescription"
                                            value={prodDescription}
                                            error={errors.prodDescription}
                                            fullWidth
                                            onChange={e => handleChange(e)}
                                            type="text"
                                        />
                                        {errors.prodDescription && (
                                            <div
                                                className={classes.div}
                                                style={{ margin: '0em 0.3em' }}>
                                                <span className={classes.errorContainer}>
                                                    <Info color="error" fontSize="small" />{' '}
                                                    <FormHelperText
                                                        style={{
                                                            color: '#EB5B5B',
                                                            marginLeft: '0.2em'
                                                        }}>
                                                        {validateDescription()}
                                                    </FormHelperText>
                                                </span>
                                            </div>
                                        )}
                                    </ThemeProvider>
                                </FormControl>
                            </Grid>
                        </div>
                    </Grid>

                    <Grid container spacing={3} item xs={10}>
                        <div className={classes.root} style={{ display: 'flex' }}>
                            <Grid item xs={12} sm={12} style={{ padding: '1rem' }}>
                                <FormControl
                                    className={classes.margin}
                                    style={{ display: 'flex', bottom: '1em' }}>
                                    <ThemeProvider theme={ProductFormOverrideStyles}>
                                        {requirements.map((req, index) => (
                                            <RequirementInput
                                                key={req.id}
                                                name={req.name}
                                                quillValue={req.description}
                                                index={index}
                                                onUpdate={onRequestsEdited}
                                                onDelete={onDelete}
                                                canDelete
                                                error={errors.name}
                                                error2={errors.description}
                                                validateReqName={validateReqName()}
                                                validateReqDesc={validateReqDesc()}
                                            />
                                        ))}

                                        <RequirementInput
                                            name=""
                                            quillValue=""
                                            onUpdate={onMainRequestEdited}
                                            onEdit={onMainRequestEditedName}
                                            onDelete={onDelete}
                                            onAdd={handleAdd}
                                            error={errors.name}
                                            error2={errors.description}
                                            validateReqName={validateReqName()}
                                            validateReqDesc={validateReqDesc()}
                                        />
                                    </ThemeProvider>
                                </FormControl>
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={10}>
                        <div
                            style={{
                                position: 'absolute',
                                right: '17.5em'
                            }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                value="Save"
                                style={{ width: '150px', marginRight: '2em' }}
                                data-testid="save-button">
                                Save
                            </Button>

                            <Button
                                onClick={handleClick}
                                className={classes.cancelBtn}
                                variant="contained"
                                color="default"
                                value="Cancel"
                                data-testid="cancel-button">
                                Cancel
                            </Button>
                        </div>
                    </Grid>
                </ValidatorForm>
            </Fragment>
        </div>
    );
};
export default CreateProduct;
