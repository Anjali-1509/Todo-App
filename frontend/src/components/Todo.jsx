import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin4Fill } from 'react-icons/ri';

const Todo = ({text,handleDelete,handleUpdate}) => {
    return (
        <div className="todo">
            <div>{text}</div>
            <div className="icons">
                <BiEdit className="icon" onClick={handleUpdate} />
                <RiDeleteBin4Fill className="icon" onClick={handleDelete} />
            </div>
        </div>
    )
}

export default Todo