import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle } from "phosphor-react";

import { Header } from "./components/Header";

import styles from "./App.module.css";

import "./global.css";
import { Task } from "./components/Task";

export interface Task {
  id: string;
  content: string;
  completed: boolean;
}

export interface TaskProps extends Task {
  onRemove: () => void;
  onToggleSection: () => void;
}

function App() {
  const [newTask, setNewTask] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);

  const onCreateNewTask: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    setTasks((draftState) => [
      ...draftState,
      {
        id: uuidv4(),
        content: newTask,
        completed: false,
      },
    ]);

    setNewTask("");
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewTask(event?.target.value);
  };

  const onRemoveTask = (id: string) => {
    setTasks((draftState) => draftState.filter((task) => task.id !== id));
  };

  const onToggleTask = (id: string) => {
    setTasks((draftState) =>
      draftState.map((task) => {
        if (task.id !== id) return task;

        return { ...task, completed: !task.completed };
      })
    );
  };

  const sumCompletedTasks = tasks.reduce((sumValue, task) => {
    if (!task.completed) return sumValue;

    return sumValue + 1;
  }, 0);

  return (
    <main className={styles.todolist}>
      <Header />

      <article className={styles.todolist__wrapper}>
        <header>
          <form className={styles.todolist__form} onSubmit={onCreateNewTask}>
            <input
              type="text"
              placeholder="Adicione uma nova tarefa"
              value={newTask}
              onChange={onChange}
            />
            <button type="submit">
              Criar
              <i>
                <PlusCircle />
              </i>
            </button>
          </form>
        </header>

        <section className={styles["listing-tasks__section"]}>
          <header>
            <strong>
              Tarefas criadas <span>{tasks.length}</span>
            </strong>

            <strong>
              Conclúidas{" "}
              <span>
                {sumCompletedTasks} de {tasks.length}
              </span>
            </strong>
          </header>

          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <Task
                  {...task}
                  onRemove={() => {
                    onRemoveTask(task.id);
                  }}
                  onToggleSection={() => {
                    onToggleTask(task.id);
                  }}
                />
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}

export default App;
