import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminPending] = useAdmin();
    const location = useLocation();
    if (loading || isAdminPending) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg  text-success"></span>
            </div>
        );
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to={"/"} state={location?.pathname}></Navigate>;
};

AdminRoute.propTypes = {};

export default AdminRoute;
