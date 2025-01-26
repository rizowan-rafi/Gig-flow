import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBuyer from "../hooks/useBuyer";

const BuyerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isBuyer, isBuyerPending] = useBuyer();
    const location = useLocation();
    if (loading || isBuyerPending) {
        return <div>Loading...</div>;
    }

    if (user && isBuyer) {
        return children;
    }

    return <Navigate to={"/"} state={location?.pathname}></Navigate>
};

BuyerRoute.propTypes = {};

export default BuyerRoute;
