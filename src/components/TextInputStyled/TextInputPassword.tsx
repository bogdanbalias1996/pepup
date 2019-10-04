import * as React from "react";
import { TextInputStyledProps } from "./index";
import { TextInputStyled } from "./TextInputStyled";

export class TextInputPassword extends React.PureComponent<
  TextInputStyledProps
> {
  state = {
    isTextVisible: false
  };

  toggle = () => {
    this.setState({
      isTextVisible: !this.state.isTextVisible
    });
  };

  render() {
    return (
      <TextInputStyled
        handleIconClick={() => this.toggle()}
        {...this.props}
        iconName={this.state.isTextVisible ? "show" : "hide"}
        secure={!this.state.isTextVisible}
        autoCorrect={false}
      />
    );
  }
}
