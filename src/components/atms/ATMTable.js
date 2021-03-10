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
import { fetchATMs } from '../../actions';

const ATMTable = ({ onDeleteItem }) => {
    const atm = useSelector(state => state.atm);
    const dispatch = useDispatch();

    const { atmList, totalATMItems } = atm;
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsAvailable, setItemsAvailable] = useState(0);
    const [visible, setVisible] = useState('');
    const [selected, setSelected] = useState('');

    const classes = TableStyles();

    let entryString = totalATMItems <= 1 ? 'entry' : 'entries';

    useEffect(async () => {
        await dispatch(fetchATMs(currentPage));
    }, [currentPage]);

    useEffect(async () => {
        if (atm.isDeleteSuccess) {
            setCurrentPage(1);
            await dispatch(fetchATMs(1));
        }
    }, [atm.isDeleteSuccess]);

    useEffect(() => {
        setItemsAvailable(atmList.length);
    }, [atmList]);

    useEffect(() => {
        const page = totalATMItems / 10;
        setTotalItems(Math.ceil(page));
        entryString = totalATMItems <= 1 ? 'entry' : 'entries';
    }, [totalATMItems]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const fromPage = (currentPage - 1) * 10 + 1;
    const toPage = itemsAvailable + fromPage - 1;
    const maxStringLength = 90;

    const handleMenuOpen = (event, id) => {
        event.preventDefault();
        setSelected(id);
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
                        data-testid="view-atm-button">
                        View
                    </Button>
                    <Button
                        variant="text"
                        size="large"
                        color="secondary"
                        type="button"
                        disableRipple
                        className={classes.menuItem}
                        data-testid="edit-atm-button">
                        Edit
                    </Button>
                    <Button
                        onClick={() => onDeleteItem(item)}
                        variant="text"
                        size="large"
                        color="secondary"
                        style={{ color: colors.error }}
                        type="button"
                        disableRipple
                        className={classes.menuItem}
                        data-testid={`delete-atm-button-${item.id}`}>
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
                                align="left"
                                style={{ width: '20%' }}>
                                Name
                            </TableCell>
                            <TableCell
                                className={`${classes.tableHeader} ${classes.tableCell}`}
                                align="left"
                                style={{ width: '40%' }}>
                                Location
                            </TableCell>
                            <TableCell
                                className={`${classes.tableHeader} ${classes.tableCell}`}
                                align="left"
                                style={{ width: '40%' }}>
                                Landmark
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {atmList.map(item => {
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
                                    data-testid={`atm-item-${item.id}`}>
                                    <TableCell className={classes.tableCell}>
                                        {item.atmName}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {location.length > maxStringLength
                                            ? `${location.substring(0, maxStringLength - 3)}...`
                                            : location}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableCell}
                                        style={{
                                            borderRightColor: 'transparent'
                                        }}>
                                        <Grid container justify="space-between" alignItems="center">
                                            <Grid>
                                                {item.landmark.length > maxStringLength
                                                    ? `${item.landmark.substring(
                                                          0,
                                                          maxStringLength - 3
                                                      )}...`
                                                    : item.landmark}
                                            </Grid>
                                            <Grid>
                                                <MoreHoriz
                                                    data-testid={`atm-item-more-${item.id}`}
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
                        Showing {fromPage} to {toPage} of {totalATMItems} {entryString}
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

export default ATMTable;
