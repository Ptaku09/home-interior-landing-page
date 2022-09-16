import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import TabletLandingPage from '../../../components/tablet/TabletLandingPage';

describe('Tablet landing page component', () => {
  it('should render', () => {
    render(<TabletLandingPage />);

    expect(screen.getByText(/living room/i)).toBeInTheDocument();
  });
});
