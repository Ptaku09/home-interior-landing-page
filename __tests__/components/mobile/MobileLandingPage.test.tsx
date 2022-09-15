import '@testing-library/jest-dom';
import { render } from '../../test-utils';
import MobileLandingPage from '../../../components/mobile/MobileLandingPage';

describe('Mobile landing page component', () => {
  it('should render', () => {
    const tree = render(<MobileLandingPage />);

    expect(tree).toMatchSnapshot();
  });
});
