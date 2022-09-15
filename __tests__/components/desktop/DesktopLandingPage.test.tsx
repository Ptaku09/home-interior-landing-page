import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import DesktopLandingPage from '../../../components/desktop/DesktopLandingPage';

describe('Desktop landing page component', () => {
  it('should render', () => {
    render(<DesktopLandingPage />);

    const texts = screen.getAllByText(/living room/i);
    expect(texts.length).toBe(2);
  });

  it('renders navbar', () => {
    render(<DesktopLandingPage />);

    expect(screen.getAllByText(/kitchen/i)[0].closest('button')).toHaveClass('nav-button');
    expect(screen.getByText(/find your style/i)).toBeInTheDocument();
  });
});
