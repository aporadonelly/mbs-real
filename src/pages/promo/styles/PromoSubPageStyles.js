import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../assets/styleGuide';

const PromoSubPageStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    topGridMargin: {
        margin: '0.625rem 0 0 1rem'
    },
    promoNameInput: {
        width: '100%',
        [theme.breakpoints.up(1025)]: { width: '80%' }
    },
    dateFromStyle: {
        width: '100%',
        height: '2.5rem',
        '& .MuiIconButton-root': {
            padding: '0 !important'
        }
    },
    dateToStyle: {
        width: '100%',
        height: '2.5rem',
        marginBottom: '5rem',
        '& .MuiIconButton-root': {
            padding: '0 !important'
        }
    },
    promosDescription: {
        color: `${colors.pageDescription} !important`
    },
    quillStyle: {
        [theme.breakpoints.up(1025)]: {
            marginRight: '16.25rem',
            height: '16.375rem'
        },
        [theme.breakpoints.down(320)]: {
            marginRight: '11.875rem'
        },
        height: '20rem',
        '& .ql-toolbar': {
            backgroundColor: `${colors.quillBackColor} !important`,
            padding: '10px',
            borderRadius: '0.4rem 0.4rem 0 0'
        },
        width: '100%'
    },
    groupBtn: {
        marginTop: '3rem',
        [theme.breakpoints.down(507)]: { marginTop: '6rem' }
    },
    asteriskStyle: {
        color: colors.error,
        marginLeft: '0.2rem',
        fontWeight: 'bolder'
    }
}));
export default PromoSubPageStyles;
