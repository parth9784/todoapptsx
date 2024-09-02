"use client";
import React, { useEffect, useState } from 'react';
import Todoitem from './todoitem';
import { v4 as uuidv4 } from 'uuid';

interface todoitem{
    title:string,
    id:string,
    checked:boolean
}

export default function Content() {
    const [input, setInput] = useState(false);
    const [todolist, setTodolist] = useState<todoitem[]>(() => {
        const storedTodos = localStorage.getItem('todolist');
        return storedTodos?JSON.parse(storedTodos) || [
            {
                title: "Buy Veggies",
                id: uuidv4(),
                checked: false
            },
            {
                title: "Buy laptop",
                id: uuidv4(),
                checked: false
            },
            {
                title: "Buy Stationary",
                id: uuidv4(),
                checked: true
            },
            {
                title: "Do Assignment 11",
                id: uuidv4(),
                checked: true
            }
        ]:[]
    });
    useEffect(() => {
        localStorage.setItem('todolist', JSON.stringify(todolist));
    }, [todolist]);

    function handlechange(tid:string){
        let updatedList = todolist.map(item => {
            if (item.id === tid) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setTodolist(updatedList);
    }

    function handleinput() {
        setInput(true);
    }

    function handlecancel() {
        setInput(false);
    }
    function handledel(tid:string) {
        let updatedList = todolist.filter(item => item.id !== tid);
        setTodolist(updatedList);
    }
    function handlesave() {
        const val = document.getElementById("input") as HTMLInputElement | null;
        if (val) {
            const value = val.value;
            const newObj: todoitem = { title: value, id: uuidv4(), checked: false };
            setTodolist([...todolist, newObj]);
            setInput(false);
          }
    }

    return (
        <div className='m-10'>
            <h1 className='popsemi text-3xl'>Things to get done</h1>
            <h3 className='pop text-xl mt-4 font-semibold'>Things to do</h3>
            <ul id="todo-list" className="mt-1">
                {todolist.map((p) => {
                    if (!p.checked) {
                        return <Todoitem key={p.id} item={p.title} checked={p.checked} id={p.id} handlechange={handlechange} handledel={handledel} />
                    }
                    return null;
                })}
            </ul>
            {input ?
                <div className='h-[160px] rounded shadow-lg'>
                    <h2 className='pop font-semibold text-xl ml-6 mt-4'>Create a Todo</h2>
                    <input type="text" id="input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[250px] ml-5 mt-3 p-2.5" placeholder='Enter a Todo' />
                    <div className='flex gap-4 mt-4 ml-4'>
                        <button type="button" onClick={handlesave} className="popr font-semibold text-white bg-yellow-500 hover:bg-yellow-600  rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Save</button>
                        <button type="button" onClick={handlecancel} className=" popr font-semibold border border-black bg-white rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Cancel</button>
                    </div>
                </div> :
                <button type="button" onClick={handleinput} className="text-white bg-yellow-500 hover:bg-yellow-600  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">+ Add a Todo</button>}
            <h3 className='font-semibold text-xl mt-4'>Things Done</h3>
            <ul className="mt-1" id="completed-list">
                {todolist.map((p) => {
                    if (p.checked) {
                        return <Todoitem key={p.id} item={p.title} checked={p.checked} id={p.id} handlechange={handlechange} handledel={handledel} />
                    }
                    return null;
                })}
            </ul>
        </div>
    );
}