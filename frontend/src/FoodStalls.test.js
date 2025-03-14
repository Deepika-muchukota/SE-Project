import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FoodStalls from "./FoodStalls";

// Mock the image imports
jest.mock("./assets/starbucks.jpg", () => "starbucks-mock.jpg", { virtual: true });
jest.mock("./assets/Burger 352.png", () => "burger352-mock.png", { virtual: true });
jest.mock("./assets/Panda.jpg", () => "panda-mock.jpg", { virtual: true });
jest.mock("./assets/subway.jpg", () => "subway-mock.jpg", { virtual: true });
jest.mock("./assets/Halal.png", () => "halal-mock.png", { virtual: true });
jest.mock("./assets/Baba's Pizza.png", () => "babas-pizza-mock.png", { virtual: true });

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate
}), { virtual: true });

describe("FoodStalls Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders all food stalls correctly", () => {
    const { getByText } = render(<FoodStalls />);
    
    // Check if all stall names are displayed using standard Jest assertions
    expect(getByText("Starbucks")).toBeTruthy();
    expect(getByText("Burger 352")).toBeTruthy();
    expect(getByText("Panda Express")).toBeTruthy();
    expect(getByText("Subway")).toBeTruthy();
    expect(getByText("Halal Shack")).toBeTruthy();
    expect(getByText("Baba's Pizza")).toBeTruthy();
  });

  test("navigates to correct route when Starbucks is clicked", () => {
    const { getByText } = render(<FoodStalls />);
    
    const starbucksStall = getByText("Starbucks").closest(".stall-button");
    fireEvent.click(starbucksStall);
    
    expect(mockNavigate).toHaveBeenCalledWith("/foodstalls/starbucks");
  });

  test("navigates to correct route when Burger 352 is clicked", () => {
    const { getByText } = render(<FoodStalls />);
    
    const burgerStall = getByText("Burger 352").closest(".stall-button");
    fireEvent.click(burgerStall);
    
    expect(mockNavigate).toHaveBeenCalledWith("/foodstalls/burger352");
  });

  test("has correct CSS classes for styling", () => {
    const { container } = render(<FoodStalls />);
    
    // Use basic assertions that don't require jest-dom
    expect(container.querySelector(".stalls-container")).toBeTruthy();
    
    const stallButtons = container.querySelectorAll(".stall-button");
    expect(stallButtons.length).toBe(6);
    
    const stallImages = container.querySelectorAll(".stall-image");
    expect(stallImages.length).toBe(6);
    
    const stallNames = container.querySelectorAll(".stall-name");
    expect(stallNames.length).toBe(6);
  });
});