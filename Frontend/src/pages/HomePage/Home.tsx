import * as React from "react";
import {useAtom} from "jotai";
import "./Home.css";
import {useEffect, useState} from "react";
import {CryptoService} from "../../services/CryptoService.ts";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {IconButton, Tooltip} from "@mui/material";
import {DerivedAtom} from "../../atoms/DerivedKeyAtom.tsx";
import {UserService} from "../../services/UserService.ts";
import {TokenAtom} from "../../atoms/TokenAtom.tsx";
import {UserAtom} from "../../atoms/UserAtom.tsx";

export const Home: React.FunctionComponent = () => {
    const cryptoService = new CryptoService();
    const userService = new UserService();
    const [token, setToken] = useAtom(TokenAtom);
    const [user, setUser] = useAtom(UserAtom);
    const [derivedKey, setDerivedKey] = useAtom(DerivedAtom);
    const [masterPassword, setMasterPassword] = useState<string>("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            setUser(await userService.getCurrentUserInfo(token));
        };

        fetchUserInfo();
        console.log(user)
    },[token]);

    async function generateDerivedKey() {
        if (masterPassword) {
            const salt = cryptoService.generateSalt();
            const derivedKey = await cryptoService.deriveKey(masterPassword, salt);
            console.log("DerivedKey: ",derivedKey)
            setDerivedKey(derivedKey);

            const cryptoKey = await cryptoService.importDerivedKey(derivedKey);
            const {ciphertext, iv} = await cryptoService.encryptPassword(cryptoKey, "Andy");
            console.log(`Ciphertext: ${ciphertext}, IV: ${iv}`);
            console.log("Key: ", cryptoKey)

            const decryptPassword = await cryptoService.decryptPassword(cryptoKey, ciphertext, iv);
            console.log("DecryptPassword: ", decryptPassword);
        }
    }

    return (
        <div className={"content"}>
            <h3>Master password</h3>
            <input value={masterPassword} onChange={e => setMasterPassword(e.target.value)}/>
            <button onClick={generateDerivedKey}>Generate masterpassword</button>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                <h3>Key</h3>
                <Tooltip title="Copy key">
                    <IconButton onClick={()=> {
                        navigator.clipboard.writeText("as")
                    }}>
                        <ContentCopyIcon className={"copy-icon"}/>
                    </IconButton>
                </Tooltip>
            </div>
            {/*<textarea value={derivedKey} disabled={true}/>*/}
            {/*<h3>Encrypt</h3>*/}
            {/*<input disabled={!derivedKey} value={} onChange={e => setMasterPassword(e.target.value)}/>*/}

        </div>
    );
}
