import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { deleteProfile, setPrimates } from '../../redux/primateReducer';
import Primate from '../Primate/Primate';
import { Link } from 'react-router-dom';
import './meet.css';

class Meet extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isHovered: []
         }
         this.handleHoverEnter = this.handleHoverEnter.bind(this);
         this.handleHoverExit = this.handleHoverExit.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0,0);
    }
    handleHoverEnter(i) {
        //CLOSURE
        return () => {
            if (this.state.isHovered[i]) {
                return this.state
            }
            let isHovered = [...this.state.isHovered]
            isHovered[i] = !isHovered[i];
            this.setState({
                ...this.state, isHovered
            })
        }
    }
    handleHoverExit() {
        if (this.state.isHovered === false) {
            return this.state;
          }
          this.setState({ ...this.state, isHovered: false });
    }
    render() { 
        let { primateList, admin, isLoading, deleteProfile } = this.props.props;
        const mappedList = primateList.map((primate, i) => {
            return (
                <div className="primate" key={primate.id}>
                    <Primate {...primate} isHovered={this.state.isHovered[i]} handleHoverEnter={this.handleHoverEnter(i)} handleHoverExit={this.handleHoverExit} />
                   {admin && <div className="adminButtons">
                       <Link to={`/add-primate/${primate.id}`}>Edit Profile</Link>
                       <Link className="delete" to='/meet-the-primates' onClick={() => deleteProfile(primate.id)}>Delete Profile</Link>
                       </div>}
                </div>
            )
        })
    
        return ( 
            <div className="meet">
                <h1 className="meet-greeting">Meet The Primates</h1>
                <h3 className="meet-greeting">Select a diamond to view their profile</h3>
                {isLoading && <span id="loader" className="loadingSpinner">Loading</span>}
                <div className="diamondWrapper">
                    {mappedList}
                </div>
            </div>
         );
    }
}

export default Meet;