import React from "react";

import {Header} from "./Header";

export class Root extends React.Component{
    render() {
        return (
            <div className="Root">
                <p>Root</p>
                <Header />
                <div className="InnerRoot">
                    {this.props.children}
                </div>
            </div>
        );
    }
}