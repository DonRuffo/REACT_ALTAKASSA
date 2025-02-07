import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Recuperar from './paginas/RecuperarContra'
import LandingPage from './paginas/LandinPage'
import Dashboard from './paginas/Dashboard'
import Inicio from './paginas/Inicio'
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
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <OfertaProvider>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path='/'>
              <Route path='login' element={<Login />} />
              <Route path='registro' element={<Registro />} />
              <Route path='recuperar' element={<Recuperar />} />
              <Route path='confirmar/:token' element={<Confirmar />} />
              <Route path='restablecer/:token' element={<Restablecer />} />
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
                      <Route path='configuracion' element={<Configuracion />} />
                      <Route path='ofertas' element={<ListadoOfertas />}/>
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
