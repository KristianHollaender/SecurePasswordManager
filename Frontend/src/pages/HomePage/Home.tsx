import * as React from "react";
import {useAtom} from "jotai";
import "./Home.css";
import {useEffect} from "react";
import {UserService} from "../../services/UserService.ts";
import {TokenAtom} from "../../atoms/TokenAtom.tsx";
import {UserAtom} from "../../atoms/UserAtom.tsx";

export const Home: React.FunctionComponent = () => {
    const userService = new UserService();
    const [token] = useAtom(TokenAtom);
    const [, setUser] = useAtom(UserAtom);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const me = await userService.getCurrentUserInfo(token);
            setUser(me);
            console.log(me)


        };

        fetchUserInfo()
    },[token]);

    const getDerivedKey = (masterPassword: string, salt: string) => {
        //Find a way to get the masterPassword
        //Maybe change the login view to login with only an email and after that on a new page
        //Login with the masterPassword which is used to get the derivedKey with the salt
        //Just like bitwarden
    }

    return (<div>

        </div>
    );
}
