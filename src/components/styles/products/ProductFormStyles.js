import { makeStyles } from '@material-ui/core/styles';

const ProductFormStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: '2rem',
        padding: '2rem',
        marginLeft: '-2rem !important'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    createLabel: {
        textAlign: 'left',
        marginTop: '0.3rem',
        marginBottom: '0.7rem'
    },
    addNewBtn: {
        marginTop: '1rem',
        flexGrow: 1,
        float: 'right',
        height: '2.2rem'
    },
    removeBtn: {
        marginTop: '3rem',
        cursor: 'pointer',
        position: 'absolute',
        right: '13em'
    },
    addBtn: {
        margin: '0 1rem',
        width: '50%',
        float: 'right'
    },
    renderErrorMessage: {
        marginRight: '0.25em'
    },
    cancelBtn: {
        marginRight: '1.5em',
        width: '150px',
        textTransform: 'capitalize'
    },
    createNew: {
        color: '#3E4141',
        fontSize: '17px',
        fontFamily: 'Inter Medium'
    },
    backArrow: {
        marginTop: '0.5em'
    }
}));
export default ProductFormStyles;
