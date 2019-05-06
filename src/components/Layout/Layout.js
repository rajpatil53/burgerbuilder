import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    };

    toggleSideDrawer = () => {
        const currentState=this.state.showSideDrawer;
        this.setState({showSideDrawer:!currentState});
    };


    render() {
        return (
            <>
                <Toolbar toggle={this.toggleSideDrawer}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

export default Layout;