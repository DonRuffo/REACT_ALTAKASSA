import React from "react";
import { render } from '@testing-library/react'
import { beforeEach, describe, test, vi } from 'vitest'
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InicioAdmin from "../../paginas/admin/InicioAdmin";
import ModalPublicaciones from "../../componentes/modals/ModalPublicaciones";
import AuthStoreContext from "../../store/AuthStore";

vi.mock('axios')
vi.spyOn(toast, 'success')
vi.spyOn(window, 'confirm').mockReturnValue(true)

beforeEach(() => {
    AuthStoreContext.setState({
        users: [
            {
                _id: '683dd163c2912d8504754e13',
                nombre: 'Martin',
                apellido: 'Ayala',
                direccion: 'Pichincha',
                calificacionCliente: 5,
                calificacionProveedor: 5
            }
        ],
        setUsers: vi.fn()
    })
})

describe('Componente gestión de usuarios', () => {
    test('Renderización del componente', () => {
        render(
            <MemoryRouter>
                <InicioAdmin />
            </MemoryRouter>
        )
    })

    test('Eliminar usuario', async () => {
        await axios.delete.mockResolvedValueOnce({ data: { msg: "Usuario eliminado" } })
        render(
            <MemoryRouter>
                <InicioAdmin />
            </MemoryRouter>
        )

        
    })

    test('Carga de publicaciones de un usuario', async () => {
        render(
            <MemoryRouter>
                <ModalPublicaciones />
            </MemoryRouter>
        )
    })
})