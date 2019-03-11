import * as React from 'react';
import Dropzone from 'react-dropzone';
import Icon from 'components/Icon';
import Link from 'components/Link';
import * as styles from './styles';
import { Diff } from 'utility-types';

interface FileLoaderProps {
  /**
   * Handler for the onChange event on the input.
   */
  onChange: (files: File[]) => void;
  /**
   * File values
   */
  value?: File[];
  /**
   * Marks that this input is required for form submission.
   */
  required?: boolean;
  /**
   * Marks that the user cannot change this input.
   */
  disabled?: boolean;
  /**
   * Should this component be in an error state?
   */
  error?: boolean;
  /**
   * Adds a class name to the input element.
   */
  className?: string;
  /**
   * Adds an id to the input element.
   */
  id?: string;
  /**
   * Adds a name to the input element.
   */
  name?: string;
  /**
   * A component to render the drop area
   */
  DropArea?: any;
  /**
   * A component to render the preview container
   */
  Preview?: any;
}

/**
 * A file input component which accepts drag-and-drop.
 */
export default class FileLoader extends React.Component<
  FileLoaderProps & Diff<React.HTMLAttributes<HTMLDivElement>, FileLoaderProps>
> {
  static defaultProps = {
    required: false,
    disabled: false,
    className: null,
    id: null,
    DropArea: styles.DropArea,
    Preview: styles.Preview,
  };

  static styles = styles;

  preventLinkClick = ev => {
    ev.preventDefault();
  };

  renderFiles = () => {
    const { value, error, disabled, DropArea, Preview } = this.props;
    if (value && value[0]) {
      return (
        <DropArea disabled={disabled}>
          <Icon name="fileFilled" />
          <Preview active={true}>{value[0].name}</Preview>
        </DropArea>
      );
    } else {
      return (
        <DropArea error={error} disabled={disabled}>
          <Icon name="file" />
          <Preview>
            DROP A FILE HERE, OR&nbsp;
            <Link disabled={disabled} onClick={this.preventLinkClick}>
              CLICK TO BROWSE
            </Link>
          </Preview>
        </DropArea>
      );
    }
  };

  render() {
    const {
      onChange,
      value,
      required,
      disabled,
      className,
      id,
      DropArea,
      Preview,
      ...rest
    } = this.props;

    return (
      <Dropzone
        multiple={false}
        onDrop={(files => onChange(files)) as any}
        style={{ width: '100%' }}
        activeStyle={{ color: '#00bcec' }}
        rejectStyle={{}}
        value={value as any}
        required={required}
        disabled={disabled}
        className={className}
        id={id}
        {...rest}
      >
        {this.renderFiles()}
      </Dropzone>
    );
  }
}
