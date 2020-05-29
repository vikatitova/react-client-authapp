export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modalType: string) => {
    return {
        type: OPEN_MODAL,
        modalType,
    };
};

export const closeModal = (modalType: string) => {
    return {
        type: CLOSE_MODAL,
        modalType,
    };
};
