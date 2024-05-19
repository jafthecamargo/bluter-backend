import React, { useState } from "react";
import "./styles/Formulario.css";
import arrow from "./img/arrow-left.svg";
import fondo from "./img/4.jpg";
import Swal from "sweetalert2";
import axios from "axios";

const Formulario = () => {

  let correo = "blutercenter@gmail.com";
  let asunto = "BLUTER - SOLICITUD"
  let texto;

  const enviarCorreo = () => {
    const correoData = {
      destino: correo,
      asunto: asunto,
      texto: texto,
    };

    axios
      .post("http://localhost:3001/enviar-correo", correoData)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log("Error al enviar el correo: ", error);
      });
  };

  function back() {
    window.location.href = '/signin';
  }

  /**useState para almacenar los valores del formulario, como valor inicial estamos creando un
   * objeto con tres propiedades todos vacios, el objeto se llama 'values'
   */
  const [values, setValues] = useState({
    name: "",
    edad: null,
    typeBlood: "",
    email: "",
    cel: null,
    info: "",
  });

  /**useState para manerjar las validaciones, igual se est crea un objeto con tres propiedades de cadena vacia */
  const [validations, setValidations] = useState({
    name: "",
    edad: null,
    typeBlood: "",
    email: "",
    cel: null,
    info: "",
  });

  const handleChange = (e) => {
    /**Esta sintaxis se refiere a una desestructuracion de el objeto e, se obtendra el 'value(valor)' y el 'name' del campo
     * que acaba de cambiar
     */
    const { name, value } = e.target;

    /**se establecen los valores al objeto 'values' obteniendo el nombre del campo y asignado el valor con 'value' */
    setValues({ ...values, [name]: value });
  };

  /**Funcion que se encarga de manejar el envio del formulario */

  const env = () => {
    enviarCorreo();
    Swal.fire({
      title: "Solicitud Enviada",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
  };

  const handleSubmit = (e) => {
    /**preventDefault evita que el formulario se envie automaticamente al presionar el boton de envio */
    e.preventDefault();
    texto = `<h1>${name}</h1>
             <h1>${edad}</h1>
             <h1>${typeBlood}</h1>
             <h1>${email}</h1>
             <h1>${cel}</h1>
             <h1>${info}</h1>`;
    env();
  };

  /**se extraen los valores de las propiedades 'name', 'email', 'typeBlood' del objeto 'values'
   * y se guardan en las variables con los mismos nombres
   */
  const { name, email, typeBlood, edad, cel, info } = values;

  /**utilizo la desestructuracion para crear tres variables nuevas,'nameVal'... , y asignarles valores
   * basados en las propiedades del objeto 'values', en este caso se ocupa el patron 'nombreOriginal: nuevoNombre'
   * para asignar una propiedad de un objeto a una variable con un nombre diferente
   *
   * En este caso se esta tomando el objeto 'validations' y creando las tres nuevas variables que contienen los valores
   * de las propiedades correspondientes, por lo que al finalizar la linea se crearan tres nuevas variables que contienen
   * los mensajes de validacion especifico de cada campo, que se mostraran solo en caso de que haya errores en los campos del formulario
   */
  const {
    name: nameVal,
    email: emailVal,
    typeBlood: typeBloodVal,
    edad: edadVal,
    cel: celVal,
    info: infoVal,
  } = validations;

  return (
      <div>
        <img className='fffff' src={fondo} alt='fondo-bluter'></img>
        <div className='div111'>
          <div className='div222'>
            <h4 className='hhh'>Formulario de Solicitud</h4>
          </div>
          <div className='div333'>
          <form onSubmit={handleSubmit}>
            <div className='form-1'>
              <label className='n'>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={name}
                  className='n-1'
                  onChange={handleChange}
                  placeholder='Ingresa el nombre del solicitante'
                  required
              />
              <div>{nameVal}</div>
            </label>
          </div>

          <div className='form-2'>
            <label className='e'>
              Edad:
              <input
                type="number"
                name="edad"
                value={edad}
                className='e-1'
                onChange={handleChange}
                placeholder='Ingresa la edad'
                required
              />
              <div>{edadVal}</div>
            </label>
          </div>

          <div className='form-3'>
            <p>Indique el tipo de sangre</p>
            <label>
              A+
              <input
                type="radio"
                name="typeBlood"
                value="A+"
                onChange={handleChange}
                required
              />
            </label>

            <label>
              O+
              <input
                type="radio"
                name="typeBlood"
                value="O+"
                onChange={handleChange}
                required
              />
            </label>

            <label>
              B+
              <input
                type="radio"
                name="typeBlood"
                value="B+"
                onChange={handleChange}
                required
              />
            </label>

            <label>
              AB+
              <input
                type="radio"
                name="typeBlood"
                value="AB+"
                onChange={handleChange}
              />
            </label>

            <label>
              A-
              <input
                type="radio"
                name="typeBlood"
                value="A-"
                onChange={handleChange}
              />
            </label>

            <label>
              O-
              <input
                type="radio"
                name="typeBlood"
                value="O-"
                onChange={handleChange}
              />
            </label>

            <label>
              B-
              <input
                type="radio"
                name="typeBlood"
                value="B-"
                onChange={handleChange}
              />
            </label>

            <label>
              AB-
              <input
                type="radio"
                name="typeBlood"
                value="AB-"
                onChange={handleChange}
              />
            </label>
          </div>

            <div className='form-4'>
              <label  className='ccccc'>
                Correo:
                <input
                  type="email"
                  name="email"
                  value={email}
                  className='ccccc-1'
                  onChange={handleChange}
                  placeholder='Ingresa el correo'
                  required
                />
                <div>{emailVal}</div>
              </label>
            </div>

            <div className='form-5'>
              <label className='t'>
                Telefono:
                <input
                  type="tel"
                  name="cel"
                  value={cel}
                  className='t-1'
                  onChange={handleChange}
                  placeholder='Ingresa el telefono'
                  required
                />
                <div>{celVal}</div>
              </label>
            </div>

            <div className='form-6'>
              <label className='info-1'>Informacion medica:</label>
              <textarea
                type="text"
                name="info"
                value={info}
                className='info-2'
                onChange={handleChange}
                placeholder="Escriba aqui si tiene alergia a algun medicamento, asi como tambien si se encuentra tomando algun medicamento"
              />
              <div>{infoVal}</div>
            <div>{typeBloodVal}</div>
          </div>

          <button type="submit" className='env'>Enviar</button>
          </form>
          </div>

           <div className='div444' onClick={back}>
             <img className='back' src={arrow} alt='back' onClick={back}></img>
           </div>

        <div className='vv'></div>
        </div>
      </div>
  );
};
export default Formulario

/*
<p>{JSON.stringify(values)}</p>
 */