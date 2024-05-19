import React from "react";
import './styles/Privacy.css';
import arrow from "./img/arrow-left.svg";

function Privacy() {

    function back() {
        window.location.href = '/';
    }

    return (
        <div className='ffff'>
            <div className='div100'>
                <div className='div101'>
                    <h3 className="ini">Política de Privacidad</h3>
                </div>
                <div className='div102'>
                    <p>
                    <strong>Última actualización:</strong> 14 de junio de 2023
                    <br/><br/>
                    <strong>BLUTER</strong> se compromete a proteger la privacidad de los usuarios de nuestro sistema de apoyo para donativos sanguíneos. Esta política de privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que nos proporcionas a través de nuestro sitio web. Al utilizar nuestro sistema, aceptas las prácticas descritas en esta política de privacidad.
                    <br/><br/>
                        <strong>Recopilación de Información Personal</strong>
                    <br/><br/>
                    Cuando te registras en nuestro sistema de apoyo para donativos sanguíneos, podemos solicitar ciertos datos personales para brindarte un servicio eficiente y seguro. La información que recopilamos puede incluir, pero no se limita a:
                    <br/><br/>
                    1. Nombre<br/>
                    2. Dirección de correo electrónico<br/>
                    3. Contraseña<br/>
                    4. Fecha de nacimiento<br/>
                    5. Peso<br/>
                    6. Tipo de sangre<br/>
                    7. CURP (Clave Única de Registro de Población)
                    <br/><br/>
                        <strong>Uso de la Información Personal</strong>
                    <br/><br/>
                    Utilizaremos la información personal recopilada para los siguientes propósitos:
                    <br/><br/>
                    1. Validar tu identidad y asegurarnos de que cumples con los requisitos necesarios para donar sangre.<br/>
                    2. Contactarte para coordinar donaciones y proporcionarte información relevante sobre eventos y campañas relacionadas con la donación de sangre.<br/>
                    3. Mantener registros internos precisos y llevar un seguimiento de las donaciones realizadas.<br/>
                    4. Mejorar nuestro sistema y personalizar tu experiencia en función de tus necesidades e intereses.<br/>
                    5. Enviar comunicaciones promocionales sobre nuestros servicios y actividades relacionadas con la donación de sangre, siempre y cuando hayas otorgado tu consentimiento expreso para recibir dichas comunicaciones.<br/>
                    <br/>
                        <strong>Protección de la Información Personal</strong>
                    <br/><br/>
                    Nos comprometemos a proteger la información personal que nos proporcionas. Implementamos medidas de seguridad razonables para prevenir el acceso no autorizado, el uso indebido o la divulgación de tu información personal. Sin embargo, ten en cuenta que ninguna transmisión de datos por Internet o método de almacenamiento electrónico es completamente seguro.
                    <br/><br/>
                        <strong>Divulgación de Información a Terceros</strong>
                    <br/><br/>
                    No vendemos, alquilamos ni compartimos tu información personal con terceros no afiliados, excepto en los siguientes casos:
                    <br/><br/>
                    1. Cuando sea necesario para cumplir con una solicitud que hayas realizado, como coordinar una donación de sangre.<br/>
                    2. Cuando sea requerido por ley o cuando creamos de buena fe que dicha divulgación es necesaria para proteger nuestros derechos, tu seguridad o la seguridad de otros, investigar fraudes o responder a una solicitud gubernamental.<br/>
                    <br/>
                        <strong>Enlaces a Sitios de Terceros</strong>
                    <br/><br/>
                    Nuestro sistema de apoyo para donativos sanguíneos puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido o las prácticas de privacidad de estos sitios y no nos responsabilizamos de ellos. Te recomendamos leer las políticas de privacidad de los sitios web de terceros que visites.
                    <br/><br/>
                        <strong>Acceso y Control de tu Información Personal</strong>
                    <br/><br/>
                    Puedes acceder, corregir o eliminar tu información personal proporcionada a través de nuestro sistema de apoyo para donativos sanguíneos. Si deseas ejercer estos derechos o tienes alguna pregunta sobre nuestra política de privacidad, contáctanos utilizando la información de contacto proporcionada al final de esta política.
                    <br/><br/>
                        <strong>Cambios en esta Política de Privacidad</strong>
                    <br/><br/>
                    Nos reservamos el derecho de actualizar o modificar esta política de privacidad en cualquier momento. Te notificaremos sobre cambios significativos mediante un aviso destacado en nuestro sitio web o mediante otro medio de comunicación. Te recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos tu información personal.
                    <br/><br/>
                        <strong>Contacto</strong>
                    <br/><br/>
                    Si tienes alguna pregunta, inquietud o solicitud relacionada con esta política de privacidad, no dudes en contactarnos:
                    <br/><br/>
                    © 2023 BLUTER Todos los derechos reservados<br/>
                    blutercenter@gmail.com<br/>
                    5512131415<br/>
                    </p>
                </div>
            </div>
            <div className='f'></div>
            <div className='div11' onClick={back}>
                <img className='back' src={arrow} alt='back' onClick={back}></img>
            </div>
        </div>
    );
}

export default Privacy;
