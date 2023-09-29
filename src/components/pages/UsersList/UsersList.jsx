import { useEffect, useState } from "react";
import DeleteModal from "../../core/DeleteModal/DeleteModal";
import { getLoggedInUser, getUsers, removeUser } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../common/constant";
import { tempStore } from "../../../store/store";


const UsersList = () => {
    const DELETE_MODAL_ID = "user-delete-modal";
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState([]);

    useEffect(() => {
        setUsers(getUsers());
        setUserId(getLoggedInUser().id);
    }, []);

    const onEditClick = (id) => {
        navigate({
            pathname: PATHS.EDIT_USER,
            search: `?userId=${id}`,
        });
    };

    const onDeleteClick = (id) => {
        tempStore.userId = id;
    };

    const onOkDelete = () => {
        removeUser(tempStore.userId);
        tempStore.userId = undefined;
        setUsers(getUsers());
    };

    const onCancelDelete = () => {
        tempStore.userId = undefined;
    };

    return <div>
        <h4 className="m-3">
            Users
        </h4>
        <div className="users-list mt-3 d-flex gap-4 flex-column h-70 align-items-center justify-content-center">
            <div className="table-container">
                <table className="app-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th className="text-center">User Email ID</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody id="user-table-body">
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.fullName}</td>
                                <td className="text-center">{user.email}</td>
                                <td className="text-center">
                                    <a onClick={() => onEditClick(user.id)} className="app-action-link">
                                        Edit
                                    </a>
                                    {user.id !== userId && <>
                                        <span> | </span>
                                        <a onClick={() => onDeleteClick(user.id)}
                                            className="app-action-link"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#${DELETE_MODAL_ID}`}
                                        >
                                            Delete
                                        </a></>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <DeleteModal onCancel={onCancelDelete} onDelete={onOkDelete} modalId={DELETE_MODAL_ID} title="Confirm User Deletion" />
        </div>
    </div >;
};


export default UsersList;