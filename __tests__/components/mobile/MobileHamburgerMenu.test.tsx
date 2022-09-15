import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import MobileHamburgerMenu from '../../../components/mobile/MobileHamburgerMenu';

describe('Mobile hamburger menu component', () => {
  it('should render hamburger', () => {
    render(<MobileHamburgerMenu />);

    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'hamburger-menu');
  });

  it('should render menu', () => {
    render(<MobileHamburgerMenu />);

    expect(screen.getByText(/living room/i)).toHaveAttribute('href', '#living-room');
  });
});
