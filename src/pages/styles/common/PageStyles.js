import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../assets/styleGuide';

const PageStyles = makeStyles(() => ({
    root: {
        display: 'flex'
    },
    icon: {
        margin: '0.75rem 0.625rem 0 0',
        paddingRight: '0.625rem'
    },
    snackbar: {
        backgroundColor: colors.success,
        width: '12.5rem',
        height: '2.375rem',
        marginTop: '6.25rem',
        '& .MuiSnackbarContent-message': {
            position: 'absolute',
            textAlign: 'center'
        }
    },
    cretePromoBtn: {
        padding: '0.6875rem 1.875rem',
        fontFamily: 'Inter medium',
        textTransform: 'capitalize',
        boxShadow: 'none'
    },
    containerPaginationStyle: {
        display: 'flex',
        position: 'relative',
        top: '5rem',
        left: '2rem'
    },
    paginationStyle: {
        '& .Mui-selected': {
            backgroundColor: `${colors.dropZoneText} !important`,
            color: 'white'
        },
        flexGrow: '1'
    },
    emptyPlaceholder: {
        textAlign: 'center',
        position: 'absolute',
        left: '50%',
        top: '50%'
    },
    placeholderContainer: {
        height: '60vh'
    },
    placeholderText: {
        fontFamily: 'Inter Medium',
        padding: '0.25rem 0'
    }
}));
export default PageStyles;
