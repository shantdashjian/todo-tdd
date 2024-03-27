import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the UI', () => {
    // Arrange
    render(<App />);
    
    // Act

    // Assert
    screen.getByText('New Item')
    screen.getByRole('textbox')
    screen.getByText('Add')
    screen.getByText('Todo List')
  });

  it('adds a todo item', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<App />);
    const textbox = screen.getByRole('textbox')
    const addBtn = screen.getByText('Add')
    // Act
    await user.type(textbox, 'Prepare for my next interview')
    await user.click(addBtn)
    // Assert
    expect(textbox.value).toBe('')
    screen.getByText('Prepare for my next interview')
  })

  it('completes a todo item', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<App />);
    const textbox = screen.getByRole('textbox')
    const addBtn = screen.getByText('Add')
    // Act
    await user.type(textbox, 'Prepare for my next interview')
    await user.click(addBtn)
    const todo = screen.getByText('Prepare for my next interview')
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    // Assert
    expect(checkbox.checked).toBeTruthy()
    expect(todo.className).toBe('completed')
  })

  it('deletes a todo item', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<App />);
    const textbox = screen.getByRole('textbox')
    const addBtn = screen.getByText('Add')
    // Act
    await user.type(textbox, 'Prepare for my next interview')
    await user.click(addBtn)
    const deleteBtn = screen.getByText('X')
    await user.click(deleteBtn)
    const todo = screen.queryByText('Prepare for my next interview')

    // Assert
    expect(todo).toBeNull()
  })
});