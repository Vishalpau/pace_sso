import React, { Component } from 'react';
//import Footer from '../../components/common/Footer';
//import Header from '../../components/common/Header';

export default class PublicLayout extends Component {
    render() {
        const Component = this.props.component;
        const route = this.props.route;
        const user = this.props.user;
        return (
            <div className="bg-white">
                {/* <Header /> */}
                <Component route={route} />
                {/* <Footer /> */}
            </div>
        );
    }
}
