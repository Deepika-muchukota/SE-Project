import React from "react";
import { render, fireEvent, screen } from "@testing-library/react"; // Import `screen`
import Burger from "./Burger_352/Burger";
import "@testing-library/jest-dom";

const categories = [
  { name: "The Classic", image: "image_path", price: "$8.99" },
  { name: "The Bacon Jam", image: "image_path", price: "$9.29" },
  { name: "The CowBoy", image: "image_path", price: "$9.99" },
  { name: "The Mushroom Swiss", image: "image_path", price: "$8.59" },
  { name: "The Pizza burger", image: "image_path", price: "$9.49" }
];

// Mock addItemToCart function to track state changes
const mockAddItemToCart = jest.fn();

describe("Burger Component", () => {
  let cart = [];

  it("renders the burger items correctly", () => {
    const { getByRole, getByText, getByAltText } = render(
      <Burger cart={cart} addItemToCart={mockAddItemToCart} />
    );
  
    // Check if each burger item is rendered
    categories.forEach((category) => {
      // Check if the category name (e.g., "The Classic") is rendered as a button
      const itemButton = getByRole("button", {
        name: new RegExp(category.name, "i"), // Using regex to be more flexible with text match
      });
      expect(itemButton).toBeInTheDocument();
  
      // Check if the category price is rendered
      const itemPrice = getByText(new RegExp(`\\${category.price}`, "i"));  // Use regex to match price
      expect(itemPrice).toBeInTheDocument();
  
      // Check if the category image is rendered
      const itemImage = getByAltText(category.name);
      expect(itemImage).toBeInTheDocument();
    });
  });
  

  it("adds an item to the cart when clicked", () => {
    render(<Burger cart={cart} addItemToCart={mockAddItemToCart} />);

    // Use screen.getByRole to find the button for "The Classic" burger
    const classicBurgerButton = screen.getByRole("button", { name: /The Classic/i });

    fireEvent.click(classicBurgerButton);

    expect(mockAddItemToCart).toHaveBeenCalledWith(
      expect.objectContaining({ name: "The Classic" }),
      "add"
    );
  });

  it("shows selected class for items in the cart", () => {
    cart = [{ name: "The Classic", price: "$8.99" }];
    
    render(<Burger cart={cart} addItemToCart={mockAddItemToCart} />);

    const classicButton = screen.getByRole("button", { name: /The Classic/i });
    expect(classicButton).toHaveClass("selected");
  });

  it("logs the cart when Confirm Order button is clicked", () => {
    render(<Burger cart={cart} addItemToCart={mockAddItemToCart} />);

    // Spy on console.log to check if cart is logged
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    const confirmButton = screen.getByText("Confirm Order");
    fireEvent.click(confirmButton);

    // Check if console.log was called with the current cart
    expect(logSpy).toHaveBeenCalledWith(cart);

    // Cleanup spy
    logSpy.mockRestore();
  });
});
