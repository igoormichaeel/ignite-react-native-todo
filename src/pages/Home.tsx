import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TodoInput } from '../components/TodoInput';
import { Task, TasksList } from '../components/TasksList';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find((task) => task.title === newTaskTitle)) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
        [{ text: 'Ok' }]
      );

      return;
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasksList = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      }
      return { ...task, done: !task.done };
    });

    setTasks(newTasksList);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        { text: 'Não' },
        {
          text: 'Sim',
          onPress: () => {
            const newTasksList = tasks.filter((task) => task.id !== id);

            setTasks(newTasksList);
          },
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const newTasksList = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }
      return { ...task, title: taskNewTitle };
    });

    setTasks(newTasksList);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
