export type Color =
  | "black"
  | "white"
  | "primary50"
  | "primary500"
  | "primary900"
  | "success50"
  | "success500"
  | "success900"
  | "error50"
  | "error500"
  | "error900"
  | "grey50"
  | "grey200"
  | "grey500"
  | "grey900";

export type Icon = "add" | "edit" | "accept" | "cancel" | "delete";

export type Task = {
  id: number;
  title: string;
  notes: string;
  isChecked: boolean;
};
