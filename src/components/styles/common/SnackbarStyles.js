import { createStyles, makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../assets/styleGuide';

const SnackbarStyles = makeStyles(
    createStyles({
        container: {
            backgroundColor: `${colors.success} !important`,
            minWidth: '0 !important',
            justifyContent: 'center !important',
            '& .MuiSnackbarContent-action': {
                padding: '0 !important',
                margin: '0 !important'
            }
        },
        snackbar: {
            top: '7.25rem !important'
        }
    })
);

export default SnackbarStyles;
