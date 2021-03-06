import styled from 'styled-components';
import get from 'extensions/themeGet';
import userSpacing from 'extensions/userSpacing';

const AccordionLabel = styled.div`
  padding: ${userSpacing.text};
  color: ${get('colors.primary.default')};
  font-family: ${get('fonts.brand')};
  font-size: 1.5em;
  line-height: 1.5;
  text-transform: none;
  font-weight: 400;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  display: flex;
  flex-direction: row;
  user-select: none;
`;

AccordionLabel.Small = styled(AccordionLabel)`
  color: ${get('colors.text.default')};
  font-weight: 600;
  font-size: 1em;
  text-transform: uppercase;
`;

export default AccordionLabel;
