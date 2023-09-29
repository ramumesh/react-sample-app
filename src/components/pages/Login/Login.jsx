import { useNavigate } from "react-router-dom";
import { ACTIONS, LABELS, PATHS } from "../../../common/constant";
import { useState } from "react";
import { validateEmail } from "../../../common/util";
import { getUserByEmailAndPassword, saveLoggedInUser } from "../../../store/userStore";
import AppButton from "../../core/AppButton/AppButton";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

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
     * Callback function on submit of Login form
     * @param {*} e 
     * @returns 
     */
    const onLogin = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        if (!email) {
            return alert("Email cannot be empty");
        }
        if (!validateEmail(email)) {
            return alert("Email is invalid. Please enter valid email");
        }
        if (!password) {
            return alert("Password cannot be empty");
        }
        const user = getUserByEmailAndPassword(email.toLowerCase(), password);
        if (!user) {
            setFormData({ email: "", password: "" });
            return alert("Login Failed. Username or password is incorrect");
        }
        saveLoggedInUser(user);
        navigate(PATHS.DASHBOARD);
    };

    return <div className="d-flex h-50 align-items-center justify-content-center">
        <form noValidate onSubmit={onLogin}>
            <table className="app-layout-table">
                <tbody>
                    <tr>
                        <td>
                        </td>
                        <td className="text-center">
                            <h5>{ACTIONS.LOGIN}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end fw-bold">
                            <label htmlFor="inputEmail">{LABELS.EMAIL}</label>
                        </td>
                        <td>
                            <input value={formData.email} onChange={handleChange} className="app-input" type="email" name="email" id="inputEmail" />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end fw-bold">
                            <label htmlFor="inputPassword">{LABELS.PASSWORD}</label>
                        </td>
                        <td>
                            <input value={formData.password} onChange={handleChange} className="app-input" type="password" name="password" id="inputPassword" />
                        </td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                        <td className="text-center font-weight-bold">
                            <AppButton title={ACTIONS.LOGIN} className="app-button" type="submit" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>;
};

export default Login;