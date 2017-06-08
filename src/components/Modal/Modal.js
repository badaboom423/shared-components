import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Blocker = styled.div`
  background: ${({ theme }) => theme.modal.blockerBG};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 100000;
`;

const Content = styled.div`
  background: ${({ theme }) => theme.modal.bg};
  width: ${({ naturalWidth }) => naturalWidth};
  max-width: ${({ theme }) => theme.modal.maxWidth};
  min-width: ${({ theme }) => theme.modal.minWidth};
  height: ${({ theme }) => theme.modal.naturalHeight};
  min-height: ${({ theme }) => theme.modal.minHeight};
  max-height: ${({ theme }) => theme.modal.maxHeight};
  margin: 180px auto auto auto;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.modal.borderRadius};
  box-shadow: ${({ theme }) => theme.modal.shadow};
`;

const Title = styled.h3`
  display: block;
  margin: 0;
  background: ${({ theme }) => theme.modal.titleBG};
  color: ${({ theme }) => theme.modal.titleFG};
  padding: .95em 1em .95em 1.5em;
  font-family: ${({ theme }) => theme.modal.titleFontFamily};
  font-size: ${({ theme }) => theme.modal.titleFontSize};
  font-weight: ${({ theme }) => theme.modal.titleFontWeight};
  text-transform: ${({ theme }) => theme.modal.titleTextTransform};
`;

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    onBlockerClicked: PropTypes.func,
    naturalWidth: PropTypes.string,
  };

  static defaultProps = {
    title: null,
    naturalWidth: 'auto',
    onBlockerClicked: () => null,
  };

  handleModalClicked = (event) => {
    // prevents click event bubbling to blocker and triggering blockerclicked callback
    event.stopPropagation();
  };

  render() {
    return (
      <Blocker onClick={this.props.onBlockerClicked}>
        <Content naturalWidth={this.props.naturalWidth} onClick={this.handleModalClicked}>
          {this.props.title ? <Title>{this.props.title}</Title> : null}
          {this.props.children}
        </Content>
      </Blocker>
    );
  }
}

Modal.usage = `
# Modal

Unlike traditional modal dialogs, Modal doesn't include functionality for closing or opening. It's recommended that you render Modal as a route in your React application with React Router.

Provides \`title\` prop for adding a title, and \`onBlockerClicked\` if you want to hook the click event on the shadow 'blocker' element which covers the page.

\`\`\`
<Route exact path="/modal">
  <Modal>Content <Link to="/">Close</Link></Modal>
</Route>
\`\`\`
`;

export default Modal;