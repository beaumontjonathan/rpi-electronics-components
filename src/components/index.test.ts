import * as components from '.';

describe('components', () => {
  it('should match snapshot', () => {
    expect(components).toMatchSnapshot();
  });
});
