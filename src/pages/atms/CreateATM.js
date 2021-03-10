import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ATMForm, PageHeader } from '../../components';
import { fetchProvinces, createATM } from '../../actions';

const CreateATM = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const atm = useSelector(state => state.atm);

    useEffect(async () => {
        await dispatch(fetchProvinces());
    }, []);

    useEffect(() => {
        if (atm.isCreateSuccess) {
            history.push('/atms');
        }
    }, [atm.isCreateSuccess]);

    const handleCreateATM = (e, newATM) => {
        e.preventDefault();

        const {
            atmName,
            locationStreet,
            locationProvinceOrState,
            locationCity,
            locationPostalOrZipCode,
            latitude,
            longitude,
            landmark
        } = newATM;

        const atmPayload = {
            atmName,
            locationStreet,
            locationProvinceOrState,
            locationCity,
            locationPostalOrZipCode: Number(locationPostalOrZipCode),
            latitude,
            longitude,
            landmark
        };

        dispatch(createATM(atmPayload));
    };
    return (
        <div data-testid="create-atm-component">
            <PageHeader
                title="ATMs"
                description="Create and add ATM details by filling out required information below."
                hideCreateButton
            />
            <ATMForm onFormSubmit={handleCreateATM} />
        </div>
    );
};

export default CreateATM;
