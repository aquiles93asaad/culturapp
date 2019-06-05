import React from 'react';
import { LinearGradient } from 'expo';
import { Button, Text } from 'react-native';

export class GradientButton extends React.Component {
  componentName = 'GradientButton';
  typeMapping = {
    button: {},
    gradient: {},
    text: {},
  };

  renderContent = (textStyle) => {
    const hasText = this.props.text === undefined;
    return hasText ? this.props.children : this.renderText(textStyle);
  };

  renderText = (textStyle) => (
    <Text style={textStyle}>{this.props.text}</Text>
  );

  render() {
    const { button, gradient, text: textStyle } = this.defineStyles();
    const { style, rkType, ...restProps } = this.props;
    const colors = this.props.colors || this.extractNonStyleValue(gradient, 'colors');
    return (
      <Button
        {...restProps}>
        <LinearGradient
          colors={colors}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[gradient]}>
          {this.renderContent(textStyle)}
        </LinearGradient>
      </Button>
    );
  }
}
