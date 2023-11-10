import classNames from "classnames";
import { FunctionComponent } from "react";
import { colors, icons } from "../../constants";
import { Color, Icon } from "../../types";
import styles from "./IconButton.module.scss";

type Props = {
  className?: string;
  icon: Icon;
  color: Extract<Color, `${string}500`>;
  handleClick: () => void;
};

export const IconButton: FunctionComponent<Props> = ({
  className,
  icon,
  color,
  handleClick,
}) => {
  const lightColor = color.slice(0, -1) as Color;

  return (
    <button
      className={classNames(styles.iconButton, className)}
      onClick={handleClick}
      style={{ borderColor: colors[color], backgroundColor: colors[lightColor] }}
      aria-label={icon[0].toUpperCase() + icon.slice(1)}
    >
      <span className={styles.icon} style={{ color: colors[color] }}>
        {icons[icon]}
      </span>
    </button>
  );
};
