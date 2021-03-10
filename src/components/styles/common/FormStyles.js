import { makeStyles } from '@material-ui/core/styles';
import { colors, fontSizes } from '../../../assets/styleGuide';

// Common Form Styles
const FormStyles = makeStyles(theme => ({
    pageContainer: {
        display: 'flex',
        height: '100vh'
    },
    container: {
        display: 'flex',
        width: 400,
        margin: '0 auto',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    header: {
        textAlign: 'center'
    },
    card: {
        textAlign: 'center',
        width: '100%'
    },
    fieldContainer: {
        textAlign: 'left',
        margin: '0.5rem 0'
    },
    errorContainer: {
        marginLeft: '-1rem',
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.25rem'
    },
    customErrorContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.25rem',
        color: colors.error,
        fontSize: fontSizes.errorText
    },
    logo: {
        width: '50%'
    },
    title: {
        fontFamily: 'Inter SemiBold'
    },
    label: {
        padding: '1rem 0 0.5rem',
        fontFamily: 'Inter Medium'
    },
    subTitleContainer: {
        padding: '0.5rem 1rem',
        fontSize: fontSizes.formSubtitleText
    },
    btn: {
        marginTop: '2rem',
        flexGrow: 1,
        width: '100%'
    },
    linkText: {
        color: colors.primary
    },
    disabledBtn: {
        backgroundColor: `${colors.primary} !important`,
        color: `${colors.white} !important`,
        opacity: 0.4
    },
    passwordIcon: {
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent !important'
        }
    },
    editBtn: {
        padding: '0 1rem',
        height: '2.5rem',
        fontFamily: 'Inter Medium',
        textTransform: 'capitalize'
    },
    // Page Forms
    formBtn: {
        width: '8rem',
        marginTop: '2rem'
    },
    cancelBtn: {
        width: '8rem',
        marginTop: '2rem',
        border: `1px solid ${colors.border}`
    },
    formBtnContainer: {
        marginTop: '2rem'
    },
    fieldSpacing: {
        paddingRight: '4rem'
    },
    placeholder: {
        color: colors.placeholderText,
        fontFamily: 'Inter Regular',
        margin: '0.5rem 0'
    },
    rightSpacing: {
        [theme.breakpoints.up('lg')]: {
            paddingRight: '1rem'
        }
    },
    leftSpacing: {
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '1rem'
        }
    },
    chipStyle: {
        height: '2rem !important',
        width: '5.2rem !important',
        color: `${colors.white} !important`,
        fontFamily: 'Inter Regular !important'
    }
}));

export default FormStyles;
