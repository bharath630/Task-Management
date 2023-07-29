import { eventWrapper } from "@testing-library/user-event/dist/utils";
import {useState} from "react";
import "./App.css";
const App=() => {
  const[newtask,setTask] = useState([]);
  const[task,set]=useState("");
  const handleinput= (event)=> {
    set(event.target.value);
  };
  const handleform=(event)=>
  {
    event.preventDefault();
    if(task.trim()!=="")
    {
      const newTask = {
        id: Date.now(),
        text: task,
        completed: false
      };
      setTask([...newtask,newTask]);
      set("");
    }
  };
  const handleTaskCompletion = (taskId) => {
    const updatedTasks = newtask.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTask(updatedTasks);
  };

  const handleTaskRemoval = (taskId) => {
    const updatedTasks = newtask.filter((task) => task.id !== taskId);
    setTask(updatedTasks);
  };

  return (
    <div className="box">
      <center>
      <form onSubmit={handleform}>
      <h1>Manage Your Tasks</h1>
      <p> You Can Strike Off  Tasks By Clicking On Them Which Are Completed</p>
       <input type="text" value={task} onChange={handleinput} placeholder="Type Your Task"></input>
       <button type="submit"> ADD </button>
       
       </form>
       <ol>
        {newtask.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none"
              }}
              onClick={() => handleTaskCompletion(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => handleTaskRemoval(task.id)}>Remove</button>
          </li>
        ))}
      </ol>
      </center>
    </div>
  
  );
};
export default App;