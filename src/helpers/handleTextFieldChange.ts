import { ChangeEvent } from "react";

export const handleTextFieldChange = <T>(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  state: T,
  setState: (state: T) => void,
  textField: keyof T
) => setState({ ...state, [textField]: event.target.value });
