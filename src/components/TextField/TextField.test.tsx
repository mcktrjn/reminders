import { fireEvent, render } from "@testing-library/react";
import { TextField } from "../../components";

describe("TextField", () => {
  it("should display label and placeholder", () => {
    const { getByText, getByPlaceholderText } = render(
      <TextField
        label="Task"
        placeholder="Add task"
        value=""
        handleChange={() => {}}
        handleFocus={() => {}}
        handleBlur={() => {}}
      />
    );

    expect(getByText("Task")).toBeInTheDocument();
    expect(getByPlaceholderText("Add task")).toBeInTheDocument();
  });

  it("should handle focus", () => {
    const handleFocus = jest.fn();

    const { getByPlaceholderText } = render(
      <TextField
        label="Task"
        placeholder="Add task"
        value=""
        handleChange={() => {}}
        handleFocus={handleFocus}
        handleBlur={() => {}}
      />
    );

    const input = getByPlaceholderText("Add task");
    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalledWith(true);
  });

  it("should handle blur", () => {
    const handleBlur = jest.fn();

    const { getByPlaceholderText } = render(
      <TextField
        label="Task"
        placeholder="Add task"
        value=""
        handleChange={() => {}}
        handleFocus={() => {}}
        handleBlur={handleBlur}
      />
    );

    const input = getByPlaceholderText("Add task");
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalledWith(false);
  });
});
