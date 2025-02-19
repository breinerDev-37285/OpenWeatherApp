import { render, screen, fireEvent } from "@testing-library/react";
import { SearchLocation } from "@components/base/search";
import { useSearch } from "@hooks/useSearch";

jest.mock("../../../src/hooks/useSearch.ts");

jest.mock("@components/base/search/style.module.css", () => ({
  base_search__container: "base_search__container",
  base_search: "base_search",
  error: "error",
  wrapper_loader: "wrapper_loader",
  dropdown: "dropdown",
  active_expanded: "active_expanded",
  dropdown_content: "dropdown_content",
  disabled: "disabled",
}));

describe("SearchLocation Component", () => {
  const mockDispatch = jest.fn();
  const defaultProps = {
    dispatch: mockDispatch,
    loading: false,
    placeholder: "Search location...",
  };

  const mockCities = [
    { name: "New York", lat: 40.7128, lon: -74.006 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search input correctly", () => {
    const mockUseSearch = {
      handleInputChange: jest.fn(),
      query: "",
      cities: [],
      handlerSelectedCity: jest.fn(),
      activeDropdown: false,
      error: null,
    };

    (useSearch as jest.Mock).mockReturnValue(mockUseSearch);

    render(<SearchLocation {...defaultProps} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows loading spinner when loading is true", () => {
    const mockUseSearch = {
      handleInputChange: jest.fn(),
      query: "",
      cities: [],
      handlerSelectedCity: jest.fn(),
      activeDropdown: false,
      error: null,
    };

    (useSearch as jest.Mock).mockReturnValue(mockUseSearch);

    const { container } = render(
      <SearchLocation {...defaultProps} loading={true} />
    );

    const loader = container.querySelector(".loader");
    expect(loader).toBeInTheDocument();
  });

  it("displays cities in dropdown when available", () => {
    const mockUseSearch = {
      handleInputChange: jest.fn(),
      query: "new",
      cities: mockCities,
      handlerSelectedCity: jest.fn(),
      activeDropdown: true,
      error: null,
    };

    (useSearch as jest.Mock).mockReturnValue(mockUseSearch);

    render(<SearchLocation {...defaultProps} />);

    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
  });

  it("handles city selection", () => {
    const mockHandlerSelectedCity = jest.fn();
    const mockUseSearch = {
      handleInputChange: jest.fn(),
      query: "new",
      cities: mockCities,
      handlerSelectedCity: mockHandlerSelectedCity,
      activeDropdown: true,
      error: null,
    };

    (useSearch as jest.Mock).mockReturnValue(mockUseSearch);

    render(<SearchLocation {...defaultProps} />);

    fireEvent.click(screen.getByText("New York"));
    expect(mockHandlerSelectedCity).toHaveBeenCalledWith(mockCities[0]);
  });

  it("displays error message when error exists and no cities found", () => {
    const mockUseSearch = {
      handleInputChange: jest.fn(),
      query: "invalidCity",
      cities: [],
      handlerSelectedCity: jest.fn(),
      activeDropdown: false,
      error: "City not found",
    };

    (useSearch as jest.Mock).mockReturnValue(mockUseSearch);

    render(<SearchLocation {...defaultProps} />);

    expect(screen.getByText("City not found")).toBeInTheDocument();
  });

  it("handles input change", () => {
    const mockHandleInputChange = jest.fn();
    const mockUseSearch = {
      handleInputChange: mockHandleInputChange,
      query: "new",
      cities: mockCities,
      handlerSelectedCity: jest.fn(),
      activeDropdown: true,
      error: null,
    };

    (useSearch as jest.Mock).mockReturnValue(mockUseSearch);

    render(<SearchLocation {...defaultProps} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "paris" } });
    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  it("applies correct dropdown classes based on activeDropdown state", () => {
    const mockUseSearch = {
      handleInputChange: jest.fn(),
      query: "new",
      cities: mockCities,
      handlerSelectedCity: jest.fn(),
      activeDropdown: true,
      error: null,
    };

    (useSearch as jest.Mock).mockReturnValue(mockUseSearch);

    const { container } = render(<SearchLocation {...defaultProps} />);

    const dropdown = container.querySelector(".dropdown");
    expect(dropdown).toHaveClass("active_expanded");
    expect(dropdown).toHaveClass("visible");
  });
});
