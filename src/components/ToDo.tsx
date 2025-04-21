import { IToDo } from "../atoms";




function ToDo({ text } : IToDo){
    return (
        <li>
            <span>{text}</span>
            <button>TO DO</button>
            <button>DOING</button>
            <button>DONE</button>
        </li>
    );
}
    
export default ToDo;