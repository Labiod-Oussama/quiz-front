import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SplashScreen from "src/components/loading-screen/SplashScreen";
import { useAuthContext } from "src/context/use-auth-context";
import { useRouter } from "src/hooks/use-router";
import DashLayout from "src/layout/dash-layout";
import { paths } from "src/routes/paths";


interface Props {
    children: React.ReactNode;
}

export default function AuthDashboardGuard() {
    const { loading } = useAuthContext();

    return <>{loading ? <SplashScreen /> : <Container><Outlet /></Container>}</>;
}

function Container({ children }: Props) {
    const router = useRouter();
    const { authenticated } = useAuthContext();
    const [checked, setChecked] = useState(false);
    const check = useCallback(() => {
        if (!authenticated) {
            const loginPath = paths.auth.login

            const href = `${loginPath}`;

            router.replace(href);
        } else {
            setChecked(true);
        }
    }, [authenticated, router]);

    useEffect(() => {
        check();
    }, [check]);


    if (!checked) {
        return null
    }


    return <DashLayout>
        {children}
    </DashLayout>
}