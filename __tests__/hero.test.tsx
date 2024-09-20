import Hero from "@/components/Hero";
import { UserProvider } from "@/context/UserContext";
import { DeckProvider } from "@/context/DeckContext";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Hero", () => {
  it("Hero has an image", () => {
    render(<Hero />);

    const imageAltText = screen.getByAltText("Compare Decks Page");

    expect(imageAltText).toBeInTheDocument();
  });
});
