import { useState } from "react";
import {useForm} from "react-hook-form";

/* function ToDoList(){
    const [toDo, setToDo] = useState("");
    const [toDoError, setToDoError] = useState("");
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget : {value},
        } = event;
        setToDoError("");
        setToDo(value);
    };

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(toDo.length < 10)  {
            return setToDoError("To Do should be longer");
        }
        console.log("success to submit");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} placeholder="Write a to do" />
                <button>Add</button>
                {toDoError !== "" ? toDoError : null}
            </form>
        </div>
    );
}

export default ToDoList; */


interface Iform {
    Email : string;
    Firstname : string;
    lastname : string;
    ID : string;
    password1 : string;
    password2 : string;
}

function ToDoList(){
    const { register, watch, handleSubmit, formState: {errors} } = useForm<Iform>({
        defaultValues: {
            Email : "@naver.com"
        }
    });
    const onValid = (data:any) => {
        console.log(data);
    }
    // console.log(register("toDo"));
    // console.log(watch());
    console.log(errors);
    return (
        <div>
            <form style={{display:"flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
                <input 
                    {...register("Email", {
                        required : true,
                        pattern: {
                            value : /^[a-zA-z0-9._%+-]+@naver\.com$/,
                            message: "Only naver.com email address is allowed"
                        },
                    })} 
                    placeholder="Write a Email" 
                />
                <span>{ errors?.Email?.message as string}</span>
                <input 
                    {...register("Firstname", {required : true})}
                    placeholder="Write a Firstname" 
                />
               
                <input 
                    {...register("lastname", {required : true})} 
                    placeholder="Write a lastname" 
                />
               
                <input 
                    {...register("ID", {
                        required: "your ID is required!", minLength: 5
                    })} 
                    placeholder="Write a ID" 
                />
                <span>{ errors?.ID?.message as string}</span>
                <input 
                    {...register("password1", {
                        required : true, 
                        minLength: {
                            value : 5,
                            message: "your password1 is too short"
                        }
                    })} 
                    placeholder="Write a password1" 
                />
                <span>{ errors?.password1?.message as string}</span>
                <input 
                    {...register("password2", {
                        required : true,
                        minLength: {
                            value : 5,
                            message: "your password2 is too short"
                        }
                    })} 
                    placeholder="Write a password2" 
                />
                 <span>{ errors?.password2?.message as string}</span>
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;