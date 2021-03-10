import { createStyles, makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../assets/styleGuide';
// Style for Login Component
const PromoTableStyles = makeStyles(
    createStyles({
        container: {
            maxHeight: 50,
            position: 'relative',
            padding: '0'
        },
        paginationStyle: {
            borderBottom: '0',
            position: 'absolute',
            bottom: '6.25rem',
            right: '3.75rem',
            '& .MuiTypography-root': {
                visibility: 'hidden'
            }
        },
        tableBorder: {
            borderRight: `0.1px solid ${colors.borderTableColor} !important`,
            borderBottom: `0.1px solid ${colors.borderTableColor} !important`
        },
        statusTableBorder: {
            borderBottom: `0.1px solid ${colors.borderTableColor} !important`
        },
        tableRow: {
            width: '26% !important',
            padding: '0 1rem 0 2rem !important',
            fontFamily: 'Inter Regular !important'
        },
        moreIconStyle: {
            cursor: 'pointer',
            marginTop: '0.3rem !important',
            marginLeft: '3rem !important',
            fontFamily: 'Inter Regular'
        },
        tableHeader: {
            paddingLeft: '2rem !important',
            fontFamily: 'Inter Medium !important'
        },
        infoIconStyle: {
            color: `${colors.primary} !important`,
            marginLeft: '0.3rem'
        },
        menuContainerStyle: {
            marginTop: '3rem',
            '& .MuiPaper-elevation8': {
                boxShadow: '0 0.1rem 0.1rem #0000000A'
            },
            '& .MuiButtonBase-root': {
                fontFamily: 'Inter Regular'
            }
        },
        statusHeader: {
            display: 'flex !important',
            fontFamily: 'Inter Medium !important',
            justifyContent: 'flex-start !important',
            paddingLeft: '24% !important'
        },
        infoTextStyle: {
            fontFamily: 'Inter Regular !important',
            width: '10rem'
        },
        statusRows: {
            display: 'flex !important',
            fontFamily: 'Inter Regular !important',
            justifyContent: 'flex-start !important',
            paddingLeft: '22% !important'
        }
    })
);

export default PromoTableStyles;
