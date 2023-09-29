const AppModal = ({ modalId, title, children }) => {
    return <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby="modal-label"
        aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="d-flex p-1 justify-content-center align-items-center border-black">
                    <h5 className="modal-title d-flex flex-fill justify-content-center" id="modal-label">
                        {title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                {...children}
            </div>
        </div>
    </div>;
};

export default AppModal;