import { makeStyles } from '@material-ui/core/styles';
import { colors, fontSizes } from '../../../assets/styleGuide';

const BranchFormStyles = makeStyles(theme => ({
    backBtn: {
        padding: '0 !important',
        margin: '0.75rem 0',
        '&:hover': {
            backgroundColor: 'transparent !important'
        }
    },
    title: {
        fontSize: fontSizes.formTitle,
        fontFamily: 'Inter Medium',
        fontWeight: 'normal'
    },
    addressPreview: {
        color: colors.placeholderText,
        fontFamily: 'Inter Regular',
        padding: '1rem 0 0.5rem'
    },
    btnContainer: {
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end'
        }
    },
    select: {
        '& div': {
            padding: '0.7rem',
            whiteSpace: 'normal'
        }
    },
    selectValidator: {
        '& div>div': {
            padding: '0.7rem'
        }
    },
    removeBtn: {
        position: 'absolute',
        top: '1.25rem'
    },
    addBtn: {
        color: colors.text,
        marginRight: '0.5rem'
    }
}));

export default BranchFormStyles;
