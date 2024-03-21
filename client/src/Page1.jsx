import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';

function Page1() {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submit = async (data) => {
        console.log(data);
        try {
            data.time = (new Date()).toISOString('en').slice(0, 19).replace('T', " ");
            await axios.post("/api/uploadCode", data);
            navigate("/page2");
        } catch (e) {
            console.log(e)
        }
    }
//092635
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
        <NavLink to='/page2' className='absolute right-10 top-10 p-3 bg-slate-800 rounded-lg text-gray-200'>Go To Page 2</NavLink>
        <form onSubmit={handleSubmit(submit)} className='flex flex-col items-center justify-start w-[40%] text-gray-200'>
            <input type="text" {...register("username")} placeholder='Username' className='w-full p-3 m-3 rounded-md bg-slate-800 placeholder:text-gray-400' />
            <select {...register("language")} className='w-[100%] p-3 m-3 rounded-md text-lg bg-slate-800 self-start ml-0' >
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="Javascript">Javascript</option>
                <option value="C++">C++</option>
            </select>
            <input type="text" {...register("stdin")} placeholder='stdin' className='w-full p-3 m-3 rounded-md bg-slate-800 placeholder:text-gray-400' />
            <textarea {...register("code")} placeholder='Code...' className='w-full p-3 m-3 rounded-md bg-slate-800 placeholder:text-gray-400 resize-none h-[30vh]' />
            <button type="submit" className='p-3 bg-slate-800 rounded-lg text-gray-200'>Upload</button>
        </form>
    </div>
  )
}

export default Page1