import * as React from "react";
import { TextInputStyledProps } from "./index";
import { TextInputStyledForEdit } from "./TextInputStyledForEdit";
import { colorTextGrey } from "../../variables";

export class TextInputPasswordForEdit extends React.PureComponent<
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
      <TextInputStyledForEdit
      {...this.props}
        handleIconClick={() => this.toggle()}
        iconColor={colorTextGrey}
        iconSize={30}
        iconNameClick={this.state.isTextVisible ? "show" : "hide"}
        secure={!this.state.isTextVisible}
        autoCorrect={true}
      />
    );
  }
}
