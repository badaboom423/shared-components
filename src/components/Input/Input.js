import React from 'react';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';
import styled, { css } from 'styled-components';
import Anchor from '../Anchor';
import InputStyles from './styles/InputStyles';
import InputRevealPasswordWrapper from './styles/InputRevealPasswordWrapper';

class Input extends React.Component {
  static propTypes = {
    /**
     * The value of the input.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Handler for the onchange event.
     */
    onChange: PropTypes.func,
    /**
     * Handler for the onblur event.
     */
    onBlur: PropTypes.func,
    /**
     * Handler for the onfocus event.
     */
    onFocus: PropTypes.func,
    /**
     * Handler for the onkeydown event.
     */
    onKeyDown: PropTypes.func,
    /**
     * Controls whether the user can change this element.
     */
    disabled: PropTypes.bool,
    /**
     * Controls whether the element is marked as required for form submission.
     */
    required: PropTypes.bool,
    /**
     * Adds an id to the element.
     */
    id: PropTypes.string,
    /**
     * Adds a class name to the element.
     */
    className: PropTypes.string,
    /**
     * Sets the type of data expected for this input.
     */
    type: PropTypes.oneOf([
      'search',
      'email',
      'url',
      'tel',
      'number',
      'range',
      'date',
      'month',
      'week',
      'time',
      'datetime',
      'datetime-local',
      'color',
      'password',
      'text',
    ]),
    /**
     * Styles this input as being invalid
     */
    invalid: PropTypes.bool,
    /**
     * Styles this input as having an error related to it
     */
    error: PropTypes.bool,
    /**
     * Placeholder text to display when the input is blank
     */
    placeholder: PropTypes.string,
    /**
     * Disables the ability to show a password
     */
    disableShowPassword: PropTypes.bool,
    /**
     * Provides a reference to the input element
     */
    inputRef: PropTypes.func,
    /**
     * A component that renders the internal input element
     */
    Styles: PropTypes.func,
    /**
     * A component that wraps the whole element and helps control spacing
     * when reveal password is enabled
     */
    RevealPasswordWrapper: PropTypes.func,
    /**
     * A string that is displayed inside input element
     */
    inlineText: PropTypes.string,
    /**
     * A function that is called when the inlineText is clicked
     */
    onInlineTextClicked: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    required: false,
    id: null,
    type: 'text',
    onChange: () => null,
    onBlur: () => null,
    onFocus: () => null,
    onKeyDown: () => null,
    className: null,
    invalid: false,
    error: false,
    placeholder: '',
    disableShowPassword: false,
    Styles: InputStyles,
    RevealPasswordWrapper: InputRevealPasswordWrapper,
    inlineText: null,
    onInlineTextClicked: null,
  };

  componentDidMount() {
    this.setState({
      _type: this.props.type,
    });
  }

  constructor(props) {
    super(props);
    this.state = { visited: false };
  }

  onBlur = event => {
    console.log(event);
    this.setState({ visited: true });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  renderPasswordField = () => {
    const { RevealPasswordWrapper } = this.props;
    const toggleState = () =>
      this.state._type === 'password' ? 'text' : 'password';
    const handleClick = evt => {
      evt.preventDefault();
      this.setState({
        _type: toggleState(this.state._type),
      });
    };

    return (
      <RevealPasswordWrapper>
        {this.renderInputField()}
        <div>
          <Anchor href="" onClick={handleClick}>
            {this.state._type === 'password' ? 'Show' : 'Hide'}
          </Anchor>
        </div>
      </RevealPasswordWrapper>
    );
  };

  renderInlineTextInputField = () => {
    const { RevealPasswordWrapper } = this.props;
    return (
      <RevealPasswordWrapper>
        {this.renderInputField()}
        <div>
          <Anchor href="" onClick={this.props.onInlineTextClicked}>
            {this.props.inlineText}
          </Anchor>
        </div>
      </RevealPasswordWrapper>
    );
  };

  renderInputField = () => {
    const {
      disabled,
      id,
      className,
      invalid,
      onFocus,
      onChange,
      onKeyDown,
      value,
      required,
      error,
      placeholder,
      inputRef,
      onBlur,
      Styles,
      inlineText,
      onInlineTextClicked,
    } = this.props;

    const { visited, _type: type } = this.state;

    return (
      <Styles
        onBlur={this.onBlur}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        visited={visited}
        id={id}
        className={className}
        invalid={invalid}
        onChange={onChange}
        value={value}
        required={required}
        type={type}
        error={error}
        disabled={disabled}
        placeholder={placeholder}
        innerRef={inputRef}
        onBlur={onBlur}
        inlineText={inlineText}
        onInlineTextClicked={onInlineTextClicked}
      />
    );
  };

  render() {
    const { type, disableShowPassword, inlineText } = this.props;

    if (type === 'password' && !disableShowPassword) {
      return this.renderPasswordField();
    }

    if (inlineText) {
      return this.renderInlineTextInputField();
    }

    return this.renderInputField();
  }
}

Input.Small = withProps({
  Styles: InputStyles.Small,
})(Input);

export default Input;
