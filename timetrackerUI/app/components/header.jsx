import React from "react";
import {Link}  from "react-router-dom";
 
class Header extends React.Component
{
    render()
    {
        return (
            <div class="header">
                <div class="tasks-cat">
                    <Link className={"header-link"} to="/">Все</Link> 
                    <Link className={"header-link"} to="/done">Выполненные</Link>
                    <Link className={"header-link"} to="/undone">Невыполненные</Link>
                </div>
                {/* <p class="add-bt">Добавить задачу</p> */}
                <Link className={"add-bt"} to="/create-task">Добавить задачу</Link>
            </div>
        )
    }
}

export default Header;