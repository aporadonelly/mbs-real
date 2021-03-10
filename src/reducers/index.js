import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PromosReducer from './PromosReducer';
import BranchReducer from './BranchReducer';
import AddressReducer from './AddressReducer';
import ThemeReducer from './ThemeReducer';
import BankDetailsReducer from './BankDetailsReducer';
import ATMReducer from './ATMReducer';
import ProductsReducer from './ProductsReducer';

export default combineReducers({
    auth: AuthReducer,
    promo: PromosReducer,
    products: ProductsReducer,
    branch: BranchReducer,
    theme: ThemeReducer,
    address: AddressReducer,
    bankDetails: BankDetailsReducer,
    atm: ATMReducer
});
