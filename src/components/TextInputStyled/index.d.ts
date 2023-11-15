import { TextInputProps } from "react-native";
import { FormikProps } from "formik";

export interface TextInputStyledProps extends TextInputProps {
  iconName?: string;
  name: string;
  label?: string;
  formProps: FormikProps<any>;
  secure?: boolean;
  handleIconClick?: Function;
  type?: string;
  borderTop?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  inputStyle?: any;  
  iconColor?: string;
  iconNameClick?: string;
  iconSize?: number;
}
