import { makeStyles } from '@material-ui/core/styles';

const ProductListStyles = makeStyles(() => ({
    root: {
        width: '100%',
        display: 'inline-block'
    },
    item: {
        paddingTop: '10px',
        float: 'left',
        color: '#3A435466',
        fontSize: '14px',
        fontFamily: 'Inter Medium'
    }
}));

export default ProductListStyles;
