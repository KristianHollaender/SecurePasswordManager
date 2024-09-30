import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NotFound} from "../pages/NotFoundPage/NotFound.tsx";
import {SignIn} from "../pages/SignInPage/SignIn.tsx";
import * as React from "react";
import {Home} from "../pages/HomePage/Home.tsx";
import SignUp from "../pages/SignUpPage/SignUp.tsx";


const RoutesComponent: React.FunctionComponent = () => {
  return (
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<SignIn />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        {/* Use AuthGuard to protect the 'home' route */}
        <Route
            path="home"
            element={
                <Home />
            }
        />
      </Routes>
  );
};

export const AppRouter: React.FunctionComponent = () => {
  return (
      <Router>
        <RoutesComponent />
      </Router>
  );
};
