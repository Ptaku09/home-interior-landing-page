import '@testing-library/jest-dom';
import { render } from '../../test-utils';
import DesktopRoomSection, { SectionHighlightedTextColor } from '../../../components/desktop/DesktopRoomSection';
import { SectionOnScreen } from '../../../providers/SectionOnScreenProvider';

describe('Desktop room section component', () => {
  it('should render', () => {
    const { getByText } = render(
      <DesktopRoomSection
        number="01"
        sectionName={SectionOnScreen.livingRoom}
        highlightedTextColor={SectionHighlightedTextColor.yellow}
        title="Design"
        imageUrl="/images/living-room.jpg"
        blurImageUrl="/images/living-room-blur.jpg"
      >
        <>desktop room section test</>
      </DesktopRoomSection>
    );

    expect(getByText(/01/i)).toBeInTheDocument();
    expect(getByText(/design/i)).toBeInTheDocument();
    expect(getByText(SectionOnScreen.livingRoom.toUpperCase())).toBeInTheDocument();
    expect(getByText(/desktop room section test/i)).toBeInTheDocument();
  });
});
