import { Trash } from "phosphor-react";
import { TaskProps } from "../App";

import styles from "./Task.module.css";

export const Task: React.FC<TaskProps> = ({
  content,
  completed,
  onRemove,
  onToggleSection,
}) => {
  return (
    <div
      className={`${styles.task__wrapper} ${
        completed ? styles["task-completed__wrapper"] : ""
      }`}
    >
      <header>
        <input type="checkbox" checked={completed} onChange={onToggleSection} />
      </header>

      <section>
        <p>{content}</p>
      </section>

      <footer>
        <button onClick={onRemove}>
          <Trash />
        </button>
      </footer>
    </div>
  );
};
