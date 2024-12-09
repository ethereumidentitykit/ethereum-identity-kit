import { render, screen } from "@testing-library/react";
import ProfileCard from "./ProfileCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("ProfileCard", () => {
  test("renders the Profile Card", () => {
    render(<QueryClientProvider client={queryClient}><ProfileCard userAddress="0x871b4be6Ec08a847c94a86C41aD449eF9d507b34" /></QueryClientProvider>);

    expect(screen.getByRole("paragraph").innerHTML).toContain(".eth");
  });
});