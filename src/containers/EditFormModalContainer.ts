import EditFormModal from '../components/modals/EditFormModal';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions/users.action';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state: any) => {
    return {
        modal: state.users,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    const actions = bindActionCreators(
        {
            openModal,
            closeModal,
        },
        dispatch
    );
    return { ...actions, dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFormModal);
