import React from "react";
import { IoTrashBin } from "react-icons/io5";
interface todoitem{
    item:string,
    checked:boolean,
    id:string,
    handlechange:(id:string)=>void,
    handledel:(id:string)=>void,

}
const Todoitem: React.FC<todoitem>=({id,item,checked,handlechange,handledel})=>{
    function handleChange(id:string){
        handlechange(id);
    }
    function handleDel(id:string){
        handledel(id);
    }
    return(
        <li className='flex items-center m-2'>
        <div>
          <input
            type="checkbox"
            checked={checked}
            onChange={()=>handleChange(id)}
            className="w-4 h-4 text-blue-600 bg-yellow-100 border-gray-300 rounded"
          />
        </div>
        <div className='ml-2'>
          <span className='popr text-lg font-medium'>{item}</span>
        </div>
        <IoTrashBin className='text-lg ml-3' onClick={()=>{handleDel(id)}} />
      </li>
    );
}
export default Todoitem;