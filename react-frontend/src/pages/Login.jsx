import React from 'react';
import { Input,Label,Row,Col, Button, Nav } from 'reactstrap';
import { useState } from 'react';
import {go} from '../js/iw';
import stomp from '../js/stomp';
import '../css/Login.css';
import { useNavigate } from "react-router-dom";


const LoginApi = 'http://localhost:8080/login';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    console.log("username: " + username);
    console.log("password: " + password);

    function sendLogin(){
        const userData = {
            username: username,
            password: password
        }

        /* let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        go("/login", "POST", formData, {}).then(d => {
            console.log("dentro de go login");
        }) */

        // si me ha hecho falta poner los headers. Cuidado q es POST
        // En IW el profe hizo algun arreglo para pasar paremetros por get y no por post?
        fetch("api/login", {
            headers: {"Content-Type": "application/json"},
            method: "post",
            body: JSON.stringify(userData)}
        )
        .then(res => res.json())
        .then(data => {
            console.log("dentro de then -> hasPermission: " + data["hasPermission"]);
            if(data["hasPermission"]) {
                navigate("/hasPermission");
            } else {
                navigate("/noPermission");
            }
        })
    }

    return (
        <div className="divLogin">
            <h1>Login</h1>
            <Row md={12}> {/* las cols no estan centradas */}
                <Col md={4}>
                    <Label for="username">Username</Label>
                    <Input id="username" placeholder="username..." value={username} 
                        onChange={(e)=>setUsername(e.target.value)}></Input>
                </Col>
                <Col md={4}>
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" placeholder="password..." value={password}
                        onChange={(e)=>setPassword(e.target.value)}></Input>
                </Col>
                <Button id="buttonLogin" onClick={()=>sendLogin() }>Login</Button>
            </Row>
        </div>
        
    );
    
    
}

export default Login;