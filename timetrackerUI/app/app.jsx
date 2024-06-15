import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TasksPage from "./components/tasksPage.jsx";
import NotFound from "./components/notFound.jsx";
import CreatePage from "./components/createTask.jsx";
import Header from "./components/header.jsx" 


ReactDOM.createRoot(
    document.getElementById("app")
)
.render(
    <Router>
        <div>
           <Header />
                <Routes>
                    <Route path="/" element={<TasksPage />} />
                    <Route path="/done" element={<TasksPage />} />
                    <Route path="/undone" element={<TasksPage />} />
                    <Route path="/create-task" element={<CreatePage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
        </div>
    </Router>
);