import React, { useEffect } from "react";
import { app } from "./fb";
import { getFirestore, getDocs, updateDoc, collection, query, where, doc } from "firebase/firestore";
import "./styles/Principal.css";
import logo from "./img/bluter.svg";
import Swal from "sweetalert2";
import Centros from "./componentes/Centros";
import NotificacionOK from "./componentes/NotificacionOK";
import NotificacionP from "./componentes/NotificacionP";
import TipoS from "./componentes/TipoS";
import axios from 'axios'

function Principal() {

  const [userInfo, setUserInfo] = React.useState({}); // Estado para almacenar la información del usuario

  useEffect(() => {
    const obtenerInfoUsuario = async () => {
      const db = getFirestore();
      const usuariosRef = collection(db, "datos");
      const q = query(usuariosRef, where("email", "==", app.auth().currentUser.email));
      const querySnapshot = await getDocs(q);

      const usuariosData = [];
      querySnapshot.forEach((doc) => {
        usuariosData.push({ id: doc.id, ...doc.data() });
      });

      if (usuariosData.length > 0) {
        setUserInfo(usuariosData[0]);
      }
    };

    obtenerInfoUsuario();
  }, []);

  const calcEdad = (fecha) => {
    const fechaNacimiento = new Date(fecha);
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    // Ajuste para casos en los que el cumpleaños aún no ha ocurrido este año
    if (
      fechaActual.getMonth() < fechaNacimiento.getMonth() ||
      (fechaActual.getMonth() === fechaNacimiento.getMonth() &&
        fechaActual.getDate() < fechaNacimiento.getDate())
    ) {
      return edad - 1;
    }

    return edad;
  };

  let correo = app.auth().currentUser.email
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

  /**--------------------------------------------------------------- */

  function form() {
    window.location.href = "/formulario";
  }

  function redirect() {
    window.location.href =
      "https://www.gob.mx/insabi/articulos/14-de-junio-dia-mundial-del-donante-de-sangre-274570";
  }

  function cnts() {
    window.location.href = "https://www.gob.mx/cnts";
  }

  function imss() {
    window.location.href =
      "https://bancodesangre.imss.gob.mx/apopsbs-publico/login";
  }

  function cruzroja() {
    window.location.href =
      "https://www.cruzrojamexicana.org.mx/offsite/donar-sangre";
  }

  const cerrarSesion = () => {
    app.auth().signOut();
    cerrar();
  };

  const postular = async () => {
  if (userInfo.ps === 'Si') {
    Swal.fire({
      title: "Ya te encuentras postulado",
      text: "¿Deseas ya no estar postulado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Sí',
      showConfirmButton: true,
      cancelButtonText: 'No',
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        asunto = "BLUTER - POSTULACIÓN";
        texto = `<h1>Ya no te encuentras postulado</h1>`;
        enviarCorreo();

        const db = getFirestore();
        const usuarioDocRef = doc(db, 'datos', userInfo.id);

        try {
          await updateDoc(usuarioDocRef, { ps: 'No' });
          Swal.fire({
            title: "Ya no te encuentras postulado",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            allowOutsideClick: false,
          });
          setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            ps: "No"
          }));
        } catch (error) {
          console.error("Error al actualizar el campo 'ps' en Firestore:", error);
        }
      }
    });
  } else {
    Swal.fire({
      title: "Postular",
      text: "¿Estás seguro que deseas postularte?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Si',
      showConfirmButton: true,
      cancelButtonText: 'No',
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        asunto = "BLUTER - POSTULACIÓN";
        texto = `<h1>Te has postulado correctamente</h1>`;
        enviarCorreo();

        const db = getFirestore();
        const usuarioDocRef = doc(db, 'datos', userInfo.id);

        try {
          await updateDoc(usuarioDocRef, { ps: 'Si' });
          Swal.fire({
            title: "Te has postulado",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            allowOutsideClick: false,
          });
          setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            ps: "Si"
          }));
        } catch (error) {
          console.error("Error al actualizar el campo 'ps' en Firestore:", error);
        }
      }
    })
  }
};

  const cerrar = () => {
    Swal.fire({
      title: "¡Sesión cerrada con éxito!",
      text: app.auth().currentUser.email,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
  };

  return (
    <div>
      <div className="d00">
        <img className="f-img-ini" src={logo} alt="bluter"></img>
        <p className="user">{app.auth().currentUser.email}</p>
        <button className="cerrar" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </div>
      <div className="noti">
        <div className="n1">
          <NotificacionOK
            nombre="Donación de Sangre"
            dir="Cruz Roja"
            fecha="22  DIC"
            hora="12:10"
          />
        </div>
        <div className="n2">
          <NotificacionP
            nombre="Solicitud de Donación"
            dir="Itzel Ramírez"
            fecha="06 SEP"
          />
        </div>
        <button className="alert" onClick={redirect}>
          Día Mundial del Donante de Sangre
        </button>
      </div>
      <div className="centrosd">
        <h4 className='hh'>Centros de Donación</h4>
        <div className="cd1" onClick={cnts}>
          <Centros
            nombre="Centro Nacional de la Transfusión Sanguínea"
            dir="Miguel Othón de Mendizabal Ote. 555, Nueva Industrial Vallejo, Gustavo A. Madero, CDMX"
            imagen="1.jpeg"
          />
        </div>
        <div className="cd2" onClick={imss}>
          <Centros
            nombre="Banco Central de Sangre IMSS"
            dir="Seris, La Raza, Azcapotzalco, CDMX"
            imagen="2.jpg"
          />
        </div>
        <div className="cd3" onClick={cruzroja}>
          <Centros
            nombre="Banco de Sangre Cruz Roja Mexicana CDMX"
            dir="Benito Pérez Galdós 137 Colonia Los Morales, Polanco, Primera Sección, CDMX"
            imagen="3.jpeg"
          />
        </div>
      </div>

      <div className="blood">
        <button className={`tipo ${userInfo.ts === 'A+' ? 'color-a' : userInfo.ts === 'A-' ? 'color-b' : userInfo.ts === 'B+' ? 'color-c' : userInfo.ts === 'B-' ? 'color-d' : userInfo.ts === 'AB+' ? 'color-e' : userInfo.ts === 'AB-' ? 'color-f' : userInfo.ts === 'O+' ? 'color-g' : userInfo.ts === 'O-' ? 'color-h' : ''}`}>
          {userInfo.ts}
        </button>

        <div className="info">
          <p>Nombre:</p>
          <p>Edad:</p>
          <p>Peso:</p>
          <p>Postulado:</p>
        </div>

        {userInfo.name && (
          <div className="info1" key={userInfo.id}>
            <p>{userInfo.name}</p>
            <p>{userInfo.date && calcEdad(userInfo.date)} años</p>
            <p>{userInfo.peso} Kg</p>
            <p>
              <span className={`status-dot ${userInfo.ps === 'Si' ? 'green-dot' : 'red-dot'}`}></span>
              {userInfo.ps}
            </p>
          </div>
        )}

        <p className='info-d'>Muestra de la información principal que tenemos sobre ti</p>
        <div className="t1">
          <TipoS tipo="A+" color="#BCDDF1" />
          <span className="tooltiptext">
            El tipo de sangre A+ es un grupo sanguíneo que presenta el antígeno A en la superficie de los glóbulos rojos y el factor Rh positivo.
            <br></br><br></br>
            <h5>Compatibilidad de donación:</h5> A+ y AB+
            <br></br><br></br>
            <h5>Compatibilidad de recepción:</h5> A+ y O+
          </span>
        </div>

        <div className="t2">
          <TipoS tipo="A-" color="#44A3CA" />
           <span className="tooltiptext">
             El tipo de sangre A- es un grupo sanguíneo que presenta el antígeno A en la superficie de los glóbulos rojos pero no presenta el factor Rh.
             <br></br><br></br>
             <h5>Compatibilidad de donación:</h5> A+, A-, AB+, AB-
             <br></br><br></br>
             <h5>Compatibilidad de recepción:</h5> A-, O-
           </span>
        </div>

        <div className="t3">
          <TipoS tipo="B+" color="#D5303B" />
          <span className="tooltiptext">
            El tipo de sangre B+ es un grupo sanguíneo que presenta el antígeno B en la superficie de los glóbulos rojos y el factor Rh positivo.
            <br></br><br></br>
            <h5>Compatibilidad de donación:</h5> B+, AB+
            <br></br><br></br>
            <h5>Compatibilidad de recepción:</h5> B+, B-, O+, O-
          </span>
        </div>

        <div className="t4">
          <TipoS tipo="B-" color="#ED752F" />
          <span className="tooltiptext">
            El tipo de sangre B- es un grupo sanguíneo que presenta el antígeno B en la superficie de los glóbulos rojos y el factor Rh negativo.
            <br></br><br></br>
            <h5>Compatibilidad de donación:</h5> B+, B-, AB+, AB-
            <br></br><br></br>
            <h5>Compatibilidad de recepción:</h5> B-, O-
          </span>
        </div>

        <div className="t5">
          <TipoS tipo="AB+" color="#834484" />
          <span className="tooltiptext">
            El tipo de sangre AB+ es un grupo sanguíneo que presenta tanto el antígeno A como el antígeno B en la superficie de los glóbulos rojos y el factor Rh positivo.
            <br></br><br></br>
            <h5>Compatibilidad de donación:</h5> AB+
            <br></br><br></br>
            <h5>Compatibilidad de recepción:</h5> A+, A-, B+, B-, AB+, AB-, O+, O-
          </span>
        </div>

        <div className="t6">
          <TipoS tipo="AB-" color="#8567A5" />
          <span className="tooltiptext">
            El tipo de sangre AB- es un grupo sanguíneo que presenta tanto el antígeno A como el antígeno B en la superficie de los glóbulos rojos y el factor Rh negativo.
            <br></br><br></br>
            <h5>Compatibilidad de donación:</h5> AB+ y AB-
            <br></br><br></br>
            <h5>Compatibilidad de recepción:</h5> A+, A-, B+, B-, AB+, AB-, O+, O-
          </span>
        </div>

        <div className="t7">
          <TipoS tipo="O+" color="#E5D8C1" />
          <span className="tooltiptext">
            El tipo de sangre O+ es un grupo sanguíneo que no presenta los antígenos A ni B en la superficie de los glóbulos rojos pero sí el factor Rh positivo.
            <br></br><br></br>
            <h5>Compatibilidad de donación:</h5> O+ y AB+
            <br></br><br></br>
            <h5>Compatibilidad de recepción:</h5> O+, O-
          </span>
        </div>

        <div className="t8">
          <TipoS tipo="O-" color="#CABDAF" />
          <span className="tooltiptext">
            El tipo de sangre O- es un grupo sanguíneo que no presenta los antígenos A ni B ni el factor Rh positivo en la superficie de los glóbulos rojos.
            <br></br><br></br>
            <h5>Compatibilidad de donación:</h5> O+, O-, A+, A-, B+, B-, AB+, AB-
            <br></br><br></br>
            <h5>Compatibilidad de recepción:</h5> O-, A-, B-, AB-
          </span>
        </div>
        <p className='info-p'>Pasa el cursor sobre cada tipo de sangre para obtener información sobre su compatibilidad y características</p>
        <button className="soli" onClick={form}>
          Solicitar
        </button>
        <button className="pos" onClick={postular}>
          Postular
        </button>
      </div>
    </div>
  );
}

export default Principal;
