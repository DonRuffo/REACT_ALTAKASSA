import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ModalPublicaciones from "../../componentes/modals/ModalPublicaciones";
import axios from "axios";
import React from "react";

// Mock AuthStoreContext
const mockSetModalUsers = vi.fn();
vi.mock("../../store/AuthStore", () => ({
    __esModule: true,
    default: () => ({
        setModalUsers: mockSetModalUsers,
    }),
}));

// Mock axios
vi.mock("axios", () => ({
    default: {
        get: vi.fn(),
    },
}));

describe("ModalPublicaciones", () => {
    const mockUser = {
        nombre: "Juan",
        apellido: "Pérez",
        f_perfil: "foto.jpg",
        calificacionCliente: 4,
        calificacionProveedor: 5,
    };
    const mockOfertas = [
        {
            _id: "1",
            servicio: "Plomería",
            precioPorDia: 50,
            precioPorHora: 10,
            descripcion: "Reparaciones de plomería",
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        axios.get.mockResolvedValue({
            data: {
                usuario: mockUser,
                ofertas: mockOfertas,
            },
        });
    });

    it("renderiza el modal y muestra los datos del usuario", async () => {
        render(<ModalPublicaciones idRev="123" />);
        await waitFor(() => {
            expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
            expect(screen.getByAltText("imgPerfil")).toHaveAttribute("src", "foto.jpg");
            expect(screen.getByText("Cliente")).toBeInTheDocument();
            expect(screen.getByText("Proveedor")).toBeInTheDocument();
        });
    });

    it("muestra las publicaciones del usuario al hacer click en 'Ver publicaciones'", async () => {
        render(<ModalPublicaciones idRev="123" />);
        // Espera a que se cargue el usuario
        await screen.findByText("Juan Pérez");
        const btn = screen.getByRole("button", { name: /ver publicaciones/i });
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByText("Publicaciones")).toBeInTheDocument();
            expect(screen.getByText("Plomería")).toBeInTheDocument();
            expect(screen.getByText(/Reparaciones de plomería/)).toBeInTheDocument();
        });
    });

    it("muestra los comentarios del usuario al hacer click en 'Ver comentarios'", async () => {
        render(<ModalPublicaciones idRev="123" />);
        await screen.findByText("Juan Pérez");
        const btn = screen.getByRole("button", { name: /ver comentarios/i });
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByText("Comentarios")).toBeInTheDocument();
        });
    });

    it("cierra el modal al hacer click en 'Cerrar'", async () => {
        render(<ModalPublicaciones idRev="123" />);
        await screen.findByText("Juan Pérez");
        const cerrarBtn = screen.getByRole("button", { name: /cerrar/i });
        fireEvent.click(cerrarBtn);
        expect(mockSetModalUsers).toHaveBeenCalledWith(false);
    });

    it("muestra mensaje si el usuario no tiene publicaciones", async () => {
    axios.get.mockResolvedValueOnce({
        data: {
            usuario: mockUser,
            ofertas: [],
        },
    });
    render(<ModalPublicaciones idRev="123" />);
    await screen.findByText("Juan Pérez");
    fireEvent.click(screen.getByRole("button", { name: /ver publicaciones/i }));
    await waitFor(() => {
        expect(screen.getByText(/no ha publicado niguna oferta/i)).toBeInTheDocument();
    });
});
});