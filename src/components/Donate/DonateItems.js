import React, { Component } from 'react';
import barrels from '../images/redbarrels.jpg';
import cornCrib from '../images/corncrib.jpg';
import fireHose from '../images/firehose.jpg';
import toys from '../images/toys.jpg';
import playhouse from '../images/playhouse.jpg';
import feeding from '../images/feeding.jpg';
import helpingHands from '../images/helping-hands.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './donate.css'

class DonateItems extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: [
                {id: 0, itemName: 'Large Plastic Barrels', itemUrl: barrels, itemDesc: 'We use these barrels – which should be clean and never have contained any chemicals - as shelters in our outdoor cages. We like to hang them or place them so our friends have an alternative shelter to get out of the weather or to take an afternoon snooze.'},
                {id: 1, itemName: 'Corn Crib Cages', itemUrl: cornCrib, itemDesc: 'Corn crib cages, usually used to keep corn, are just great additions to our habitats. We can use them to provide “turrets” for our primate homes. These are also known as silo cages and are manufactured by Behlen Industries in several sizes.'},
                {id: 2, itemName: 'Plastic Rabbit Water Bottles & Feed Buckets', itemUrl: feeding, itemDesc: '24 and 32 ounce size bottles and 2 Quart feeding buckets plus cage hangers for bucket placement on the enclosure are ideal. We get thirsty and hungry out here!'},
                {id: 3, itemName: 'Larger Action Figure Toys', itemUrl: toys, itemDesc: 'The capuchins just love to play with these!'},
                {id: 4, itemName: 'Playhouses', itemUrl: playhouse, itemDesc: 'Tyco/Little Tykes playhouses are just great for the gibbons to and larger monkeys, who love to play in and around them.'},
                {id: 5, itemName: 'Canvas Fire Hoses', itemUrl: fireHose, itemDesc: 'These sturdy hoses – often discarded by fire departments when they may not be useful for fighting fires – are great for hanging on and provide hours of enrichment possibilities.'},
                {id: 6, itemName: 'You', itemUrl: helpingHands, itemDesc: `One thing we can always use are helping hands. Volunteers play an important role and are vital to The Talkin’ Monkeys Project mission.`}                
            ]
         }
    }
    render() { 
        let { items } = this.state;
        console.log(this.props);
        let mappedItems = items.map(item => {
            let { id, itemName, itemUrl, itemDesc } = item;
            console.log(itemUrl);
            
            return <div className="item" key={id}>
                        <img src={itemUrl} alt={itemName} />
                        <h3>{itemName}</h3>
                        <p>{itemDesc}</p>
            </div>
        })
        return ( 
            <div className="donate-items">
                <h2>
                    Debbie and Tom Misotti rely on donations to help provide the 15 monkeys and apes that live here with the food and support they need.
                </h2>
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                    <div align="center">
                        <input name="cmd" value="_s-xclick" type="hidden" />
                        <input name="submit" alt="PayPal - The safer, easier way to pay online!" src="https://www.paypal.com/en_US/i/btn/btn_donate_LG.gif" type="image" border="0" />
                        <img alt="" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" border="0" />
                        <input name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
                        " type="hidden" />
                    </div>
                </form>
                <h3>Here are a few things that will help:</h3>
                <div className="items">
                {mappedItems}
                </div>
                <Link to='/volunteer'>Get Involved!</Link>
            </div>
         );
    }
}
const mapStateToProps = state => {
    let { primateList } = state.primates;

    return {
        primateList
    }
}
 
 
export default connect(mapStateToProps, {})(DonateItems);