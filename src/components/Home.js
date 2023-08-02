import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { addtodos, deleteTodo, updateTodo } from '../redux/slices/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { current } from '@reduxjs/toolkit';


const Home = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const countPerPage = 5;

    const todos = useSelector((state) => state.todo.todos);
    const [input, setInput] = useState("");

    console.log("input", input)
    const [itemsData, setItemData] = useState({});

    const [isupdate, setIsupdate] = useState(false)

    const dispach = useDispatch()
    const handleAdd = () => {
        dispach(addtodos({ id: uuidv4(), title: input }))
        setInput("");
    }

    const handledelete = (index) => {
        dispach(deleteTodo(index));
    }

    const handleUpdate = () => {

        setIsupdate(false);
    }


    const openUpdateForm = (id, title) => {
        setItemData({ id, title })
        console.log(itemsData)
        setIsupdate(true)
    }


    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - countPerPage, 0));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + countPerPage, todos.length - 1));
    };

    return (
        <>


            <div className="conatiner">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 mt-5  text-center align-items-center">
                        <h2>Redux Todo</h2>
                        {
                            isupdate ?
                                <>
                                    <input type="text"
                                        className='py-1 mt-5 px-3 me-2'
                                        value={input}
                                        name='box'
                                        id=''
                                        onChange={(e) => setInput(e.target.value)}
                                    />


                                    <div className="btn btn-success rounded-5" onClick={handleUpdate}>Update</div></>
                                :
                                <>
                                    <input type="text"
                                        className='py-1 mt-5 px-3 me-2'
                                        value={input}
                                        name='box'
                                        id=''
                                        onChange={(e) => setInput(e.target.value)}
                                    />


                                    <div className={`btn btn-success rounded-5 ${input === "" ? "disabled" : ""} `} onClick={handleAdd}>Add</div>
                                </>

                        }


                    </div>
                    <div className="col-md-4">  </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4 text-center  align-items-center my-5">

                        {
                            todos && todos.slice(currentPage, currentPage + countPerPage).map((items) => {
                                return (
                                    <div className="card my-5 " key={items.id}>

                                        <div className="card-body">
                                            <h3> {items.title}</h3>
                                            <br />
                                            <div className="btn btn-danger  m-3" onClick={() => handledelete(items.id)}>
                                                delete
                                            </div>
                                            <a href={`/update-todo?id=${items.id}&title=${items.title}`} className="btn btn-danger m-3" onClick={() => openUpdateForm(items.id, items.title)}>
                                                update
                                            </a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="btn btn-success me-4" onClick={handlePreviousPage}>
                            Previous
                        </div>
                        <div className="btn btn-success px-4" onClick={handleNextPage}>
                            Next
                        </div>

                    </div>

                </div>

            </div>


        </>)
}

export default Home