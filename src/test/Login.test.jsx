import React from "react";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from 'vitest'
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Login from "../paginas/Login";

vi.spyOn(toast, 'error')
vi.mock('axios')

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Componente Login', () => {
    test('Renderización del componente', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )
    })

    test('Inicio de sesión exitoso', async () => {

        axios.post.mockResolvedValueOnce({ data: { token: 'abc', _id: 'a54s', rol: 'usuario' } })
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'holaruben407@gmail.com')
        await userEvent.type(screen.getByLabelText(/contraseña/i), 'DonRuffi2003')

        const botonInicio = screen.getByRole('button', { name: /ingresar/i })
        await userEvent.click(botonInicio)

        expect(mockNavigate).toHaveBeenCalledWith('/dashboard/cliente')


    })

    test('Validaciones', async () => {
        axios.post.mockRejectedValueOnce({ response: { data: { msg: 'Lo sentimos, debe llenar todos los campos' } } })
        render(
            <MemoryRouter>
                <ToastContainer />
                <Login />
            </MemoryRouter>
        )

        await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'holaruben407@gmail.com')
        await userEvent.clear(screen.getByLabelText(/contraseña/i))

        const botonInicio = screen.getByRole('button', { name: /ingresar/i })

        await userEvent.click(botonInicio)

        expect(toast.error).toHaveBeenCalledWith('Lo sentimos, debe llenar todos los campos')


    })
})