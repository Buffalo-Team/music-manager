import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
    render(<App />);
    const linkElement = screen.getByText(/Music Manager App/i);
    expect(linkElement).toBeInTheDocument();
});
