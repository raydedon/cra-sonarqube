import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  test('renders the newly added task', async () => {
    // ARRANGE
    render(<App />);

    //ACT
    const input = screen.getByRole('textbox', {name: /task/i});
    const btn = screen.getByRole('button', {name: 'Add Task'});
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'test1' } });
    fireEvent.click(btn);

    // ASSERT
    expect(screen.getByText('test1')).toBeInTheDocument();
  });

  test('renders the newly added task with deadline', async () => {
    // ARRANGE
    render(<App />);

    //ACT
    const taskInput = screen.getByRole('textbox', {name: 'task'});
    const deadlineInput = screen.getByRole('spinbutton');
    const btn = screen.getByRole('button', {name: 'Add Task'});
    fireEvent.click(taskInput);
    fireEvent.change(taskInput, { target: { value: 'test1' } });
    fireEvent.click(deadlineInput);
    fireEvent.change(deadlineInput, { target: { value: '50' } });
    fireEvent.click(btn);

    // ASSERT
    expect(screen.getByText('test1')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  test('removes the newly completed task form tasks list', async () => {
    // ARRANGE
    render(<App />);

    //ACT
    const taskInput = screen.getByRole('textbox', {name: 'task'});
    const deadlineInput = screen.getByRole('spinbutton');
    const btn = screen.getByRole('button', {name: 'Add Task'});
    fireEvent.click(taskInput);
    fireEvent.change(taskInput, { target: { value: 'test1' } });
    fireEvent.click(deadlineInput);
    fireEvent.change(deadlineInput, { target: { value: '50' } });
    fireEvent.click(btn);
    const removeTaskBtn = screen.getByRole('button', {name: 'X'});
    fireEvent.click(removeTaskBtn);


    // ASSERT
    expect(screen.queryByText('test1')).toBeNull();
    expect(screen.queryByText('50')).toBeNull();
  });
});