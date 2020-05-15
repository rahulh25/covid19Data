import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders lglobal data header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/GLOBAL DATA/);
  expect(linkElement).toBeInTheDocument();
});
