import React from "react";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from 'vitest'
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CategoriasServicios from "../../paginas/admin/Categorías";
import ModalCategoria from "../../componentes/modals/ModalCategoria";
vi.spyOn(toast, 'success')
vi.spyOn(toast, 'error')
vi.mock('axios')

describe('Componente categorias', () => {
    test('Renderización del componente', () => {
        render(
            <MemoryRouter>
                <CategoriasServicios />
            </MemoryRouter>
        )
    })

    test('Crear categoría', async () => {
        axios.post.mockResolvedValueOnce({ data: { msg: "Categoría creada" } })
        render(
            <MemoryRouter>
                <ModalCategoria />
            </MemoryRouter>
        )

        await userEvent.type(screen.getByLabelText(/nombre/i), 'Soldador')
        const botonEnvio = screen.getByRole('button', { name: /crear/i })

        await userEvent.click(botonEnvio)
        expect(toast.success).toHaveBeenCalledWith('Categoría creada')
    })

    test('Validaciones', async () => {
        axios.post.mockRejectedValueOnce({ response: { data: { msg: "Debe llenar el campo" } } })
        render(
            <MemoryRouter>
                <ModalCategoria />
            </MemoryRouter>
        )

        await userEvent.clear(screen.getByLabelText(/nombre/i))
        const botonEnvio = screen.getByRole('button', { name: /crear/i })

        await userEvent.click(botonEnvio)
        expect(toast.error).toHaveBeenCalledWith('Debe llenar el campo')
    })
})