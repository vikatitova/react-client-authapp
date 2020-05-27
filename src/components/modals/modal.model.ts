export interface IModal {
    isModalOpen: boolean;
    openModal(): void;
    closeModal(): void;
}

export default class Modal implements IModal {
    isModalOpen: boolean = false;

    openModal(): void {
        this.isModalOpen = true;
    }

    closeModal(): void {
        this.isModalOpen = false;
    }
}
