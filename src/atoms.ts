import { atom, selector } from "recoil";

export interface IToDo {
    text : string;
    id : number;
    category : "TO_DO" | "DOING" | "DONE";
}


export const toDoState = atom<IToDo[]>({
    key: "TODO",
    default: [],
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDoss = get(toDoState);
        return [
            toDoss.filter((todo) => todo.category === "TO_DO"),
            toDoss.filter((todo) => todo.category === "DOING"),
            toDoss.filter((todo) => todo.category === "DONE")
        ]
    }
})