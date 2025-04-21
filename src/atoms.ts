import { atom, selector } from "recoil";

export type AllCategories = "TO_DO" | "DOING" | "DONE";

export interface IToDo {
    text : string;
    id : number;
    category : AllCategories;
}

export const categoryState = atom<AllCategories>({
    key: "category",
    default: "TO_DO",
})


export const toDoState = atom<IToDo[]>({
    key: "TODO",
    default: [],
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDoss = get(toDoState); // list 전체 내용
        const catss = get(categoryState);

        // 방법1
        /* if( catss === "TO_DO") return toDoss.filter((todo) => todo.category === "TO_DO");
        if( catss === "DOING") return toDoss.filter((todo) => todo.category === "DOING");
        if( catss === "DONE") return toDoss.filter((todo) => todo.category === "DONE") */

        // 방법2
        return toDoss.filter((list) => list.category === catss);



        // return [
        //     toDoss.filter((todo) => todo.category === "TO_DO"),
        //     toDoss.filter((todo) => todo.category === "DOING"),
        //     toDoss.filter((todo) => todo.category === "DONE")
        // ]


    }
})