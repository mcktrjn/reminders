import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./App.module.scss";
import { AddTaskCard, Container, DisplayTaskCard } from "./components";
import { useWindowSize } from "./hooks";
import { selectTasks } from "./redux";
import { Task } from "./types";

type OrderedTask = Task & { order: number };
type TaskBox = { order: number; height: number };

export const App = () => {
  const { windowWidth } = useWindowSize();
  const tasks = useSelector(selectTasks);
  const checkedTasks = tasks.filter((task) => task.isChecked === true);
  const orderedTasks = tasks.map((task) => ({
    ...task,
    order: ([...tasks] as OrderedTask[])
      .sort((a, b) => a.isChecked === b.isChecked ? a.order - b.order : a.isChecked ? 1 : -1)
      .findIndex((orderedTask) => orderedTask === task),
  }));

  const taskBoxesRefs = useRef<HTMLDivElement[]>([]);
  const [taskBoxes, setTaskBoxes] = useState<TaskBox[]>([]);

  useEffect(() => {
    const taskBoxes = taskBoxesRefs.current;
    setTaskBoxes(
      taskBoxes.map((taskBox, index) => {
        if (taskBox) {
          return {
            order: Number(taskBox.getAttribute("data-order")),
            height: tasks[index].notes ? taskBox.clientHeight : windowWidth > 768 ? 74 : 114,
          };
        } else {
          return { order: 999, height: 0 };
        }
      })
    );
  }, [tasks, windowWidth]);

  const getTaskBoxPosition = (taskBoxIndex: number) => {
    return taskBoxes
      .sort((a, b) => a.order - b.order)
      .slice(0, taskBoxIndex)
      .reduce((a, b) => a + b.height + 16, 0);
  };

  return (
    <div className={styles.app}>
      <Container>
        <h1>
          Reminders <span>{checkedTasks.length} Completed</span>
        </h1>
        <div
          className={styles.taskBoxes}
          style={
            tasks.length
              ? { height: `${getTaskBoxPosition(tasks.length) - 16}px` }
              : { height: 0 }
          }
        >
          {orderedTasks.map((task, index) => (
            <div
              key={task.id}
              className={styles.taskBox}
              ref={(taskBox: HTMLDivElement) => (taskBoxesRefs.current[index] = taskBox)}
              style={{
                zIndex: 999 - task.order,
                transform: `translateY(${getTaskBoxPosition(task.order)}px)`,
              }}
              data-order={task.order}
            >
              <DisplayTaskCard task={task} />
            </div>
          ))}
        </div>
        <h2>Add new</h2>
        <AddTaskCard />
      </Container>
    </div>
  );
}; // prettier-ignore
