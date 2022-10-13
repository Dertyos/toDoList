import React, { useState, useEffect } from "react";

const BASE_URL = "https://assets.breatheco.de/apis/fake/todos/" /* URL API */

export const ToDo = () => {

    const [listToDo, setToDo] = useState([])
    const [usuario, setUsuario] = useState("");

    const crearUsuario = async () => {       /* Funcion Crear usuario, al que se le asignaran las tareas */
        let URI = `${BASE_URL}user/${usuario}`;

        try {
            let respuesta = await fetch(URI, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([])
            });
            console.log(respuesta.ok)
            let respuestaJSON = await respuesta.json()
            console.log(respuestaJSON)
        } catch {
            (e) => console.log(e)
        }
    }

    const actualizarToDos = async () => {
        let URI = `${BASE_URL}user/${usuario}`;

        try {
            let respuesta = await fetch(URI)

            if (respuesta.ok) {
                let respuestaJSON = await respuesta.json()
                setToDo(respuestaJSON)
                console.log(listToDo)
            } else {
                console.log("Respuesta fallida")
                setToDo([])
            }
        } catch (e) {
            console.log(e)
        }
    }

    const cambiarTarea = async (indiceTarea) => {
        let URI = `${BASE_URL}user/${usuario}`;
        let arrayAux = listToDo.slice()
        if(arrayAux[0].label == "No hay tareas"){
            arrayAux[0]= { label: `${indiceTarea}`, done: false }
        } else {
            arrayAux.push({ label: `${indiceTarea}`, done: false })
        }
        
        setToDo(arrayAux)

        try {
            let respuesta = await fetch(URI, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(listToDo),

            })
            console.log(respuesta.ok)
                let respuestaJSON = await respuesta.json()
                console.log(respuestaJSON)
                actualizarToDos()
            
        } catch { (error) => { console.log(error) } }
    }


    const eliminarTarea = async (indiceTarea) => {
        let URI = `${BASE_URL}user/${usuario}`;

        let auxArr = listToDo.filter((item, indice) => {
            return indice !== indiceTarea
        })

        if (auxArr.length !== 0) {
            try {
                let respuesta = await fetch(URI, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(auxArr),
                })
                console.log(respuesta.ok)
                let respuestaJSON = await respuesta.json()
                console.log(respuestaJSON)
                actualizarToDos()
            } catch { (error) => { console.log(error) } }
        } else {
            try {
                let respuesta = await fetch(URI, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify([{label:"No hay tareas", done:true}])
                });
                console.log(respuesta.ok)
                let respuestaJSON = await respuesta.json()
                console.log(respuestaJSON)
                actualizarToDos()
            } catch {
                (e) => console.log(e)
            }
        }
    }



    /* function deleteItem(indiceTarea) {
        setToDo((prevState) => {
            return prevState.filter((item, index) => {
                return index !== indiceTarea;
            });
        });
    } */


    return (
        <div className="card m-3">
            <input type="text" placeholder="Ingresa Usuario"
                onKeyUp={(e) => {
                    if (e.keyCode == "13") {
                        setUsuario(e.target.value)       /* Input que al presionar enter, cambia el estado usuario al del ingresado en el input */
                    }
                }}
            />
            <button type="button" onClick={() => crearUsuario()}>Ingresar Usuario</button> {/* Boton que ejecuta crear usuario al ser oprimido */}
            <button type="button" onClick={() => actualizarToDos()}>Actualizar tareas del usuario</button> {/* Boton que ejecuta crear usuario al ser oprimido */}

            <input type="text" placeholder="Escribe una nueva tarea"
                onKeyUp={(e) => {
                    if (e.keyCode == "13") {
                        cambiarTarea(e.target.value)
                        e.target.value = ""
                    }
                }}
            />
            <ul>
                {listToDo.map((item, indice) => {
                    return (
                        <li className="m-2 list-group-item d-flex justify-content-between"
                            key={indice}>
                            {item.label}
                            <button type="button"
                                className="btn btn-light"
                                onClick={() => {
                                    eliminarTarea(indice)
                                }}>x</button>
                        </li>
                    )
                })
                }
            </ul>

        </div>
    )

}