import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPrimates, deleteProfile } from '../../redux/primateReducer';
import Meet from '../Meet/Meet';
import PrimateProfile from '../PrimateProfile/PrimateProfile';

class PrimatesContainer extends Component {
    componentDidMount() {
        this.props.setPrimates();
    }
    
    render() { 
        const primates = withPrimateData(Meet, {...this.props});
        const primateProfile = withPrimateData(PrimateProfile, {...this.props});
        return ( 
            <div>
                {this.props.match.path == '/meet-the-primates' && primates}
                {this.props.match.path == '/meet-the-primates/:id' && primateProfile}
            </div>
         );
    }
}

const mapStateToProps = state => {
    let { primateList, isLoading, admin } = state.primates;
    return {
        primateList,
        isLoading,
        admin
    }
}
const mapDispatchToProps = {
    setPrimates,
    deleteProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimatesContainer);

//HOC
//Primate
function withPrimateData(WrappedComponent, props) {
    return <WrappedComponent props={props} />
}