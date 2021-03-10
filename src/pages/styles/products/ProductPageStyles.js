import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../assets/styleGuide';

const ProductPageStyles = makeStyles(() => ({
    searchAdornment: {
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent !important'
        },
        color: `${colors.primary} !important`
    },
    tabSearchGrid: { borderBottom: 'rgba(0, 0, 0, 0.1) solid 0.1px' },
    tabSearchGridItem: {
        paddingTop: '0 !important',
        paddingBottom: '0 !important'
    },
    tab: {
        textTransform: 'none !important',
        minWidth: '0 !important',
        margin: '0 1rem !important',
        padding: '1rem 0 !important'
    }
}));

export default ProductPageStyles;
