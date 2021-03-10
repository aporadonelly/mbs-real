import React, { useEffect, useState } from 'react';
import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Grid,
    Button,
    Paper
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { MoreHoriz } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { TableStyles } from '../styles';
import { colors } from '../../assets/styleGuide';
import { fetchBranches } from '../../actions';

const BranchTable = ({ onMenuActions }) => {
    const branch = useSelector(state => state.branch);
    const dispatch = useDispatch();

    const { branchList, totalBranchItems } = branch;
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsAvailable, setItemsAvailable] = useState(0);
    const [visible, setVisible] = useState('');
    const [selected, setSelected] = useState('');

    const classes = TableStyles();

    let entryString = totalBranchItems <= 1 ? 'entry' : 'entries';

    useEffect(async () => {
        await dispatch(fetchBranches(currentPage));
    }, [currentPage]);

    useEffect(async () => {
        if (branch.isDeleteSuccess) {
            setCurrentPage(1);
            await dispatch(fetchBranches(1));
        }
    }, [branch.isDeleteSuccess]);

    useEffect(() => {
        setItemsAvailable(branchList.length);
    }, [branchList]);

    useEffect(() => {
        const page = totalBranchItems / 10;
        setTotalItems(Math.ceil(page));
        entryString = totalBranchItems <= 1 ? 'entry' : 'entries';
    }, [totalBranchItems]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const fromPage = (currentPage - 1) * 10 + 1;
    const toPage = itemsAvailable + fromPage - 1;
    const maxStringLength = 80;
    const maxPhoneLength = 30;

    const handleMenuOpen = (event, id) => {
        event.preventDefault();
        setSelected(id);
    };

    const renderMenu = item => {
        if (item.id === selected) {
            return (
                <Paper className={classes.menuContainer}>
                    <Button
                        onClick={() => onMenuActions('view', item)}
                        variant="text"
                        size="large"
                        color="secondary"
                        type="button"
                        disableRipple
                        className={classes.menuItem}
                        data-testid={`view-branch-button-${item.id}`}>
                        View
                    </Button>
                    <Button
                        variant="text"
                        size="large"
                        color="secondary"
                        type="button"
                        disableRipple
                        className={classes.menuItem}
                        data-testid="edit-branch-button">
                        Edit
                    </Button>
                    <Button
                        onClick={() => onMenuActions('delete', item)}
                        variant="text"
                        size="large"
                        color="secondary"
                        style={{ color: colors.error }}
                        type="button"
                        disableRipple
                        className={classes.menuItem}
                        data-testid={`delete-branch-button-${item.id}`}>
                        Delete
                    </Button>
                </Paper>
            );
        }
    };

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
                                style={{ width: '40%' }}
                                className={`${classes.tableHeader} ${classes.tableCell}`}
                                align="left">
                                Location
                            </TableCell>
                            <TableCell
                                className={`${classes.tableHeader} ${classes.tableCell}`}
                                align="left">
                                Email
                            </TableCell>
                            <TableCell
                                className={`${classes.tableHeader} ${classes.tableCell}`}
                                align="left">
                                Telephone Number
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {branchList.map(item => {
                            const location = `${item.locationStreet}, ${item.locationCity.cityName}, ${item.locationProvinceOrState.provinceName}, ${item.locationPostalOrZipCode}`;
                            return (
                                <TableRow
                                    style={{ position: 'relative' }}
                                    key={item.id}
                                    hover
                                    onMouseOver={() => {
                                        setVisible(item.id);
                                    }}
                                    onMouseLeave={() => {
                                        setVisible('');
                                        setSelected('');
                                    }}
                                    data-testid={`branch-item-${item.id}`}>
                                    <TableCell className={classes.tableCell}>
                                        {item.branchName}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {location.length > maxStringLength
                                            ? `${location.substring(0, maxStringLength - 3)}...`
                                            : location}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {item.email}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableCell}
                                        style={{
                                            borderRightColor: 'transparent'
                                        }}>
                                        <Grid container justify="space-between" alignItems="center">
                                            <Grid>
                                                {item.phone.length > maxPhoneLength
                                                    ? `${item.phone.substring(
                                                          0,
                                                          maxPhoneLength - 3
                                                      )}...`
                                                    : item.phone}
                                            </Grid>
                                            <Grid>
                                                <MoreHoriz
                                                    data-testid={`branch-item-more-${item.id}`}
                                                    style={{
                                                        visibility:
                                                            visible === item.id
                                                                ? 'visible'
                                                                : 'hidden'
                                                    }}
                                                    className={classes.moreIcon}
                                                    aria-haspopup="true"
                                                    onClick={e => handleMenuOpen(e, item.id)}
                                                />
                                                {renderMenu(item)}
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
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
                        Showing {fromPage} to {toPage} of {totalBranchItems} {entryString}
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

export default BranchTable;
