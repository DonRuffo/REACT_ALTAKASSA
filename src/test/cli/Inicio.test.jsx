import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeEach, vi, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Inicio from "../../paginas/Cliente/Inicio";
import AuthStoreContext from "../../store/AuthStore";
import OfertaStore from "../../store/OfertaStore";
import axios from "axios";

// Mocks
vi.mock("axios");
vi.spyOn(window, "localStorage", "get").mockImplementation(() => ({
    getItem: vi.fn(() => "token-mock"),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
}));

const mockSetAuth = vi.fn();
const mockSetUbiActual = vi.fn();
const mockSetUbicacionActual = vi.fn();
const mockSetModalTra = vi.fn();
const mockSetIdProveedor = vi.fn();
const mockSetModalProvs = vi.fn();

const mockCategorias = [
    { nombre: "Limpieza" },
    { nombre: "Plomería" }
];

const mockOferta = [
    {
        _id: "of1",
        servicio: "Limpieza",
        precioPorDia: 100,
        precioPorHora: 20,
        proveedor: {
            _id: "prov1",
            nombre: "Juan",
            apellido: "Pérez",
            f_perfil: "img.jpg"
        }
    }
];

beforeEach(() => {
    AuthStoreContext.setState({
        setAuth: mockSetAuth,
        foto: true,
        ubiActual: true,
        setUbiActual: mockSetUbiActual,
        pulseFoto: false,
        pulseUbiTra: false,
        pulseUbiActual: false,
        ubiCliente: vi.fn(),
        setUbicacionActual: mockSetUbicacionActual,
        ivActual: "iv-mock",
        categorias: mockCategorias
    });
    OfertaStore.setState({
        modalTra: false,
        setModalTra: mockSetModalTra,
        oferta: mockOferta,
        setIdProveedor: mockSetIdProveedor,
        modalProvs: false,
        setModalProvs: mockSetModalProvs
    });
    vi.clearAllMocks();
});

describe("Inicio", () => {
    test("renderiza los títulos principales", () => {
        render(
            <MemoryRouter>
                <Inicio />
            </MemoryRouter>
        );
        expect(screen.getByText(/¡Qué gusto verte aquí!/i)).toBeInTheDocument();
        expect(screen.getByText(/Los proveedores esperan por brindarte sus servicios/i)).toBeInTheDocument();
    });

    test("renderiza las categorías", () => {
        render(
            <MemoryRouter>
                <Inicio />
            </MemoryRouter>
        );
        expect(screen.getByText(/Categorías/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Limpieza/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Plomería/i)).toBeInTheDocument();
    });

    test("renderiza las ofertas principales", () => {
        render(
            <MemoryRouter>
                <Inicio />
            </MemoryRouter>
        );
        expect(screen.getByText(/Principales Ofertas/i)).toBeInTheDocument();
        expect(screen.getByText(/Juan Pérez/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Limpieza/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/\$100/)).toBeInTheDocument();
        expect(screen.getByText(/\$20/)).toBeInTheDocument();
    });

    test("muestra mensaje de 'No existen ofertas aún' si no hay ofertas", () => {
        OfertaStore.setState({
            modalTra: false,
            setModalTra: mockSetModalTra,
            oferta: [],
            setIdProveedor: mockSetIdProveedor,
            modalProvs: false,
            setModalProvs: mockSetModalProvs
        });
        render(
            <MemoryRouter>
                <Inicio />
            </MemoryRouter>
        );
        expect(screen.getAllByText(/No existen ofertas aún/i).length).toBeGreaterThan(0);
    });

    test("al hacer click en una categoría, filtra las ofertas", async () => {
        render(
            <MemoryRouter>
                <Inicio />
            </MemoryRouter>
        );
        const catBtn = screen.getAllByText(/Limpieza/i)[0];
        await userEvent.click(catBtn);
        await waitFor(() => {
            expect(screen.getAllByText(/Limpieza/i).length).toBeGreaterThan(0);
        });
    });
});