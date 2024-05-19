import React from "react";
import "../styles/Notificaciones.css";
import ok from "../img/ok.svg";
import n from "../img/not.svg";
import Swal from "sweetalert2";
import axios from "axios";

function NotificacionOK(props) {
  let correo = "itzelraji12@gmail.com";
  let asunto;
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
  /** --------------------------------------------------------------------*/

  const yes = () => {
    Swal.fire({
      title: "Aceptar",
      text: "¿Estás seguro que deseas aceptar la solicitud?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Si',
      showConfirmButton: true,
      cancelButtonText: 'No',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        asunto = "BLUTER - ACEPTADA";
        texto = "<h1>Itzel Ramírez</h1>\n\n" +
            "Nos complace informarte que tu solicitud de donación de sangre ha sido aceptada.\n\nQueremos agradecerte por tu generosidad y disposición para ayudar a quienes más lo necesitan.";
        enviarCorreo();
        Swal.fire({
          title: "Solictud aceptada",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          allowOutsideClick: false,
        });
      }
    })
  };

  const not = () => {
    Swal.fire({
      title: "Rechazar",
      text: "¿Estás seguro que deseas rechazar la solicitud?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Si',
      showConfirmButton: true,
      cancelButtonText: 'No',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        asunto = "BLUTER - RECHAZADA";
        texto = "<h1>Itzel Ramírez</h1>\n\n" +
            "Lamentamos informarte que tu solicitud de donación de sangre ha sido rechazada.\n\nQueremos agradecerte sinceramente por tu disposición y deseo de contribuir a esta noble causa.";
        enviarCorreo();
        Swal.fire({
          title: "Solictud rechazada",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          allowOutsideClick: false,
        });
      }
    })
  };

  return (
    <div className="cc">
      <button className="ff">{props.fecha}</button>
      <div className="txt">
        <p className="nombre">{props.nombre}</p>
        <p className="dir">{props.dir}</p>
      </div>
      <div className="yes" onClick={yes}>
        <img className="img-ok1" src={ok} alt="ok"></img>
      </div>
      <div className="not" onClick={not}>
        <img className="img-not" src={n} alt="not"></img>
      </div>
    </div>
  );
}

export default NotificacionOK;
