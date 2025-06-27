import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CalificacionCli from "../../paginas/Cliente/CalificacionCli";
import OfertaStore from "../../store/OfertaStore";
import React from "react";
import userEvent from "@testing-library/user-event";

// Mock OfertaStore
vi.mock("../../store/OfertaStore", () => ({
    __esModule: true,
    default: () => ({
        setModalCalifCli: vi.fn(),
    }),
}));

// Mock react-toastify
vi.mock("react-toastify", () => ({
    toast: { success: vi.fn(), error: vi.fn() },
    ToastContainer: () => <div data-testid="toast-container" />,
}));

// Mock axios
vi.mock("axios", () => ({
    default: {
        post: vi.fn(() => Promise.resolve({ data: { msg: "Calificación enviada" } })),
    },
}));

describe("CalificacionCli", () => {
    const props = {
        id: "123",
        nombre: "Juan",
        apellido: "Pérez",
        foto: "foto.jpg",
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renderiza correctamente los datos del cliente", () => {
        render(<CalificacionCli {...props} />);
        expect(screen.getByText("Califica la conducta de:")).toBeInTheDocument();
        expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
        expect(screen.getByAltText("prov")).toHaveAttribute("src", "foto.jpg");
    });

    it("muestra estrellas y permite seleccionar una calificación", async () => {
        render(<CalificacionCli {...props} />);
        const stars = screen.getAllByTestId("star");
        expect(stars.length).toBe(5);

        await userEvent.click(stars[3]);

        await waitFor(() => {
            const updatedStars = screen.getAllByTestId("star");
            expect(updatedStars[3].className.baseVal).toContain("text-amber-500");
        });
    });

    it("el botón Enviar está deshabilitado si no hay calificación", () => {
        render(<CalificacionCli {...props} />);
        const button = screen.getByRole("button", { name: /enviar/i });
        expect(button).toHaveClass("pointer-events-none");
    });

    it("el botón Enviar se habilita al seleccionar una estrella", async () => {
        render(<CalificacionCli {...props} />);
        const stars = screen.getAllByTestId("star");

        await userEvent.click(stars[2]); // Selecciona la estrella primero
        await waitFor(() => {
            expect(screen.getByRole("button", { name: /enviar/i })).not.toHaveClass("pointer-events-none");
        });
    });

    it("envía la calificación y muestra el toast de éxito", async () => {
        const { default: axios } = await import("axios");
        const { toast } = await import("react-toastify");
        render(<CalificacionCli {...props} />);
        const stars = screen.getAllByRole("img", { hidden: true });

        await userEvent.click(stars[4]); // Selecciona la quinta estrella

        // Ahora el botón debe estar habilitado y visible
        const button = screen.getByRole("button", { name: /enviar/i });
        await userEvent.click(button);

        // Espera a que la promesa se resuelva
        await new Promise((r) => setTimeout(r, 10));
        expect(axios.post).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith("Calificación enviada");
    });
});