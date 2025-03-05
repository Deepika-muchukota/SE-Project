import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import StarBucksDrinks from "./Starbucks/StarBucksDrinks"; // Adjust the path if necessary
import "@testing-library/jest-dom";

const categories = [
  { name: "Vanilla Sweet Cream Nitro", price: "$7.89" },
  { name: "Vanilla Oat Milk", price: "$6.49" },
  { name: "Iced Caffe Latte", price: "$5.29" },
  { name: "Iced Caffe Mocha", price: "$5.79" },
  { name: "Iced Matcha Latte", price: "$6.59" },
  { name: "Cold Brew With Milk", price: "$5.99" },
  { name: "Iced Coffee With Milk", price: "$4.99" },
  { name: "Iced Flat White", price: "$5.89" },
  { name: "Pumpkin Spice Latte", price: "$6.29" },
  { name: "Iced Shaken Espresso", price: "$5.49" },
  { name: "Coffee Frappuccino", price: "$5.99" },
  { name: "Salted Caramel Brew", price: "$6.19" },
  { name: "Honey Almond Milk", price: "$5.79" },
  { name: "Caramel Frappuccino", price: "$5.89" },
  { name: "Caramel Macchiato", price: "$5.69" },
  { name: "Refreshers", price: "$4.89" },
  { name: "Pumpkin Spice Frappuccino", price: "$6.49" },
  { name: "Double Choco Chip", price: "$5.99" },
  { name: "Mango Espresso", price: "$5.69" },
  { name: "Java Chip", price: "$6.29" },
];

const mockAddItemToCart = jest.fn();

describe("StarBucksDrinks Component", () => {
  let cart = [];

  it("renders all Starbucks drink items correctly", () => {
    render(<StarBucksDrinks cart={cart} addItemToCart={mockAddItemToCart} />);
    
    categories.forEach( async(category) => {
      const itemButton = screen.getByRole("button", {
        name: new RegExp(category.name, "i"),
      });
      expect(itemButton).toBeInTheDocument();

      const itemPrice = await screen.findByText(new RegExp(`\\$?${category.price.trim()}`, "i"));
      expect(itemPrice).toBeInTheDocument();
    });
  });

  it("adds an item to the cart when clicked", () => {
    render(<StarBucksDrinks cart={cart} addItemToCart={mockAddItemToCart} />);

    const vanillaNitroButton = screen.getByRole("button", { name: /Vanilla Sweet Cream Nitro/i });

    fireEvent.click(vanillaNitroButton);

    expect(mockAddItemToCart).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Vanilla Sweet Cream Nitro" }),
      "add"
    );
  });

  it("shows selected class for items in the cart", () => {
    cart = [{ name: "Iced Matcha Latte", price: "$6.59" }];

    render(<StarBucksDrinks cart={cart} addItemToCart={mockAddItemToCart} />);

    const matchaButton = screen.getByRole("button", { name: /Iced Matcha Latte/i });
    expect(matchaButton).toHaveClass("selected");
  });

  it("logs the cart when Confirm Order button is clicked", () => {
    render(<StarBucksDrinks cart={cart} addItemToCart={mockAddItemToCart} />);

    const logSpy = jest.spyOn(console, "log").mockImplementation();

    const confirmButton = screen.getByText("Confirm Order");
    fireEvent.click(confirmButton);

    expect(logSpy).toHaveBeenCalledWith(cart);

    logSpy.mockRestore();
  });
});
