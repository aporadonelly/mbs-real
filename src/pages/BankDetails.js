import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BankDetailForm, PageHeader, Snackbar } from '../components';
import { updateBankDetails, updateBankDetailState } from '../actions';

const BankDetails = () => {
    const dispatch = useDispatch();
    const bankDetails = useSelector(state => state.bankDetails);

    const onSubmit = formValues => {
        dispatch(updateBankDetails(formValues));
    };

    useEffect(() => {
        bankDetails.updateSuccess && window.scrollTo(0, 0);
    }, [bankDetails.updateSuccess]);

    return (
        <>
            <Snackbar
                showSnackbar={bankDetails.updateSuccess}
                message="Bank Details successfully updated."
                resetTrigger={() => dispatch(updateBankDetailState('updateSuccess', false))}
            />
            <PageHeader
                title="Bank Details"
                description="Edit your bank app details here. The following information will be displayed in the app."
                hideCreateButton
            />
            <BankDetailForm onFormSubmit={onSubmit} />
        </>
    );
};

export default BankDetails;
