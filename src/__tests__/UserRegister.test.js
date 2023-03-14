import { render, screen, fireEvent } from '@testing-library/react';
import UserRegister from '../views/UserRegister';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('UserRegistration component', () => {
	const emailLabelRE = /Email/ ;
	const passwordLabelRE = /Password \(min/ ;
	const passwordConfirmLabelRE = /Confirm Password/ ;
	const submitButtonTextRE = /Register/ ;
	const validEmail = 'valid@test.com' ;
	const invalidEmail = 'invalid_email' ;
	const validPassword = 'Password1234567890' ;
	const invalidPassword = '2Short' ;

	// --- Fields are present ---
	it('renders the email field', () => {
		render(<UserRegister />);
		screen.getByLabelText(emailLabelRE) ;
	});
	it('renders the password field', () => {
		render(<UserRegister />);
		screen.getByLabelText(passwordLabelRE) ;
	});
	it('renders the confirm-password field', () => {
		render(<UserRegister />);
		screen.getByLabelText(passwordConfirmLabelRE) ;
	});

	// --- Submit button disabled when required fields empty or values are invalid ---
	it('initially has disabled submit button', () => {
		render(<UserRegister />);
		const submitButton = screen.getByText(submitButtonTextRE)
		expect(submitButton.disabled).toBe(true) ;
	});
	it('has disabled submit button with password and password-confirm empty', () => {
		render(<UserRegister />);
		const emailEl = screen.getByLabelText(emailLabelRE) ;
		fireEvent.change(emailEl, { target: { value: validEmail } })
		
		const submitButton = screen.getByText(submitButtonTextRE)
		expect(submitButton.disabled).toBe(true) ;
	});
	it('has disabled submit button with password-confirm empty', () => {
		render(<UserRegister />);
		const emailEl = screen.getByLabelText(emailLabelRE) ;
		fireEvent.change(emailEl, { target: { value: validEmail } })
		const passwordEl = screen.getByLabelText(passwordConfirmLabelRE) ;
		fireEvent.change(passwordEl, { target: { value: validPassword } })
		
		const submitButton = screen.getByText(submitButtonTextRE)
		expect(submitButton.disabled).toBe(true) ;
	});

	it('has disabled submit button if invalid email', () => {
		render(<UserRegister />);
		const emailEl = screen.getByLabelText(emailLabelRE) ;
		fireEvent.change(emailEl, { target: { value: invalidEmail } })
		const passwordEl = screen.getByLabelText(passwordLabelRE) ;
		fireEvent.change(passwordEl, { target: { value: validPassword } })
		const passwordConfirmEl = screen.getByLabelText(passwordConfirmLabelRE) ;
		fireEvent.change(passwordConfirmEl, { target: { value: validPassword } })
		
		const submitButton = screen.getByText('Register')
		expect(submitButton.disabled).toBe(true) ;
	});

	it('has disabled submit button if invalid password', () => {
		render(<UserRegister />);
		const emailEl = screen.getByLabelText(emailLabelRE) ;
		fireEvent.change(emailEl, { target: { value: validEmail } })
		const passwordEl = screen.getByLabelText(passwordLabelRE) ;
		fireEvent.change(passwordEl, { target: { value: invalidPassword } })
		const passwordConfirmEl = screen.getByLabelText(passwordConfirmLabelRE) ;
		fireEvent.change(passwordConfirmEl, { target: { value: invalidPassword } })
		
		const submitButton = screen.getByText('Register')
		expect(submitButton.disabled).toBe(true) ;
	});
	it('has disabled submit button if non-matching password-confirm', () => {
		render(<UserRegister />);
		const emailEl = screen.getByLabelText(emailLabelRE) ;
		fireEvent.change(emailEl, { target: { value: validEmail } })
		const passwordEl = screen.getByLabelText(passwordLabelRE) ;
		fireEvent.change(passwordEl, { target: { value: validPassword } })
		const passwordConfirmEl = screen.getByLabelText(passwordConfirmLabelRE) ;
		fireEvent.change(passwordConfirmEl, { target: { value: validPassword + 'x'} })
		
		const submitButton = screen.getByText('Register')
		expect(submitButton.disabled).toBe(true) ;
	});

	// --- Submit button enabled when all fields are valid ---
	it('has enabled submit button with a valid email, password, and matching password-confirm field filled in', () => {
		render(<UserRegister />);
		const emailEl = screen.getByLabelText(emailLabelRE) ;
		fireEvent.change(emailEl, { target: { value: validEmail } })
		const passwordEl = screen.getByLabelText(passwordLabelRE) ;
		fireEvent.change(passwordEl, { target: { value: validPassword } })
		const passwordConfirmEl = screen.getByLabelText(passwordConfirmLabelRE) ;
		fireEvent.change(passwordConfirmEl, { target: { value: validPassword } })
		
		const submitButton = screen.getByText('Register')
		expect(submitButton.disabled).toBe(false) ;
	});

}) ;