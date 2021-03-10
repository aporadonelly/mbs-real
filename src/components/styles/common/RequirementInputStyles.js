import { makeStyles } from '@material-ui/core/styles';

const RequirementInputStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    div: {
        padding: theme.spacing(1),
        textAlign: 'left',
        marginLeft: '-7px',
        color: '#3E4141',
        fontFamily: 'Inter Medium',
        fontSize: '14px',
        marginTop: '0em'
    },
    divProductReq: {
        padding: theme.spacing(1),
        textAlign: 'left',
        marginLeft: '-7px',
        color: '#3E4141',
        fontSize: '14px'
    },
    deleteIcon: {
        border: 'none !important',
        outline: 'none !important',
        display: 'inline',
        color: '#3E4141',
        fontSize: '14px',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'absolute',
        right: 0,
        paddingTop: '5em'
    }
}));

export default RequirementInputStyles;
