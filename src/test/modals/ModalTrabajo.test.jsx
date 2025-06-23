import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeEach, vi, expect } from "vitest";
import ModalTrabajos from "../../componentes/modals/ModalTrabajos";
import OfertaStore from "../../store/OfertaStore";
import AuthStoreContext from "../../store/AuthStore";
import axios from "axios";
import { toast } from "react-toastify";

// Mocks
vi.mock("axios");
vi.spyOn(toast, "success");
vi.spyOn(toast, "error");
vi.spyOn(window, "alert").mockImplementation(() => {});

const mockSetModalTra = vi.fn();
const mockSetIdProveedor = vi.fn();
const mockSetFechas = vi.fn();
const mockSetTraProveedor = vi.fn();
const mockSetModalPerfil = vi.fn();
const mockSetMapaCliProv = vi.fn();
const mockSetTrabajos = vi.fn();
const mockSetUbicacionTrabajo = vi.fn();

const mockTraProveedor = [];
const mockForm = {
    proveedor: {
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan@mail.com",
        f_perfil: "img.jpg",
        ubicacionTrabajo: "Calle 123"
    },
    precioPorDia: 100,
    precioPorHora: 20,
    servicio: "Limpieza",
    descripcion: "Servicio de limpieza"
};

beforeEach(() => {
    OfertaStore.setState({
        modalTra: true,
        setModalTra: mockSetModalTra,
        idProveedor: "prov1",
        setIdProveedor: mockSetIdProveedor,
        setFechas: mockSetFechas,
        setTraProveedor: mockSetTraProveedor,
        traProveedor: mockTraProveedor,
        setModalPerfil: mockSetModalPerfil,
        modalPerfil: false,
        mapaCliProv: false,
        setMapaCliProv: mockSetMapaCliProv,
        setTrabajos: mockSetTrabajos
    });
    AuthStoreContext.setState({
        setUbicacionTrabajo: mockSetUbicacionTrabajo
    });
    vi.clearAllMocks();
});

describe("ModalTrabajos", () => {
    test("renderiza el título principal y los campos básicos", () => {
        render(<ModalTrabajos idOferta="of1" />);
        expect(screen.getByText(/Solicitud de servicio/i)).toBeInTheDocument();
        expect(screen.getByText(/Seleccionar/i)).toBeInTheDocument();
        expect(screen.getByText(/Tipo:/i)).toBeInTheDocument();
        expect(screen.getByText(/Precio\/Dia/i)).toBeInTheDocument();
        expect(screen.getByText(/Precio\/Hora/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Cerrar/i })).toBeInTheDocument();
    });

    test("permite seleccionar tipo de precio y muestra campos correspondientes", async () => {
        render(<ModalTrabajos idOferta="of1" />);
        const radioHora = screen.getByLabelText(/Precio\/Hora/i);
        await userEvent.click(radioHora);
        expect(screen.getByText(/Hora:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Desde:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Hasta:/i)).toBeInTheDocument();
    });

    test("muestra información del proveedor y servicio", async () => {
        // Mock la respuesta de axios.get para obtener la oferta
        axios.get.mockResolvedValueOnce({ data: mockForm });
        render(<ModalTrabajos idOferta="of1" />);
        await waitFor(() => {
            expect(screen.getByText(/Juan Pérez/i)).toBeInTheDocument();
            expect(screen.getAllByText(/Limpieza/i).length).toBeGreaterThan(0);
            expect(screen.getByText(/\$100/)).toBeInTheDocument();
            expect(screen.getByText(/\$20/)).toBeInTheDocument();
            expect(screen.getByText(/Servicio de limpieza/i)).toBeInTheDocument();
        });
    });

    test("al hacer submit exitoso muestra toast de éxito", async () => {
        axios.get.mockResolvedValueOnce({ data: mockForm });
        axios.post.mockResolvedValueOnce({ data: { msg: "Trabajo creado" } });
        render(<ModalTrabajos idOferta="of1" />);
        // Espera a que cargue la info
        await waitFor(() => expect(screen.getByText(/Juan Pérez/i)).toBeInTheDocument());
        const submitBtn = screen.getByRole("button", { name: /Crear/i });
        await userEvent.click(submitBtn);
        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Trabajo creado");
        });
    });

    test("al hacer submit con error muestra toast de error", async () => {
        axios.get.mockResolvedValueOnce({ data: mockForm });
        axios.post.mockRejectedValueOnce({ response: { data: { msg: "Error al crear trabajo" } } });
        render(<ModalTrabajos idOferta="of1" />);
        await waitFor(() => expect(screen.getByText(/Juan Pérez/i)).toBeInTheDocument());
        const submitBtn = screen.getByRole("button", { name: /Crear/i });
        await userEvent.click(submitBtn);
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Error al crear trabajo");
        });
    });
});