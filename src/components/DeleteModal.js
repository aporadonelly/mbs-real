import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { ModalStyles } from './styles';
import deleteIcon from '../assets/icons/deleteIcon.svg';
import { colors } from '../assets/styleGuide';

const DeleteModal = ({ open, onClose, onDeleteItem, item, itemName }) => {
    const classes = ModalStyles();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent className={classes.modalContainer}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <img src={deleteIcon} alt="delete-icon" />
                    </div>
                    <div style={{ margin: '0 1.25rem' }}>
                        <div className={classes.modalTitle} data-testid="item-delete-question">
                            Delete {item}?
                        </div>
                        <div>
                            <div
                                className={classes.message}
                                data-testid="item-name-delete-question">
                                Are you sure you want to delete {itemName}?
                            </div>
                            <div className={classes.message}>This action cannot be undone.</div>
                        </div>
                    </div>
                    <div>
                        <IconButton
                            data-testid="close-icon-btn"
                            aria-label="remove-schedule"
                            disableRipple
                            className={classes.closeBtn}
                            onClick={onClose}>
                            <Close style={{ color: colors.text }} fontSize="small" />
                        </IconButton>
                    </div>
                </div>
            </DialogContent>
            <DialogActions style={{ padding: '1rem 1.5rem 1.5rem' }}>
                <Button
                    data-testid="delete-btn"
                    variant="contained"
                    size="large"
                    color="primary"
                    type="button"
                    onClick={onDeleteItem}
                    className={classes.deleteBtn}>
                    Delete
                </Button>
                <Button
                    data-testid="cancel-btn"
                    variant="outlined"
                    size="large"
                    color="secondary"
                    type="button"
                    className={classes.btn}
                    onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default DeleteModal;
