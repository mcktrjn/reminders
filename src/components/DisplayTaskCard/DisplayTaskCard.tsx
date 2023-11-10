import { FunctionComponent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Checkbox,
  IconButton,
  TaskCard,
  TextField,
  TextFieldsBox,
} from "../../components";
import { handleTextFieldChange } from "../../helpers";
import { checkTask, deleteTask, editTask } from "../../redux";
import { Task } from "../../types";
import styles from "./DisplayTaskCard.module.scss";

type Props = {
  task: Task;
};

export const DisplayTaskCard: FunctionComponent<Props> = ({ task }) => {
  const dispatch = useDispatch();
  const editedTaskInitialState = { title: task.title, notes: task.notes };
  const [editedTask, setEditedTask] = useState(editedTaskInitialState);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const isExpanded = isFocused || Boolean(editedTask.notes);

  const handleCheckboxChange = () => {
    dispatch(checkTask({ id: task.id, isChecked: !task.isChecked }));
  };

  const textFieldsBoxRef = useRef<HTMLDivElement>(null);
  const handleEditButtonClick = () => {
    setIsDisabled(false);
    const textFieldsBox = textFieldsBoxRef.current;
    const input = textFieldsBox?.querySelector("input");
    setTimeout(() => input?.focus());
  };

  const handleAcceptButtonClick = () => {
    dispatch(editTask({ ...editedTask, id: task.id }));
    setIsDisabled(true);
  };

  const handleCancelButtonClick = () => {
    setEditedTask(editedTaskInitialState);
    setIsDisabled(true);
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteTask({ id: task.id }));
  };

  return (
    <TaskCard className={styles.displayTaskCard}>
      <Checkbox
        className={styles.checkbox}
        isChecked={task.isChecked}
        handleChange={handleCheckboxChange}
      />
      <TextFieldsBox
        className={styles.textFieldsBox}
        isExpanded={isExpanded}
        ref={textFieldsBoxRef}
      >
        <TextField
          label="Task"
          placeholder="Add task"
          value={isDisabled ? task.title : editedTask.title}
          handleChange={(event) => {
            handleTextFieldChange(event, editedTask, setEditedTask, "title");
          }}
          handleFocus={() => setIsFocused(true)}
          handleBlur={() => setIsFocused(false)}
          isDisabled={isDisabled}
          isChecked={task.isChecked}
        />
        <TextField
          label="Notes"
          placeholder="Add notes"
          value={isDisabled ? task.notes : editedTask.notes}
          handleChange={(event) => {
            handleTextFieldChange(event, editedTask, setEditedTask, "notes");
          }}
          handleFocus={() => setIsFocused(true)}
          handleBlur={() => setIsFocused(false)}
          isDisabled={isDisabled}
          isChecked={task.isChecked}
          isMultiline
          tabIndex={isExpanded ? 0 : -1}
        />
      </TextFieldsBox>
      <IconButton
        className={styles.iconButton}
        icon={isDisabled ? "edit" : "accept"}
        color="primary500"
        handleClick={isDisabled ? handleEditButtonClick : handleAcceptButtonClick}
      />
      <IconButton
        className={styles.iconButton}
        icon={isDisabled ? "delete" : "cancel"}
        color="error500"
        handleClick={isDisabled ? handleDeleteButtonClick : handleCancelButtonClick}
      />
    </TaskCard>
  );
};
