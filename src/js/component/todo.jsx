import React,{useState} from "react";

export const ToDo = () => {
    const[listToDo,setToDo] = useState([])

const deleteItem = (indiceTarea) => {
    setToDo((prevState)=>{
        return prevState.filter((item,index) => {
            return index !== indiceTarea;
        })
    })
}
return(
    <div className="card m-3">
        <input type="text" placeholder="Escribe una nueva tarea"
        onKeyUp={(e)=>{
            if(e.keyCode == "13") {
                let arrayAux = listToDo.slice()
                arrayAux.push(e.target.value)
                setToDo(arrayAux)
                e.target.value = ""
            }
        }}
        />
        <ul>
            {listToDo.map((item,indice) => {
                return(
                    <li className="m-2 list-group-item d-flex justify-content-between"
                    key={indice}>
                        {item}
                    <button type="button"                     
                    className="btn btn-light"
                    onClick={(e)=>{
                        deleteItem(indice)
                    }}>x</button>
                    </li>
                )
            })
            }
        </ul>
        
    </div>
)

}