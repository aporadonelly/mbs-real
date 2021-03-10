import { makeStyles } from '@material-ui/core/styles';
import { colors, fontSizes } from '../../../assets/styleGuide';

const UploadBaseStyle = makeStyles(() => ({
    root: {
        display: 'flex'
    },
    dropZoneStyle: {
        maxWidth: '18.75rem',
        backgroundColor: `${colors.dropZoneBackColor} !important`,
        maxHeight: '12.5rem !important',
        minHeight: '12.5rem !important',
        '& .MuiGrid-root': {
            '& .MuiFab-root': {
                opacity: '0 !important',
                position: 'relative !important'
            },
            '& .MuiGrid-item': {
                padding: '0'
            },
            '& .MuiGrid-grid-xs-4': {
                flexBasis: '100% !important',
                maxWidth: '100%'
            }
        },
        border: `dashed 0.1rem ${colors.border} !important`,
        '&:focus': {
            outline: 'none'
        }
    },
    dropZoneStyleError: {
        maxWidth: '18.75rem !important',
        backgroundColor: `${colors.dropZoneBackColor} !important`,
        maxHeight: '12.5rem !important',
        minHeight: '12.5rem !important',
        '& .MuiGrid-root': {
            '& .MuiFab-root': {
                opacity: '0 !important',
                position: 'relative !important'
            },
            '& .MuiGrid-item': {
                padding: '0'
            },
            '& .MuiGrid-grid-xs-4': {
                flexBasis: '100% !important',
                maxWidth: '100%'
            }
        },
        border: `dashed 0.1rem ${colors.error} !important`,
        '&:focus': {
            outline: 'none'
        }
    },
    dropZoneTextStyle: {
        fontSize: fontSizes.dropZoneText,
        margin: '5.3rem 0 0 0 !important',
        color: `${colors.dropZoneText} !important`
    },
    grid: {
        visibility: 'hidden'
    },
    image: { width: '100%', position: 'relative' }
}));
export default UploadBaseStyle;
