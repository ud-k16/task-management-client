import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  const [state, setState] = useState({
    tasks: null,
  });

  return (
    <TaskContext.Provider value={{ ...state, setState }}>
      {children}
    </TaskContext.Provider>
  );
};
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("Error using Context");
  }
  return context;
};
export default TaskContextProvider;
