vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, beforeEach, vi, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../paginas/Dashboard";
import AuthStoreContext from "../store/AuthStore";
import OfertaStore from "../store/OfertaStore";
import axios from "axios";
import socket from "../context/SocketConexion";

vi.mock("axios");
// Mocks básicos para contextos y funciones
const mockSetsideBar = vi.fn();
const mockSetperfilBar = vi.fn();
const mockHandleClickOutside = vi.fn();
const mockHandleMenu = vi.fn();
const mockSetOpcionActiva = vi.fn();
const mockSetTipo = vi.fn();
const mockSetModalCreditos = vi.fn();
const mockSetModalPlanes = vi.fn();
const mockSetModalInfo = vi.fn();
const mockSetMensajesUsuario = vi.fn();
const mockEliminarChat = vi.fn();
const mockNuevoMSG = vi.fn();


const socketCallbacks = {};

vi.mock("../context/SocketConexion", () => ({
    default: {
        on: (event, cb) => { socketCallbacks[event] = cb; },
        off: (event) => { delete socketCallbacks[event]; },
        emit: (event, data) => {
            if (socketCallbacks[event]) {
                socketCallbacks[event](data);
            }
        }
    }
}));

const mockAuth = {
    _id: "user1",
    nombre: "Juan",
    apellido: "Pérez",
    f_perfil: null,
    monedasTrabajos: 10
};

const mockMensajesUsuario = [
    {
        _id: "conv1",
        participantes: [
            { _id: "user1", nombre: "Juan", apellido: "Pérez", f_perfil: "img1.jpg" },
            { _id: "user2", nombre: "Ana", apellido: "García", f_perfil: "img2.jpg" }
        ],
        mensajes: [
            { _id: "msg1", mensaje: "Hola", emisor: "user2", fecha: "2024-06-22T10:00:00.000Z" }
        ]
    }
];

beforeEach(() => {
    AuthStoreContext.setState({
        auth: mockAuth,
        dark: false,
        menu: true,
        setsideBar: mockSetsideBar,
        handleClickOutside: mockHandleClickOutside,
        handleMenu: mockHandleMenu,
        opcionActiva: "inicio",
        setOpcionActiva: mockSetOpcionActiva,
        tipo: "cliente",
        setTipo: mockSetTipo,
        connectionStatus: true,
        setModalCreditos: mockSetModalCreditos,
        modalCreditos: false,
        modalPlanes: false,
        setModalPlanes: mockSetModalPlanes,
        nuevoMensaje: [],
        eliminarChat: mockEliminarChat,
        NuevoMSG: mockNuevoMSG,
    });
    OfertaStore.setState({
        modalPerfilFoto: false,
        setModalInfo: mockSetModalInfo,
        modalInfo: false,
        setperfilBar: mockSetperfilBar,
        handleClickOutsidePerfil: vi.fn(),
        handleInfo: vi.fn(),
        setMensajesUsuario: mockSetMensajesUsuario,
        mensajesUsuario: mockMensajesUsuario,
    });
    vi.clearAllMocks();
});

describe("Dashboard", () => {
    test("renderiza el nombre de la app y el usuario", () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        console.log(document.body.innerHTML);
        expect(screen.getByText(/Alta-Kassa/i)).toBeInTheDocument();
        expect(screen.getByText(/Juan Pérez/i)).toBeInTheDocument();
    });

    test("renderiza los enlaces principales del sidebar", () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Solicitudes/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Trabajos/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Historial/i).length).toBeGreaterThan(0);
    });

    test("muestra los créditos del usuario", () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        expect(screen.getByText(/10 créditos/i)).toBeInTheDocument();
    });

    test("al hacer click en cambiar tipo, cambia el tipo de usuario", () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        const cambiarBtns = screen.getAllByText(/Cambiar a Proveedor/i);
        fireEvent.click(cambiarBtns[0]);
        expect(mockSetTipo).toHaveBeenCalledWith("proveedor");
    });

    test("muestra el modal de créditos si modalCreditos es true", () => {
        AuthStoreContext.setState({
            ...AuthStoreContext.getState(),
            modalCreditos: true,
        });
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        expect(screen.getAllByText(/Planes Pro/i).length).toBeGreaterThan(0);
    });

    test("muestra el modal de planes si modalPlanes es true", () => {
        AuthStoreContext.setState({
            ...AuthStoreContext.getState(),
            modalPlanes: true,
        });
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        expect(screen.getAllByText(/Planes Pro/i).length).toBeGreaterThan(0);
    });

    test("renderiza el chat y permite enviar un mensaje", async () => {
    AuthStoreContext.setState({
        ...AuthStoreContext.getState(),
        nuevoMensaje: [
            {
                id: "user2",
                nombre: "Ana",
                apellido: "García",
                fPerfil: "img2.jpg"
            }
        ]
    });
    OfertaStore.setState({
        ...OfertaStore.getState(),
        mensajesUsuario: [
            {
                _id: "conv1",
                participantes: [
                    { _id: "user1", nombre: "Juan", apellido: "Pérez", f_perfil: "img1.jpg" },
                    { _id: "user2", nombre: "Ana", apellido: "García", f_perfil: "img2.jpg" }
                ],
                mensajes: [
                    { _id: "msg1", mensaje: "Hola", emisor: "user2", fecha: "2024-06-22T10:00:00.000Z" }
                ]
            }
        ]
    });

    // Mock de axios.post para simular la respuesta del backend
    axios.post.mockResolvedValueOnce({
        data: {
            _id: "conv1",
            participantes: [
                { _id: "user1", nombre: "Juan", apellido: "Pérez", f_perfil: "img1.jpg" },
                { _id: "user2", nombre: "Ana", apellido: "García", f_perfil: "img2.jpg" }
            ],
            mensajes: [
                { _id: "msg1", mensaje: "Hola", emisor: "user2", fecha: "2024-06-22T10:00:00.000Z" },
                { _id: "msg2", mensaje: "¡Hola Ana!", emisor: "user1", fecha: "2024-06-22T10:01:00.000Z" }
            ]
        }
    });

    render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    );

    expect(screen.getAllByText(/Ana García/i).length).toBeGreaterThan(0);

    const textarea = screen.getByPlaceholderText(/Escribe un mensaje/i);
    fireEvent.change(textarea, { target: { value: "¡Hola Ana!" } });

    const sendBtn = screen.getAllByRole("button").find(btn =>
        btn.innerHTML.includes("svg")
    );
    fireEvent.click(sendBtn);

    socket.emit('Mensaje', {
    conversacion: {
        _id: "conv1",
        participantes: [
            { _id: "user1", nombre: "Juan", apellido: "Pérez", f_perfil: "img1.jpg" },
            { _id: "user2", nombre: "Ana", apellido: "García", f_perfil: "img2.jpg" }
        ],
        mensajes: [
            { _id: "msg1", mensaje: "Hola", emisor: "user2", fecha: "2024-06-22T10:00:00.000Z" },
            { _id: "msg2", mensaje: "¡Hola Ana!", emisor: "user1", fecha: "2024-06-22T10:01:00.000Z" }
        ]
    }
});

    // Espera a que el textarea se limpie después de la respuesta simulada
    await waitFor(() => {
        expect(screen.getByPlaceholderText(/Escribe un mensaje/i).value).toBe("");
    });
});
});