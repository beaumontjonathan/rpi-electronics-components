import * as rpiElectronicsComponents from '.';

describe('index', () => {
  it('should match snapshot', () => {
    expect(rpiElectronicsComponents).toMatchSnapshot();
  });
});
