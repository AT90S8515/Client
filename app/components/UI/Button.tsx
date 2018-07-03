import * as React from 'react';

const styles = require('./Button.scss');

export interface IProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement> {
  disabled?: boolean;
}

class Button extends React.Component<IProps> {
  public render() {
    return (
      <div
        className={this.props.disabled ? styles.containerDisabled : styles.container}
        {...this.props}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Button;
