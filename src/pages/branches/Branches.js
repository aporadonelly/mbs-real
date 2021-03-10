import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import { PageHeader, Snackbar, BranchTable, DeleteModal, ViewModal } from '../../components';
import { fetchBranches, updateBranch, deleteBranch } from '../../actions';
import { FormStyles, ModalStyles } from '../../components/styles';
import { PageStyles } from '../styles';

const Branches = () => {
    const classes = { ...FormStyles(), ...PageStyles(), ...ModalStyles() };
    const history = useHistory();
    const dispatch = useDispatch();
    const branch = useSelector(state => state.branch);

    useEffect(async () => {
        await dispatch(fetchBranches(1));
    }, []);

    const [selectedBranch, setSelectedBranch] = useState('');

    const [openDeleteModel, setOpenDeleteModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);

    const handleMenuActions = (type, branchItem) => {
        setSelectedBranch(branchItem);
        switch (type) {
            case 'delete':
                setOpenDeleteModal(true);
                break;
            case 'view':
                setOpenViewModal(true);
                break;
            default:
        }
    };

    const handleDeleteBranch = () => {
        dispatch(deleteBranch(selectedBranch.id));
        setOpenDeleteModal(false);
    };

    const closeModal = type => {
        switch (type) {
            case 'delete':
                setOpenDeleteModal(false);
                break;
            case 'view':
                setOpenViewModal(false);
                break;
            default:
        }
    };

    const renderPhoneNumbers = () => {
        if (selectedBranch.phone?.includes(',')) {
            const phoneNumbers = selectedBranch.phone.split(',');
            return phoneNumbers.map(item => (
                <div style={{ paddingBottom: '0.25rem' }}>{item.trim()}</div>
            ));
        }
        return selectedBranch.phone;
    };

    // Format Time Schedules
    const renderSchedule = () => {
        const schedule = selectedBranch.schedules;

        return schedule?.map(item => {
            const timeFrom = new Date();
            const bankTimeFrom = item.bankingHoursFrom.split(':');
            timeFrom.setHours(Number(bankTimeFrom[0]), Number(bankTimeFrom[1]));

            const timeTo = new Date();
            const bankTimeTo = item.bankingHoursTo.split(':');
            timeTo.setHours(Number(bankTimeTo[0]), Number(bankTimeTo[1]));

            return (
                <div style={{ paddingBottom: '0.25rem' }}>
                    {`${moment(timeFrom).format('h:mm A')} - ${moment(timeTo).format(
                        'h:mm A'
                    )} (${renderDaysFormat(item.bankingDays)})`}
                </div>
            );
        });
    };
    // Format Days Schedules
    const renderDaysFormat = bankingDays => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        const constructDayString = (i, c) => {
            if (c > 2) {
                return `${days[i]} to ${days[i + c - 1]}, `;
            }
            let str = '';
            for (let j = i; j < i + c; j++) {
                str += `${days[j]}, `;
            }
            return str;
        };

        const bankingDaysIndex = bankingDays.map(day => days.indexOf(day));
        let consecutiveCount = 0;
        let startIndex = null;
        let dayString = '';

        for (let i = 0; i < 7; i++) {
            if (bankingDaysIndex.indexOf(i) >= 0) {
                consecutiveCount += 1;
                if (startIndex === null) {
                    startIndex = i;
                }
            } else {
                dayString += constructDayString(startIndex, consecutiveCount);
                consecutiveCount = 0;
                startIndex = null;
            }
        }

        if (startIndex !== null && consecutiveCount > 0) {
            dayString += constructDayString(startIndex, consecutiveCount);
        }

        dayString = dayString.substring(0, dayString.length - 2);

        return dayString;
    };

    return (
        <div data-testid="branches-component">
            <Snackbar
                showSnackbar={branch.isCreateSuccess}
                message="Branch successfully created."
                resetTrigger={() => dispatch(updateBranch('isCreateSuccess', false))}
            />
            <Snackbar
                showSnackbar={branch.isDeleteSuccess}
                message="Branch successfully deleted."
                resetTrigger={() => dispatch(updateBranch('isDeleteSuccess', false))}
            />
            <PageHeader
                title="Branches"
                description="Create, view, and edit your bank branches here."
                buttonText="Create New Branch"
                onItemCreate={() => {
                    history.push('/branches/create');
                }}
            />
            {branch.totalBranchItems === 0 ? (
                <Grid
                    data-testid="empty-branch-placeholder"
                    alignItems="center"
                    container
                    direction="column"
                    justify="center"
                    className={classes.placeholderContainer}>
                    <Grid className={classes.placeholderText}>
                        No Branches available at this time.
                    </Grid>
                    <Grid className={classes.placeholderText}>Click Create to get started.</Grid>
                </Grid>
            ) : (
                <BranchTable onMenuActions={handleMenuActions} />
            )}
            {/* Delete Modal */}
            <DeleteModal
                open={openDeleteModel}
                onClose={() => closeModal('delete')}
                item="Branch"
                itemName={selectedBranch.branchName}
                onDeleteItem={handleDeleteBranch}
            />
            {/* View Modal */}
            <ViewModal open={openViewModal} onClose={() => closeModal('view')} item="Branch">
                <Grid container>
                    <Grid xs={12}>
                        <div className={classes.fieldContainer}>
                            <div className={classes.label}>Name</div>
                            <div>{selectedBranch.branchName}</div>
                        </div>
                    </Grid>
                    <Grid xs={12}>
                        <div className={classes.fieldContainer}>
                            <div className={classes.label}>Street Name</div>
                            <div>{selectedBranch.locationStreet}</div>
                        </div>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid xs={6}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>City / Municipality</div>
                                <div>{selectedBranch.locationCity?.cityName}</div>
                            </div>
                        </Grid>
                        <Grid xs={6}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>State / Province</div>
                                <div>{selectedBranch.locationProvinceOrState?.provinceName}</div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid xs={12}>
                        <div className={classes.fieldContainer}>
                            <div className={classes.label}>Postal Code / ZIP</div>
                            <div>{selectedBranch.locationPostalOrZipCode}</div>
                        </div>
                    </Grid>
                    <Grid xs={12}>
                        <div className={classes.fieldContainer}>
                            <div className={classes.label}>Address Preview</div>
                            <div>{`${selectedBranch.locationStreet}, ${selectedBranch.locationCity?.cityName}, ${selectedBranch.locationProvinceOrState?.provinceName}, ${selectedBranch.locationPostalOrZipCode}`}</div>
                        </div>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid xs={6}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>Landmark</div>
                                <div>
                                    {selectedBranch.landmark !== ''
                                        ? selectedBranch.landmark
                                        : 'None'}
                                </div>
                            </div>
                        </Grid>
                        <Grid xs={6}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>Email</div>
                                <div>{selectedBranch.email}</div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid xs={6}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>Telephone Number</div>
                                {renderPhoneNumbers()}
                            </div>
                        </Grid>
                        <Grid xs={6}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>Mobile Number</div>
                                <div>{selectedBranch.mobile}</div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid xs={12}>
                        <div className={classes.fieldContainer}>
                            <div className={classes.label}>Schedule</div>
                            {renderSchedule()}
                        </div>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid xs={6}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>Latitude</div>
                                <div>{selectedBranch.latitude}</div>
                            </div>
                        </Grid>
                        <Grid xs={6}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>Longitude</div>
                                <div>{selectedBranch.longitude}</div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </ViewModal>
        </div>
    );
};

export default Branches;
