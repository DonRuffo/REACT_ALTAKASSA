import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeEach, vi, expect } from "vitest";
import ListadoOfertas from "../../paginas/Proveedor/MisOfertas";
import OfertaStore from "../../store/OfertaStore";
import AuthStoreContext from "../../store/AuthStore";
import axios from "axios";
import { toast } from "react-toastify";
import { MemoryRouter } from "react-router-dom";

// Mocks
vi.mock("axios");
vi.spyOn(toast, "success");
vi.spyOn(toast, "error");
vi.spyOn(window, "confirm").mockReturnValue(true);

const mockSetModalEditOf = vi.fn();
const mockSetOpcionActiva = vi.fn();

beforeAll(() => {
    global.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});

const mockOfertas = [
    {
        _id: "of1",
        servicio: "Limpieza",
        precioPorDia: 100,
        precioPorHora: 20
    }
];

beforeEach(() => {
    OfertaStore.setState({
        modalEditOf: false,
        setModalEditOf: mockSetModalEditOf,
        ofertaProvs: mockOfertas,
        pulseMisOfertas: false
    });
    AuthStoreContext.setState({
        setOpcionActiva: mockSetOpcionActiva,
        auth: { cantidadOfertas: 3 }
    });
    vi.clearAllMocks();
});

describe("ListadoOfertas", () => {
    test("renderiza el título y subtítulo", () => {
        render(
            <MemoryRouter>
                <ListadoOfertas />
            </MemoryRouter>
        );
        // Verifica que exista al menos un elemento con ese texto
        expect(screen.getAllByText(/Tus ofertas/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Aquí puedes ver tus ofertas creadas/i)).toBeInTheDocument();
    });

    test("muestra la cantidad de ofertas restantes", () => {
        render(<ListadoOfertas />);
        expect(screen.getAllByText(/Ofertas restantes:/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText("3")[0]).toBeInTheDocument();
    });

    test("renderiza las ofertas del proveedor", () => {
        render(
            <MemoryRouter>
                <ListadoOfertas />
            </MemoryRouter>
        );
        expect(screen.getByText(/Oferta N°1/i)).toBeInTheDocument();
        expect(screen.getByText(/Limpieza/i)).toBeInTheDocument();
        expect(screen.getByText(/\$100/)).toBeInTheDocument();
        expect(screen.getByText(/\$20/)).toBeInTheDocument();
    });

    test("al hacer click en el botón de eliminar, elimina la oferta y muestra toast", async () => {
        axios.delete.mockResolvedValueOnce({ data: { msg: "Oferta eliminada" } });
        render(
            <MemoryRouter>
                <ListadoOfertas />
            </MemoryRouter>
        );
        const eliminarBtn = screen.getAllByRole("button", { name: /Eliminar/i })[0];
        await userEvent.click(eliminarBtn);
        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Oferta eliminada");
        });
    });

    test("al hacer click en el botón de editar, abre el modal de edición", async () => {
        render(
            <MemoryRouter>
                <ListadoOfertas />
            </MemoryRouter>
        );
        const editarBtn = screen.getAllByRole("button", { name: /Editar/i })[0];
        await userEvent.click(editarBtn);
        expect(mockSetModalEditOf).toHaveBeenCalled();
    });

    test("muestra mensaje si no hay ofertas", () => {
        OfertaStore.setState({
            modalEditOf: false,
            setModalEditOf: mockSetModalEditOf,
            ofertaProvs: [],
            pulseMisOfertas: false
        });
       render(
            <MemoryRouter>
                <ListadoOfertas />
            </MemoryRouter>
        );
        expect(screen.getByText(/Aún no has creado ninguna oferta/i)).toBeInTheDocument();
        expect(screen.getByText(/Crear/i)).toBeInTheDocument();
    });
});