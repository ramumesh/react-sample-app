import { useNavigate, useSearchParams } from "react-router-dom";
import { ACTIONS, MESSAGES, PATHS } from "../../../common/constant";
import { editUser, getUserById } from "../../../store/userStore";
import { useEffect, useState } from "react";
import { validateEmail } from "../../../common/util";
import AppButton from "../../core/AppButton/AppButton";
import useAuth from "../../../hooks/useAuth";

const EditUser = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const [formData, setFormData] = useState({ fullName: "", email: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const onClickHome = () => {
        navigate(PATHS.USERS);
    };

    useEffect(() => {
        const user = getUserById(parseInt(userId));
        if (!user) {
            setErrorMessage(MESSAGES.NO_SUCH_USER);
        } else {
            setFormData({ fullName: user.fullName, email: user.email });
        }
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const onSave = (e) => {
        e.preventDefault();
        const { fullName, email } = formData;
        if (!fullName) {
            return alert("Email cannot be empty");
        }
        if (!email) {
            return alert("Email cannot be empty");
        }
        if (!validateEmail(email)) {
            return alert("Email is invalid. Please enter valid email");
        }
        const isUserEdited = editUser(parseInt(userId), email.toLowerCase(), fullName);
        if (isUserEdited) {
            navigate(PATHS.USERS);
        } else {
            alert("Cannot save user details. No user exists with user Id " + userId);
        }
    };


    return <div className="d-flex gap-4 flex-column h-70 align-items-center justify-content-center">
        {errorMessage && <div>
            <h4>{errorMessage}</h4>
            <div>
                <a href="" onClick={onClickHome}>Click to return to homepage</a>
            </div>
        </div>}
        {!errorMessage && <form noValidate onSubmit={onSave}>
            <table className="app-layout-table">
                <tbody>
                    <tr>
                        <td>
                        </td>
                        <td className="text-center">
                            <h5>Edit User</h5>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end fw-bold">
                            <label htmlFor="inputName">FullName</label>
                        </td>
                        <td>
                            <input value={formData.fullName} onChange={(e) => handleChange(e)} className="app-input" type="text" name="fullName" id="inputName" />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end fw-bold">
                            <label htmlFor="inputEmail">Email</label>
                        </td>
                        <td>
                            <input value={formData.email} onChange={(e) => handleChange(e)} className="app-input" type="email" name="email" id="inputEmail" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td className="text-center font-weight-bold">
                            <AppButton title={ACTIONS.SAVE} className="app-button" type="submit" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>}

    </div>;
};

export default EditUser;