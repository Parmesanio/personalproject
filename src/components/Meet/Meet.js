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
         this.handleHover = this.handleHover.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0,0);
    }
    handleHover(i) {
        //CLOSURE
        return () => {
            let isHovered = [...this.state.isHovered]
            isHovered[i] = !isHovered[i];
            this.setState({
                ...this.state, isHovered
            })
        }
    }
    render() { 
        let { primateList, admin, isLoading, deleteProfile } = this.props.props;
        let mappedStorage = [],
            mappedList    = [];
        if(navigator.onLine) {
            mappedList = primateList.map((primate, i) => {
                return (
                    <div className="primate" key={primate.id}>
                        <Primate 
                            {...primate} 
                            isHovered={this.state.isHovered[i]} 
                            handleHover={this.handleHover(i)} 
                             />
                    {admin && <div className="adminButtons">
                        <Link to={`/add-primate/${primate.id}`}>Edit Profile</Link>
                        <Link className="delete" to='/meet-the-primates' onClick={() => deleteProfile(primate.id)}>Delete Profile</Link>
                        </div>}
                    </div>
                )
            })
        }
    
        if(localStorage.getItem('primates')) {
            mappedStorage = JSON.parse(localStorage.getItem('primates')).map((primate, i) => {
                return <div className="primate" key={primate.id}>
                <Primate {...primate} isHovered={this.state.isHovered[i]} handleHover={this.handleHover(i)} />
            {admin && <div className="adminButtons">
                <Link to={`/add-primate/${primate.id}`}>Edit Profile</Link>
                <Link className="delete" to='/meet-the-primates' onClick={() => deleteProfile(primate.id)}>Delete Profile</Link>
                </div>}
            </div>
        }) 
    }
        return ( 
            <div className="meet">
                <h1 className="meet-greeting">Meet The Primates</h1>
                <h3 className="meet-greeting">Select a diamond to view their profile</h3>
                {isLoading && <span id="loader" className="loadingSpinner">Loading</span>}
                <div className="diamondWrapper">
                    {navigator.onLine ? mappedList : mappedStorage}
                </div>
            </div>
         );
    }
}

export default Meet;