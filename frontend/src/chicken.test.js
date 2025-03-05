import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Chicken from "./Burger_352/Chicken";
import "@testing-library/jest-dom";

const categories = [
  { name: "Chicken Strips", image: "image_path", price: "$10.79" },
  { name: "Chicken Wings", image: "image_path", price: "$10.99" }
];

// Mock addItemToCart function
const mockAddItemToCart = jest.fn();

describe("Chicken Component", () => {
  let cart = [];

  it("renders the chicken items correctly", () => {
    render(<Chicken cart={cart} addItemToCart={mockAddItemToCart} />);

    categories.forEach((category) => {
      const itemButton = screen.getByRole("button", { name: new RegExp(category.name, "i") });
      expect(itemButton).toBeInTheDocument();

      const itemPrice = screen.getByText(new RegExp(`\\${category.price}`, "i"));
      expect(itemPrice).toBeInTheDocument();

      const itemImage = screen.getByAltText(category.name);
      expect(itemImage).toBeInTheDocument();
    });
  });

  it("adds an item to the cart when clicked", () => {
    render(<Chicken cart={cart} addItemToCart={mockAddItemToCart} />);

    const chickenStripsButton = screen.getByRole("button", { name: /Chicken Strips/i });
    fireEvent.click(chickenStripsButton);

    expect(mockAddItemToCart).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Chicken Strips" }),
      "add"
    );
  });

  it("shows selected class for items in the cart", () => {
    cart = [{ name: "Chicken Strips", price: "$10.79" }];
    render(<Chicken cart={cart} addItemToCart={mockAddItemToCart} />);

    const chickenStripsButton = screen.getByRole("button", { name: /Chicken Strips/i });
    expect(chickenStripsButton).toHaveClass("selected");
  });

  it("logs the cart when Confirm Order button is clicked", () => {
    render(<Chicken cart={cart} addItemToCart={mockAddItemToCart} />);

    const logSpy = jest.spyOn(console, "log").mockImplementation();
    const confirmButton = screen.getByText("Confirm Order");
    fireEvent.click(confirmButton);

    expect(logSpy).toHaveBeenCalledWith(cart);
    logSpy.mockRestore();
  });
});

