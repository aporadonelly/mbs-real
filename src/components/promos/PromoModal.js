/**
 * @Name: PromoModal
 * @Description: Modal Component for the display of a specific promo item
 * @Props:
 *      handleOpen: receives a boolean value from the promotable component on when should the modal be opened.
 *      onClose: receives a boolean value from the promotable component  on when should the modal be closed.
 *      items: receives the specific row of item that was fetched from the promotable component.
 * @Return: View
 * @Author: RJ
 * @Last Update By: RJ
 */
import React, { useEffect, useState } from 'react';
import { CloseRounded } from '@material-ui/icons';
import {
    Chip,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    SvgIcon
} from '@material-ui/core';
import parse from 'html-react-parser';
import { useHistory } from 'react-router-dom';
import { colors } from '../../assets/styleGuide';
import { FormStyles, PromoModalStyles } from '../styles';
import placeholderImg from '../../assets/images/placeholderImg.png';

const PromoModal = ({ handleOpen, onClose, items, id }) => {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const history = useHistory();
    const classes = { ...FormStyles(), ...PromoModalStyles() };

    useEffect(() => {
        handleOpen ? setOpen(true) : setOpen(false);
        setScroll('paper');
    }, [handleOpen]);

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const EditIcon = () => (
        <SvgIcon className={classes.iconStyle}>
            <path d="M18.4 8L14 4.25l-10 10V18h3.75l10-10zm3.66-3.66L17.66.59 9.3 9 18.7 7l2.66-2.66z" />
            <path fillOpacity="1" d="M0 20h24v4H0v-4z" />
        </SvgIcon>
    );

    const ParsedEl = () => parse(items.description);

    return (
        <div data-testid={'promoModal'}>
            <Dialog open={open} scroll={scroll} className={classes.root}>
                <DialogTitle>
                    <div className={classes.titleContainer}>
                        <p className={classes.titleStyle}>View Promo</p>
                        <Button
                            variant="outlined"
                            className={classes.editBtn}
                            onClick={() => {
                                history.push(`/promos/edit/${id}`);
                            }}>
                            <EditIcon />
                            <p>Edit Promo</p>
                        </Button>
                        <IconButton
                            data-testid="closeBtn"
                            style={{ margin: '0 1rem' }}
                            onClick={handleClose}>
                            <CloseRounded />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '18.8rem' }}>
                            <p className={classes.modalLabel}>Name</p>
                            <p>{items.name}</p>
                        </div>
                        <div style={{ flexGrow: '1' }}>
                            <p className={classes.modalLabel}>Valid From</p>
                            <p>{items.validFrom}</p>
                        </div>
                        <div style={{ width: '10.375rem' }}>
                            <p className={classes.modalLabel}>Valid Until</p>
                            <p>{items.validTo}</p>
                        </div>
                    </div>
                    <div className={classes.imgContainer}>
                        {items.images === undefined || items.images.length === 0 ? (
                            <div>
                                <p className={classes.modalLabel}>Image Uploaded</p>
                                <div style={{ maxWidth: '18.75rem' }}>
                                    {/* Placeholder */}
                                    <img
                                        className={classes.imgStyle}
                                        src={placeholderImg}
                                        alt="PromoPhoto"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className={classes.modalLabel}>Image Uploaded</p>
                                <div style={{ maxWidth: '18.75rem' }}>
                                    {/* Image Uploaded */}
                                    <img
                                        className={classes.imgStyle}
                                        src={items.images[0].imageUrl}
                                        alt="PromoPhoto"
                                    />
                                </div>
                            </div>
                        )}
                        <div className={classes.statusContainer}>
                            <p className={classes.modalLabel}>Status</p>
                            <Chip
                                style={{
                                    backgroundColor:
                                        items.status === 'Expired' ? colors.error : colors.success
                                }}
                                className={classes.chipStyle}
                                label={items.status}
                            />
                        </div>
                    </div>
                    <p className={classes.modalLabel}>Description</p>
                    <ParsedEl />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PromoModal;
