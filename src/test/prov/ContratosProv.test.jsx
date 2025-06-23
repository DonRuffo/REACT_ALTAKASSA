import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeEach, vi, expect } from "vitest";
import ContratosProv from "../../paginas/Proveedor/ContratosProveedor";
import OfertaStore from "../../store/OfertaStore";
import AuthStoreContext from "../../store/AuthStore";
import axios from "axios";
import { toast } from "react-toastify";

// Mocks
vi.mock("axios");
vi.spyOn(toast, "success");
vi.spyOn(toast, "error");
vi.spyOn(window, "confirm").mockReturnValue(true);

const mockSetTrabajosProvs = vi.fn();
const mockSetAuth = vi.fn();
const mockNuevoMSG = vi.fn();

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
        status: "Agendado",
        precioTotal: 50,
        desde: "2024-06-22T14:00:00.000Z",
        hasta: "2024-06-22T16:00:00.000Z",
        cliente: {
            _id: "cli1",
            nombre: "Carlos",
            apellido: "Pérez",
            f_perfil: "img.jpg"
        },
        proveedor: {
            _id: "prov1"
        },
        fecha: "2024-06-22T00:00:00.000Z"
    }
];

beforeEach(() => {
    OfertaStore.setState({
        trabajosProvs: mockTrabajosProvs,
        setTrabajosProvs: mockSetTrabajosProvs
    });
    AuthStoreContext.setState({
        auth: {},
        setAuth: mockSetAuth,
        NuevoMSG: mockNuevoMSG
    });
    vi.clearAllMocks();
    localStorage.setItem("token", "token-mock");
    localStorage.setItem("rol", "proveedor");
});

describe("ContratosProv", () => {
    test("renderiza el título y subtítulo", () => {
        render(<ContratosProv />);
        expect(screen.getByText(/Trabajos actuales/i)).toBeInTheDocument();
        expect(screen.getByText(/Aquí podrás ver tus trabajos agendados como proveedor/i)).toBeInTheDocument();
    });

    test("renderiza un trabajo agendado", () => {
        render(<ContratosProv />);
        expect(screen.getByText(/Limpieza/i)).toBeInTheDocument();
        expect(screen.getByText(/Carlos/i)).toBeInTheDocument();
        expect(screen.getByText(/\$50/)).toBeInTheDocument();
        expect(screen.getAllByText(/Agendado/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Mensaje/i)).toBeInTheDocument();
        expect(screen.getByText(/Cancelar/i)).toBeInTheDocument();
    });

    test("al hacer click en Mensaje, llama a NuevoMSG", async () => {
        render(<ContratosProv />);
        const mensajeBtn = screen.getByText(/Mensaje/i).closest("button");
        await userEvent.click(mensajeBtn);
        expect(mockNuevoMSG).toHaveBeenCalledWith(
            mockTrabajosProvs[0].cliente._id,
            mockTrabajosProvs[0].cliente.nombre,
            mockTrabajosProvs[0].cliente.apellido,
            mockTrabajosProvs[0].cliente.f_perfil
        );
    });

    test("al hacer click en Cancelar, llama a axios.put y muestra toast de éxito", async () => {
        axios.put.mockResolvedValueOnce({ data: { msg: "Trabajo cancelado" } });
        render(<ContratosProv />);
        const cancelarBtn = screen.getByText(/Cancelar/i).closest("button");
        await userEvent.click(cancelarBtn);
        await waitFor(() => {
            expect(axios.put).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith("Trabajo cancelado");
        });
    });

    test("al cancelar trabajo con error, muestra toast de error", async () => {
        axios.put.mockRejectedValueOnce({ response: { data: { msg: "Error al cancelar" } } });
        render(<ContratosProv />);
        const cancelarBtn = screen.getByText(/Cancelar/i).closest("button");
        await userEvent.click(cancelarBtn);
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Error al cancelar");
        });
    });

    test("muestra mensaje si no hay trabajos agendados", () => {
        OfertaStore.setState({
            trabajosProvs: [],
            setTrabajosProvs: mockSetTrabajosProvs
        });
        render(<ContratosProv />);
        expect(screen.getByText(/No se han agendado trabajos todavía/i)).toBeInTheDocument();
    });
});