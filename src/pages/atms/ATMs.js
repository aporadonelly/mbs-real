import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { PageHeader, Snackbar, ATMTable, DeleteModal } from '../../components';
import { fetchATMs, updateATM, deleteATM } from '../../actions';
import { PageStyles } from '../styles';

const ATMs = () => {
    const classes = PageStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const atm = useSelector(state => state.atm);

    useEffect(async () => {
        await dispatch(fetchATMs(1));
    }, []);

    const [deleteItem, setDeleteItem] = useState('');

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleDeleteModal = atmItem => {
        setDeleteItem(atmItem);
        setOpenDeleteModal(true);
    };

    const handleDeleteATM = () => {
        dispatch(deleteATM(deleteItem.id));
        setOpenDeleteModal(false);
    };

    const closeDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    return (
        <div data-testid="atm-component">
            <Snackbar
                showSnackbar={atm.isCreateSuccess}
                message="ATM successfully created."
                resetTrigger={() => dispatch(updateATM('isCreateSuccess', false))}
            />
            <Snackbar
                showSnackbar={atm.isDeleteSuccess}
                message="ATM successfully deleted."
                resetTrigger={() => dispatch(updateATM('isDeleteSuccess', false))}
            />
            <PageHeader
                title="ATMs"
                description="Create and view your bank's ATMs."
                buttonText="Create New ATM"
                onItemCreate={() => {
                    history.push('/atms/create');
                }}
            />
            {atm.totalATMItems === 0 ? (
                <Grid
                    data-testid="empty-item-placeholder"
                    alignItems="center"
                    container
                    direction="column"
                    justify="center"
                    className={classes.placeholderContainer}>
                    <Grid className={classes.placeholderText}>No ATMs available at this time.</Grid>
                    <Grid className={classes.placeholderText}>Click Create to get started.</Grid>
                </Grid>
            ) : (
                <ATMTable onDeleteItem={handleDeleteModal} />
            )}
            {/* Delete Modal */}
            <DeleteModal
                open={openDeleteModal}
                onClose={closeDeleteModal}
                item="ATM"
                itemName={deleteItem.atmName}
                onDeleteItem={handleDeleteATM}
            />
        </div>
    );
};

export default ATMs;
