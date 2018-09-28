import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProfile, setPrimates } from '../../redux/reducer';
import Primate from '../Primate/Primate';
import { Link } from 'react-router-dom';
import './meet.css';

class Meet extends Component {
    componentDidMount() {
        this.props.setPrimates();
        window.scrollTo(0,0);
    }
    render() { 
        let { primateList, admin, deleteProfile, isLoading } = this.props;
        const mappedList = primateList.map(primate => {
            return (
                <div className="primate" key={primate.id}>
                    <Primate {...primate} />
                   {admin && <div className="adminButtons">
                       <Link to={`/add-primate/${primate.id}`}>Edit Profile</Link>
                       <Link className="delete" to='/' onClick={() => deleteProfile(primate.id)}>Delete Profile</Link>
                       </div>}
                </div>
            )
        })
    
        return ( 
            <div className="meet">
                <button onClick={() => this.props.history.goBack()}>Go Back</button>
                <h1>Meet The Primates</h1>
                {isLoading ? <span id="loader" className="loadingSpinner">Loading</span> : mappedList }
            </div>
         );
    }
}
const mapStateToProps = state => {
    const { primateList, admin, isLoading } = state.primates;
    return {
        primateList,
        admin,
        isLoading
    }
}
const mapDispatchToProps = {
    deleteProfile,
    setPrimates
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Meet);