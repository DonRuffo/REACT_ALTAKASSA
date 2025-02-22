import React, { useContext } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoDarkMode from '../assets/moon.png';
import logoAltaKassaNegro from '../assets/AK NEGRA.png';
import logoAltaKassaBlanco from '../assets/AK BLANCA.png';
import logoComodidad from '../assets/Comodidad.png';
import logoUsabilidad from '../assets/COHETE.png';
import logoTransparencia from '../assets/Transparencia.png';
import logoSeguridad from '../assets/Seguridad.png';
import logoGarantia from '../assets/Garantía.png';
import logoFiabilidad from '../assets/Fiabilidad.png'
import imgTuerca from '../assets/Tuerca tornasol.png';
import imgPlomeria from '../assets/Plomeria.png'
import imgElectro from '../assets/Electrodomestico.png'
import imgCarpinteria from '../assets/Carpinteria.png'
import imgLimpieza from '../assets/Limpieza.png'
import imgPintor from '../assets/Pintor.png'
import imgAlbanil from '../assets/Albañil.png'
import imgLaptop from '../assets/LaptopArco.png';
import imgAstronauta from '../assets/astronauta.png'
import logoAgendar from '../assets/Agendar-lista.png'
import logoElegir from '../assets/Elegir-lista.png'
import logoCancelar from '../assets/Cancelar-lista.png'
import logoLlamadas from '../assets/Llamadas-lista.png'
import logoCalificar from '../assets/Calificar-lista.png'
import logoComunicar from '../assets/Comunicarse-lista.png'
import logoPago from '../assets/Pago-lista.png'
import logoCartera from '../assets/Cartera-lista.png'
import logoRevisar from '../assets/Revisar-lista.png'
import logoStars from '../assets/Stars-lista.png'
import logoPrecio from '../assets/Price-lista.png'
import logoPostergar from '../assets/Postergar-lista.png'
import logoActualizar from '../assets/Actualizar-lista.png'
import logoComunicarse from '../assets/Comunicarse2-lista.png'
import CardBeneficio from "../componentes/cardsBeneficios";
import CardDinamica from "../componentes/cardsDinamica";
import { useState } from "react";
import CardServicios from "../componentes/cardsServicios";
import ListasAnimadas from "../componentes/Listas";
import ListasAnimadasProv from "../componentes/ListasProv";
import imPerfilDinamica from '../assets/PERFIL_dinamica.jpg'
import AuthContext from "../context/AuthProvider";
//text-slate-400 - texto para cards
//#60E8FE color para iconos
const LandingPage = () => {

    const {darkMode, handleDarkPage} = useContext(AuthContext)
    const [selectedOption, setSelectedOption] = useState('');


    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <>
            <div className={darkMode ? "dark" : ""}>
                <main className="bg-white dark:bg-gray-950">
                    <nav className="px-10 py-7 mb-12 flex justify-between dark:bg-gray-950">
                        <select className="w-1/3 mr-1 md:mr-0  border border-purple-600 rounded-xl py-2 md:w-40 text-center text-white  bg-purple-600 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 dark:shadow-md dark:shadow-gray-400 hover:bg-purple-800 duration-300"
                            onChange={(e) => {
                                const targetId = e.target.value
                                const targetElement = document.getElementById(targetId)
                                if (targetElement) {
                                    targetElement.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            <option value="Menu" className="text-base text-sm">Menu</option>
                            <option value="QuienesSomos" className="text-base text-sm">Quienes Somos</option>
                            <option value="Servicios" className="text-base text-sm">Servicios</option>
                            <option value="Contacto" className="text-base text-sm">Contacto</option>
                        </select>
                        <img src={logoDarkMode} alt="CambioTema" onClick={() => {handleDarkPage()}} width={40} height={40} className="cursor-pointer" />
                        <ul className="flex items-center">
                            <li><Link to='/login' className="w-1/4 px-6 py-2 my-4 mx-1 md:ml-14 bg-purple-600 text-white rounded-xl hover:bg-purple-800 duration-300 text-center dark:shadow-md dark:shadow-gray-400">Login</Link></li>
                        </ul>
                    </nav>
                    <section className="flex justify-center" id="Inicio">
                        <div className="border-2 border-dashed border-sky-400 grid grid-cols-1 md:grid-cols-2 w-4/5 rounded-lg  shadow-lg dark:shadow-purple-700 dark:border-purple-700 duration-300">
                            <div className="flex justify-center items-center">
                                <img src={logoAltaKassaNegro} alt="LogoAltakassaNegro" className="dark:hidden" />
                                <img src={logoAltaKassaBlanco} alt="LogoAltakassaBlanco" className="hidden dark:block" />
                            </div>
                            <div className="">
                                <h1 className="block font-bold text-4xl text-center md:pt-20 dark:text-purple-800 duration-300">Conoce a AltaKassa</h1>
                                <p className="block text-center px-8 pt-5 pb-0 text-xl text-slate-600 dark:text-slate-400 duration-300">Empresa de multiservicios como plomería, albañilería, carpintería, mantenimiento y demás.
                                    Brinda facilidad, garantía y comodidad para adquirir un servicio doméstico o
                                    empresarial, <b>cuando quiera y donde quiera.</b></p>
                                <div className="flex justify-center">
                                    <img src={imgLaptop} alt="Laptop" width={275} height={275} />
                                </div>
                            </div>
                        </div>
                    </section><br /><br /><br /><br /><br />
                    <section>
                        <h1 className="text-4xl md:text-5xl font-semibold text-center text-sky-600 duration-300 pb-10">Beneficios para ti</h1>
                        <h2 className="text-4xl font-semibold text-center duration-300 pb-10 dark:text-white">Como cliente</h2>
                        <div className="flex flex-col items-center mx-0 md:flex-row md:flex-wrap justify-center gap-10 md:gap-8">
                            <CardBeneficio Beneficio={"Transparencia"} logo={logoTransparencia} texto={"Comunicación abierta y rendición de cuentas en tiempo real entre el cliente y proveedor"} />
                            <CardBeneficio Beneficio={"Garantía"} logo={logoGarantia} texto={"Calidad de la mano de obra ¡¡100% garantizado!!. Los proveedores son continuamente supervisados para brindar un servicio de calidad."} />
                            <CardBeneficio Beneficio={"Seguridad"} logo={logoSeguridad} texto={"¡¡Alta protección de información!!, desde el registro de datos personales hasta la solicitud y cumplimiento de un servicio por parte de los/las proveedores."} />
                        </div><br /><br /><br /><br />
                        <h2 className="text-4xl font-semibold text-center duration-300 pb-10 dark:text-white">Como proveedor</h2>
                        <div className="flex flex-col items-center mx-0 md:flex-row md:flex-wrap justify-center gap-10 md:gap-8">
                            <CardBeneficio Beneficio={"Comodidad"} logo={logoComodidad} texto={"Ofrece fácilmente uno o más servicios en la plataforma y consigue ¡¡nuevos clientes mucho más rápido que nunca!! desde la comodidad de tu hogar."} />
                            <CardBeneficio Beneficio={"Usabilidad"} logo={logoUsabilidad} texto={"Sistema óptimo y sencillo de manejar, con un entorno amigable y una clara interfaz para navegar correctamente y realizar acciones específicas."} />
                            <CardBeneficio Beneficio={"Fiabilidad"} logo={logoFiabilidad} texto={"El sistema mantiene credibilidad en sus funciones y prioriza un ambiente de trabajo armónico entre proveedor y cliente, tanto en la plataforma como al prestar el servicio."} />
                        </div><br /><br /><br /><br />
                    </section>
                    <section className="flex flex-col items-center justify-center" id="Servicios">
                        <div className="w-4/5">
                            <h1 className="text-left text-5xl pl-5 font-semibold text-sky-600">Servicios</h1>
                        </div>
                        <div className="w-4/5">
                            <div className="flex flex-col md:flex-row items-center md:gap-10">
                                <h2 className="w-full md:w-3/5 p-4 md:py-2 md:px-5 text-md text-slate-600 dark:text-slate-400">La empresa se especializa en ofrecer soluciones integrales a domicilio a través
                                    de seis tipos de servicios diseñados para satisfacer las necesidades más
                                    comunes del hogar y el negocio. Cada servicio es brindado por técnicos capacitados,
                                    garantizando calidad, eficiencia y confianza en cada proyecto. Los servicios presentados
                                    fueron priorizados debido a la alta demanda que hay en la vida cotidiana de los
                                    ciudadanos.
                                </h2>
                                <img src={imgTuerca} alt="Tuerca" width={250} height={250} />
                            </div>
                        </div>
                    </section><br /><br />
                    <section>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-14">
                            <CardServicios Servicio1={"Plomería"} logo1={imgPlomeria} texto1={"Un buen sistema de plomería asegura un suministro de agua limpia y una gestión eficiente de los desechos, previniendo problemas como fugas, obstrucciones y contaminación del agua."} />
                            <CardServicios Servicio1={"Carpintería"} logo1={imgCarpinteria} texto1={"La carpintería combina habilidades técnicas y creativas, y es fundamental tanto en la construcción como en el diseño de interiores, aportando funcionalidad y estética a los espacios."} />
                        </div><br /><br />
                        <div className="flex flex-col md:flex-row items-center justify-center gap-14">
                            <CardServicios Servicio1={"Pintor"} logo1={imgPintor} texto1={"Aplicación de pinturas, tintes y revestimientos en interiores y exteriores de edificios residenciales. Incluye la preparación de superficies mediante limpieza, lijado y reparación de fallas."} />
                            <CardServicios Servicio1={"Albañilería"} logo1={imgAlbanil} texto1={"Fundamental en la construcción de edificaciones e infraestructuras, combinando habilidades manuales con conocimiento en materiales, técnicas constructivas y normas de seguridad."} />
                        </div><br /><br />
                        <div className="flex flex-col md:flex-row items-center justify-center gap-14">
                            <CardServicios Servicio1={"Limpieza"} logo1={imgLimpieza} texto1={"Profesional especializado en la limpieza general del hogar. Mantener la casa libre de polvo e impurezas, tanto en losas y paredes como en muebles e inmuebles, es importante para la salud."} />
                            <div className="w-4/5 md:w-1/3 h-[550px] md:h-[500px] rounded-xl border border-gray-200 dark:border-none shadow-xl shadow-sky-300 dark:shadow-purple-800">
                                <h1 className="pt-8 text-2xl md:text-3xl text-slate-600 text-center font-semibold dark:text-white">Técnico-Electrodomésticos</h1>
                                <div className="flex justify-center py-4">
                                    <img src={imgElectro} alt="Tecnico" width={275} height={275} />
                                </div>
                                <p className="text-md dark:text-slate-400 px-5 md:px-10 text-center pt-4">Profesional especializado en la
                                    instalación, mantenimiento y reparación de aparatos eléctricos utilizados en el
                                    hogar, como lavadoras, refrigeradores, hornos, microondas y lavavajillas. </p><br />
                                <div className="flex justify-center">
                                    <Link to="/login" className="px-4 py-3 rounded-xl border-2 border-sky-400 text-sky-400 font-semibold hover:bg-sky-400 hover:text-white duration-300 dark:border-purple-800 dark:text-purple-800 hover:dark:bg-purple-800 hover:dark:text-black">Contratar</Link>
                                </div>
                            </div>
                        </div><br /><br /><br /><br /><br />
                    </section>
                    <section id="QuienesSomos" className="flex flex-col items-center justify-center md:mb-20">
                        <div className="w-4/5 border-4 border-dotted border-sky-400 rounded-md shadow-lg dark:shadow-purple-700 dark:border-purple-600">
                            <h1 className="text-4xl px-8 py-6 font-semibold text-sky-600 text-center dark:text-purple-700">¿Quienes somos?</h1><br />
                            <div className="flex flex-col items-center md:flex-row">
                                <div className="w-3/5 md:w-2/5 flex justify-center max-h-[250px] pb-5 md:p-0">
                                    <img src={imgAstronauta} alt="Astronauta" width={250} height={250} />
                                </div>
                                <div className="w-4/5 md:w-3/5 md:pr-5">
                                    <p className="text-justify mb-3 dark:text-white"><b>Alta-Kassa Multiservicios</b>, una empresa fundada el 29 de junio del 2024 por los cofundadores
                                        Dennis Díaz y Martín Ayala,
                                        quienes vieron la necesidad de implementar un sistema en dónde la gente pueda encontrar una
                                        solución a ciertos
                                        problemas de su hogar.
                                    </p>
                                    <p className="text-justify mb-3 dark:text-white"><b className="text-orange-600 font-semibold dark:text-yellow-600">Visión: </b>Alta-Kassa llegó para innovar el sistema de servicios a domicilio, con el
                                        propósito de llegar a todos
                                        los lugares del país para brindar una asistencia y mano de obra de calidad, con una
                                        accesibilidad sencilla para que todo
                                        público goze de las funciones.
                                    </p>
                                    <p className="text-justify mb-1 dark:text-white"><b className="text-blue-600 font-semibold dark:text-purple-600">Misión: </b>Otorgar servicios profesionales a residencias y empresas a comodidad y preferencia
                                        de nuestros clientes
                                        en relación a: tiempo, calidad de mano de obra, seguridad y garantía en la labor de nuestros
                                        profesionales, atención y
                                        asistencia virtual/presencial y flexibilidad en métodos de pago. </p><br /><br />
                                </div>
                            </div>
                        </div>
                    </section><br /><br /><br /><br /><br />
                    <section className="flex justify-center">
                        <div className="w-4/5">
                            <h1 className="text-5xl text-center font-semibold text-sky-600 pb-4 dark:text-purple-700">Dinámica del sistema</h1>
                            <p className="text-center dark:text-white"><b>Importante: </b>Un cliente o proveedor deberá iniciar sesión o registrarse como primer requisito para ingresar
                                al sistema de la empresa</p><br />
                            <div className="flex justify-center">
                                <img src={imPerfilDinamica} alt="Perfil Dinamica" width={300} height={300} className="rounded-full shadow-md border-4 border-sky-700 dark:border-purple-700" />
                            </div><br /><br />
                            <h1 className="text-4xl text-sky-600 font-semibold dark:text-purple-700 text-center">Navega por el perfil</h1><br />

                            <div className="flex justify-center">
                                <div className="w-1/2 border p-3 rounded-lg">
                                    <label className="dark:has-[input:checked]:bg-transparent has-[input:checked]:bg-purple-100 has-[input:checked]:text-purple-800 has-[input:checked]:ring-1 has-[input:checked]:ring-purple-800 flex justify-between items-center p-5 rounded-lg mb-1 hover:bg-gray-100 font-semibold text-lg text-slate-600 dark:text-white  dark:hover:bg-transparent transition-all duration-200">
                                        Cliente
                                        <input type="radio" name="opcion" onChange={handleRadioChange} value='cliente' checked={selectedOption === 'cliente'} className="peer appearance-none w-4 h-4 rounded-full border checked:border-purple-800 checked:border-4" />
                                    </label>
                                    <label className="dark:has-[input:checked]:bg-transparent has-[input:checked]:bg-purple-100 has-[input:checked]:text-purple-800 has-[input:checked]:ring-1 has-[input:checked]:ring-purple-800 flex justify-between items-center p-5 rounded-lg mb-1 hover:bg-gray-100 font-semibold text-lg text-slate-600 dark:text-white  dark:hover:bg-transparent transition-all duration-200">
                                        Proveedor
                                        <input type="radio" name="opcion" onChange={handleRadioChange} value='proveedor' checked={selectedOption === 'proveedor'} className="peer appearance-none w-4 h-4 rounded-full border checked:border-purple-800 checked:border-4" />
                                    </label>
                                </div>
                            </div><br /><br />
                            {selectedOption === 'cliente' && (
                                <div className={`animate-fade-in`}>
                                    <h1 className="text-3xl dark:text-white"><b>Cliente</b></h1><br />
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <CardDinamica logo={logoAgendar} texto={"Agendar citas indicando la fecha y hora que más le conviene."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoElegir} texto={"Elegir el proveedor de su preferencia o en base a su calificación."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoCancelar} texto={"Cancelar una cita o postergarla."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoLlamadas} texto={"Llamadas emergentes fuera de los horarios de atención."} color={'sky'} colorDark={'purple'} />
                                    </div><br />
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <CardDinamica logo={logoCalificar} texto={"Calificar al proveedor considerando actitudes, conductas y valores."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoComunicar} texto={"Comunicarse con el proveedor por mensajería o llamada telefónica."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoPago} texto={"Agregar un método de pago digital."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoCartera} texto={"Elegir su método de pago preferido, ya sea digital, con tarjeta o en efectivo."} color={'sky'} colorDark={'purple'} />
                                    </div><br /><br /><br />
                                    <h1 className="text-center text-3xl font-semibold mb-5 text-purple-600 dark:text-sky-600">Tener en cuenta</h1>
                                    <div className="flex justify-center md:mb-10">
                                        <div className="w-5/6 md:w-1/2">
                                            <ListasAnimadas />
                                        </div>
                                    </div><br /><br /><br />
                                </div>
                            )}
                            {selectedOption === 'proveedor' && (
                                <div className={`animate-fade-in`}>
                                    <h1 className="text-3xl dark:text-white"><b>Proveedor</b></h1><br />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <CardDinamica logo={logoRevisar} texto={"Revisar el perfil de su cliente y la ubicación para dar el servicio."} color={'green'} colorDark={'yellow'} />
                                        <CardDinamica logo={logoStars} texto={"Calificar al cliente considerando valores como: trato, comportamiento y solvencia."} color={'green'} colorDark={'yellow'} />
                                        <CardDinamica logo={logoPrecio} texto={"Ofrecer el precio por consulta o mano de obra a los clientes (considerando el estándar de mínimo y máximo)."} color={'green'} colorDark={'yellow'} />
                                    </div><br />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <CardDinamica logo={logoPostergar} texto={"Cancelar o postergar una cita."} color={'green'} colorDark={'yellow'} />
                                        <CardDinamica logo={logoActualizar} texto={"Actualizar su estado de disponibilidad."} color={'green'} colorDark={'yellow'} />
                                        <CardDinamica logo={logoComunicarse} texto={"Comunicarse directamente con el cliente mediante el sistema de mensajería o llamada telefónica."} color={'green'} colorDark={'yellow'} />
                                    </div><br /><br /><br />
                                    <h1 className="text-center text-3xl font-semibold mb-5 text-purple-600 dark:text-sky-600">Tener en cuenta</h1>
                                    <div className="flex justify-center">
                                        <div className="w-5/6 md:w-1/2">
                                            <ListasAnimadasProv />
                                        </div>
                                    </div><br /><br /><br />
                                </div>
                            )}
                        </div>
                    </section><br />
                </main>
                <footer className="bg-black" id="Contacto">
                    <div className="flex flex-col md:flex-row items-center justify-center">
                        <div className="w-full flex-col md:flex-row md:w-4/5 flex justify-center">
                            <div className="w-full md:w-2/5 flex justify-center pt-8">
                                <img src={logoAltaKassaBlanco} alt="LogoEnFooter" width={325} height={325} />
                            </div>
                            <div className="w-full md:w-3/5 flex flex-wrap justify-center md:pt-10 gap-8">
                                <div className="w-48 p-2">
                                    <h1 className="text-sky-600 text-xl font-semibold md:pb-6">Contacto directo</h1>
                                    <p className="text-slate-400 text-sm font-semibold py-2">dennisdiaz407@gmail.com</p>
                                    <p className="text-slate-400 text-sm font-semibold py-2">martin.ayala@epn.edu.ec</p>
                                    <p className="text-slate-400 text-sm font-semibold py-2">Cel1: 0979438388</p>
                                    <p className="text-slate-400 text-sm font-semibold py-2">Cel2: 0983781929</p>
                                </div>
                                <div className="w-48 p-2">
                                    <h1 className="text-sky-600 text-xl font-semibold md:pb-6">Indice</h1>
                                    <ul className="text-slate-400 font-semibold text-sm">
                                        <li className="py-2">Foros</li>
                                        <li className="py-2"><a href="#Inicio" className="hover:text-white hover:underline duration-300">Inicio</a></li>
                                        <li className="py-2">Quienes Somos</li>
                                        <li className="py-2"><a href="#Servicios" className="hover:text-white hover:underline duration-300">Servicios</a></li>
                                    </ul>
                                </div>
                                <div className="w-48 p-2">
                                    <h1 className="text-sky-600 text-xl font-semibold pb-6">Redes</h1>
                                    <div className="flex gap-3">
                                        <a href="https://www.facebook.com/leomessi/about" target="_blank" rel="noopener noreferrer"><FaFacebook style={{ color: "white", width: 30, height: 30 }} /></a>
                                        <a href="https://www.instagram.com/leomessi/" target="_blank" rel="noopener noreferrer"><FaInstagram style={{ color: "white", width: 30, height: 30 }} /></a>
                                        <a href="https://x.com/Messismo10" target="_blank" rel="noopener noreferrer"><FaTwitter style={{ color: "white", width: 30, height: 30 }} /></a>
                                    </div><br />
                                </div>
                            </div><hr />
                        </div>
                    </div>
                    <div className="flex justify-center pb-5 pt-3">
                        <div className="w-4/5">
                            <p className="footer-copy text-white">Copyright &copy; 2024 Alta-Kassa</p>
                        </div>
                    </div>
                </footer>
            </div >
        </>
    )
}
export default LandingPage