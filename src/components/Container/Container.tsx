import { FunctionComponent, ReactNode } from "react";
import styles from "./Container.module.scss";

type Props = {
  children: ReactNode;
};

export const Container: FunctionComponent<Props> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
