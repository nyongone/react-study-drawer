import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SidebarItem from './Sidebar/SidebarItem';
import { 
    ChevronRight20Filled,
    Home24Filled,
    Search24Filled,
    Map24Filled,
    Call24Filled
} from '@fluentui/react-icons'


const Sidebar = () => {
    const [isExpanded, setisExpanded] = useState(true);

    const handleExpand = () => {
        setisExpanded((prev) => !prev);
    };

    return (
        <>
            <Styled.Wrapper active={isExpanded}>
                <Styled.ExpandButton active={isExpanded} onClick={handleExpand}><ChevronRight20Filled/></Styled.ExpandButton>
                <Styled.List>
                    <SidebarItem icon={<Home24Filled/>} title="Home" page="/"/>
                    <SidebarItem icon={<Search24Filled/>} title="Find Places" page="/test"/>
                    <SidebarItem icon={<Map24Filled/>} title="View Map" page=""/>
                    <SidebarItem icon={<Call24Filled/>} title="Contact Us" page=""/>
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
        overflow: hidden;
        ${(props) => props.active &&`
            width: 50px;
        `}
    `,

    Divider: styled.hr`
        margin: 10px 0;
        width: 200px;
        float: left;
    `,

    ExpandButton: styled.button`
        width: 50px;
        height: 30px;
        float: right;
        margin: 5px 0;
        outline: none;
        border: none;
        background-color: transparent;
        cursor: pointer;
        padding: 0;
        transition: .3s transform ease;
        ${(props) => props.active && `
            transform: rotate(-180deg);
        `}
    `,

    List: styled.div`
        width: 200px;
        padding-top: 30px;
        min-height: 50px;
        float: left;
    `,
};

export default Sidebar;