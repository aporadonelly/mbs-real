/**
 * @Name RouteData
 * @Description Orginizes the url path, sidebar name, logo and their own component
 * @Returns  Passes the data of the path, sidebar name and component and automatically renders it based on their own route
 * @Author RJ
 * @UpdatedBy Frances
 */
import React from 'react';

// Logo
import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard.svg';
import { ReactComponent as BankDetailsIcon } from '../assets/icons/bankdetails.svg';
import { ReactComponent as ThemeManagerIcon } from '../assets/icons/thememanager.svg';
import { ReactComponent as BranchesIcon } from '../assets/icons/branches.svg';
import { ReactComponent as ATMsIcon } from '../assets/icons/atms.svg';
import { ReactComponent as PromosIcon } from '../assets/icons/promos.svg';
import { ReactComponent as ProductsIcon } from '../assets/icons/products.svg';
import { ReactComponent as InquiriesIcon } from '../assets/icons/inquiries.svg';
import { ReactComponent as ShopIcon } from '../assets/icons/shop.svg';

// styles
import { colors } from '../assets/styleGuide';

// Container / Pages
import BankDetails from '../pages/BankDetails';
import Dashboard from '../pages/Dashboard';
import ThemeManager from '../pages/ThemeManager';
import Branches from '../pages/branches/Branches';
import ATMs from '../pages/atms/ATMs';
import Promos from '../pages/promo/Promos';
import ProductPage from '../pages/ProductPage';
import Inquiries from '../pages/Inquiries';
import Shop from '../pages/Shop';

// Auth Pages
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import SetPassword from '../pages/auth/SetPassword';
import ChangePassword from '../pages/auth/ChangePassword';

// Sub Pages
import CreatePromo from '../pages/promo/CreatePromo';
import EditPromo from '../pages/promo/EditPromo';
import CreateBranch from '../pages/branches/CreateBranch';
import CreateATM from '../pages/atms/CreateATM';
import CreateProduct from '../components/products/CreateProduct';

const Main = [
    {
        id: 1,
        path: '/',
        exact: true,
        sidebar: 'Dashboard',
        logo: (
            <DashboardIcon
                width={'1.2rem'}
                height={'1.2rem'}
                fill={colors.iconColor}
                className={'icon-color'}
            />
        ),
        main: () => <Dashboard />
    },
    {
        id: 2,
        path: '/bank-details',
        sidebar: 'Bank Details',
        logo: (
            <BankDetailsIcon
                width={'1.3rem'}
                height={'1.2rem'}
                fill={colors.iconColor}
                className={'icon-color'}
            />
        ),
        main: () => <BankDetails />
    },
    {
        id: 3,
        path: '/theme-manager',
        sidebar: 'Theme Manager',
        logo: (
            <ThemeManagerIcon
                width={'1.3rem'}
                height={'1.2rem'}
                fill={colors.iconColor}
                className={'icon-color'}
            />
        ),
        main: () => <ThemeManager />
    }
];
const PageManager = [
    {
        id: 4,
        path: '/branches',
        sidebar: 'Branches',
        logo: (
            <BranchesIcon
                width={'1.3rem'}
                height={'1.2rem'}
                fill={colors.iconColor}
                className={'icon-color'}
            />
        ),
        main: () => <Branches />
    },
    {
        id: 5,
        path: '/atms',
        sidebar: 'ATMs',
        logo: (
            <ATMsIcon
                width={'1.5rem'}
                height={'1.2rem'}
                fill={colors.iconColor}
                className={'icon-color'}
            />
        ),
        main: () => <ATMs />
    },
    {
        id: 6,
        path: '/promos',
        sidebar: 'Promos',
        logo: (
            <PromosIcon
                width={'1.4rem'}
                height={'1.2rem'}
                fill={colors.iconColor}
                className={'icon-color'}
            />
        ),
        main: () => <Promos />
    },
    {
        id: 7,
        path: '/products',
        sidebar: 'Products',
        logo: (
            <ProductsIcon
                width={'1.4rem'}
                height={'1.2rem'}
                fill={colors.iconColor}
                className={'icon-color'}
            />
        ),
        main: () => <ProductPage />
    },
    {
        id: 8,
        path: '/inquiries',
        sidebar: 'Inquiries',
        logo: (
            <InquiriesIcon
                width={'1.4rem'}
                height={'1.2rem'}
                fill={colors.iconColor}
                className={'icon-color'}
            />
        ),
        main: () => <Inquiries />
    },
    {
        id: 9,
        path: '/shop',
        sidebar: 'Shop',
        logo: (
            <ShopIcon
                width={'1.4rem'}
                height={'1.2rem'}
                fill={colors.iconColor}
                className={'icon-color'}
            />
        ),
        main: () => <Shop />
    }
];

// For auth pages
const Auth = [
    {
        id: 10,
        path: '/login',
        label: 'login',
        main: () => <Login />
    },
    {
        id: 11,
        path: '/forgot-password',
        label: 'forgot-password',
        main: () => <ForgotPassword />
    },
    {
        id: 12,
        path: '/set-password',
        label: 'set-password',
        main: () => <SetPassword />
    },
    {
        id: 99,
        exact: true,
        path: '/change-password',
        sidebar: 'Change Password',
        main: () => <ChangePassword />
    }
];

// For Sub Pages
const SubPages = [
    {
        id: 13,
        exact: true,
        path: '/promos/create',
        main: () => <CreatePromo />
    },
    {
        id: 14,
        exact: true,
        path: '/promos/edit/:id',
        main: () => <EditPromo />
    },
    {
        id: 15,
        exact: true,
        path: '/branches/create',
        main: () => <CreateBranch />
    },
    {
        id: 16,
        exact: true,
        path: '/atms/create',
        main: () => <CreateATM />
    },
    {
        id: 17,
        exact: true,
        path: '/products/create',
        main: () => <CreateProduct />
    }
];

export { PageManager, Main, Auth, SubPages };
