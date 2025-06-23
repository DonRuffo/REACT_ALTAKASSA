import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, beforeEach, vi, expect } from "vitest";
import Sugerencias from "../../paginas/Cli-Prov/Sugerencias";
import AuthStoreContext from "../../store/AuthStore";
import axios from "axios";
import { toast } from "react-toastify";

// Mocks
vi.mock("axios");
vi.spyOn(toast, "success");
vi.spyOn(toast, "error");

const mockAuth = {
    email: "test@mail.com",
    rol: "cliente",
    nombre: "Juan",
    apellido: "Pérez"
};

beforeEach(() => {
    AuthStoreContext.setState({
        auth: mockAuth
    });
    vi.clearAllMocks();
    localStorage.setItem("token", "token-mock");
});

describe("Sugerencias", () => {
    test("renderiza el título y el formulario", () => {
        render(<Sugerencias />);
        expect(screen.getByText(/Sugerencias y comentarios/i)).toBeInTheDocument();
        expect(screen.getByText(/¡Cuéntanos cómo ha sido tu experiencia/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Comentario:/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Enviar/i })).toBeInTheDocument();
    });

    test("permite seleccionar experiencia y escribir comentario", () => {
        render(<Sugerencias />);
        const buenaRadio = screen.getByLabelText(/Buena/i);
        fireEvent.click(buenaRadio);
        const textarea = screen.getByLabelText(/Comentario:/i);
        fireEvent.change(textarea, { target: { value: "Muy buena experiencia" } });
        expect(textarea.value).toBe("Muy buena experiencia");
    });

    test("envía sugerencia exitosamente y muestra toast de éxito", async () => {
        axios.post.mockResolvedValueOnce({ data: { msg: "Sugerencia enviada" } });
        render(<Sugerencias />);
        fireEvent.click(screen.getByLabelText(/Buena/i));
        fireEvent.change(screen.getByLabelText(/Comentario:/i), { target: { value: "¡Excelente app!" } });
        const enviarBtn = screen.getByRole("button", { name: /Enviar/i });
        fireEvent.click(enviarBtn);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith("Sugerencia enviada");
        });
    });

    test("muestra toast de error si falla el envío", async () => {
        axios.post.mockRejectedValueOnce({ response: { data: { msg: "Error al enviar" } } });
        render(<Sugerencias />);
        fireEvent.click(screen.getByLabelText(/Mala/i));
        fireEvent.change(screen.getByLabelText(/Comentario:/i), { target: { value: "No me gustó" } });
        const enviarBtn = screen.getByRole("button", { name: /Enviar/i });
        fireEvent.click(enviarBtn);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Error al enviar");
        });
    });
});