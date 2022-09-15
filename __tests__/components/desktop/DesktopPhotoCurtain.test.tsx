import '@testing-library/jest-dom';
import { render } from '../../test-utils';
import DesktopPhotoCurtain from '../../../components/desktop/DesktopPhotoCurtain';

describe('Desktop photo curtain component', () => {
  it('should render', () => {
    const tree = render(<DesktopPhotoCurtain />);

    expect(tree).toMatchSnapshot();
  });
});
