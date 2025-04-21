import { useRecoilValue  } from "recoil";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList(){
    // 방법1
    /* const toDos = useRecoilValue(toDoState);
    //console.log(toDos, "ToDoList 의 toDos");
    const selectorOutput = useRecoilValue(toDoSelector);
    //console.log(selectorOutput, "🔥selector output !"); */

    // 방법2
    const [todos, doings, dones ] = useRecoilValue(toDoSelector)

    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <h1>TO DO</h1>
            <CreateToDo />
            <ul>
                {todos.map(todo => <ToDo key={todo.id} {...todo} />)}
            </ul>
            
            <hr/>
            <h1>DOING</h1>
            <CreateToDo />
            <ul>
                {doings.map(doing => <ToDo key={doing.id} {...doing} />)}
            </ul>

            <hr/>
            <h1>DONE</h1>
            <CreateToDo />
            <ul>
                {dones.map(done => <ToDo key={done.id} {...done} />)}
            </ul>
        </div>
    );
}

export default ToDoList;


