import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { ModalStyles } from './styles';
import editIcon from '../assets/icons/editIcon.svg';
import { colors } from '../assets/styleGuide';

const ViewModal = ({ open, onClose, item, children }) => {
    const classes = ModalStyles();

    return (
        <Dialog open={open} onClose={onClose} scroll="paper" className={classes.container}>
            <DialogTitle className={classes.dialogTitle}>
                <div className={classes.titleContainer}>
                    <div className={classes.modalTitle} data-testid={`view-title-${item}`}>
                        View {item}
                    </div>
                    <div>
                        <Button
                            variant="outlined"
                            size="large"
                            color="secondary"
                            type="button"
                            style={{ borderColor: colors.border }}
                            data-testid={`edit-button-${item}`}>
                            <img src={editIcon} alt="edit-icon" />
                            <div className={classes.editBtn} data-testid={`view-edit-${item}-text`}>
                                Edit {item}
                            </div>
                        </Button>
                        <IconButton
                            data-testid="close-icon-btn"
                            disableRipple
                            className={classes.closeViewBtn}
                            onClick={onClose}>
                            <Close style={{ color: colors.text }} fontSize="medium" />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
};
export default ViewModal;
