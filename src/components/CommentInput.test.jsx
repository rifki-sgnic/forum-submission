/**
 * test scenario for CommentInput
 *
 * - CommentInput function
 *  - should handle comment typing correctly
 *  - should call onAddComment function when comment button is clicked
 *  - should be disabled when authUser is null
 *  - should display avatar with first letter of authUser name
 */

import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommentInput from './CommentInput';

expect.extend(matchers);

describe('CommentInput', () => {
  afterEach(() => {
    cleanup();
  });

  const mockAuthUser = {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  };

  it('should handle comment typing correctly', async () => {
    render(<CommentInput onAddComment={() => {}} authUser={mockAuthUser} isLoading={false} />);
    const commentInput = screen.getByPlaceholderText(/What are your thoughts?/i);

    await userEvent.type(commentInput, 'test comment');

    expect(commentInput).toHaveValue('test comment');
  });

  it('should call onAddComment function when comment button is clicked', async () => {
    const onAddComment = vi.fn();
    render(<CommentInput onAddComment={onAddComment} authUser={mockAuthUser} isLoading={false} />);
    const commentInput = screen.getByPlaceholderText(/What are your thoughts?/i);
    await userEvent.type(commentInput, 'test comment');
    const commentButton = screen.getByRole('button', { name: /comment/i });

    await userEvent.click(commentButton);

    expect(onAddComment).toHaveBeenCalledWith('test comment');
    expect(commentInput).toHaveValue('');
  });

  it('should be disabled when authUser is null', async () => {
    render(<CommentInput onAddComment={() => {}} authUser={null} isLoading={false} />);
    const commentInput = screen.getByPlaceholderText(/Login to comment.../i);
    const commentButton = screen.getByRole('button', { name: /comment/i });

    expect(commentInput).toBeDisabled();
    expect(commentButton).toBeDisabled();
  });

  it('should display avatar with first letter of authUser name', async () => {
    render(<CommentInput onAddComment={() => {}} authUser={mockAuthUser} isLoading={false} />);
    const avatar = screen.getByText('J');

    expect(avatar).toBeInTheDocument();
  });
});
