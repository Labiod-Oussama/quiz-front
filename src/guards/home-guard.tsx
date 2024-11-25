import { Outlet } from "react-router-dom";
import SplashScreen from "src/components/loading-screen/SplashScreen";
import { useAuthContext } from "src/context/use-auth-context";

export default function HomeGuard() {
    const { loading } = useAuthContext();

    return <>{loading ? <SplashScreen /> : <Outlet />}</>;
}