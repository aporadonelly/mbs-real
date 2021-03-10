import { makeStyles } from '@material-ui/core/styles';
import { colors, fontSizes } from '../../../assets/styleGuide';

const ThemeManagerStyles = makeStyles(theme => ({
    title: {
        fontFamily: 'Inter Bold',
        fontSize: fontSizes.pageSubtitle,
        margin: '1rem 0'
    },
    colorsContainer: {
        [theme.breakpoints.up('lg')]: {
            paddingRight: '12rem'
        }
    },
    colorContainer: {
        margin: '1.25rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    colorBtn: {
        color: colors.white,
        border: `8px solid ${colors.white}`
    },
    colorText: {
        fontSize: fontSizes.errorText,
        marginTop: '1rem'
    },
    btn: {
        textTransform: 'capitalize',
        margin: '2rem 0',
        [theme.breakpoints.up('lg')]: {
            marginTop: '8rem'
        }
    },
    previewContainer: {
        [theme.breakpoints.down('md')]: {
            textAlign: 'center'
        }
    },
    previewContent: {
        [theme.breakpoints.up('lg')]: {
            textAlign: 'center',
            minWidth: '29vw'
        }
    },
    previewText: {
        padding: '2rem 0 1rem',
        fontFamily: 'Inter Medium'
    },
    carouselContainer: {
        '& .carousel .slide': {
            background: colors.white
        },
        '& .carousel .control-dots .dot': {
            background: colors.text
        },
        '& .carousel .carousel-status': {
            display: 'none'
        },
        '& .carousel.carousel-slider .control-arrow:hover': {
            background: 'none'
        },
        '& .carousel .control-next.control-arrow:before': {
            borderLeftColor: colors.text
        },
        '& .carousel .control-prev.control-arrow:before': {
            borderRightColor: colors.text
        }
    },
    phoneContainer: {
        padding: '1rem 1rem 2rem'
    }
}));

export default ThemeManagerStyles;
