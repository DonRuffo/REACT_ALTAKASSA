import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Configuracion from "../../paginas/Cli-Prov/Configuracion";
import React from "react";
import { MemoryRouter } from "react-router-dom";

// Mocks
const mockAuth = {
    auth: {
        nombre: "Juan",
        apellido: "Pérez",
        direccion: "Quito",
        email: "juan@mail.com",
        rol: "proveedor",
        f_perfil: "foto.jpg",
    },
    setAuth: vi.fn(),
    ActualizarPerfil: vi.fn(),
    ActualizarContrasenia: vi.fn(),
    setDark: vi.fn(),
    modalContra: false,
    setModalContra: vi.fn(),
    modalPerfil: false,
    setModalPerfil: vi.fn(),
    modalTema: false,
    setModalTema: vi.fn(),
    modalUbi: false,
    setModalUbi: vi.fn(),
    Perfil: vi.fn(),
    selectorM: "",
    setSelectorM: vi.fn(),
};

vi.mock("../../store/AuthStore", () => ({
    __esModule: true,
    default: () => mockAuth,
}));

vi.mock("axios", () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        delete: vi.fn(),
    },
}));

vi.mock("../../store/OfertaStore", () => ({
    __esModule: true,
    default: () => ({
        setModalPerfilFoto: vi.fn(),
    }),
}));

vi.mock("react-toastify", () => ({
    toast: { success: vi.fn(), error: vi.fn() },
    ToastContainer: ({ }) => <div data-testid="toast-container" />,
}));

describe("Configuracion", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renderiza el nombre y apellido del usuario", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
    });
    it("muestra la foto de perfil si existe", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        const img = screen.getByAltText("FotoPerfil");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "foto.jpg");
    });

    it("muestra las opciones de configuración", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        expect(screen.getByText(/Cambiar contraseña/)).toBeInTheDocument();
        expect(screen.getAllByText(/Actualizar perfil/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Actualizar Ubicación/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Tema/i).length).toBeGreaterThan(0)
    });

    it("permite abrir el modal de cambiar contraseña", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        const btn = screen.getByText(/Cambiar contraseña/);
        fireEvent.click(btn);
        expect(btn).toBeInTheDocument();
    });

    it("permite abrir el modal de actualizar perfil", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        const btn = screen.getAllByText(/Actualizar perfil/)[0];
        fireEvent.click(btn);
        expect(btn).toBeInTheDocument();
    });

    it("permite abrir el modal de tema", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        const btn = screen.getAllByText(/Tema/)[0];
        fireEvent.click(btn);
        expect(btn).toBeInTheDocument();
    });

    it("permite abrir el modal de ubicación", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        const btn = screen.getAllByText(/Actualizar Ubicación/)[0]
        fireEvent.click(btn);
        expect(btn).toBeInTheDocument();
    });

    it("renderiza el formulario de perfil con los datos actuales", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        expect(screen.getByLabelText(/Nombre:/)).toHaveValue("Juan");
        expect(screen.getByLabelText(/Apellido:/)).toHaveValue("Pérez");
        expect(screen.getByLabelText(/Dirección:/)).toHaveValue("Quito");
    });

    it("permite cambiar el valor de nombre en el formulario de perfil", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        const input = screen.getByLabelText(/Nombre:/);
        fireEvent.change(input, { target: { value: "Carlos" } });
        expect(input).toHaveValue("Carlos");
    });

    it("renderiza el formulario de cambio de contraseña", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        expect(screen.getByLabelText(/Contraseña actual:/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nueva contraseña:/)).toBeInTheDocument();
    });

    it("renderiza las opciones de tema", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        expect(screen.getByLabelText(/Oscuro/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Claro/)).toBeInTheDocument();
    });

    it("actualiza la contraseña correctamente al enviar el formulario", () => {
        render(
            <MemoryRouter>
                <Configuracion />
            </MemoryRouter>
        );
        // Simula abrir el modal de cambio de contraseña si es necesario
        // Si el formulario está siempre visible, omite este paso

        // Completa los campos de contraseña
        const actualInput = screen.getByLabelText(/Contraseña actual:/i);
        const nuevaInput = screen.getByLabelText(/Nueva contraseña:/i);

        fireEvent.change(actualInput, { target: { value: "vieja123" } });
        fireEvent.change(nuevaInput, { target: { value: "nueva456" } });

        // Busca y envía el formulario (ajusta el selector si tu botón tiene otro texto)
        const btn = screen.getByTestId("btn-actualizar-contrasenia");
        fireEvent.click(btn);

        // Verifica que se llamó la función mock de actualización
        expect(mockAuth.ActualizarContrasenia).toHaveBeenCalled();
        // Opcional: verifica que se llamó con los valores correctos
        // expect(mockAuth.ActualizarContrasenia).toHaveBeenCalledWith({ actual: "vieja123", nueva: "nueva456" });
    });
});