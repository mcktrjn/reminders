import classNames from "classnames";
import { FunctionComponent, ReactNode } from "react";
import styles from "./TaskCard.module.scss";

type Props = {
  className?: string;
  children: ReactNode;
};

export const TaskCard: FunctionComponent<Props> = ({ className, children }) => (
  <div className={classNames(styles.taskCard, className)}>{children}</div>
);
