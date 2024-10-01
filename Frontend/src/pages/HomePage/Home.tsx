import * as React from "react";
import {useAtom} from "jotai";
import {TokenAtom} from "../../atoms/TokenAtom.tsx";
import "./Home.css";
import {useState} from "react";
import {CryptoService} from "../../services/CryptoService.ts";

export const Home: React.FunctionComponent = () => {
  const cryptoService = new CryptoService();
  const [token, setToken] = useAtom(TokenAtom);
  const [masterPassword, setMasterPassword] = useState<string>();
  const [derivedKey, setDerivedKey] = useState<Uint8Array>();

  async function generateDerivedKey() {
    const salt = cryptoService.generateSalt() // Generate and store this salt securely

    if (masterPassword){
      const key = await cryptoService.deriveKey(masterPassword, salt);
      setDerivedKey(key);
    }
  }

  return (
      <div className={"content"}>
        <input value={masterPassword} onBlur={e => setMasterPassword(e.target.value)} />
        <button onClick={generateDerivedKey}>Generate masterpassword</button>
        <div className={"content"}>{derivedKey}</div>
      </div>
  );
}
