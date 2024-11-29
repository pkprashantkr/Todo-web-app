import React from "react";
import tick from "../assets/tick.png";
import notTick from "../assets/not_tick.png";
import { Trash2 } from "lucide-react";

function TodoItems({ text, id, isComplete, deleteTodo, toggle, darkMode }) {
  return (
    <div className="flex items-center my-3 gap-2 ">
      <div
        onClick={() => {        
          toggle(id);          //Toggling the completed status of the todo item
        }}
        className="flex flex-1 items-center cursor-pointer "
      >
        <img src={isComplete ? tick : notTick} alt="tick" className="w-6" />
        <p
          className={`ml-4 text-[17px] ${
            darkMode
              ? isComplete
                ? "text-gray-400 line-through decoration-slate-300 "
                : "text-white"
              : isComplete
              ? "text-gray-500 line-through decoration-slate-600"
              : "text-black"
          }`}
        >
          {text}
        </p>
      </div>

      <Trash2 onClick={() => {
          deleteTodo(id);
        }} className="w-4 cursor-pointer hover:text-orange-300"/>
        
    </div>
  );
}

export default TodoItems;
