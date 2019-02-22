import React from 'react';
import 'react-dates/initialize';
import {
  SingleDatePicker as LibDatePicker,
  SingleDatePickerShape,
} from 'react-dates';
import Icon from '../Icon';
import * as styles from './styles';

import moment from 'moment';
moment.updateLocale('en', {
  weekdaysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
});

interface DatePickerProps {
  id: string;
  /**
   * A component to wrap and control styles of the underlying react-dates DatePicker
   */
  Wrapper?: any;
  /**
   * Format to pass to moment to control the input's value
   */
  displayFormat?: string;
  /**
   * Set to true if the component's value is invalid
   */
  invalid?: boolean;
  /**
   * Set to true if the component should be disabled.
   */
  disabled?: boolean;
  /**
   * Direction for the input to open.
   */
  openDirection?: 'up' | 'down';
}

/**
 * This is a styling wrapper around [react-dates](https://github.com/airbnb/react-dates).
 * Please see [here](https://github.com/airbnb/react-dates#singledatepicker) for prop types.
 *
 * The picker can be controlled by setting the props `date` and `onDateChange`.
 * `date` should be set to a moment object of the currently selected date,
 * while `onDateChange` should be a function that handles the date when it
 * changes.
 */
class DatePicker extends React.PureComponent<
  DatePickerProps & SingleDatePickerShape
> {
  static defaultProps = {
    Wrapper: styles.Wrapper,
    displayFormat: 'MMM DD YYYY',
    invalid: false,
    disabled: false,
  };

  static styles = styles;

  state = {
    focused: false,
  };

  handleFocusChange = ({ focused }) => this.setState({ focused });

  render() {
    const { Wrapper, ...rest } = this.props;
    const { focused } = this.state;
    return (
      <Wrapper
        className={focused && 'focused'}
        openDirection={this.props.openDirection}
        invalid={this.props.invalid}
        disabled={this.props.disabled}
      >
        <LibDatePicker
          navPrev={<Icon name="back" />}
          navNext={<Icon name="forward" />}
          weekDayFormat="dd"
          daySize={35}
          horizontalMargin={0}
          numberOfMonths={1}
          hideKeyboardShortcutsPanel
          focused={focused}
          onFocusChange={this.handleFocusChange}
          {...rest}
        />
      </Wrapper>
    );
  }
}

export default DatePicker;
