import * as React from "react";
import { IGlobalState } from "../../coreTypes";
import { connect } from "react-redux";
import { createIconSetFromFontello } from "@expo/vector-icons";
import { IconProps, IconComponentProps } from "./";

const fontelloConfig = require("../../../assets/fonts/icon-font/config.json");
const mapStateToProps = (state: IGlobalState, ownProps: IconProps) => ({
  ...ownProps,
  isFontLoaded: state.FontState.isFontLoaded
});

export const Component = (props: IconComponentProps) => {
  const Icon = createIconSetFromFontello(fontelloConfig, "brackit-font");
  const { isFontLoaded, size = 24, name, color = "white" } = props;

  return isFontLoaded && name ? (
    <Icon name={name} size={size} color={color} style={props.style || {}} />
  ) : null;
};

export const Icon = connect(mapStateToProps)(Component);
