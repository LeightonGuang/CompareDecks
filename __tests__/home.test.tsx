import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";
import { UserProvider } from "@/context/UserContext";
import { DeckProvider } from "@/context/DeckContext";
import { mock } from "node:test";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Page", () => {
  it("renders a heading", () => {
    render(
      <UserProvider>
        <DeckProvider>
          <Page />
        </DeckProvider>
      </UserProvider>,
    );

    const featureSection = screen.getByText("Features");

    expect(featureSection).toBeInTheDocument();
  });
});
