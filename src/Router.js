import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import App from './App';
import Test from './pages/Test';
import RouteTest from './pages/RouteTest';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Sidebar />}>
                    <Route path="/" element={<App />}></Route>
                    <Route path="/test" element={<Test />}></Route>
                    <Route path="/test2" element={<Test />}></Route>
                    <Route path="/test3" element={<Test />}></Route>
                    <Route path="/routetest" element={<RouteTest/>}>
                        <Route path=":id" element={<RouteTest />}></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;