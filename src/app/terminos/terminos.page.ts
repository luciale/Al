import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit {
  texto : string = ''
  constructor() { }

  ngOnInit() {
    const hotText = 'MDN';
    const url = 'https://sites.google.com/view/al-instante-gt-terminos/inicio';
    this.texto= 'TÉRMINOS Y CONDICIONES \n ACEPTACIÓN. \n En el presente contrato se establecen los términos y condiciones que serán de aplicación al acceso y uso por parte del usuario de esta página web APP Medio Informativo digital de noticias nacionales e internacionales, deportivas, farándula y de contenido (reportajes especiales, turismo, etc, etc) y promocionales de cupones para que los usuarios puedan usarlos al comprar productos y servicios a menor costo. Aplicación que se bajará en forma gratuita en cualquiera de los sistemas de telefonía o computadoras. Para hacer uso del contenido, productos y/o servicios del sitio web el usuario deberá sujetarse a los presentes términos y condiciones. \n OBJETO \n El objeto es regular el acceso y utilización del contenido, productos y/o servicios a disposición del público en general en el dominio alinstantegt.com \n El titular se reserva el derecho de realizar cualquier tipo de modificación en el sitio web en cualquier momento y sin previo aviso, el usuario acepta dichas modificaciones. \n El acceso al sitio web por parte del usuario es libre y gratuito, la utilización del contenido, productos y/o servicios implica un costo de suscripción para el usuario.  \n El sitio web solo admite el acceso a personas mayores de edad y no se hace responsable por el incumplimiento de esto.  \n El sitio web está dirigido a usuarios residentes en Guatemala y cumple con la legislación establecida en dicho país, tal como lo establece el Decreto Número 47-2008 del Congreso de la República de Guatemala en su artículo 16, donde se establece el reconocimiento de las comunicaciones electrónicas por las partes, las relaciones entre el iniciador y el destinatario de una comunicación electrónica o manifestación de voluntad u otra declaración por la sola razón de haberse hecho en forma de comunicación electrónica, haciendo valer los efectos jurídicos como su validez o fuerza obligatoria a una declaración de voluntad hecha en forma de comunicación electrónica, si el usuario reside en otro país y decide acceder al sitio web lo hará bajo su responsabilidad.  \n La administración del sitio web puede ejercerse por terceros, es decir, personas distintas al titular, sin afectar esto los presentes términos y condiciones.  \n USUARIO \n La actividad del usuario en el sitio web como publicaciones o comentarios estarán sujetos a los presentes términos y condiciones. El usuario se compromete a utilizar el contenido, productos y/o servicios de forma lícita, sin faltar a la moral o al orden público, absteniéndose de realizar cualquier acto que afecte los derechos de terceros o el funcionamiento del sitio web.  \n El usuario se compromete a proporcionar información verídica en los formularios del sitio web.  \n El acceso al sitio web no supone una relación entre el usuario y el titular del sitio web.  \n El usuario manifiesta ser mayor de edad y contar con la capacidad jurídica de acatar los presentes términos y condiciones y se compromete a:  \n \n < cumplir con todas las leyes, reglamentos y normas aplicables a nivel nacional, así como cualquier otra legislación aplicable como leyes contra la discriminación laboral. \n < infringir los derechos de propiedad intelectual y de privacidad, derechos de patente, derechos sobre base de datos y marcas registradas establecidas en la Ley de Derecho de Autor y Derechos Conexos, Código de Comercio y Ley de Propiedad Intelectual de Guatemala. \n < descargar, enviar, transmitir o almacenar material que sea ilegal, ofensivo, difamatorio, fraudulento, engañoso, que induzca a error, dañino, amenazador, hostil, obsceno o censurable, infrinja las obligaciones contractuales o de confidencialidad del Usuario, perjudique o interfiera en las aplicaciones normales del Sitio Web, como el envío o la transmisión de virus, gusanos  o troyanos, correo basura o mensajes de venta directa piramidal.  \n < vulnerar los derechos personales y de privacidad de terceros. \n < copiar, modificar, reproducir, eliminar, distribuir, descargar, almacenar, transmitir, vender, revender, publicar, invertir el proceso de creación o crear productos derivados a partir del contenido, excepto en lo que concierne al material remitido por el propio Usuario y que es de su propiedad, o si así lo autorizan las leyes de propiedad intelectual aplicables. \n < enviar o facilitar información incorrecta, falsa o incompleta, en relación con el curriculum vitae, los datos biográficos, la fecha en que empezó a trabajar o el perfil de la empresa del Usuario. \n < hacerse pasar por otra persona o empresa. \n < utilizar Página Web de forma no autorizada o para alguna actividad delictiva. \n < falsificar la información de cabecera en el correo electrónico y \n < falsear los datos sobre sí mismo, sobre su asociación con terceros o sobre su empresa.\n ACCESO Y NAVEGACIÓN EN EL SITIO WEB \n El titular no garantiza la continuidad y disponibilidad del contenido, productos y/o servicios en el sitito web, realizará acciones que fomenten el buen funcionamiento de dicho sitio web sin responsabilidad alguna.  \n El titular no se responsabiliza de que el software esté libre de errores que puedan causar un daño al software y/o hardware del equipo del cual el usuario accede al sitio web. De igual forma, no se responsabiliza por los daños causados por el acceso y/o utilización del sitio web.  \n POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS \n Conforme a lo establecido en Decreto Número 47-2008 Ley para el Reconocimiento de las Comunicaciones y Firmas Electrónicas, el titular se compromete a tomar las medidas necesarias que garanticen la seguridad del usuario, evitando que se haga uso indebido de los datos personales que el usuario proporcione en el sitio web. \n El titular corroborará que los datos personales contenidos en las bases de datos sean correctos, verídicos y actuales, así como que se utilicen únicamente con el fin con el que fueron recabados.  \n El uso de datos personales se limitará a lo previsto en el Aviso de Privacidad disponible en' + hotText.link(url) + ' \n Al Instante GT se reserva el derecho de realizar cualquier tipo de modificación en el Aviso de Privacidad en cualquier momento y sin previo aviso, de acuerdo con sus necesidades o cambios en la legislación aplicable, el usuario acepta dichas modificaciones. \n El sitio web implica la utilización de cookies que son pequeñas cantidades de información que se almacenan en el navegador utilizado por el usuario como datos de ingreso, preferencias del usuario, fecha y hora en que se accede al sitio web, sitios visitados y dirección IP, esta información es anónima y solo se utilizará para mejorar el sitio web. Los cookies facilitan la navegación y la hacen más amigable, sin embargo, el usuario puede desactivarlos en cualquier momento desde su navegador en el entendido de que esto puede afectar algunas funciones del sitio web. \n POLÍTICA DE ENLACES \n En el sitio web puede contener enlaces a otros sitios de internet pertenecientes a terceros de los cuales no se hace responsable.  \n POLÍTICA DE PROPIEDAD INTELETUAL E INDUSTRIAL  \n El titular manifiesta tener los derechos de propiedad intelectual e industrial del sitio web incluyendo imágenes, archivos de audio o video, logotipos, marcas, colores, estructuras, tipografías, diseños y demás elementos que lo distinguen, protegidos por la legislación guatemalteca e internacional en materia de propiedad intelectual e industrial.  \n El usuario se compromete a respetar los derechos de propiedad industrial e intelectual del titular pudiendo visualizar los elementos del sitio web, almacenarlos, copiarlos e imprimirlos exclusivamente para uso personal.  \n LEGISLACIÓN Y JURISDICCIÓN APLICABLE  \n La relación entre el usuario y el titular se regirá por las legislaciones aplicables en Guatemala Decreto 47-2008 Ley para el Reconocimiento de las Comunicaciones y Firmas Electrónicas, Ley de Propiedad Intelectual, Constitución de la República de Guatemala y Código de Comercio. \n Al Instante Gt no se responsabiliza por la indebida utilización del contenido, productos y/o servicios del sitio web y del incumplimiento de los presentes términos y condiciones. '
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

}
}