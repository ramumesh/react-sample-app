import { useEffect, useRef, useState } from "react";
import { MODAL_IDS } from "../../../common/constant";
import { saveEditedDocument } from "../../../store/documentStore";
import AppModal from "../AppModal/AppModal";

const FileEditModal = ({ documentId, fileDescription, afterEdit }) => {
    const [editedDescription, setEditedDescription] = useState("");
    const cancelButtonRef = useRef();

    const handleChange = (event) => {
        setEditedDescription(event.target.value);
    };

    useEffect(() => {
        setEditedDescription(fileDescription);
    }, [fileDescription]);

    const onSubmit = () => {
        if (!editedDescription) {
            return alert("Description cannot be empty");
        }
        const isFileEdited = saveEditedDocument(documentId, editedDescription);
        if (!isFileEdited) {
            return alert("No such file exists");
        }
        setEditedDescription("");
        afterEdit();
        cancelButtonRef.current.click();
    };

    const onCancel = () => {
        setEditedDescription(fileDescription);
    };

    return <AppModal modalId={MODAL_IDS.FILE_EDIT_MODAL} title="Confirm File Deletion">
        <div className="modal-body d-flex gap-3 align-items-center justify-content-center">
            <table className="app-layout-table">
                <tbody>
                    <tr>
                        <td className="text-center fw-bold">
                            <label htmlFor="edit-file-desc-input">File Description</label>
                        </td>
                        <td>
                            <input
                                className="app-input text-start w-100"
                                type="text"
                                value={editedDescription}
                                onChange={(e) => handleChange(e)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button
                                onClick={onSubmit}
                                className="app-button app-button-upload-modal"
                                type="button">
                                Save
                            </button>
                        </td>
                        <td className="text-start font-weight-bold">
                            <button
                                onClick={onCancel}
                                ref={cancelButtonRef}
                                className="app-button app-button-upload-modal"
                                data-bs-dismiss="modal" type="button">Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;
    </AppModal>;
};

export default FileEditModal;