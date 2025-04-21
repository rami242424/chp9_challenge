import { useState } from "react";
import {useForm} from "react-hook-form";

interface IForm {
    toDo : string;

}

function ToDoList(){
    const {
        register, handleSubmit, setValue, 
    } = useForm<IForm>();
    const handleValid = (data:IForm) => {
        console.log('add to do', data.toDo);
        setValue("toDo", "");
    }
    return (
        <div>
            {/* handleSubmit 함수가 data를 검사하고, 유효하여 통과되면 내가만든함수(handleValid) 를 호출한다. */}
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", {
                    required : "please write a TO DO",

                    })} 
                    placeholder="Write a TO DO" 
                />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;


