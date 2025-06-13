import Registro from "../paginas/Registro";
import { render, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, test, vi } from 'vitest'
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

vi.mock('axios')
vi.spyOn(toast, 'success');
vi.spyOn(toast, 'error'); 

describe("Componente Registro", () => {
    test('Renderizado del componente', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        )
    })

    test('Envío del formulario', async () => {

        axios.post.mockResolvedValueOnce({ data: { msg: 'Revisa tu correo electronico para confirmar tu cuenta', rol:'usuario' } });
        render(
            <MemoryRouter>
                <ToastContainer />
                <Registro />
            </MemoryRouter>
        )
        //campos
        await userEvent.type(screen.getByLabelText(/nombre/i), 'Dennis')
        await userEvent.type(screen.getByLabelText(/apellido/i), 'Díaz')
        await userEvent.selectOptions(
            screen.getByLabelText(/provincia/i), 'Pichincha'
        )
        await userEvent.type(screen.getByLabelText(/correo/i), 'dennisdiaz@gmail.com')
        await userEvent.type(screen.getByLabelText(/contraseña/i), '123456')
        const botonRegistro = screen.getByRole('button', { name: /registrar/i })

        await userEvent.click(botonRegistro)

        expect(toast.success).toHaveBeenCalledWith('Revisa tu correo electronico para confirmar tu cuenta');

    })

    test('Validaciones', async () => {
        axios.post.mockRejectedValueOnce({ response: {data: { msg: 'Lo sentimos, debes llenar todos los campos'} } });
        render(
            <MemoryRouter>
                <ToastContainer />
                <Registro />
            </MemoryRouter>
        )
        //campos
        await userEvent.type(screen.getByLabelText(/nombre/i), 'Dennis')
        await userEvent.type(screen.getByLabelText(/apellido/i), 'Díaz')
        await userEvent.selectOptions(
            screen.getByLabelText(/provincia/i), 'Pichincha'
        )
        await userEvent.clear(screen.getByLabelText(/correo/i))
        await userEvent.type(screen.getByLabelText(/contraseña/i), '123456')
        const botonRegistro = screen.getByRole('button', { name: /registrar/i })

        await userEvent.click(botonRegistro)

        expect(toast.error).toHaveBeenCalledWith('Lo sentimos, debes llenar todos los campos');
    })

})