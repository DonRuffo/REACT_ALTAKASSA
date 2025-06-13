import React from "react";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from 'vitest'
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InicioAdmin from "../../paginas/admin/InicioAdmin";
import ModalPublicaciones from "../../componentes/modals/ModalPublicaciones";

vi.mock('axios')
vi.spyOn(toast, 'success')

describe('Componente gestión de usuarios', () => {
    test('Renderización del componente', () => {
        render(
            <MemoryRouter>
                <InicioAdmin />
            </MemoryRouter>
        )
    })

    test('Eliminar usuario', async () => {
        axios.post.mockResolvedValueOnce({ data: { msg: "Usuario eliminado" } })
        render(
            <MemoryRouter>
                <InicioAdmin />
            </MemoryRouter>
        )

        const botonEliminar = screen.getByRole('button', {name:/eliminar/i})
        await userEvent.click(botonEliminar)

        expect(toast.success).toHaveBeenCalledWith('Usuario eliminado')
    })

    test('Carga de publicaciones de un usuario', async () => {
        render(
            <MemoryRouter>
                <ModalPublicaciones />
            </MemoryRouter>
        )
    })
})