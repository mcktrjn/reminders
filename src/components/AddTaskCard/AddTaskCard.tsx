import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, TaskCard, TextField, TextFieldsBox } from "../../components";
import { handleTextFieldChange } from "../../helpers";
import { addTask } from "../../redux";
import styles from "./AddTaskCard.module.scss";

export const AddTaskCard = () => {
  const dispatch = useDispatch();
  const taskInitialState = { title: "", notes: "" };
  const [task, setTask] = useState(taskInitialState);

  const [isFocused, setIsFocused] = useState(false);
  const isExpanded = isFocused || Boolean(task.notes);

  const handleAddButtonClick = () => {
    dispatch(addTask(task));
    setTask(taskInitialState);
  };

  return (
    <TaskCard className={styles.addTaskCard}>
      <TextFieldsBox isExpanded={isExpanded}>
        <TextField
          label="Task"
          placeholder="Add task"
          value={task.title}
          handleChange={(event) => handleTextFieldChange(event, task, setTask, "title")}
          handleFocus={() => setIsFocused(true)}
          handleBlur={() => setIsFocused(false)}
        />
        <TextField
          label="Notes"
          placeholder="Add notes"
          value={task.notes}
          handleChange={(event) => handleTextFieldChange(event, task, setTask, "notes")}
          handleFocus={() => setIsFocused(true)}
          handleBlur={() => setIsFocused(false)}
          isMultiline
          tabIndex={isExpanded ? 0 : -1}
        />
      </TextFieldsBox>
      <IconButton
        className={styles.iconButton}
        icon={"add"}
        color="primary500"
        handleClick={handleAddButtonClick}
      />
    </TaskCard>
  );
};
