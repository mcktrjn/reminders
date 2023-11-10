import classNames from "classnames";
import { ReactNode, forwardRef } from "react";
import styles from "./TextFieldsBox.module.scss";

type Props = {
  className?: string;
  isExpanded: boolean;
  children: ReactNode;
};

export const TextFieldsBox = forwardRef<HTMLDivElement, Props>(
  ({ className, isExpanded, children }, ref) => (
    <div
      className={classNames(styles.textFieldsBox, className)}
      ref={ref}
      style={isExpanded ? { maxHeight: "256px" } : { maxHeight: "40px" }}
    >
      {children}
    </div>
  )
);
