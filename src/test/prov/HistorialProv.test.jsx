import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, beforeEach, vi, expect } from "vitest";
import HistorialTrabajoProvs from "../../paginas/Proveedor/HistorialProv";
import OfertaStore from "../../store/OfertaStore";
import { MemoryRouter } from "react-router-dom";

// Mock de trabajos para las pruebas
const mockTrabajosProvs = [
    {
        _id: "tra1",
        servicio: "Limpieza",
        status: "Completado",
        precioTotal: 50,
        tipo: "precioPorDia",
        fecha: "2024-06-22T00:00:00.000Z",
        desde: "2024-06-22T14:00:00.000Z",
        hasta: "2024-06-22T16:00:00.000Z",
        proveedor: {
            nombre: "Juan",
            f_perfil: "img.jpg"
        }
    },
    {
        _id: "tra2",
        servicio: "Plomería",
        status: "Cancelado",
        precioTotal: 30,
        tipo: "precioPorHora",
        fecha: "2024-06-20T00:00:00.000Z",
        desde: "2024-06-20T10:00:00.000Z",
        hasta: "2024-06-20T12:00:00.000Z",
        proveedor: {
            nombre: "Pedro",
            f_perfil: "img.jpg"
        }
    }
];

beforeEach(() => {
    OfertaStore.setState({
        trabajosProvs: mockTrabajosProvs
    });
});

describe("HistorialTrabajoProvs", () => {
    test("renderiza el título y subtítulo", () => {
        render(
            <MemoryRouter>
                <HistorialTrabajoProvs />
            </MemoryRouter>
        );
        expect(screen.getByText(/Historial/i)).toBeInTheDocument();
        expect(screen.getByText(/Aquí podrás ver tus trabajos completados o cancelados como proveedor/i)).toBeInTheDocument();
    });

    test("muestra trabajos completados y cancelados por defecto", () => {
        render(
            <MemoryRouter>
                <HistorialTrabajoProvs />
            </MemoryRouter>
        );
        expect(screen.getByText(/Limpieza/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Completado/i).length).toBeGreaterThan(0);;
        expect(screen.getByText(/Plomería/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Cancelado/i).length).toBeGreaterThan(0);;
    });

    test("filtra solo trabajos completados", () => {
        render(
            <MemoryRouter>
                <HistorialTrabajoProvs />
            </MemoryRouter>
        );
        const completadosRadio = screen.getByLabelText(/Completados/i);
        fireEvent.click(completadosRadio);
        expect(screen.getByText(/Limpieza/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Completado/i).length).toBeGreaterThan(0);
        expect(screen.queryByText(/Plomería/i)).not.toBeInTheDocument();
        expect(screen.getAllByText(/Cancelado/i).length).toBeGreaterThan(0);
    });

    test("filtra solo trabajos cancelados", () => {
        render(
            <MemoryRouter>
                <HistorialTrabajoProvs />
            </MemoryRouter>
        );
        const canceladosRadio = screen.getByLabelText(/Cancelados/i);
        fireEvent.click(canceladosRadio);
        expect(screen.getByText(/Plomería/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Cancelado/i).length).toBeGreaterThan(0);
        expect(screen.queryByText(/Limpieza/i)).not.toBeInTheDocument();
        expect(screen.getAllByText(/Completado/i).length).toBeGreaterThan(0);
    });

    test("muestra mensaje si todos los trabajos están en espera/agendados/rechazados", () => {
        OfertaStore.setState({
            trabajosProvs: [
                {
                    _id: "tra3",
                    servicio: "Electricidad",
                    status: "En espera",
                    precioTotal: 40,
                    tipo: "precioPorHora",
                    fecha: "2024-06-25T00:00:00.000Z",
                    desde: "2024-06-25T10:00:00.000Z",
                    hasta: "2024-06-25T12:00:00.000Z",
                    proveedor: {
                        nombre: "Luis",
                        f_perfil: "img.jpg"
                    }
                }
            ]
        });
        render(
            <MemoryRouter>
                <HistorialTrabajoProvs />
            </MemoryRouter>
        );
        expect(screen.getByText(/Todos los trabajos están en espera/i)).toBeInTheDocument();
    });

    test("muestra mensaje si no hay trabajos", () => {
        OfertaStore.setState({
            trabajosProvs: []
        });
        render(
            <MemoryRouter>
                <HistorialTrabajoProvs />
            </MemoryRouter>
        );
        expect(screen.getByText(/Todavía no has solicitado ningún trabajo/i)).toBeInTheDocument();
        expect(screen.getByText(/Solicitar/i)).toBeInTheDocument();
    });
});