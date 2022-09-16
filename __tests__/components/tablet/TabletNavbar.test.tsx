import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import TabletNavbar from '../../../components/tablet/TabletNavbar';

describe('Tablet navbar component', () => {
  it('should render', () => {
    render(<TabletNavbar />);

    expect(screen.getByText(/kitchen/i).closest('a')).toHaveAttribute('href', '#kitchen');
  });
});
