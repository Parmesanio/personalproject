import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPrimates, deleteProfile } from '../../redux/reducer';
import Primate from '../Primate/Primate';

class Meet extends Component {
    componentDidMount() {
        this.props.setPrimates()
    }
    render() { 
        let { primateList, admin, deleteProfile } = this.props;
        const mappedList = primateList.map(primate => {
            return (
                <div key={primate.id}>
                    <Primate {...primate} />
                   {admin && <button>Edit Profile</button>}
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
    setPrimates,
    deleteProfile
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Meet);