import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '../../assets/styleGuide';

const ProductFormOverrideStyles = createMuiTheme({
    palette: {
        primary: {
            main: colors.primary
        },
        secondary: {
            main: colors.white
        }
    },
    overrides: {
        MuiOutlinedInput: {
            input: {
                padding: '0.65rem !important'
            }
        }
    }
});

export default ProductFormOverrideStyles;
