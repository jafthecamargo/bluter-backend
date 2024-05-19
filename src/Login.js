import React from "react";
import { app } from "./fb";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import './styles/Login.css';
import logo from "./img/bluter.svg";
import arrow from "./img/arrow-left.svg";
import fondo from "./img/fondo.png";
import imgg from "./img/img3.jpg";
import Swal from "sweetalert2";

function back() {
    window.location.href = '/';
}
function Login(props) {

    const [isRegistered, setIsRegistered] = React.useState(false);

    const validarCurp = (curp) => {
        // Expresión regular para validar el formato del CURP
        const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
        return curpRegex.test(curp);
    };

    const crearUsuario = (email, pass) => {
        app
            .auth()
            .createUserWithEmailAndPassword(email, pass)
            .then(userFirebase => {
                console.log("Usuario Creado: ", userFirebase);
                props.setUser(userFirebase);
                registrado();
            })
            .catch(error => {
                errorUsuario();
            });
    };

    const iniciarSesion = (email, pass) => {
        app
            .auth()
            .signInWithEmailAndPassword(email, pass)
            .then(userFirebase => {
                console.log("Usuario Iniciado: ", userFirebase.user);
                props.setUser(userFirebase);
                iniciado();
            })
            .catch(error => {
                errorSesion();
            });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;

        if (isRegistered) {
            const name = e.target.name.value;
            const pass = e.target.password.value;
            const date = e.target.date.value;
            const peso = e.target.peso.value;
            const curp = e.target.curp.value;
            const ts = e.target.ts.value;
            const ps = 'No'

            // Crea el usuario en Firebase Authentication
            if (pass.length < 6) {
                errorContraseña();
                return;
            }
            if (!validarCurp(curp)) {
                errorCurp();
                return;
            }
            crearUsuario(email, pass);

            const crearDocumento = async () => {
                console.log("Creando documento");
                const db = getFirestore();

                try {
                    const docRef = await addDoc(collection(db, "datos"), {
                        name: name,
                        email: email,
                        pass: pass,
                        date: date,
                        peso: peso,
                        curp: curp,
                        ts: ts,
                        ps: ps
                    });
                    console.log("Documento creado con ID: ", docRef.id);
                } catch (error) {
                    console.error("Error al crear el documento: ", error);
                }
            };
            crearDocumento();
        } else {
            iniciarSesion(email, pass);
        }
    };

    const registrado = () => {
        Swal.fire({
            title: "¡Usuario registrado con éxito!",
            text: app.auth().currentUser.email,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            allowOutsideClick: false,
        });
    }

    const iniciado = () => {
        Swal.fire({
            title: "¡Bienvenido!",
            text: app.auth().currentUser.email,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            allowOutsideClick: false,
        });
    }

    const errorSesion = () => {
        Swal.fire({
            title: "Usuario o contraseña incorrectos",
            icon: "error",
            confirmButtonText: "Reintentar",
            allowOutsideClick: false,
        });
    }

    const errorUsuario = () => {
        Swal.fire({
            title: "El usuario ya existe",
            icon: "error",
            confirmButtonText: "Reintentar",
            allowOutsideClick: false,
        });
    }

    const errorContraseña = () => {
        Swal.fire({
            title: "La contraseña debe tener al menos 6 caracteres",
            icon: "error",
            confirmButtonText: "Reintentar",
            allowOutsideClick: false,
        });
    }

    const errorCurp = () => {
        Swal.fire({
            title: "CURP No Válido",
            icon: "error",
            confirmButtonText: "Reintentar",
            allowOutsideClick: false,
        });
    }

    return (
        <div>
            <img className='fondo' src={fondo} alt='fondo-bluter'></img>
               {isRegistered ? (
                <>
                    <div className='div1000'>
                        <img className='imgg' src={imgg} alt='img-bluter'></img>
                        <form onSubmit={submitHandler}>
                                <div className='form-group2'>
                                    <label className='nnn'>Nombre</label>
                                    <input className='name' type='text' id='name' placeholder='Ingresa tu nombre' required/>
                                    <label className='c'>Correo</label>
                                    <input className='ccc' type='email' id='email' placeholder='Ingresa tu correo electrónico' required/>
                                </div>
                                <div className='form-group4'>
                                    <label className='con'>Contraseña</label>
                                    <input className='conn' type='password' id='password' placeholder='Ingresa una contraseña' required/>
                                </div>
                                <div className='form-group5'>
                                    <label className='fecha'>Fecha de Nacimiento</label>
                                    <input className='date' type='date' id='date' required/>
                                </div>
                                <div className='form-group6'>
                                    <label className='pp'>Peso</label>
                                     <input
                                         className='peso'
                                         type='number'
                                         id='peso'
                                         placeholder='Ingresa tu peso en Kg'
                                         step='0.01'
                                         required
                                     />
                                </div>
                                <div className='form-group7'>
                                    <label className='ts1'>Tipo de Sangre</label>
                                    <select className='ts2' id='ts' defaultValue='' required>
                                        <option value='' disabled>Selecciona tu tipo de sangre</option>
                                        <option value='A+'>A+</option>
                                        <option value='A-'>A-</option>
                                        <option value='B+'>B+</option>
                                        <option value='B-'>B-</option>
                                        <option value='AB+'>AB+</option>
                                        <option value='AB-'>AB-</option>
                                        <option value='O+'>O+</option>
                                        <option value='O-'>O-</option>
                                    </select>
                                </div>
                                <div className='form-group8'>
                                    <label className='id1'>CURP</label>
                                    <input className='id2' type='text' id='curp' placeholder='Ingresa tu CURP' required/>
                                </div>
                                <button className='sub2' type='submit'>Registrarse</button>
                            </form>
                        <p className='text-1'>Si ya tienes una cuenta.</p>
                        <button id='iniciasesion' className='extra-1' onClick={() => setIsRegistered(!isRegistered)}>Inicia Sesión</button>
                    </div>
                    <div className='div11' onClick={back}>
                        <img className='back' src={arrow} alt='back' onClick={back}></img>
                    </div>
                </>
                ) : (
                    <>
                        <div className='div10'>
                            <h3 className="ini">Inicia Sesión</h3>
                            <form onSubmit={submitHandler}>
                                <div className='form-group1'>
                                    <label className='correo'>Correo</label>
                                    <input className='mail' type='email' id='email' placeholder='Ingresa tu correo electrónico'/>
                                </div>
                                <div className='form-group2'>
                                    <label className='contraseña'>Contraseña</label>
                                    <input className='pass' type='password' id='password' placeholder='Ingresa una contraseña' />
                                </div>
                                <button className='sub1' type='submit'>Ingresar</button>
                            </form>
                            <p className='text-2'>Si aún no tienes una cuenta.</p>
                            <button id='registrate' className='extra-2' onClick={() => setIsRegistered(!isRegistered)}>Regístrate</button>
                        </div>
                        <img className='f-img1' src={logo} alt='bluter'></img>
                        <div className='div11' onClick={back}>
                            <img className='back' src={arrow} alt='back' onClick={back}></img>
                        </div>
                    </>
                )}
        </div>
    );
};

export default Login;
