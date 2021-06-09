import './App.css';
import Header from './Component/Header';
import {Footer} from './Component/Footer';
import {Todos} from './Component/Todos';
import React, { useState, useEffect } from 'react';
import { AddTodo } from './Component/AddTodo';
import { About } from './Component/About';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
function App() {
  let initTodo;
  if(localStorage.getItem("todos")){
    initTodo=[];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete=(todo)=>{
    console.log("I am ondelete of todo", todo)
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const addTodo=(title, desc)=>{
    console.log("I am adding this todo", title, desc);
    let sno;
    if(todos.length===0){
      sno=0;
    }
    else{
      sno = todos[todos.length-1].sno+1;
    }
    const myTodo={
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
    
    
    localStorage.setItem("todos", JSON.stringify(todos));
    
  }
  const [todos, setTodos]=useState([]);
  return (
    <>
    <Router>
    <Header title="My Todos List" searchBar={false}/>
    <Switch>
          <Route exact path="/" render={()=>{
            return(
            <>
            <AddTodo addTodo={addTodo}/>
    <Todos todos={todos} onDelete={onDelete}/>
    </>)
          }}>
            
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
    
    <Footer/>
    </Router>
    </>
  );
}

export default App;
