import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SpidrForm from "../components/SpidrForm"; // Adjust path as necessary

describe("SpidrForm Environment Test", () => {
  test("renders all required form fields", () => {
    render(<SpidrForm />);

    // Check that inputs are present
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Guess the Air Fryer’s Cost ($)")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("16-digit Spidr PIN")
    ).toBeInTheDocument();

    // Check that the submit button is present
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("formats PIN input as ####-####-####-####", () => {
    render(<SpidrForm />);

    const pinInput = screen.getByPlaceholderText("16-digit Spidr PIN");

    fireEvent.change(pinInput, {
      target: { value: "1234567890123456" },
    });

    expect(pinInput.value).toBe("1234-5678-9012-3456");
  });

  test("logs all form data to console on submit", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(<SpidrForm />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "123-456-7890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Guess the Air Fryer’s Cost ($)"),
      {
        target: { value: "100" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText("16-digit Spidr PIN"), {
      target: { value: "1234567890123456" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Check that console.log was called with the correct data
    expect(consoleSpy).toHaveBeenCalledWith("Form Submitted:", {
      firstName: "John",
      lastName: "Doe",
      phone: "123-456-7890",
      email: "john.doe@example.com",
      airFryerGuess: "100",
      pin: "1234-5678-9012-3456",
    });

    consoleSpy.mockRestore();
  });
});
