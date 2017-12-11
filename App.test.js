import React from 'react';
import App3 from './App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App3 />).toJSON();
  expect(rendered).toBeTruthy();
});
