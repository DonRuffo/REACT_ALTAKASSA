import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Recuperar from './paginas/RecuperarContra'
import LandingPage from './paginas/LandinPage'
import Dashboard from './paginas/Dashboard'
import Confirmar from './paginas/Confirmar'
import Restablecer from './paginas/Restablecer'
import PrivateRoutes from './routes/PrivateRoutes'
import { AuthProvider } from './context/AuthProvider'
import Configuracion from './paginas/Configuracion'
import { ConfigAuth } from './context/ConfigProvider'
import InicioProve from './paginas/InicioProv'
import PrivateProveedor from './routes/PrivateProveedor'
import { OfertaProvider } from './context/OfertasProvider'
import ListadoOfertas from './paginas/MisOfertas'
import HistorialTrabajoCli from './paginas/HistorialTrabajosCli'
import SolicitudProv from './paginas/SolicitudesProv'
import PaginaNoPermitida from './paginas/PaginaNoPermitida'
import RutasProveedor from './routes/RutasProveedor'
import RutasCliente from './routes/RutasClientes'
import Auth from './routes/Auth'
import SolicitudesCli from './paginas/SolicitudesCliente'
import ContratosCliente from './paginas/ContratosCliente'
import ContratosProv from './paginas/ContratosProveedor'
import NotFound from './paginas/NotFound'
import Calendario from './componentes/Calendario'
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <OfertaProvider>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path='/' element={<Auth />}>
              <Route path='login' element={<Login />} />
              <Route path='registro' element={<Registro />} />
              <Route path='recuperar' element={<Recuperar />} />
              <Route path='confirmar/:token' element={<Confirmar />} />
              <Route path='restablecer/:token' element={<Restablecer />} />
              <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='dashboard/*' element={
              <PrivateRoutes>
                <ConfigAuth>
                  <Routes>
                    <Route element={<Dashboard />}>
                      <Route index element={
                        <PrivateProveedor>
                          <InicioProve />
                        </PrivateProveedor>
                      } />
                      <Route path='ofertas' element={
                        <RutasProveedor>
                          <ListadoOfertas />
                        </RutasProveedor>
                      } />

                      <Route path='solicitudes/proveedor' element={
                        <RutasProveedor>
                          <SolicitudProv />
                        </RutasProveedor>
                      } />

                      <Route path='contratos/proveedor' element={
                        <RutasProveedor>
                          <ContratosProv />
                        </RutasProveedor>
                      } />

                      <Route path='historial' element={
                        <RutasCliente>
                          <HistorialTrabajoCli />
                        </RutasCliente>
                      } />
                      <Route path='solicitudes/cliente' element={
                        <RutasCliente>
                          <SolicitudesCli />
                        </RutasCliente>
                      } />
                      <Route path='contratos/cliente' element={
                        <RutasCliente>
                          <ContratosCliente />
                        </RutasCliente>
                      } />
                      <Route path='configuracion' element={<Configuracion />} />
                      <Route path='no-encontrado' element={<PaginaNoPermitida />} />
                      <Route path='*' element={<NotFound />} />
                      <Route path='pruebas' element={<Calendario/>}/>
                    </Route>
                  </Routes>
                </ConfigAuth>
              </PrivateRoutes>
            }>
            </Route>
          </Routes>
        </OfertaProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
