"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { GripVertical, Trash2 } from "lucide-react"

type Task = {
  id: number
  content: string
  status: "todo" | "inProgress" | "done"
}

export default function DragAndDropDemo() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, content: "Learn React basics", status: "done" },
    { id: 2, content: "Understand React hooks", status: "inProgress" },
    { id: 3, content: "Master advanced patterns", status: "todo" },
    { id: 4, content: "Build a project", status: "todo" },
    { id: 5, content: "Deploy to production", status: "todo" },
  ])

  const [newTaskText, setNewTaskText] = useState("")
  const nextId = useRef(6)

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData("taskId", task.id.toString())
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault() // Allow drop
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetStatus: "todo" | "inProgress" | "done") => {
    e.preventDefault()
    const taskId = Number.parseInt(e.dataTransfer.getData("taskId"))

    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: targetStatus } : task)))
  }

  const addTask = () => {
    if (newTaskText.trim()) {
      setTasks([...tasks, { id: nextId.current, content: newTaskText, status: "todo" }])
      nextId.current += 1
      setNewTaskText("")
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const getTasksByStatus = (status: "todo" | "inProgress" | "done") => {
    return tasks.filter((task) => task.status === status)
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">About Drag and Drop:</h3>
        <p className="text-sm">
          This demo uses React's built-in drag and drop API to create a Kanban-style task board. Drag tasks between
          columns to change their status.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <Button onClick={addTask}>Add</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn
          title="To Do"
          tasks={getTasksByStatus("todo")}
          status="todo"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDelete={deleteTask}
        />

        <TaskColumn
          title="In Progress"
          tasks={getTasksByStatus("inProgress")}
          status="inProgress"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDelete={deleteTask}
        />

        <TaskColumn
          title="Done"
          tasks={getTasksByStatus("done")}
          status="done"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDelete={deleteTask}
        />
      </div>
    </div>
  )
}

type TaskColumnProps = {
  title: string
  tasks: Task[]
  status: "todo" | "inProgress" | "done"
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>, status: "todo" | "inProgress" | "done") => void
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void
  onDelete: (id: number) => void
}

function TaskColumn({ title, tasks, status, onDragOver, onDrop, onDragStart, onDelete }: TaskColumnProps) {
  return (
    <div className="bg-muted/30 rounded-lg p-4" onDragOver={onDragOver} onDrop={(e) => onDrop(e, status)}>
      <h3 className="font-medium mb-4">
        {title} ({tasks.length})
      </h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            className="bg-card p-3 rounded-md shadow-sm border cursor-move flex items-center group"
          >
            <GripVertical className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{task.content}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 ml-auto opacity-0 group-hover:opacity-100"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
        {tasks.length === 0 && <div className="text-center py-4 text-sm text-muted-foreground">Drop tasks here</div>}
      </div>
    </div>
  )
}
