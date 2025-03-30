import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sides from "./Burger_352/Sides";


describe("Sides Component", () => {
  const mockAddItemToCart = jest.fn();


  test("renders component correctly", () => {
    render(<Sides cart={{}} addItemToCart={mockAddItemToCart} />);
    expect(screen.getByText("Fries - $2.49")).toBeTruthy();
    expect(screen.getByText("Sweet Fries - $2.49")).toBeTruthy();  // Alternative check
    expect(screen.getByText("Onion Rings - $3.09")).toBeTruthy();
  });

  test("increments and decrements item quantity correctly", () => {
    render(<Sides cart={{}} addItemToCart={mockAddItemToCart} />);

    const incrementButton = screen.getAllByText("+")[0];
    const decrementButton = screen.getAllByText("-")[0];
    const quantityDisplay = screen.getAllByText("0")[0];

    // Initially, the quantity should be 0
    expect(quantityDisplay.textContent).toBe("0"); 


    // Click the "+" button and expect quantity to be 1
    fireEvent.click(incrementButton);
    expect(screen.getAllByText("1")[0]).toBeTruthy();

    // Click the "-" button and expect quantity to be 0 again
    fireEvent.click(decrementButton);
    expect(screen.getAllByText("0")[0]).toBeTruthy();
  });

  test("displays 'Add to Cart' button when items are selected", () => {
    render(<Sides cart={{}} addItemToCart={mockAddItemToCart} />);

    // Initially, the button should NOT be in the document
    expect(screen.queryByText("Add to Cart")).not.toBeTruthy();

    // Click "+" to add an item
    fireEvent.click(screen.getAllByText("+")[0]);

    // Now, the button should appear
    expect(screen.getByText("Add to Cart")).toBeTruthy();
  });

  test("updates cart state on confirm order", () => {
    global.alert = jest.fn(); // Mock alert to prevent pop-ups

    render(<Sides cart={{}} addItemToCart={mockAddItemToCart} />);

    fireEvent.click(screen.getAllByText("+")[0]); // Add an item
    fireEvent.click(screen.getByText("Add to Cart")); // Click 'Add to Cart'

    expect(global.alert).toHaveBeenCalledWith("Cart has been updated!");
  });
});
