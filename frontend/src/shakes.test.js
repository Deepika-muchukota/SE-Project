import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Shakes from "./Burger_352/Shakes";
import "@testing-library/jest-dom";

const categories = [
  { name: "Vanilla Milk Shake", price: "$4.69" },
  { name: "Chocolate Milk Shake", price: "$4.69" },
  { name: "Oreo Milk Shake", price: "$5.09" },
  { name: "Snicker Doodle Milk Shake", price: "$5.09" }
];

const mockAddItemToCart = jest.fn();

describe("Shakes Component", () => {
  let cart = [];

  it("renders the shakes items correctly", () => {
    render(<Shakes cart={cart} addItemToCart={mockAddItemToCart} />);

    categories.forEach(async (category) => {
      const itemButton = screen.getByRole("button", {
        name: new RegExp(category.name, "i"),
      });
      expect(itemButton).toBeInTheDocument();

      const itemPrice = await screen.findByText(new RegExp(`\\$?${category.price.trim()}`, "i"));
      expect(itemPrice).toBeInTheDocument();
      
      expect(itemPrice).toBeInTheDocument();
    });
  });

  it("adds an item to the cart when clicked", () => {
    render(<Shakes cart={cart} addItemToCart={mockAddItemToCart} />);

    const vanillaShakeButton = screen.getByRole("button", { name: /Vanilla Milk Shake/i });
    fireEvent.click(vanillaShakeButton);

    expect(mockAddItemToCart).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Vanilla Milk Shake" }),
      "add"
    );
  });

  it("shows selected class for items in the cart", () => {
    cart = [{ name: "Vanilla Milk Shake", price: "$4.69" }];
    render(<Shakes cart={cart} addItemToCart={mockAddItemToCart} />);

    const vanillaShakeButton = screen.getByRole("button", { name: /Vanilla Milk Shake/i });
    expect(vanillaShakeButton).toHaveClass("selected");
  });

  it("logs the cart when Confirm Order button is clicked", () => {
    render(<Shakes cart={cart} addItemToCart={mockAddItemToCart} />);

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const confirmButton = screen.getByText("Confirm Order");
    fireEvent.click(confirmButton);

    expect(logSpy).toHaveBeenCalledWith(cart);
    logSpy.mockRestore();
  });
});
