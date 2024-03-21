import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import Spinner from './Spinner';

function Page2() {

    const [codes, setCodes] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        ;(async () => {
            try {
                const response = await axios.get("/api/showCodes");
                setCodes(response.data.data);
            } catch (e) {
                console.log(e)
            } finally {
                setLoader(false);
            }
        })()
    }, [])

    const textClip = (text) => {

        if (text.split(' ').length <= 100) {
            return text;
        }

        let clippedText = '';
        const words = text.split(' ');

        words.map((value, index) => {
            if (index <= 100) {
                clippedText += ' ' + value;
            }
        })

        clippedText += '...';

        return clippedText;
    }

  return (
    !loader ?
    <div>
        <NavLink to='/' className='absolute bg-slate-800 left-5 top-5 p-3 rounded-lg text-gray-200'>Go To Page 1</NavLink>
        <table className='table-auto text-gray-200 text-lg w-[80vw] border-[1px] border-gray-500 mx-auto p-4 my-[15vh]'>
            <thead>
            <tr className='border-b-[1px]'>
                <th className='border-l-[1px] border-gray-500'>Time</th>
                <th className='border-l-[1px] border-gray-500'>Username</th>
                <th className='border-l-[1px] border-gray-500'>Language</th>
                <th className='border-l-[1px] border-gray-500'>Stdin</th>
                <th className='border-l-[1px] border-gray-500'>Code</th>
            </tr>
            </thead>
            <tbody>
            {
            codes.map((code, index) => <tr key={index} className='p-4 border-b-[1px]'>
                <td className='w-[10vw] border-l-[1px] p-3 border-gray-500'>{code.time.slice(0, 10)}<br />{code.time.slice(11, 19)}</td>
                <td className='p-3 border-l-[1px] border-gray-500'>{code.username}</td>
                <td className='p-3 border-l-[1px] border-gray-500'>{code.language}</td>
                <td className='p-3 border-l-[1px] border-gray-500'>{code.stdin}</td>
                <td className='p-3 border-l-[1px] border-gray-500'>{textClip(code.code)}</td>
            </tr>)
        }
            </tbody>
        </table>

    </div>:
    <Spinner />
  )
}

export default Page2