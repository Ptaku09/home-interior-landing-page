import '@testing-library/jest-dom';
import { render } from '../../test-utils';
import DesktopNavbar from '../../../components/desktop/DesktopNavbar';

describe('Desktop navbar component', () => {
  it('should render', () => {
    const { getByText } = render(<DesktopNavbar />);

    expect(getByText(/find your style/i)).toBeInTheDocument();
    expect(getByText(/living room/i)).toBeInTheDocument();
    expect(getByText(/dining room/i)).toBeInTheDocument();
    expect(getByText(/kitchen/i)).toBeInTheDocument();
    expect(getByText(/bedroom/i)).toBeInTheDocument();
    expect(getByText(/bathroom/i)).toBeInTheDocument();
  });
});
