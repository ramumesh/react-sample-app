import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import { ACTIONS, PATHS } from "../../../common/constant";
import useAuth from "../../../hooks/useAuth";
import { removeLoggedInUser } from "../../../store/userStore";

const Dashboard = () => {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();
    const onLogout = () => {
        removeLoggedInUser();
        navigate(`${PATHS.WELCOME}/?isLogout=true`);
    };
    return isAuthenticated && <div className="h-100">
        <div className="navigation-bar">
            <Link className="nav-item" to={PATHS.CHAT}>{ACTIONS.GROUP_CHAT}</Link>
            <Link className="nav-item" to={PATHS.USERS}>{ACTIONS.MANAGE_USERS}</Link>
            <Link className="nav-item" to={PATHS.DOCUMENTS}>{ACTIONS.MANAGE_DOCUMENTS}</Link>
            <a onClick={onLogout} className="nav-item" >{ACTIONS.LOGOUT}</a>
        </div>
        <Outlet />
    </div >;
};
export default Dashboard;