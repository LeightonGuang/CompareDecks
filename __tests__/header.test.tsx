import Header from "@/components/Header";
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

describe("Header", () => {
  it("contains a logo", () => {
    render(
      <UserProvider>
        <DeckProvider>
          <Header />
        </DeckProvider>
      </UserProvider>,
    );

    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute(
      "src",
      "https://thumbs.dreamstime.com/b/temporary-rubber-stamp-over-white-background-86664158.jpg",
    );
  });

  it("contains a log in button", () => {
    render(
      <UserProvider>
        <DeckProvider>
          <Header />
        </DeckProvider>
      </UserProvider>,
    );

    const loginButton = screen.getByText("Log in");
    expect(loginButton).toBeInTheDocument();
  });

  it("contains a sign out button", () => {
    const mockUser = {
      aud: "authenticated",
      user_metadata: {
        name: "John Doe",
      },
    };
    render(
      <UserProvider value={{ user: mockUser }}>
        <DeckProvider>
          <Header />
        </DeckProvider>
      </UserProvider>,
    );

    const signOutButton = screen.getByText("Sign out");
    expect(signOutButton).toBeInTheDocument();
  });
});
