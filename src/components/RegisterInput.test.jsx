import React from 'react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

import RegisterInput from './RegisterInput';

expect.extend(matchers);

/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Nama');

    // Action
    await userEvent.type(nameInput, 'nameTest');

    // Assert
    expect(nameInput).toHaveValue('nameTest');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'emailTest');

    // Assert
    expect(emailInput).toHaveValue('emailTest');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call onRegister function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<RegisterInput onRegister={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Nama');
    await userEvent.type(nameInput, 'nametest');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailtest');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Daftar' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'nametest',
      email: 'emailtest',
      password: 'passwordtest',
    });
  });
});
