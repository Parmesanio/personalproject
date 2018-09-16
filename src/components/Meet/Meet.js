import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProfile } from '../../redux/reducer';
import Primate from '../Primate/Primate';
import { Link } from 'react-router-dom';

class Meet extends Component {
    render() { 
        let { primateList, admin, deleteProfile } = this.props;
        const mappedList = primateList.map(primate => {
            return (
                <div key={primate.id}>
                    <Primate {...primate} />
                   {admin && <Link to={`/add-primate/${primate.id}`}>Edit Profile</Link>}
                   {admin && <button onClick={() => deleteProfile(primate.id)}>Delete Profile</button>}
                </div>
            )
        })
        return ( 
            <div>
                {mappedList}
            </div>
         );
    }
}
const mapStateToProps = state => {
    const { primateList, admin } = state.primates;
    return {
        primateList,
        admin
    }
}
const mapDispatchToProps = {
    deleteProfile
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Meet);