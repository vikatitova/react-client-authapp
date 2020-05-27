import DeleteFormModal from '../components/modals/DeleteFormModal';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch,
    };
};

export default connect(null, mapDispatchToProps)(DeleteFormModal);
