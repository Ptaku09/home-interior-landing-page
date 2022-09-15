import '@testing-library/jest-dom';
import { render } from '../../test-utils';
import DesktopTextSide from '../../../components/desktop/DesktopTextSide';

describe('Desktop text side component', () => {
  it('should render', () => {
    const tree = render(<DesktopTextSide />);

    expect(tree).toMatchSnapshot();
  });
});
