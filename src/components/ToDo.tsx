import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";




function ToDo({ text, category, id } : IToDo){
    // 방법1
    /* const onClick = (newCategory: IToDo["category"]) => {
        console.log("i wanna go to ", newCategory);
    }
    return (
        <li>
            <span>{text}</span>
            { category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>TO DO</button>}
            { category !== "DOING" && <button onClick={() => onClick("DOING")}>DOING</button>}
            { category !== "DONE" && <button onClick={() => onClick("DONE")}>DONE</button>}
        </li>
    ); */

    // 방법2
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        //console.log("i wanna go ", event.currentTarget.name);
        const { currentTarget : {name}} = event;
    }
    const setToDos = useSetRecoilState(toDoState);
    return (
        <li>
            <span>{text}</span>
            { category !== "TO_DO" && <button name="TO_DO" onClick={onClick}>TO DO</button>}
            { category !== "DOING" && <button name="DOING" onClick={onClick}>DOING</button>}
            { category !== "DONE" && <button name="DONE" onClick={onClick}>DONE</button>}
        </li>
    );
}
    
export default ToDo;