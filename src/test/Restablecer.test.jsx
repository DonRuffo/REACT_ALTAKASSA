import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Restablecer from "../paginas/Restablecer";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock axios
vi.mock("axios", () => ({
    default: {
        post: vi.fn(() => Promise.resolve({ data: { msg: "Contraseña actualizada" } })),
    },
}));

// Mock react-toastify
vi.mock("react-toastify", () => ({
    toast: { success: vi.fn(), error: vi.fn() },
    ToastContainer: ({ }) => <div data-testid="toast-container" />,
}));

// Mock useParams
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useParams: () => ({ token: "test-token" }),
    };
});

describe("Restablecer", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renderiza el formulario de restablecer contraseña", () => {
        render(
            <MemoryRouter>
                <Restablecer />
            </MemoryRouter>
        );
        expect(screen.getByText(/Restablecer contraseña/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nueva contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
    });

    it("permite mostrar y ocultar la contraseña", () => {
        render(
            <MemoryRouter>
                <Restablecer />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText("*******");
        const toggleBtn = screen.getByRole("button", { name: "" }); // El botón de ojo no tiene texto
        expect(input.type).toBe("password");
        fireEvent.click(toggleBtn);
        expect(input.type).toBe("text");
        fireEvent.click(toggleBtn);
        expect(input.type).toBe("password");
    });

    it("actualiza el valor del input de contraseña", () => {
        render(
            <MemoryRouter>
                <Restablecer />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText("*******");
        fireEvent.change(input, { target: { value: "nuevaClave123" } });
        expect(input.value).toBe("nuevaClave123");
    });

    it("envía el formulario y muestra el toast de éxito", async () => {
        const { default: axios } = await import("axios");
        const { toast } = await import("react-toastify");
        render(
            <MemoryRouter>
                <Restablecer />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText("*******");
        fireEvent.change(input, { target: { value: "nuevaClave123" } });
        const btn = screen.getByRole("button", { name: /enviar/i });
        fireEvent.click(btn);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith("Contraseña actualizada");
        });
    });

    it("muestra el toast de error si la petición falla", async () => {
        const { default: axios } = await import("axios");
        const { toast } = await import("react-toastify");
        axios.post.mockRejectedValueOnce({ response: { data: { msg: "Token inválido" } } });

        render(
            <MemoryRouter>
                <Restablecer />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText("*******");
        fireEvent.change(input, { target: { value: "nuevaClave123" } });
        const btn = screen.getByRole("button", { name: /enviar/i });
        fireEvent.click(btn);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Token inválido");
        });
    });
});