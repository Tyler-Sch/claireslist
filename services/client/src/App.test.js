import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
afterEach(cleanup)

test('renders without crashing', () => {
  const { getByText, container, getByLabelText } =  render(<App />);
  expect(getByText("Claire's List")).toBeInTheDocument();

});

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({initalEntries: [route] })
  } =  {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  }
}

test('full app rendering/navigation', () => {
  const { container, getByText } = renderWithRouter(<App />);
  expect(getByText('Here we are in Welcome')).toBeInTheDocument();

  fireEvent.click(getByText('create new list'))
  expect(getByText('Here we are. In create-new')).toBeInTheDocument();

})
