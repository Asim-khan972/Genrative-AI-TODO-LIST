"use client";
import Image from "next/image";
import { useState } from "react";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");

  // Define Copilot action
  useCopilotAction({
    name: "addTodoItem",
    description: "Add a new todo item to the list",
    parameters: [
      {
        name: "todoText",
        type: "string",
        description: "The text of the todo item to add",
        required: true,
      },
    ],
    handler: async ({ todoText }) => {
      addTask(todoText);
    },
  });

  useCopilotAction({
    name: "DeleteTodoItem",
    description: "Delete a  todo item from the list",
    parameters: [
      {
        name: "index",
        type: "number",
        description: "The index text of the todo item to deltete",
        required: true,
      },
    ],
    handler: async ({ index }) => {
      removeTask(index);
    },
  });

  const addTask = (todoText: string) => {
    if (todoText.trim()) {
      setTasks([...tasks, todoText]);
      setTask("");
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  return (
    <div className="bg-white">
      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-900">
          Wellcome to Smart To-Do List
        </h2>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Enter a task"
            className="border rounded-lg px-4 py-2 w-2/3 md:w-1/2 text-purple-900"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={() => addTask(task)}
            className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Add
          </button>
        </div>
        <ul className="mt-6 space-y-2">
          {tasks.map((t, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow text-purple-900"
            >
              {t}
              <button
                onClick={() => removeTask(index)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <>
          <CopilotPopup
            instructions={
              "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
            }
            labels={{
              title: "Popup Assistant",
              initial: "Need any help?",
            }}
          />
        </>
      </main>
    </div>
  );
}
