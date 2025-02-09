import Loading from "@/components/OverlayLoading/Loading";
import { render, screen } from "@testing-library/react";

describe("Loading", () => {
  test("renders loading test", async () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});