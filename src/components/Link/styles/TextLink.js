import styled, { css } from 'styled-components';
import get from 'extensions/themeGet';
import icons from 'components/Icon/icons';
import Link from './RenderLinkImplementation';

const focusAfterStyles = css`
  height: calc(100% + 0.2em);
  width: calc(100% + 0.6em);
  left: -0.3em;
  opacity: 0.125;
  transition: height 0.15s ease, width 0.15s ease, left 0.15s ease,
    opacity 0s ease;
`;

const focusBeforeStyles = css`
  right: -1.5em;
  opacity: 1;
  transition: right 0.3s ease, opacity 0.2s ease 0.1s;
`;

const newTabIconStyles = css`
  &::before {
    content: "${icons('openInWindow')}";
    font-family: ${get('fonts.icon')};
    opacity: 0;
    background: transparent;
    position: absolute;
    right: 0;
    z-index: 1;
    transition: right 0.3s ease, opacity 0.2s ease;

    ${({ appearFocused }) => (appearFocused ? focusBeforeStyles : '')}
  }

  &:focus::before,
  &:hover::before {
    ${focusBeforeStyles}
  }
`;

const color = get('colors.primary.alternate');

const TextLink = styled(Link)`
  color: ${color};
  font-family: ${get('fonts.brand')};

  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
  height: auto;
  margin: auto;

  &:focus {
    outline: none;
  }

  &:active {
    color: ${get('colors.primary.default')};
  }

  &::after {
    content: '';
    background: ${color};
    border-radius: 2em;
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: -0.1em;
    left: 0;
    transition: height 0.15s ease, width 0.15s ease, left 0.15s ease,
      opacity 0.25s ease;

    ${({ appearFocused }) => (appearFocused ? focusAfterStyles : '')};
  }

  &:hover::after,
  &:focus::after {
    ${focusAfterStyles};
  }

  ${({ external }) => (external ? newTabIconStyles : '')};
`;

TextLink.Negative = styled(TextLink)`
  color: ${get('colors.negative.default')};

  &:active {
    color: ${get('colors.negative.dark')};
  }

  &::after {
    background: ${get('colors.negative.default')};
  }
`;

TextLink.Positive = styled(TextLink)`
  color: ${get('colors.positive.default')};

  &:active {
    color: ${get('colors.positive.dark')};
  }

  &::after {
    background: ${get('colors.positive.default')};
  }
`;

TextLink.Dark = styled(TextLink)`
  color: ${get('colors.primary.dark')};

  &:active {
    color: ${get('colors.primary.dark')};
  }

  &::after {
    background: ${get('colors.primary.dark')};
  }
`;

TextLink.Inverted = styled(TextLink)`
  color: ${get('colors.text.inverted')};

  &:active {
    color: ${get('colors.text.inverted')};
  }

  &::after {
    background: ${get('colors.text.inverted')};
  }
`;

export default TextLink;
