/**
 * @Name: Products Page
 * @Description: Page for list of products added
 * @Return: List of categories and products
 * @Author: Nelly
 * @Last Update By: Ric
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, IconButton, InputAdornment, Tab, Tabs, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { getCategory, updateProductState } from '../actions';
import { PageHeader, Snackbar } from '../components';
import ProductTable from '../components/products/ProductTable';
import { ProductPageStyles } from './styles';

const ProductPage = () => {
    const classes = { ...ProductPageStyles() };
    const history = useHistory();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const { result, categories } = products;
    const [currentCategoryId, setCurrentCategoryId] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getCategory());
    }, []);

    const handleTabChange = (event, newValue) => {
        setCurrentCategoryId(newValue);
    };

    const searchClicked = () => {
        setSearchQuery(searchText);
    };

    const searchBoxEnterPressed = event => {
        if (event.key === 'Enter') {
            setSearchQuery(searchText);
        }
    };

    return (
        <div data-testid="products">
            <Snackbar
                showSnackbar={result === 'Success'}
                message="Product successfully created."
                resetTrigger={() => dispatch(updateProductState('result', ''))}
            />
            <PageHeader
                title="Products"
                description="Create and View your banks Products on your mobile app."
                buttonText="Create New Product"
                onItemCreate={() => {
                    history.push('/products/create');
                }}
            />
            <Grid
                className={classes.tabSearchGrid}
                container
                spacing={1}
                justify="space-between"
                alignItems="center">
                <Grid item className={classes.tabSearchGridItem}>
                    <Tabs
                        indicatorColor={'primary'}
                        value={currentCategoryId}
                        onChange={handleTabChange}>
                        {categories.map(c => (
                            <Tab
                                key={c.id}
                                className={classes.tab}
                                label={c.label}
                                value={c.id}
                                disableRipple
                            />
                        ))}
                    </Tabs>
                </Grid>
                <Grid item className={classes.tabSearchGridItem}>
                    <TextField
                        data-testid="search-query"
                        fullWidth
                        variant="outlined"
                        onChange={e => setSearchText(e.target.value)}
                        name="searchQuery"
                        type={'text'}
                        onKeyDown={searchBoxEnterPressed}
                        placeholder="Search..."
                        value={searchText}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        data-testid="search-icon"
                                        className={classes.searchAdornment}
                                        aria-label="Search"
                                        disableRipple
                                        onClick={searchClicked}>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
            </Grid>

            <ProductTable categoryId={currentCategoryId} searchQuery={searchQuery} />
        </div>
    );
};

export default ProductPage;
