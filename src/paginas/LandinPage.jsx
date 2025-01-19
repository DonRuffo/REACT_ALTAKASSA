import React from "react";
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
import { useState } from "react";

//text-slate-400 - texto para cards
const LandingPage = () => {

    const [darkMode, setDarkMode] = useState(false)
    return (
        <>
            <div className={darkMode ? "dark" : ""}>
                <main className="bg-white dark:bg-gray-900">
                    <nav className="px-10 py-7 mb-12 flex justify-between dark:bg-gray-900">
                        <select className="w-1/3 mr-1 md:mr-0  border border-purple-600 rounded-xl py-2 md:w-40 text-center text-white  bg-purple-600 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 dark:shadow-md dark:shadow-gray-400 hover:bg-purple-800 duration-300">
                            <option value="Menu" className="text-base text-sm">Menu</option>
                            <option value="QuienesSomos" className="text-base text-sm">Quienes Somos</option>
                            <option value="Especialidades" className="text-base text-sm">Especialidades</option>
                            <option value="Contacto" className="text-base text-sm">Contacto</option>
                        </select>
                        <img src={logoDarkMode} alt="CambioTema" onClick={() => setDarkMode(!darkMode)} width={40} height={40} className="cursor-pointer" />
                        <ul className="flex items-center">
                            <li><Link to='/login' className="w-1/4 px-6 py-2 my-4 mx-1 md:ml-14 bg-purple-600 text-white rounded-xl hover:bg-purple-800 duration-300 text-center dark:shadow-md dark:shadow-gray-400">Login</Link></li>
                        </ul>
                    </nav>
                    <section className="flex justify-center" id="Inicio">
                        <div className="grid grid-cols-1 md:grid-cols-2 w-4/5 rounded-lg rounded-xl shadow-custom-shadow dark:shadow-purple-700 duration-300">
                            <div className="flex justify-center items-center">
                                <img src={logoAltaKassaNegro} alt="LogoAltakassaNegro" className="dark:hidden" />
                                <img src={logoAltaKassaBlanco} alt="LogoAltakassaBlanco" className="hidden dark:block" />
                            </div>
                            <div className="">
                                <h1 className="block font-bold text-4xl text-center md:pt-20 dark:text-purple-800 duration-300">Conoce a AltaKassa</h1>
                                <p className="block text-center px-8 pt-5 pb-10 text-xl text-slate-600 dark:text-slate-400 duration-300">Empresa de multiservicios como plomería, albañilería, carpintería, mantenimiento y demás.
                                    Brinda facilidad, garantía y comodidad para adquirir un servicio doméstico o
                                    empresarial, <b>cuando quiera y donde quiera.</b></p>
                            </div>
                        </div>
                    </section><br /><br /><br /><br /><br />
                    <section>
                        <h1 className="text-4xl md:text-5xl font-semibold text-center text-sky-600 duration-300 pb-10">Beneficios para ti</h1>
                        <h2 className="text-4xl font-semibold text-center duration-300 pb-10 dark:text-white">Como cliente</h2>
                        <div className="flex flex-col items-center mx-0 md:flex-row justify-center gap-10 md:gap-5">
                            <div className="w-4/5 md:w-1/4 h-[500px] rounded-2xl shadow-2xl  dark:shadow-lg dark:shadow-sky-600">
                                <h1 className="text-center text-3xl font-semibold text-slate-600 py-10 dark:text-white">Transparencia</h1>
                                <div className="flex justify-center">
                                    <img src={logoTransparencia} alt="Usabilidad" width={200} height={200} />
                                </div>
                                <p className="text-md dark:text-slate-400 text-center pt-3 px-4">Comunicación abierta
                                    y
                                    rendición de cuentas en tiempo real entre el cliente y proveedor</p>
                            </div>
                            <div className="w-4/5 md:w-1/4 h-[500px] rounded-2xl shadow-2xl  dark:shadow-lg dark:shadow-sky-600">
                                <h1 className="text-center text-3xl font-semibold text-slate-600 py-10 dark:text-white">Garantía</h1>
                                <div className="flex justify-center">
                                    <img src={logoGarantia} alt="Usabilidad" width={200} height={200} />
                                </div>
                                <p className="text-md dark:text-slate-400 text-center pt-3 px-4">Calidad de la mano de obra <b>¡¡100% garantizado!!.</b> Los proveedores son
                                    continuamente supervisados para brindar un servicio de calidad.</p>
                            </div>
                            <div className="w-4/5 md:w-1/4 h-[500px] rounded-2xl shadow-2xl  dark:shadow-lg dark:shadow-sky-600">
                                <h1 className="text-center text-3xl font-semibold text-slate-600 py-10 dark:text-white">Seguridad</h1>
                                <div className="flex justify-center">
                                    <img src={logoSeguridad} alt="Usabilidad" width={200} height={200} />
                                </div>
                                <p className="text-md dark:text-slate-400 text-center pt-3 px-4"><b>¡¡Alta protección de información!!</b>,
                                    desde el registro de datos personales hasta la solicitud y cumplimiento de
                                    un servicio por parte de los/las proveedores.</p>
                            </div>
                        </div><br /><br /><br />
                        <h2 className="text-4xl font-semibold text-center duration-300 pb-10 dark:text-white">Como proveedor</h2>
                        <div className="flex flex-col items-center mx-0 md:flex-row justify-center gap-10 md:gap-5">
                            <div className="w-4/5 md:w-1/4 h-[500px] rounded-2xl shadow-2xl  dark:shadow-lg dark:shadow-yellow-600">
                                <h1 className="text-center text-3xl font-semibold text-slate-600 py-10 dark:text-white">Comodidad</h1>
                                <div className="flex justify-center">
                                    <img src={logoComodidad} alt="Usabilidad" width={200} height={200} />
                                </div>
                                <p className="text-md dark:text-slate-400 text-center pt-3 px-4">Ofrece fácilmente uno o más servicios en la plataforma y consigue <b>¡¡nuevos clientes mucho
                                    más rápido que nunca!!</b> desde la comodidad de tu hogar.</p>
                            </div>
                            <div className="w-4/5 md:w-1/4 h-[500px] rounded-2xl shadow-2xl  dark:shadow-lg dark:shadow-yellow-600">
                                <h1 className="text-center text-3xl font-semibold text-slate-600 py-10 dark:text-white">Usabilidad</h1>
                                <div className="flex justify-center">
                                    <img src={logoUsabilidad} alt="Usabilidad" width={200} height={200} />
                                </div>
                                <p className="text-md dark:text-slate-400 text-center pt-3 px-4"><b>Sistema óptimo y sencillo de manejar</b>, con un entorno amigable y una clara interfaz
                                    para navegar correctamente y realizar acciones específicas.</p>
                            </div>
                            <div className="w-4/5 md:w-1/4 h-[500px] rounded-2xl shadow-2xl  dark:shadow-lg dark:shadow-yellow-600">
                                <h1 className="text-center text-3xl font-semibold text-slate-600 py-10 dark:text-white">Fiabilidad</h1>
                                <div className="flex justify-center">
                                    <img src={logoFiabilidad} alt="Usabilidad" width={200} height={200} />
                                </div>
                                <p className="text-md dark:text-slate-400 text-center pt-3 px-4">El sistema mantiene <b>credibilidad en sus funciones</b> y prioriza un ambiente de trabajo armónico
                                    entre proveedor y cliente, tanto en la plataforma como al prestar el servicio.
                                    un servicio por parte de los/las proveedores.</p>
                            </div>
                        </div><br /><br /><br /><br />
                    </section>
                    <section className="flex flex-col items-center justify-center" id="Servicios">
                        <div className="w-4/5">
                            <h1 className="text-left text-4xl pl-5 font-semibold text-sky-600">Servicios</h1>
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
                    </section>
                    <section>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-14">
                            <div className="w-4/5 md:w-1/3 h-[550px] md:h-[500px] rounded-xl border border-gray-200 dark:border-none shadow-xl shadow-sky-300 dark:shadow-purple-800">
                                <h1 className="pt-8 text-3xl text-slate-600 text-center font-semibold dark:text-white">Plomería</h1>
                                <div className="flex justify-center py-4">
                                    <img src={imgPlomeria} alt="Plomeria" width={200} height={200} />
                                </div>
                                <p className="text-md dark:text-slate-400 px-5 md:px-10 text-center">Un buen sistema de plomería asegura
                                    un suministro de agua limpia y una gestión eficiente de los desechos, previniendo problemas
                                    como fugas, obstrucciones y contaminación del agua.</p><br />
                                <div className="flex justify-center">
                                    <Link to="/login" className="px-4 py-3 rounded-xl border-2 border-sky-400 text-sky-400 font-semibold hover:bg-sky-400 hover:text-white duration-300 dark:border-purple-800 dark:text-purple-800 hover:dark:bg-purple-800 hover:dark:text-black">Contratar</Link>
                                </div>
                            </div>
                            <div className="w-4/5 md:w-1/3 h-[525px] md:h-[500px] rounded-xl border border-gray-200 dark:border-none shadow-xl shadow-sky-300 dark:shadow-purple-800">
                                <h1 className="pt-8 text-3xl text-slate-600 text-center font-semibold dark:text-white">Carpintería</h1>
                                <div className="flex justify-center py-4">
                                    <img src={imgCarpinteria} alt="Carpinteria" width={200} height={200} />
                                </div>
                                <p className="text-md dark:text-slate-400 px-5 md:px-10 text-center">La carpintería combina habilidades
                                    técnicas y creativas, y es fundamental tanto en la construcción como en el
                                    diseño de interiores, aportando funcionalidad y estética a los espacios.</p><br />
                                <div className="flex justify-center">
                                    <Link to="/login" className="px-4 py-3 rounded-xl border-2 border-sky-400 text-sky-400 font-semibold hover:bg-sky-400 hover:text-white duration-300 dark:border-purple-800 dark:text-purple-800 hover:dark:bg-purple-800 hover:dark:text-black">Contratar</Link>
                                </div>
                            </div>
                        </div><br /><br />
                        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                            <div className="w-4/5 md:w-1/3 h-[525px] md:h-[500px] rounded-xl border border-gray-200 dark:border-none shadow-xl shadow-sky-300 dark:shadow-purple-800">
                                <h1 className="pt-8 text-3xl text-slate-600 text-center font-semibold dark:text-white">Pintor</h1>
                                <div className="flex justify-center py-4">
                                    <img src={imgPintor} alt="Pintor" width={200} height={200} />
                                </div>
                                <p className="text-md dark:text-slate-400 px-5 md:px-10 text-center">Aplicación de pinturas, tintes y
                                    revestimientos en interiores y exteriores de edificios residenciales.
                                    Incluye la preparación de superficies mediante limpieza, lijado y reparación de fallas.</p><br />
                                <div className="flex justify-center">
                                    <Link to="/login" className="px-4 py-3 rounded-xl border-2 border-sky-400 text-sky-400 font-semibold hover:bg-sky-400 hover:text-white duration-300 dark:border-purple-800 dark:text-purple-800 hover:dark:bg-purple-800 hover:dark:text-black">Contratar</Link>
                                </div>
                            </div>
                            <div className="w-4/5 md:w-1/3 h-[525px] md:h-[500px] rounded-xl border border-gray-200 dark:border-none shadow-xl shadow-sky-300 dark:shadow-purple-800">
                                <h1 className="pt-8 text-3xl text-slate-600 text-center font-semibold dark:text-white">Albañilería</h1>
                                <div className="flex justify-center py-4">
                                    <img src={imgAlbanil} alt="Albañileria" width={200} height={200} />
                                </div>
                                <p className="text-md dark:text-slate-400 px-5 md:px-10 text-center">Fundamental en la construcción de
                                    edificaciones e infraestructuras, combinando habilidades manuales con conocimiento en
                                    materiales, técnicas constructivas y normas de seguridad.</p><br />
                                <div className="flex justify-center">
                                    <Link to="/login" className="px-4 py-3 rounded-xl border-2 border-sky-400 text-sky-400 font-semibold hover:bg-sky-400 hover:text-white duration-300 dark:border-purple-800 dark:text-purple-800 hover:dark:bg-purple-800 hover:dark:text-black">Contratar</Link>
                                </div>
                            </div>
                        </div><br /><br />
                        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                            <div className="w-4/5 md:w-1/3 h-[550px] md:h-[500px] rounded-xl border border-gray-200 dark:border-none shadow-xl shadow-sky-300 dark:shadow-purple-800">
                                <h1 className="pt-8 text-3xl text-slate-600 text-center font-semibold dark:text-white">Limpieza</h1>
                                <div className="flex justify-center py-4">
                                    <img src={imgLimpieza} alt="Limpieza" width={200} height={200} />
                                </div>
                                <p className="text-md dark:text-slate-400 px-5 md:px-10 text-center">Profesional especializado en la limpieza
                                    general del hogar. Mantener la casa libre de polvo e impurezas, tanto en losas y paredes
                                    como en muebles e inmuebles, es importante para la salud e imagen.</p><br />
                                <div className="flex justify-center">
                                    <Link to="/login" className="px-4 py-3 rounded-xl border-2 border-sky-400 text-sky-400 font-semibold hover:bg-sky-400 hover:text-white duration-300 dark:border-purple-800 dark:text-purple-800 hover:dark:bg-purple-800 hover:dark:text-black">Contratar</Link>
                                </div>
                            </div>
                            <div className="w-4/5 md:w-1/3 h-[560px] md:h-[500px] rounded-xl border border-gray-200 dark:border-none shadow-xl shadow-sky-300 dark:shadow-purple-800">
                                <h1 className="pt-8 text-3xl text-slate-600 text-center font-semibold dark:text-white">Técnico-Electrodomésticos</h1>
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
                        </div><br /><br /><br />
                    </section>
                </main>
                <footer className="bg-black">
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
                                        <a href="https://x.com/Messismo10" target="_blank" rel="noopener noreferrer"><FaTwitter style={{ color: "white", width: 30, height: 30 }}/></a>
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
            </div>
        </>

    )
}


export default LandingPage