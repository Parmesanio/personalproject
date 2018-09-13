import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPrimates } from '../../redux/reducer';
import Primate from '../Primate/Primate';

class Meet extends Component {
    componentDidMount() {
        this.props.setPrimates()
    }
    render() { 
        let { primateList } = this.props;
        const mappedList = primateList.map(primate => {
            return <Primate key={primate.id} {...primate} />
        })
        return ( 
            <div>
                {mappedList}
            </div>
         );
    }
}
const mapStateToProps = state => {
    const { primateList } = state.primates;
    return {
        primateList
    }
}
const mapDispatchToProps = {
    setPrimates
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Meet);