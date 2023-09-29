import { useNavigate } from "react-router-dom";
import { PATHS } from "../common/constant";
import { getLoggedInUser } from "../store/userStore";
import { useEffect, useState } from "react";


const useAuth = () => {
    const [authenticated, setAuthentcated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const loggedInUser = getLoggedInUser();
        if (!loggedInUser) {
            setAuthentcated(false);
            navigate(PATHS.WELCOME);
        }
        else {
            setAuthentcated(true);
        }
    }, []);
    return authenticated;
};

export default useAuth;