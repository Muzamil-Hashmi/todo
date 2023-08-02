import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {  useDispatch } from 'react-redux/es/exports'
import { updateTodo } from '../redux/slices/todoSlice'


const Update = () => {
    const {search} = useLocation();
    const query = new URLSearchParams(search)
    const id = query.get('id')
    const title = query.get('title')
    const [input, setInput] = useState(title);
    const dispach = useDispatch()
    const navigate  = useNavigate()

    const handleUpdate =()=>{
        dispach(updateTodo({ id, title: input }))
        navigate('/')
    }
    return (
        <>
            <input type="text"
                className='py-1 mt-5 px-3 me-2'
                value={input}
                name='box'
                id=''
                onChange={(e) => setInput(e.target.value)}
            />
            <button className='btn btn-warning  ' onClick={()=>handleUpdate()}>Update</button>
        </>
    )

}

export default Update