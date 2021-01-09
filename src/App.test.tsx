import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "./firebase";

describe("Test App component", () => {
  test("renders without crashing", () => {
    render(<App />);
  });

  test("renders link element 1", () => {
    render(<App />);
    const linkElement = screen.getByText(/Data Virtualization/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders link element 2", () => {
    render(<App />);
    const linkElement = screen.getByText(/Data Management/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders link element 3", () => {
    render(<App />);
    const linkElement = screen.getByText(/Data Export/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders login element", () => {
    render(<App />);
    const linkElement = screen.getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
  });
});
