import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import MobileNavbar from '../../../components/mobile/MobileNavbar';

describe('Mobile navbar component', () => {
  it('should render', () => {
    render(<MobileNavbar />);

    expect(screen.getByAltText(/github icon/i).closest('a')).toHaveAttribute('href', 'https://github.com/Ptaku09');
  });
});
