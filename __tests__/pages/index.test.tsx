import '@testing-library/jest-dom';
import { render } from '../test-utils';
import Home from '../../pages/index';

describe('Home page', () => {
  it('should render', async () => {
    render(<Home />);
  });
});
