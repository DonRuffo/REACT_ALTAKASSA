import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeEach, vi, expect } from "vitest";
import SolicitudProv from "../../paginas/Proveedor/SolicitudesProv";
import OfertaStore from "../../store/OfertaStore";
import axios from "axios";
import { toast } from "react-toastify";

// Mocks
vi.mock("axios");
vi.spyOn(window, "confirm").mockReturnValue(true);
vi.spyOn(toast, "success");
vi.spyOn(toast, "error");

beforeAll(() => {
    global.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});

const mockTrabajosProvs = [
    {
        _id: "tra1",
        servicio: "Limpieza",
        status: "En espera",
        precioTotal: 50,
        tipo: "precioPorDia",
        fecha: "2024-06-22T00:00:00.000Z",
        desde: "2024-06-22T14:00:00.000Z",
        hasta: "2024-06-22T16:00:00.000Z",
        cliente: {
            nombre: "Carlos",
            f_perfil: "img.jpg"
        }
    }
];

beforeEach(() => {
    OfertaStore.setState({
        trabajosProvs: mockTrabajosProvs,
        pulseTra: false
    });
    vi.clearAllMocks();
    localStorage.setItem("token", "token-mock");
});

describe("SolicitudProv", () => {
    test("renderiza el título y subtítulo", () => {
        render(<SolicitudProv />);
        expect(screen.getAllByText(/Solicitudes/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Aquí puedes ver tus solicitudes de trabajo como proveedor/i)).toBeInTheDocument();
    });

    test("renderiza una solicitud en espera", () => {
        render(<SolicitudProv />);
        expect(screen.getByText(/Limpieza/i)).toBeInTheDocument();
        expect(screen.getByText(/Carlos/i)).toBeInTheDocument();
        expect(screen.getByText(/\$50/)).toBeInTheDocument();
        expect(screen.getByText(/Total por Día/i)).toBeInTheDocument();
        expect(screen.getByText(/Aceptar/i)).toBeInTheDocument();
        expect(screen.getByText(/Rechazar/i)).toBeInTheDocument();
    });

    test("al hacer click en Aceptar, llama a axios.put y muestra toast de éxito", async () => {
        axios.put.mockResolvedValueOnce({ data: { msg: "Solicitud aceptada" } });
        render(<SolicitudProv />);
        const aceptarBtn = screen.getByText(/Aceptar/i).closest("div");
        await userEvent.click(aceptarBtn);
        await waitFor(() => {
            expect(axios.put).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith("Solicitud aceptada");
        });
    });

    test("al hacer click en Rechazar, llama a axios.put y muestra toast de éxito", async () => {
        axios.put.mockResolvedValueOnce({ data: { msg: "Solicitud rechazada" } });
        render(<SolicitudProv />);
        const rechazarBtn = screen.getByText(/Rechazar/i).closest("div");
        await userEvent.click(rechazarBtn);
        await waitFor(() => {
            expect(axios.put).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith("Solicitud rechazada");
        });
    });

    test("muestra mensaje si no hay solicitudes", () => {
        OfertaStore.setState({
            trabajosProvs: [],
            pulseTra: false
        });
        render(<SolicitudProv />);
        expect(screen.getByText(/Aún no tienes solicitudes de servicio/i)).toBeInTheDocument();
        expect(screen.getByText(/¡Pronto las tendrás!/i)).toBeInTheDocument();
    });
});