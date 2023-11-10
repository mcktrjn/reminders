import { Color, Icon, Task } from "./types";

export const colors: Record<Color, string> = {
  black: "#000",
  white: "#fff",

  primary50: "#f0f7ff",
  primary500: "#007fff",
  primary900: "#003a75",

  success50: "#e9fbf0",
  success500: "#21cc66",
  success900: "#0f5c2e",

  error50: "#fff0f1",
  error500: "#ff505f",
  error900: "#570007",

  grey50: "#f3f6f9",
  grey200: "#dae2ed",
  grey500: "#9da8b7",
  grey900: "#1c2025",
};

export const icons: Record<Icon, string> = {
  add: "add_circle",
  edit: "edit",
  accept: "check_circle",
  cancel: "cancel",
  delete: "delete",
};

export const tasksInitialState: Task[] = [
  {
    id: 0,
    title: `Lorem ipsum dolor sit amet`,
    notes: `- Consectetur adipiscing elit\n- Sed do eiusmod tempor incididunt\n- Ut labore et dolore magna aliqua`,
    isChecked: false,
  },
  {
    id: 1,
    title: `Ut enim ad minim veniam`,
    notes: `Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    isChecked: true,
  },
  {
    id: 2,
    title: `Duis aute irure dolor in reprehenderit in voluptate`,
    notes: ``,
    isChecked: false,
  },
];
