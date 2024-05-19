import React, { useEffect } from "react";
import {app} from "./fb";
import './styles/App.css';
import Principal from "./Principal";
import Login from "./Login";

function SignIn() {

    const [user, setUser] = React.useState(null);
    useEffect( () => {
        app.auth().onAuthStateChanged(userFirebase => {
            console.log("Estado de usuario: ", userFirebase);
            setUser(userFirebase);
        });
    },[] )

    return <> {user ? <Principal /> : <Login setUser={setUser} />}</>;

}

export default SignIn;
