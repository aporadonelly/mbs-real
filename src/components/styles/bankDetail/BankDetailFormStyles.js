import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../assets/styleGuide';

const BankDetailFormStyles = makeStyles(theme => ({
    wysiwygErrorGrid: { marginTop: '1rem' },
    quillStyle: {
        [theme.breakpoints.up(1025)]: {
            marginRight: '16.25rem'
        },
        [theme.breakpoints.down(320)]: {
            marginRight: '11.875rem'
        },
        '& .ql-toolbar': {
            backgroundColor: `${colors.quillBackColor} !important`,
            padding: '10px',
            borderRadius: '0.4rem 0.4rem 0 0'
        },
        '& .ql-container': {
            height: '30vh'
        },
        width: '100%'
    },
    selectValidator: {
        '& div>div': {
            padding: '0.7rem'
        }
    },
    asteriskStyle: {
        color: colors.error,
        marginLeft: '0.2rem',
        fontWeight: 'bolder'
    },
    grid: {
        visibility: 'hidden'
    }
}));

export default BankDetailFormStyles;
