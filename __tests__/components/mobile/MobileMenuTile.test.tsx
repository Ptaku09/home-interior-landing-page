import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import MobileMenuTile from '../../../components/mobile/MobileMenuTile';

describe('Mobile menu tile component', () => {
  it('should render', () => {
    render(<MobileMenuTile sectionName="test name" />);

    expect(screen.getByText('test name')).toHaveAttribute('href', '#test-name');
  });
});
