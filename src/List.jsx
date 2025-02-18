import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'



const List = ({items,handleDelete,handleEdit}) => {



  return   <div className='grocery-list'>{items.map((item) => {
        const {id,title}=item
        return(
    <article className="grocery-item" key={id}>
       <p className="title">{title}</p> 

       <div className='btn-container'>
       <button onClick={()=>handleEdit(id)}   className='edit-btn'><FaEdit/></button>
       <button onClick={()=>handleDelete(id)} className='delete-btn'><FaTrash/></button>
       </div>
      
        </article>
)})}
  
  </div> 
}

export default List
