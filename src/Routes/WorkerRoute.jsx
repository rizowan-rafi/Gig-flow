import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useWorker from "../hooks/useWorker";

const WorkerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isWorker, isWorkerPending] = useWorker();
    const location = useLocation();
    if (loading || isWorkerPending) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg  text-success"></span>
            </div>
        );
    }

    if (user && isWorker) {
        return children;
    }

    return <Navigate to={"/"} state={location?.pathname}></Navigate>
};

WorkerRoute.propTypes = {};

export default WorkerRoute;
