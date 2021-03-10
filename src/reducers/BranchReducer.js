import { branchActionType } from '../actions/constants';
import { results } from './constants';

const INITIAL_STATE = {
    branchList: [],
    totalBranchItems: 0,
    result: '',
    message: '',
    error: {},
    isCreateSuccess: false,
    isDeleteSuccess: false
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case branchActionType.UPDATE_BRANCH:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            };
        case branchActionType.CREATE_BRANCH_SUCCESS:
            return {
                ...state,
                isCreateSuccess: true,
                result: results.SUCCESS
            };
        case branchActionType.FETCH_BRANCHES_SUCCESS:
            return {
                ...state,
                branchList: action.payload.results,
                totalBranchItems: action.payload.count,
                result: results.SUCCESS
            };
        case branchActionType.FETCH_BRANCHES_FAIL:
            return {
                ...state,
                error: action.payload,
                message: 'Failed to Retrieve Branches',
                result: results.FAIL
            };
        case branchActionType.DELETE_BRANCH_SUCCESS:
            return {
                ...state,
                isDeleteSuccess: true,
                result: results.SUCCESS
            };
        case branchActionType.DELETE_BRANCH_FAIL:
        case branchActionType.CREATE_BRANCH_FAIL:
            return {
                ...state,
                result: results.FAIL,
                error: action.payload
            };
        default:
            return state;
    }
}
