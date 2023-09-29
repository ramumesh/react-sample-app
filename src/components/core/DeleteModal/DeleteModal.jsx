import QuestionMarkImage from "../../../assets/question-mark.svg";
import AppModal from "../AppModal/AppModal";

const DeleteModal = ({ modalId, title, onDelete, onCancel }) => {
    return <AppModal modalId={modalId} title={title}>
        <div className="modal-body d-flex gap-3 align-items-center justify-content-center">
            <img height="50" width="50" src={QuestionMarkImage} />
            <div>Are you sure?</div>
        </div>
        <div className="p-3 d-flex gap-3 align-items-center justify-content-center">
            <button onClick={() => onDelete()} type="button" id="modal-delete-ok" className="app-button"
                data-bs-dismiss="modal">Ok</button>
            <button onClick={() => onCancel()} type="button" id="modal-delete-cancel" className="app-button"
                data-bs-dismiss="modal">Cancel</button>
        </div>
    </AppModal>;
};

export default DeleteModal;