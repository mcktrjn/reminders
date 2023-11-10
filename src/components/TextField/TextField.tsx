import classNames from "classnames";
import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../hooks";
import styles from "./TextField.module.scss";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  isDisabled?: boolean;
  isChecked?: boolean;
  isMultiline?: boolean;
  tabIndex?: number;
};

export const TextField: FunctionComponent<Props> = ({
  label,
  placeholder,
  value,
  handleChange,
  handleFocus,
  handleBlur,
  isDisabled,
  isChecked,
  isMultiline,
  tabIndex,
}) => {
  const { windowWidth } = useWindowSize();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const borderWidth = isFocused ? 2 : 1;

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "0px";
      textArea.style.height = `${textArea.scrollHeight + borderWidth * 2}px`;
    }
  }, [value, windowWidth]);

  const inputClassName = classNames(styles.input, {
    [styles.checked]: isChecked,
  });

  return (
    <label className={styles.textField}>
      {!isMultiline ? (
        <input
          className={inputClassName}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isDisabled}
          tabIndex={tabIndex}
          spellCheck="false"
        />
      ) : (
        <textarea
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => {
            handleFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            handleBlur();
            setIsFocused(false);
          }}
          disabled={isDisabled}
          tabIndex={tabIndex}
          rows={1}
          ref={textAreaRef}
          spellCheck="false"
        />
      )}
      <span className={styles.label}>{label}</span>
    </label>
  );
};
