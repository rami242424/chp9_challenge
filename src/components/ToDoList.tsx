import React from "react";
import { useState } from "react";
import {useForm} from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface IForm {
    toDo : string;
}

interface IToDo {
    text : string;
    id : number;
    category : "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
    key: "TODO",
    default: [],
})


function ToDoList(){
    const [toDos, setToDos] = useRecoilState(toDoState);
    //const [value, modFn] = useRecoilState(toDoState);
    //const value = useRecoilValue(toDoState);
    //const modFn = useSetRecoilState(toDoState);
    //console.log(value , "recoil값이야")

    const {
        register, handleSubmit, setValue, 
    } = useForm<IForm>();

    //const handleValid = (data:IForm) => {
    const handleValid = ({toDo}:IForm) => {
        //console.log('add to do', data.toDo);
        setToDos(oldToDos => [
            { text: toDo, id: Date.now(), category: "TO_DO" },
            ...oldToDos
        ]);
        setValue("toDo", "");
    }
    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", {
                    required : "please write a to do",
                    })} 
                    placeholder="Write a to do" 
                />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map(toDo => <li key={toDo.id}>{toDo.text}</li>)}
            </ul>
        </div>
    );
}

export default ToDoList;


