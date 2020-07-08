import React from 'react';
import { render } from '@testing-library/react';
import Pyckup from './Pyckup';

test('renders learn react link', () => {
  const { getByText } = render(<Pyckup />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
