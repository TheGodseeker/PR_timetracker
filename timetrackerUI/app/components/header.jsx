import React from "react";
import {Link}  from "react-router-dom";
 
class Header extends React.Component
{
    render()
    {
        return (
            <div class="header">
                <div class="tasks-cat">
                    <Link className={"header-link"} to="/" onClick={window.location.reload}>Все</Link> 
                    <Link className={"header-link"} to="/done" onClick={window.location.reload}>Выполненные</Link>
                    <Link className={"header-link"} to="/undone" onClick={window.location.reload}>Невыполненные</Link>
                </div>
                <Link className={"add-bt"} to="/create-task">Добавить задачу</Link>
            </div>
        )
    }
}

export default Header;