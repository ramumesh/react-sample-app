import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../common/constant";

const RegisterSuccess = () => {
    const navigate = useNavigate();
    const onClickHome = () => {
        navigate(PATHS.WELCOME);
    };
    return <div className="d-flex gap-4 flex-column h-50 align-items-center justify-content-center">
        <div>
            <h5> Registration Successful</h5>
        </div>
        <div>
            Thank you for registration
        </div>
        <div>
            <a href="" onClick={onClickHome}>Click to return to homepage</a>
        </div>
    </div>;
};

export default RegisterSuccess;