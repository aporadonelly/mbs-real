import { createStyles, makeStyles } from '@material-ui/core/styles';
import { fontSizes, colors } from '../../../assets/styleGuide';

const ModalStyles = makeStyles(
    createStyles({
        modalContainer: {
            padding: '1.5rem !important',
            width: '30rem'
        },
        modalTitle: {
            fontSize: fontSizes.pageTitle,
            fontFamily: 'Inter Medium',
            marginBottom: '0.5rem'
        },
        message: {
            color: colors.pageDescription,
            padding: '0.20rem 0'
        },
        btn: {
            width: '6rem'
        },
        deleteBtn: {
            width: '6rem',
            marginRight: '0.5rem',
            backgroundColor: colors.error,
            '&:hover': {
                backgroundColor: `${colors.error} !important`
            }
        },
        closeBtn: {
            top: '0.5rem',
            right: '0.5rem',
            position: 'absolute',
            '&:hover': {
                backgroundColor: 'transparent !important'
            }
        },
        // View Modal
        container: {
            '& .MuiPaper-root': {
                width: '45rem',
                maxWidth: '45rem'
            }
        },
        titleContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline'
        },
        closeViewBtn: {
            '&:hover': {
                backgroundColor: 'transparent !important'
            },
            paddingRight: '0 !important',
            paddingLeft: '1.5rem !important'
        },
        editBtn: {
            marginLeft: '0.5rem',
            fontSize: fontSizes.text
        },
        dialogTitle: {
            padding: '0.75rem 1.5rem !important'
        },
        label: {
            padding: '0.5rem 0 0.75rem',
            fontFamily: 'Inter Medium'
        }
    })
);

export default ModalStyles;
