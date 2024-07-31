import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getlocalList = () =>{
    const list=localStorage.getItem('list')
    if (list){
        return JSON.parse(list)
    }
    else{
        return []
    }
        
    
}

function App() {
  const [name,setName] = useState("");
  const [list,setList]=useState(getlocalList())
  const [isediting,setIsediting]=useState(false)
  const [alert,setAlert]= useState({show:false,msg:"",type:""})
  const [editID,setEditID]=useState(null)

  const handleSubmit=(e)=>{
    e.preventDefault()
    if (!name){
        setAlert({show:true,msg:"No item entered",type:"danger"})
    }
    else if( name && isediting){
        setList(list.map((item)=>{
            if (editID===item.id){
                return {...list,title:name}
            }
            return item
        }))
        setAlert({show:true,msg:"Item edited",type:"success"})
        setIsediting(false)
        setName("")
        setEditID(null)


    }
    else{
        setAlert({show:true,msg:"Item added",type:"success"})
        const new_item={id:new Date().getTime().toString(),title: name}
        setList([...list, new_item]);
        console.log(list)
        setName("")
    }


  }
  
  const handleClear=(e)=>{
    e.preventDefault()
    setList([])
    setAlert({show:true,msg:"All items cleared",type:"danger"})

  }
  

    const handleDelete=(id)=>{
        setAlert({show:true,msg:"Item deleted",type:"danger"})
        setList(list.filter((item)=>item.id!==id))


    }

    const handleEdit=(id)=>{
        const specific_item=list.find((item)=>item.id===id)
        setName(specific_item.title)
        setIsediting(true)
        setEditID(id)
    }
    useEffect(()=>{
        const timeout=setTimeout(() => {
            setAlert({ show: false, msg: "", type: "" });
            
        }, 3000);
        return ()=>clearTimeout(timeout)
    },[alert])


    useEffect(()=>{
        localStorage.setItem('list',JSON.stringify(list))
    },[list])
  return <section className='section-center'>
        <form onSubmit={handleSubmit} className='grocery-form'>
        {alert.show && <Alert alert={alert}/>}
        <h3>Grocery Bud</h3>
        <div className='form-control'>

        <input className="grocery" type="text" value={name} placeholder='e.g. eggs' onChange={(e)=>setName(e.target.value)}   />
        <button className="submit-btn">{isediting? "edit":"Submit"}</button>
        </div>
  
        </form>
        {list.length>0 && <div className='grocery-container'>
        

        <List items={list} handleDelete={handleDelete}  handleEdit={handleEdit}/>
        <button onClick={handleClear} className='clear-btn'>Clear items</button>
        </div>}
    
    
  </section>


}

export default App
