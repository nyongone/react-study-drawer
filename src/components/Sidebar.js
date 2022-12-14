import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SidebarItem from './Sidebar/SidebarItem';
import SidebarItems from '../SidebarItems';
import { ChevronLeft20Filled } from '@fluentui/react-icons';


const Sidebar = () => {
    const [isExpanded, setisExpanded] = useState(true);
    const loc = useLocation();
    const sRef = useRef(null);
    const handleExpand = () => {
        setisExpanded(!isExpanded);
    };

    useEffect(() => {
        const event = window.addEventListener("mousedown", (e) =>{
            if (isExpanded) return;
            if (e.target !== sRef.current && e.path.includes(sRef.current) === false) setisExpanded(true);
        });
    });

    return (
        <>
            <Styled.Wrapper ref={sRef} active={isExpanded}>
                <Styled.ExpandButton active={isExpanded} onClick={handleExpand}><ChevronLeft20Filled/></Styled.ExpandButton>
                <Styled.List active={isExpanded}>
                    {SidebarItems.map(({ id, type, icon, title, page}) => {
                        if (type === "item") {
                        return <SidebarItem 
                        active={(loc.pathname === page) ? true : false}
                        key={id} 
                        type={type}
                        icon={icon} 
                        title={title} 
                        page={page} />
                        }
                    })}
                </Styled.List>
                <Styled.Divider/>
                <Styled.List>
                    <Styled.List active={isExpanded}>
                        <SidebarItem key="link1" type="link" icon="" title="Link 1" page="" />
                    </Styled.List>
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
        padding-top: 30px;
        ${(props) => props.active &&`
            width: 50px;
        `}
    `,

    ExpandButton: styled.button`
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50px;
        top: 10px;
        right: -15px;
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

    Divider: styled.hr`
        width: auto;
        margin: 10px;
    `,

    List: styled.ul`
        width: 200px;
        min-height: 50px;
        float: left;
        overflow: hidden;
        transition: .3s width ease;
        ${(props) => props.active &&`
            width: 50px;
        `}
    `,

    SearchBox: styled.input`
        width: 170px;
        height: 30px;
        background-color: rgba(0,0,0,0.3);
        border-radius: 10px;
        outline: none;
        border: 0;
    `,
};

export default Sidebar;