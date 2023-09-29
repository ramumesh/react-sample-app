import { useNavigate } from "react-router-dom";
import { ACTIONS, LABELS, PATHS } from "../../../common/constant";
import { useState } from "react";
import { validateEmail } from "../../../common/util";
import { saveUser } from "../../../store/userStore";
import AppButton from "../../core/AppButton/AppButton";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    /**
     * Common method for onChange events of form input fields
     * @param {*} event 
     */
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };

    /**
     * Callback function on submit of Register form
     * @param {*} e 
     * @returns 
     */
    const onRegister = (e) => {
        e.preventDefault();
        const { fullName, email, password, confirmPassword } = formData;
        if (!fullName) {
            return alert("Email cannot be empty");
        }
        if (!email) {
            return alert("Email cannot be empty");
        }
        if (!validateEmail(email)) {
            return alert("Email is invalid. Please enter valid email");
        }
        if (!password) {
            return alert("Password cannot be empty");
        }
        if (!confirmPassword) {
            return alert("Confirm Password cannot be empty");
        }
        if (password !== confirmPassword) {
            return alert("Password and confirm passwords are not matching");
        }
        saveUser({ fullName, email: email.toLowerCase(), password });
        navigate(PATHS.REGISTER_SUCCESS);
    };

    return <div className="d-flex gap-4 flex-column h-50 align-items-center justify-content-center">
        <form noValidate onSubmit={onRegister}>
            <table className="app-layout-table">
                <tbody>
                    <tr>
                        <td>
                        </td>
                        <td className="text-center">
                            <h5>{ACTIONS.REGISTER}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end fw-bold">
                            <label htmlFor="inputName">{LABELS.FULL_NAME}</label>
                        </td>
                        <td>
                            <input onChange={handleChange} className="app-input" type="text" name="fullName" />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end fw-bold">
                            <label htmlFor="inputEmail">{LABELS.EMAIL}</label>
                        </td>
                        <td>
                            <input onChange={handleChange} className="app-input" type="email" name="email" />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end fw-bold">
                            <label htmlFor="inputPassword">{LABELS.PASSWORD}</label>
                        </td>
                        <td>
                            <input onChange={handleChange} className="app-input" type="password" name="password" />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end fw-bold">
                            <label htmlFor="inputConfirmPassword">{LABELS.CONFIRM_PASSWORD}</label>
                        </td>
                        <td>
                            <input onChange={handleChange} className="app-input" type="password" name="confirmPassword" id="inputConfirmPassword" />
                        </td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                        <td className="text-center font-weight-bold">
                            <AppButton title={ACTIONS.REGISTER} className="app-button" type="submit" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>;
};

export default Register;