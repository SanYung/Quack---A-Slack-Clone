import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props){
        super(props)
    }
    
    display(){ 
        return(this.props.currentUser ? (
        <div className="navbarcontainer">
            <div className="navbar">
                <span className='left-nav'>
                    <img id="duck" src={window.logo} />
                    <Link id="logo" to="/">Quack</Link> &nbsp;&nbsp;
                    <a href='https://www.linkedin.com/in/sansan-kung/' id="aboutme" target="_blank">LinkedIn</a>
                    <a href="https://github.com/SanYung" id="aboutme" target="_blank">GitHub</a>
                    <a href="https://angel.co/u/san-yung" id="aboutme" target="_blank">AngelList</a>
                </span>
                <span className="right-nav">
                    <button className="logoutbutton" onClick={this.props.deleteSession}>Log Out</button>
                </span>

            </div>
        </div>
    ) : (
        <div className = "navbarcontainer" >
            <div className="navbar">
                <span className='left-nav'>
                        <img id="duck" src={window.logo} />
                        <Link id="logo" to="/">Quack</Link> &nbsp;&nbsp;
                        <a href='https://www.linkedin.com/in/sansan-kung/' id="aboutme" target="_blank">LinkedIn</a>
                        <a href="https://github.com/SanYung" id="aboutme" target="_blank">GitHub</a>
                        <a href="https://angel.co/u/san-yung" id="aboutme" target="_blank">AngelList</a>
                </span>

                <span className="right-nav">
                <Link id="loginbutton"  to="/login"><span>Log In</span></Link>
                <Link id="signupbutton" to="/signup">SIGN UP</Link>
                </span>
            </div>
        </div>
        )
    )}

    render(){
        return (
                <div>
                    {this.display()}
                </div>
        );
    }

}

export default Navbar