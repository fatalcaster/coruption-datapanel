import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { KUWorkspace } from "./pages/KUWorkspace/KUWorkspace";
import { Login } from "./pages/Login/Login";

interface AppProps {}

export const App: React.FC<AppProps> = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/KUWorkspace" exact component={Login} />
                <Route path="/KUWorkspace/addnew" exact component={Login} />
                <Route path="/" exact component={KUWorkspace} />
            </Switch>
        </BrowserRouter>
    );
};
