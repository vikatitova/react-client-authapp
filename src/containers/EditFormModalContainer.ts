import EditFormModal from '../components/modals/EditFormModal';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch,
    };
};

export default connect(null, mapDispatchToProps)(EditFormModal);
