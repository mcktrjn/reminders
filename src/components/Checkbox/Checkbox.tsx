import classNames from "classnames";
import { FunctionComponent } from "react";
import styles from "./Checkbox.module.scss";

type Props = {
  className?: string;
  isChecked: boolean;
  handleChange: () => void;
};

export const Checkbox: FunctionComponent<Props> = ({
  className,
  isChecked,
  handleChange,
}) => (
  <label className={classNames(styles.checkbox, className)}>
    <input
      className={styles.input}
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      aria-label="Check"
    />
  </label>
);
