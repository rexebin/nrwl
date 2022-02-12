import { useForm } from 'react-hook-form';
import {HfTextField, HfTextFieldProps} from './HfTextField';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {FormForTesting} from "../testing/FormForTesting";

type Model = {
  inputField?: string | number;
};

const onSubmit = jest.fn();

function TextFieldWithFormContext(
  {
    initialValue,
    ...props
  }: Omit<HfTextFieldProps, 'formContext' | 'name'> & { initialValue?: Model }) {
  const formContext = useForm({
    defaultValues: initialValue
  });
  const {
    formState: { errors }
  } = formContext;

  const submit = (data: Model) => {
    onSubmit(data);
  };

  return (
    <>
      <div data-testid={'formErrors'}>{JSON.stringify(errors)}</div>
      <FormForTesting
        submit={submit}
        formContext={formContext}
      >
        <HfTextField
          label='Input Label'
          name={'inputField'}
          formContext={formContext}
          error={!!errors.inputField}
          helperText={errors.inputField?.message}
          {...props}
        />
        <button type='submit'>Submit</button>
      </FormForTesting>
    </>
  );
}

beforeEach(() => {
  onSubmit.mockClear();
});

describe('Default behaviours', function() {
  it('should have name as test id', function() {
    const { getByTestId } = render(<TextFieldWithFormContext />);
    expect(getByTestId(/inputField/i)).toBeInTheDocument();
  });

  it('should initial value', function() {
    const { getByLabelText } = render(
      <TextFieldWithFormContext initialValue={{ inputField: 'initial value' }} />
    );
    const input = getByLabelText(/input label/i);

    expect(input).toHaveValue('initial value');
  });

  it('should submit value', async function() {
    const { getByLabelText, getByText } = render(<TextFieldWithFormContext />);
    const input = getByLabelText(/input label/i);

    userEvent.type(input, 'test');

    userEvent.click(getByText(/submit/i));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ inputField: 'test' }));
  });
});

describe('Validations', function() {
  it('should show and hide required validation messages as appropriate', async function() {
    const { getByLabelText, getByText, queryByText, getByTestId, findByTestId } = render(
      <TextFieldWithFormContext required />
    );
    const input = getByLabelText(/\*/);

    userEvent.click(getByText(/submit/i));

    expect((await findByTestId('formErrors')).innerHTML).toMatchInlineSnapshot(
      `"{\\"inputField\\":{\\"type\\":\\"required\\",\\"message\\":\\"Required\\",\\"ref\\":{}}}"`
    );

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(onSubmit).not.toHaveBeenCalled();
    expect(getByText('Required')).toBeInTheDocument();

    userEvent.type(input, 'I am valid');
    userEvent.click(getByText(/submit/i));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ inputField: 'I am valid' }));
    expect(getByTestId('formErrors').innerHTML).toBe('{}');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(queryByText('Required')).toBeNull();
  });

  it('should enforce validation rules passed in as props', async function() {

    const emailRule = {
      pattern: {
        value:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Email is not valid',
      },
    };
    const { getByLabelText, getByTestId, queryByText, findByTestId, getByText } = render(
      <TextFieldWithFormContext rules={emailRule} />
    );
    const input = getByLabelText(/input label/i);
    userEvent.type(input, 'invalid email');
    userEvent.click(getByText('Submit'));

    expect((await findByTestId('formErrors')).innerHTML).toMatchInlineSnapshot(
      `"{\\"inputField\\":{\\"type\\":\\"pattern\\",\\"message\\":\\"Email is not valid\\",\\"ref\\":{}}}"`
    );

    const validationMessage = 'Email is not valid';

    expect(onSubmit).not.toHaveBeenCalled();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(getByText(validationMessage)).toBeInTheDocument();

    userEvent.clear(input);
    userEvent.type(input, 'valid@gmail.com');
    userEvent.click(getByText('Submit'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ inputField: 'valid@gmail.com' }));
    expect(getByTestId('formErrors').innerHTML).toBe('{}');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(queryByText(validationMessage)).toBeNull();
  });
});
