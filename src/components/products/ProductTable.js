import React, { useEffect, useState } from 'react';
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../assets/styleGuide';
import { fetchProducts } from '../../actions';
import { FormStyles, TableStyles } from '../styles';
import { PageStyles } from '../../pages/styles';

const ProductTable = ({ categoryId, searchQuery }) => {
    const classes = { ...FormStyles(), ...PageStyles(), ...TableStyles() };
    const dispatch = useDispatch();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsAvailable, setItemsAvailable] = useState(0);
    const productState = useSelector(state => state.products);
    const [visible, setVisible] = useState('');
    const [selected, setSelected] = useState('');
    const { productList, totalProductCount } = productState;

    useEffect(() => {
        dispatch(fetchProducts(categoryId, currentPage, searchQuery));
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
        dispatch(fetchProducts(categoryId, currentPage, searchQuery));
    }, [categoryId, searchQuery]);

    useEffect(() => {
        setItemsAvailable(productList.length);
    }, [productList]);

    useEffect(() => {
        const page = totalProductCount / 10;
        setTotalItems(Math.ceil(page));
        entryString = totalProductCount <= 1 ? 'entry' : 'entries';
    }, [totalProductCount]);

    let entryString = totalProductCount <= 1 ? 'entry' : 'entries';
    const fromPage = (currentPage - 1) * 10 + 1;
    const toPage = itemsAvailable + fromPage - 1;

    const handleMenuOpen = (event, id) => {
        event.preventDefault();
        setSelected(id);
    };

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const renderMenu = item => {
        if (item.id === selected) {
            return (
                <Paper className={classes.menuContainer}>
                    <Button
                        variant="text"
                        size="large"
                        color="secondary"
                        type="button"
                        disableRipple
                        className={classes.menuItem}
                        data-testid="view-product-button">
                        View
                    </Button>
                    <Button
                        variant="text"
                        size="large"
                        color="secondary"
                        type="button"
                        disableRipple
                        className={classes.menuItem}
                        data-testid="edit-product-button">
                        Edit
                    </Button>
                    <Button
                        variant="text"
                        size="large"
                        color="secondary"
                        style={{ color: colors.error }}
                        type="button"
                        disableRipple
                        className={classes.menuItem}
                        data-testid={`delete-product-button-${item.id}`}>
                        Delete
                    </Button>
                </Paper>
            );
        }
    };

    if (totalProductCount === 0) {
        return (
            <Grid
                data-testid="empty-products-placeholder"
                alignItems="center"
                container
                direction="column"
                justify="center"
                className={classes.placeholderContainer}>
                {searchQuery === '' ? (
                    <>
                        <Grid className={classes.placeholderText}>
                            No Products available at this time.
                        </Grid>
                        <Grid className={classes.placeholderText}>
                            Click Create to get started.
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid className={classes.placeholderText}>
                            Your search {`'${searchQuery}'`} did not return any results.
                        </Grid>
                    </>
                )}
            </Grid>
        );
    }

    return (
        <div>
            <TableContainer style={{ marginTop: '3rem' }}>
                <Table>
                    <TableHead style={{ backgroundColor: `${colors.tableHeadColor}` }}>
                        <TableRow>
                            <TableCell
                                className={`${classes.tableHeader} ${classes.tableCell}`}
                                align="left">
                                Name
                            </TableCell>
                            <TableCell
                                style={{ width: '50%' }}
                                className={`${classes.tableHeader} ${classes.tableCell}`}
                                align="left">
                                Description
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map(product => (
                            <TableRow
                                style={{ position: 'relative' }}
                                key={product.id}
                                hover
                                onMouseOver={() => {
                                    setVisible(product.id);
                                }}
                                onMouseLeave={() => {
                                    setVisible('');
                                    setSelected('');
                                }}
                                data-testid={`product-item-${product.id}`}>
                                <TableCell className={classes.tableCell}>{product.name}</TableCell>
                                <TableCell
                                    className={classes.tableCell}
                                    style={{
                                        borderRightColor: 'transparent'
                                    }}>
                                    <Grid container justify="space-between" alignItems="center">
                                        <Grid>{product.description}</Grid>
                                        <Grid>
                                            <MoreHoriz
                                                data-testid={`product-item-more-${product.id}`}
                                                style={{
                                                    visibility:
                                                        visible === product.id
                                                            ? 'visible'
                                                            : 'hidden'
                                                }}
                                                className={classes.moreIcon}
                                                aria-haspopup="true"
                                                onClick={e => handleMenuOpen(e, product.id)}
                                            />
                                            {renderMenu(product)}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                style={{ marginTop: '6rem' }}>
                <div>
                    <p>
                        Showing {fromPage} to {toPage} of {totalProductCount} {entryString}
                    </p>
                </div>
                <Pagination
                    count={totalItems}
                    page={currentPage}
                    onChange={handleChange}
                    color="secondary"
                />
            </Grid>
        </div>
    );
};

export default ProductTable;
