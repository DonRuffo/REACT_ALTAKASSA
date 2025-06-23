import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeEach, vi, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SolicitudesCli from "../../paginas/Cliente/SolicitudesCliente";
import OfertaStore from "../../store/OfertaStore";
import AuthStoreContext from "../../store/AuthStore";
import axios from "axios";

// Mocks
vi.mock("axios");
vi.spyOn(window, "confirm").mockReturnValue(true);

const mockSetModalTraActual = vi.fn();
const mockSetTrabajos = vi.fn();
const mockSetOpcionActiva = vi.fn();
const mockObtenerTrabajos = vi.fn();

beforeAll(() => {
    global.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});

const mockTrabajos = [
    {
        _id: "tra1",
        servicio: "Limpieza",
        status: "En espera",
        precioTotal: 50,
        tipo: "precioPorDia",
        fecha: "2024-06-22T00:00:00.000Z",
        desde: "2024-06-22T14:00:00.000Z",
        hasta: "2024-06-22T16:00:00.000Z",
        proveedor: {
            nombre: "Juan",
            f_perfil: "img.jpg"
        },
        oferta: {
            _id: "of1"
        }
    }
];

beforeEach(() => {
    OfertaStore.setState({
        modalTraActual: false,
        setModalTraActual: mockSetModalTraActual,
        trabajos: mockTrabajos,
        setTrabajos: mockSetTrabajos,
        pulseTra: false,
        ObtenerTrabajos: mockObtenerTrabajos
    });
    AuthStoreContext.setState({
        setOpcionActiva: mockSetOpcionActiva,
        auth: { }
    });
    vi.clearAllMocks();
});

describe("SolicitudesCli", () => {
    test("renderiza el título y subtítulo", () => {
        render(
            <MemoryRouter>
                <SolicitudesCli />
            </MemoryRouter>
        );
        expect(screen.getAllByText(/Solicitudes/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Aquí podrás visualizar tus solicitudes de trabajo como cliente/i)).toBeInTheDocument();
    });

    test("renderiza una solicitud en espera", () => {
        render(
            <MemoryRouter>
                <SolicitudesCli />
            </MemoryRouter>
        );
        expect(screen.getByText(/Limpieza/i)).toBeInTheDocument();
        expect(screen.getByText(/Juan/i)).toBeInTheDocument();
        expect(screen.getByText(/\$50/)).toBeInTheDocument();
        expect(screen.getByText(/Total por Día/i)).toBeInTheDocument();
        expect(screen.getByText(/Actualizar/i)).toBeInTheDocument();
        expect(screen.getByText(/Eliminar/i)).toBeInTheDocument();
    });

    test("al hacer click en Eliminar, llama a axios.delete", async () => {
        axios.delete.mockResolvedValueOnce({ data: { msg: "Eliminado" } });
        render(
            <MemoryRouter>
                <SolicitudesCli />
            </MemoryRouter>
        );
        const eliminarBtn = screen.getByText(/Eliminar/i).closest("div");
        await userEvent.click(eliminarBtn);
        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalled();
        });
    });

    test("muestra mensaje si no hay solicitudes", () => {
        OfertaStore.setState({
            modalTraActual: false,
            setModalTraActual: mockSetModalTraActual,
            trabajos: [],
            setTrabajos: mockSetTrabajos,
            pulseTra: false,
            ObtenerTrabajos: mockObtenerTrabajos
        });
        render(
            <MemoryRouter>
                <SolicitudesCli />
            </MemoryRouter>
        );
        expect(screen.getByText(/Todavía no has solicitado ningún trabajo/i)).toBeInTheDocument();
        expect(screen.getByText(/Solicitar/i)).toBeInTheDocument();
    });
});