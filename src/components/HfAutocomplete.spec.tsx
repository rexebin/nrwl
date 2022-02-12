import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";

import { HfAutocompleteProps } from "./HfAutocompleteProps";
import { FormForTesting } from "../testing/FormForTesting";
import { HfAutoComplete } from "./HfAutoComplete";

const onSubmit = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

type Model = { test: string };

function TestComponent(
  props: Omit<
    HfAutocompleteProps,
    "name" | "label" | "options" | "formContext" | "getOptionLabel"
  >
) {
  const formContext = useForm<Model>();
  const {
    formState: { errors },
  } = formContext;
  const submit = (data: Model) => {
    onSubmit(data);
  };
  return (
    <FormForTesting formContext={formContext} submit={submit}>
      <HfAutoComplete
        name="test"
        label="Test"
        placeholder="Test"
        options={["1", "2", "3"]}
        formContext={formContext}
        getOptionLabel={(option: string) => option}
        error={!!errors}
        helperText={errors?.test?.message}
        {...props}
      />
      <button type={"submit"}>Submit</button>
    </FormForTesting>
  );
}

describe("Behaviours", function () {
  it("should bind to form context", async function () {
    const { getByLabelText, findByText, getByText } = render(<TestComponent />);
    getByLabelText("Test");
    const openButton = getByLabelText("Open");
    userEvent.click(openButton);
    const option1 = await findByText("1");
    userEvent.click(option1);

    expect(getByLabelText("Test")).toHaveValue("1");

    const submit = getByText("Submit");
    userEvent.click(submit);

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ test: "1" }));
  });

  it("should set default value", async function () {
    const { getByLabelText, getByText } = render(
      <TestComponent defaultValue={"1"} />
    );
    getByLabelText("Test");

    const submit = getByText("Submit");
    userEvent.click(submit);

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ test: "1" }));
  });

  it("should apply text field configurations", function () {
    const { getByLabelText } = render(
      <TestComponent textFieldProps={{ style: { color: "black" } }} />
    );
    const input = getByLabelText("Test", { selector: "input" });

    expect(input.closest('div[style="color: black;"]')).toBeInTheDocument();
  });
});

describe("Validations", function () {
  it("should validate required rule", async function () {
    const { getByLabelText, findByText, getByText, debug } = render(
      <TestComponent required />
    );
    getByLabelText(/Test/);
    getByLabelText(/\*/);
    userEvent.click(getByLabelText("Open"));
    userEvent.click(getByText("Submit"));

    expect(await findByText("Required")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
