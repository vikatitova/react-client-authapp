import { OPEN_MODAL, CLOSE_MODAL } from '../actions/users.action';

const initialState = {
    isModalOpen: false,
};

const usersReducer = (state = initialState, action: any) => {
    if (action.type === OPEN_MODAL) {
        return {
            isModalOpen: true,
            modalType: action.modalType,
        };
    }
    if (action.type === CLOSE_MODAL) {
        return {
            isModalOpen: false,
            modalType: action.modalType,
        };
    }

    return state;
};

export default usersReducer;
