import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeEach, vi, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PlanesdePago from "../../paginas/admin/Pagos";
import AuthStoreContext from "../../store/AuthStore";


// Mock axios and toast
vi.mock("axios");
vi.spyOn(toast, "success");
vi.spyOn(toast, "error");
vi.spyOn(window, "confirm").mockReturnValue(true);

const mockSetModalPagos = vi.fn();
const mockSetModalEditPagos = vi.fn();

const mockPlanes = [
    {
        _id: "plan1",
        nombre: "Básico",
        precio: 10,
        creditos: 5,
        descripcion: "Plan básico de prueba"
    }
];

beforeEach(() => {
    // Mock AuthStoreContext
    AuthStoreContext.setState({
        modalPagos: false,
        setModalPagos: mockSetModalPagos,
        planes: mockPlanes,
        setModalEditPagos: mockSetModalEditPagos,
        modalEditPagos: false
    });
    vi.clearAllMocks();
});

describe("PlanesdePago", () => {

    test("muestra mensaje si no hay planes", () => {
        AuthStoreContext.setState({
            modalPagos: false,
            setModalPagos: mockSetModalPagos,
            planes: [],
            setModalEditPagos: mockSetModalEditPagos,
            modalEditPagos: false
        });
        render(
            <MemoryRouter>
                <PlanesdePago />
            </MemoryRouter>
        );
        expect(screen.getByText(/Aún no tienes planes/i)).toBeInTheDocument();
        expect(screen.getByText(/Crea uno/i)).toBeInTheDocument();
    });

    test("abre modal para crear plan al hacer click en el botón", async () => {
        render(
            <MemoryRouter>
                <PlanesdePago />
            </MemoryRouter>
        );
        const crearBtn = screen.getByRole("button", { name: /Crear plan/i });
        await userEvent.click(crearBtn);
        expect(mockSetModalPagos).toHaveBeenCalledWith(true);
    });

    test("abre modal para editar plan al hacer click en el botón de editar", async () => {
        render(
            <MemoryRouter>
                <PlanesdePago />
            </MemoryRouter>
        );
        const editBtns = screen.getAllByRole("button");
        // El primer botón es editar, el segundo es eliminar
        await userEvent.click(editBtns[0]);
        expect(mockSetModalEditPagos).toHaveBeenCalledWith(true);
    });

    test("elimina plan correctamente y muestra toast de éxito", async () => {
        axios.delete.mockResolvedValueOnce({ data: { msg: "Plan eliminado" } });
        render(
            <MemoryRouter>
                <PlanesdePago />
            </MemoryRouter>
        );
        const deleteBtns = screen.getAllByRole("button");
        // El segundo botón es eliminar
        await userEvent.click(deleteBtns[1]);
        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith("Plan eliminado");
        });
    });

    test("muestra toast de error si falla la eliminación", async () => {
        axios.delete.mockRejectedValueOnce({ response: { data: { msg: "Error al eliminar" } } });
        render(
            <MemoryRouter>
                <PlanesdePago />
            </MemoryRouter>
        );
        const deleteBtns = screen.getAllByRole("button");
        await userEvent.click(deleteBtns[1]);
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Error al eliminar");
        });
    });

    test("no elimina plan si confirm retorna false", async () => {
        window.confirm.mockReturnValueOnce(false);
        render(
            <MemoryRouter>
                <PlanesdePago />
            </MemoryRouter>
        );
        const deleteBtns = screen.getAllByRole("button");
        await userEvent.click(deleteBtns[1]);
        expect(axios.delete).not.toHaveBeenCalled();
        expect(toast.success).not.toHaveBeenCalled();
    });
});