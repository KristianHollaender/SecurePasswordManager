import * as React from "react";
import {useAtom} from "jotai";
import {TokenAtom} from "../../atoms/TokenAtom.tsx";
import "./Home.css";

export const Home: React.FunctionComponent = () => {
  const [token, setToken] = useAtom(TokenAtom);
  return(<div className={"content"}>{token}
  </div>);
}
