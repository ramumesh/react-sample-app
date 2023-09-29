import { useState, useEffect } from "react";
import { getDocuments, removeDocumentById } from "../../../store/documentStore";
import { ACTIONS, MODAL_IDS, LABELS } from "../../../common/constant";
import DeleteModal from "../../core/DeleteModal/DeleteModal";
import FileUploadModal from "../../core/FileUploadModal/FileUploadModal";
import AppButton from "../../core/AppButton/AppButton";
import { tempStore } from "../../../store/store";
import FileEditModal from "../../core/FileEditModal/FileEditModal";

const DocumentList = () => {

    const [documents, setDocuments] = useState([]);
    const [editDescription, setEditDescription] = useState("");
    const [documentId, setDocumentId] = useState(null);

    /**
     * Get the documents from local storage
     */
    const getDocumentList = () => {
        setDocuments(getDocuments());
    };

    useEffect(() => {
        getDocumentList();
    }, []);

    /**
     * Set the id and description to be passed to the File Edit Modal
     * @param {*} id 
     * @param {*} description 
     */
    const onEditClick = (id, description) => {
        setDocumentId(id);
        setEditDescription(description);
    };

    /**
     * Keeping the id in a temporary store so that it can be accessed later
     * @param {*} id 
     */
    const onDeleteClick = (id) => {
        tempStore.documentId = id;
    };

    /**
     * Ok Delete callback from the delete modal 
     */
    const onOkDelete = () => {
        removeDocumentById(tempStore.documentId);
        tempStore.documentId = undefined;
        setDocuments(getDocuments());
    };

    /**
     * Cancel callbakc from the delete modal
     */
    const onCancelDelete = () => {
        tempStore.documentId = undefined;
    };

    /**
     * After Edit callback from the modal
     */
    const afterEdit = () => {
        getDocumentList();
        setDocumentId("");
        setEditDescription("");
    };

    return <div>
        <h4 className="m-3">
            My Uploads
        </h4>

        <div className="users-list mt-3 d-flex gap-4 flex-column h-70 align-items-center justify-content-center">
            <div className="table-container">
                <table className="app-table">
                    <tbody>
                        <tr>
                            <th>Label</th>
                            <th className="text-center">FileName</th>
                            <th className="text-center">Action</th>
                        </tr>
                        {documents.map(item =>
                            <tr key={item.id}>
                                <td>{item.fileDescription}</td>
                                <td className="text-center">{item.fileName}</td>
                                <td className="text-center">
                                    <a onClick={() => onEditClick(item.id, item.fileDescription)}
                                        data-bs-toggle="modal"
                                        data-bs-target={`#${MODAL_IDS.FILE_EDIT_MODAL}`}
                                        className="app-action-link">
                                        Edit
                                    </a>
                                    <span> | </span>
                                    <a onClick={() => onDeleteClick(item.id)} className="app-action-link" data-bs-toggle="modal" data-bs-target={`#${MODAL_IDS.FILE_DELETE_MODAL}`}>
                                        Delete
                                    </a>
                                </td>
                            </tr>)}
                        <tr>
                            <td>
                                <AppButton
                                    title={ACTIONS.ADD_UPLOAD}
                                    data-bs-toggle="modal"
                                    data-bs-target={`#${MODAL_IDS.FILE_UPLOAD_MODAL}`} />
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <DeleteModal
                onCancel={onCancelDelete}
                onDelete={onOkDelete}
                modalId={MODAL_IDS.FILE_DELETE_MODAL}
                title="Confirm User Deletion"
            />
            <FileUploadModal
                onUpload={getDocumentList}
            />
            <FileEditModal
                fileDescription={editDescription}
                documentId={documentId}
                afterEdit={afterEdit} />
        </div>
    </div>;
};

export default DocumentList;