/**
 * @Name: promoTable
 * @Description: Table component that shows the promo items.
 * @Props: rows: receives an array of items from the response of the fetchpromo dispatch.
 * @Return: View
 * @Author: RJ
 * @Last Update By: RJ
 */
import React, { useEffect, useState } from 'react';
import {
    Chip,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@material-ui/core';
import { Info, MoreHoriz } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { FormStyles, PromoTableStyles, TableStyles } from '../styles';
import { colors } from '../../assets/styleGuide';
import PromoModal from './PromoModal';

const PromoTable = ({ rows, rowSelected, openModal, onClose }) => {
    const [visible, setVisible] = useState('');
    const [selected, setSelected] = useState('');
    const [idState, setIdState] = useState('');
    const history = useHistory();
    const [items, setItems] = useState('');
    const [openItem, setOpenItem] = useState(false);
    const classes = { ...FormStyles(), ...PromoTableStyles(), ...TableStyles() };

    useEffect(() => {
        rowSelected(items);
    }, [items]);

    const handleDeleteModal = () => {
        openModal(onClose);
    };

    const handleViewOpen = () => {
        setOpenItem(!openItem);
    };

    const handleMenuOpen = (event, id) => {
        setSelected(id);
        setIdState(id);
    };

    const infoText = (
        <h3 className={classes.infoTextStyle}>
            All expired promos are not displayed on the mobile app. Please edit validity dates.
        </h3>
    );

    const renderMenu = row => {
        if (row.id === selected) {
            return (
                <Paper className={classes.menuContainer}>
                    <Button
                        variant="text"
                        size="large"
                        color="secondary"
                        type="button"
                        disableRipple
                        className={classes.menuItem}
                        onClick={() => {
                            handleViewOpen();
                        }}
                        data-testid="view-promo-button">
                        View
                    </Button>
                    <Button
                        variant="text"
                        size="large"
                        color="secondary"
                        type="button"
                        disableRipple
                        className={classes.menuItem}
                        data-testid="edit-promo-button"
                        onClick={() => {
                            history.push(`/promos/edit/${idState}`);
                        }}>
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDeleteModal()}
                        variant="text"
                        size="large"
                        color="secondary"
                        style={{ color: colors.error }}
                        type="button"
                        disableRipple
                        className={classes.menuItem}
                        data-testid={`delete-promo-button-${row.id}`}>
                        Delete
                    </Button>
                </Paper>
            );
        }
    };
    return (
        <div data-testid="promoTable">
            <TableContainer style={{ marginTop: '3rem' }}>
                <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: `${colors.tableHeadColor}` }}>
                        <TableRow>
                            <TableCell
                                className={`${classes.tableBorder} ${classes.tableHeader}`}
                                align="left">
                                Name
                            </TableCell>
                            <TableCell
                                className={`${classes.tableBorder} ${classes.tableHeader}`}
                                align="left">
                                Valid From
                            </TableCell>
                            <TableCell
                                className={`${classes.tableBorder} ${classes.tableHeader}`}
                                align="left">
                                Valid Until
                            </TableCell>
                            <TableCell
                                className={`${classes.tableBorder} ${classes.statusHeader}`}
                                align="left">
                                Status
                                <Tooltip placement="top" title={infoText}>
                                    <Info className={classes.infoIconStyle} />
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow
                                data-testid="fullRow"
                                hover
                                key={row.id}
                                onMouseOver={() => {
                                    setVisible(row.id);
                                }}
                                onMouseLeave={() => {
                                    setVisible('');
                                    setSelected('');
                                }}>
                                <TableCell className={`${classes.tableBorder} ${classes.tableRow}`}>
                                    {row.name}
                                </TableCell>
                                <TableCell
                                    className={`${classes.tableBorder} ${classes.tableRow}`}
                                    align="left">
                                    {row.validFrom}
                                </TableCell>
                                <TableCell
                                    className={`${classes.tableBorder} ${classes.tableRow}`}
                                    align="left">
                                    {row.validTo}
                                </TableCell>
                                <TableCell
                                    className={`${classes.statusTableBorder} ${classes.statusRows}`}
                                    align="left">
                                    <Chip
                                        style={{
                                            backgroundColor:
                                                row.status === 'Expired'
                                                    ? colors.error
                                                    : colors.success
                                        }}
                                        className={classes.chipStyle}
                                        label={row.status}
                                    />

                                    <MoreHoriz
                                        data-testid="menuIcon"
                                        style={{
                                            visibility: visible === row.id ? 'visible' : 'hidden'
                                        }}
                                        className={classes.moreIconStyle}
                                        aria-haspopup="true"
                                        onClick={event => {
                                            handleMenuOpen(event, row.id);
                                            setItems(row);
                                        }}
                                    />
                                    {renderMenu(row)}
                                </TableCell>
                            </TableRow>
                        ))}
                        <PromoModal
                            items={items}
                            onClose={() => {
                                handleViewOpen();
                            }}
                            handleOpen={openItem}
                            id={idState}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PromoTable;
