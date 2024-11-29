import React, { useEffect, useRef, useState } from "react";
import TodoItems from "./TodoItems";
import { CalendarPlus } from "lucide-react";

function Todo({ darkMode }) {
  //Storing todos in local storage
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")                       //Getting todos from local storage 
      ? JSON.parse(localStorage.getItem("todos"))       //Parsing the todos from local storage
      : []
  );

  //Ref for input box to access the input value
  const inputRef = useRef();

  //Function to add todo it
  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {     //If input is empty, return null
      return null;
    }
    const newTodo = {           //Creating new todo object
      id: Date.now(),           //Unique id for each todo item
      text: inputText,          //Text of the todo item
      isComplete: false,        //Completed status of the todo item
    };

    setTodoList((prev) => [...prev, newTodo]);      //Updating the todo list
    inputRef.current.value = "";                    //Clearing the input box
  };

  //Function to delete todo item from the list
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  //Function to toggle the completed status of a todo item
  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  //Updating the todo list in local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));        
  }, [todoList]);                    


  //Function to add todo item when enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      add();
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
      } place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-2xl`}
    >
      {/* Title */}
      <div className="flex items-center mt-7 gap-2">
        <CalendarPlus className="w-10" />
        <h1 className="text-3xl font-semibold">Todo List</h1>
      </div>

      {/* input-box */}
      <div
        className={`flex items-center my-7 ${
          darkMode ? "bg-gray-600" : "bg-gray-200"
        } rounded-full`}
      >
        <input
          ref={inputRef}             //Ref for input box to access the input value
          onKeyDown={handleKeyDown}  //Adding event listener for enter key
          className={`bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-400 ${
            darkMode ? "text-white placeholder:text-gray-300" : "text-black"
          }`}
          type="text"
          placeholder="Add task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-500 hover:bg-orange-400 w-24 h-12 mr-1 text-white text-lg font-medium cursor-pointer"
        >
          Add +
        </button>
      </div>

      {/* task-list */}
      <div>
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
              darkMode={darkMode}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
