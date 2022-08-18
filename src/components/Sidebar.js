import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SidebarItem from './Sidebar/SidebarItem';
import SidebarItems from '../SidebarItems';
import { ChevronLeft20Filled } from '@fluentui/react-icons';


const Sidebar = () => {
    const [isExpanded, setisExpanded] = useState(true);
    const loc = useLocation();
    const handleExpand = (e) => {
        e.stopPropagation();
        setisExpanded(!isExpanded);
    };

    useEffect(() => {
        const event = window.addEventListener("click", (e) =>{
            if (isExpanded) return;
            if (e.target != <Styled.Wrapper/>) setisExpanded(true);
        });
    });

    return (
        <>
            <Styled.Wrapper onClick={(e) => e.stopPropagation()} active={isExpanded}>
                <Styled.ExpandButton active={isExpanded} onClick={handleExpand}><ChevronLeft20Filled/></Styled.ExpandButton>
                <Styled.List active={isExpanded} onClick={(e) => e.stopPropagation()}>
                    {Object.entries(SidebarItems).map(([key, value]) => {
                        return <SidebarItem 
                        active={(loc.pathname === value.page) ? true : false}
                        key={key} 
                        icon={value.icon} 
                        title={value.title} 
                        page={value.page} />
                    })}
                </Styled.List>
            </Styled.Wrapper>
            <Outlet />
        </>
    );
};

const Styled = {
    Wrapper: styled.div`
        position: fixed;
        left: 0;
        height: 100%;
        width: 200px;
        background-color: #f0f0f0;
        transition: .3s width ease;
        box-shadow: 5px 0 5px -5px rgba(0,0,0,0.2), 8px 0 10px 0px rgba(0,0,0,0.1);
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        ${(props) => props.active &&`
            width: 50px;
        `}
    `,

    ExpandButton: styled.button`
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50px;
        top: 50%;
        right: -20px;
        margin: 5px 0;
        outline: none;
        border: none;
        background-color: white;
        cursor: pointer;
        padding: 0;
        transition: .3s transform ease;
        box-shadow: 0 0 5px 0px rgba(0,0,0,0.2), 0 0 10px 0px rgba(0,0,0,0.1);
        ${(props) => props.active && `
            transform: rotate(-180deg);
        `}
    `,

    List: styled.div`
        width: 200px;
        padding-top: 30px;
        min-height: 50px;
        float: left;
        overflow: hidden;
        transition: .3s width ease;
        ${(props) => props.active &&`
            width: 50px;
        `}
    `,
};

export default Sidebar;