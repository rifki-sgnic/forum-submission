/**
 * test scenario for LoginInput
 *
 * - LoginInput function
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call login function when login button is clicked
 *
 */

import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput function', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(<LoginInput onLogin={() => {}} isLoading={false} />);
    const emailInput = screen.getByLabelText(/email/i);

    await userEvent.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput onLogin={() => {}} isLoading={false} />);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(passwordInput, 'password');

    expect(passwordInput).toHaveValue('password');
  });

  it('should call login function when login button is clicked', async () => {
    const onLogin = vi.fn();
    render(<LoginInput onLogin={onLogin} isLoading={false} />);
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'test@example.com');
    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.type(passwordInput, 'password');

    const loginButton = screen.getByRole('button', { name: 'Sign In' });

    await userEvent.click(loginButton);

    expect(onLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });
});
