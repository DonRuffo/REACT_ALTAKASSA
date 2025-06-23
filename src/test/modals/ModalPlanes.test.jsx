import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeEach, vi, expect } from "vitest";
import ModalPlanes from "../../componentes/modals/ModalPlanes";
import AuthStoreContext from "../../store/AuthStore";

const mockSetModalPlanes = vi.fn();

const mockPlanes = [
    {
        _id: "plan1",
        nombre: "Básico",
        precio: 10,
        creditos: 5,
        descripcion: "Plan básico de prueba"
    },
    {
        _id: "plan2",
        nombre: "Premium",
        precio: 25,
        creditos: 15,
        descripcion: "Plan premium para usuarios avanzados"
    }
];

beforeEach(() => {
    AuthStoreContext.setState({
        setModalPlanes: mockSetModalPlanes,
        planes: mockPlanes
    });
    vi.clearAllMocks();
});

describe("ModalPlanes", () => {
    test("renderiza el título y subtítulo correctamente", () => {
        render(<ModalPlanes />);
        expect(screen.getByText(/Dale un impulso a tus ingresos/i)).toBeInTheDocument();
        expect(screen.getByText(/con los planes que tenemos para tí/i)).toBeInTheDocument();
    });

    test("renderiza todos los planes recibidos", () => {
    render(<ModalPlanes />);
    // Cambia getByText por getAllByText y verifica que haya al menos uno
    expect(screen.getAllByText(/Plan Básico/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/\$10/)).toBeInTheDocument();
    expect(screen.getByText(/Plan premium para usuarios avanzados/i)).toBeInTheDocument();
    expect(screen.getByText(/\$25/)).toBeInTheDocument();
});

    test("el botón de cerrar ejecuta setModalPlanes(false)", async () => {
    render(<ModalPlanes />);
    // Selecciona el primer botón (cerrar)
    const closeBtn = screen.getAllByRole("button")[0];
    await userEvent.click(closeBtn);
    expect(mockSetModalPlanes).toHaveBeenCalledWith(false);
});

    test("renderiza el botón de actualizar para cada plan", () => {
        render(<ModalPlanes />);
        expect(screen.getByText(/Actualizar a Básico/i)).toBeInTheDocument();
        expect(screen.getByText(/Actualizar a Premium/i)).toBeInTheDocument();
    });
});