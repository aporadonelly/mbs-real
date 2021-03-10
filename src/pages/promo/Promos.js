/**
 * @Name Promos Page
 * @Description This is the promo page where the user can choose to create or to view Promos
 * @Returns the promo page component
 * @Author RJ
 * @UpdatedBy RJ
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { deletePromo, fetchPromos, resetAction } from '../../actions';
import { DeleteModal, PageHeader, Snackbar } from '../../components';
import { PageStyles } from '../styles';
import PromoTable from '../../components/promos/PromoTable';

const Promos = () => {
    const promo = useSelector(state => state.promo);
    const { result, totalPromoItems, items } = promo;
    const [totalItems, setTotalItems] = useState(0);
    const [rowSelected, setRowSelected] = useState('');
    const [openItem, setOpenItem] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsAvailable, setItemsAvailable] = useState(0);
    const history = useHistory();

    const dispatch = useDispatch();
    const classes = PageStyles();

    // Gets the data of the promo
    useEffect(() => {
        dispatch(fetchPromos(currentPage));
    }, [currentPage]);

    // Sets the number of items given from dispatch
    useEffect(() => {
        setItemsAvailable(items.length);
    }, [items]);

    // Calculates the total of the pages the promo has
    useEffect(() => {
        const page = totalPromoItems / 10;
        setTotalItems(Math.ceil(page));
    }, [totalPromoItems]);

    // Sets the Current Page to a different page
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const fromPage = (currentPage - 1) * 10 + 1;
    const toPage = itemsAvailable + fromPage - 1;

    return (
        <div data-testid="promosComponent" style={{ marginBottom: '2rem' }}>
            <Snackbar
                showSnackbar={result === 'CREATE SUCCESS'}
                message="Promo successfully created."
                resetTrigger={() => dispatch(resetAction())}
            />
            <Snackbar
                showSnackbar={result === 'UPDATE SUCCESS'}
                message="Promo successfully updated."
                resetTrigger={() => dispatch(resetAction())}
            />
            <Snackbar
                showSnackbar={result === 'DELETE SUCCESS'}
                message="Promo successfully deleted."
                resetTrigger={() => dispatch(resetAction())}
            />
            <PageHeader
                title="Promos"
                description="Create, view, and edit your bank's promos here."
                buttonText="Create New Promo"
                onItemCreate={() => {
                    history.push('/promos/create');
                }}
            />
            {itemsAvailable > 0 ? (
                <div>
                    <PromoTable
                        rows={items}
                        rowSelected={itemObject => {
                            setRowSelected(itemObject);
                        }}
                        openModal={bool => {
                            setOpenItem(!bool);
                        }}
                        onClose={openItem}
                    />
                    <div className={classes.containerPaginationStyle}>
                        <p style={{ flexGrow: '15' }}>
                            Showing {fromPage} to {toPage} of {totalPromoItems}
                        </p>
                        <Pagination
                            className={classes.paginationStyle}
                            count={totalItems}
                            page={currentPage}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            ) : (
                <div className={classes.emptyPlaceholder}>
                    No Promos available at this time. <br />
                    Click Create to get started.
                </div>
            )}
            <DeleteModal
                open={openItem}
                item="Promos"
                itemName={rowSelected.name}
                onClose={() => {
                    setOpenItem(false);
                }}
                onDeleteItem={() => {
                    dispatch(deletePromo(rowSelected.id));
                    setTimeout(() => {
                        dispatch(fetchPromos(currentPage));
                    }, [500]);
                    setOpenItem(false);
                }}
            />
        </div>
    );
};

export default Promos;
