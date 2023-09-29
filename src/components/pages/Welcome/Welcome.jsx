import { Link, useSearchParams } from "react-router-dom";
import AppButton from "../../core/AppButton/AppButton";
import { ACTIONS, MESSAGES, PATHS } from "../../../common/constant";

const Welcome = () => {
    const [searchParams] = useSearchParams();
    const isLogout = searchParams.get("isLogout");
    return <div className="d-flex gap-4 flex-column h-50 align-items-center justify-content-center">
        <div>
            <h4>{MESSAGES.WELCOME_USERS}</h4>
        </div>
        <div>
            <h6>{MESSAGES.EXISTING_USERS}</h6>
        </div>
        <div>
            <Link to={PATHS.LOGIN}><AppButton title={ACTIONS.LOGIN} /></Link>
        </div>
        <div>
            <h6>{MESSAGES.NEW_USERS}</h6>
        </div>
        <div>
            <Link to={PATHS.REGISTER}><AppButton title={ACTIONS.REGISTER} /></Link>
        </div>
        <div>
            {isLogout && <h6>{MESSAGES.LOGOUT_MESSAGE}</h6>}
        </div>
    </div>;
};

export default Welcome;