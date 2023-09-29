import { useRef, useState } from "react";
import { ACTIONS, MODAL_IDS } from "../../../common/constant";
import AppModal from "../AppModal/AppModal";
import { saveDocument } from "../../../store/documentStore";

const FileUploadModal = ({ onUpload }) => {
    const cancelButtonRef = useRef();
    const [formData, setFormData] = useState({ fileDescription: "", fileName: "" });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const uploadFile = () => {
        const { fileDescription, fileName } = formData;
        if (!fileDescription) {
            return alert("File Description is mandatory");
        }
        if (!fileName) {
            return alert("File Name is mandatory");
        }
        saveDocument({
            fileDescription: fileDescription,
            fileName: fileName.replace(/.*[\/\\]/, ''),
        });
        cancelButtonRef.current.click();
        onUpload();
        setFormData({ fileDescription: "", fileName: "" });
    };

    const onCancel = () => {
        setFormData({ fileDescription: "", fileName: "" });
    };

    return <AppModal
        title={ACTIONS.UPLOAD}
        modalId={MODAL_IDS.FILE_UPLOAD_MODAL}>
        <div className="modal-body d-flex gap-3 align-items-center justify-content-center">
            <table className="app-layout-table">
                <tbody>
                    <tr>
                        <td className="text-center fw-bold">
                            <label htmlFor="file-description">File Description</label>
                        </td>
                        <td>
                            <input
                                onChange={handleChange}
                                className="app-input text-start file-description-input"
                                type="text"
                                name="fileDescription"
                                value={formData.fileDescription}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center fw-bold">
                            <label>File Upload</label>
                        </td>
                        <td className="font-weight-bold text-start">
                            <input
                                onChange={handleChange}
                                className="ms-2 file-input"
                                type="file"
                                name="fileName"
                                value={formData.fileName}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={uploadFile} className="app-button app-button-upload-modal"
                                type="button">Upload Now</button>
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
        </div>
        <div></div>
    </AppModal>;
};

export default FileUploadModal;