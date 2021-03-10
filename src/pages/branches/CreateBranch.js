import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BranchForm, PageHeader } from '../../components';
import { fetchProvinces, createBranch } from '../../actions';

const CreateBranch = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const branch = useSelector(state => state.branch);

    useEffect(async () => {
        await dispatch(fetchProvinces());
    }, []);

    useEffect(() => {
        if (branch.isCreateSuccess) {
            history.push('/branches');
        }
    }, [branch.isCreateSuccess]);

    const handleCreateBranch = (e, newBranch, branchSched) => {
        e.preventDefault();

        const {
            branchName,
            locationStreet,
            locationProvinceOrState,
            locationCity,
            locationPostalOrZipCode,
            email,
            phone,
            mobile,
            latitude,
            longitude,
            landmark
        } = newBranch;

        const branchPayload = {
            branchName,
            locationStreet,
            locationProvinceOrState,
            locationCity,
            locationPostalOrZipCode: Number(locationPostalOrZipCode),
            email,
            phone,
            mobile,
            latitude,
            longitude,
            landmark,
            schedules: branchSched
        };

        dispatch(createBranch(branchPayload));
    };
    return (
        <div data-testid="create-branch-component">
            <PageHeader
                title="Branches"
                description="Create and add branch details by filling out required information below."
                hideCreateButton
            />
            <BranchForm onFormSubmit={handleCreateBranch} />
        </div>
    );
};

export default CreateBranch;
