import { MESSAGES } from "../../../common/constant";
import { getLoggedInUser } from "../../../store/userStore";

const LoginSuccess = () => {
    const user = getLoggedInUser();
    return <div className="h-100">
        <div className="d-flex gap-4 flex-column h-70 align-items-center justify-content-center">
            <div className="mt-3">
                <h5>{MESSAGES.LOGIN_SUCCESSFUL}</h5>.
            </div>
            <div>
                <span className="fw-bold">{MESSAGES.WELCOME}</span>
                <span>{user.email}</span>
            </div>
        </div>
    </div>;
};

export default LoginSuccess;