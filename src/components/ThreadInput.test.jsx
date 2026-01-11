/**
 * test scenario for ThreadInput
 *
 * - ThreadInput function
 *  - should handle title typing correctly
 *  - should handle category typing correctly
 *  - should handle content typing correctly
 *  - should call add thread function when post thread button is clicked
 *
 */

import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ThreadInput from './ThreadInput';

expect.extend(matchers);

describe('ThreadInput', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    render(<ThreadInput onAddThread={() => {}} />);
    const titleInput = screen.getByLabelText(/title/i);

    await userEvent.type(titleInput, 'test title');

    expect(titleInput).toHaveValue('test title');
  });

  it('should handle category typing correctly', async () => {
    render(<ThreadInput onAddThread={() => {}} />);
    const categoryInput = screen.getByLabelText(/category/i);

    await userEvent.type(categoryInput, 'test category');

    expect(categoryInput).toHaveValue('test category');
  });

  it('should handle content typing correctly', async () => {
    render(<ThreadInput onAddThread={() => {}} />);
    const bodyInput = screen.getByLabelText(/content/i);

    await userEvent.type(bodyInput, 'test content');

    expect(bodyInput).toHaveValue('test content');
  });

  it('should call add thread function when post thread button is clicked', async () => {
    const onAddThread = vi.fn();
    render(<ThreadInput onAddThread={onAddThread} />);
    const titleInput = screen.getByLabelText(/title/i);
    await userEvent.type(titleInput, 'test title');
    const categoryInput = screen.getByLabelText(/category/i);
    await userEvent.type(categoryInput, 'test category');
    const bodyInput = screen.getByLabelText(/content/i);
    await userEvent.type(bodyInput, 'test content');
    const addThreadButton = screen.getByRole('button', { name: 'Post Thread' });

    await userEvent.click(addThreadButton);

    expect(onAddThread).toHaveBeenCalledWith({
      title: 'test title',
      category: 'test category',
      body: 'test content',
    });
  });
});
