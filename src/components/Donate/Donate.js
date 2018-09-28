import React from 'react';
import './donate.css';

const Donate = () => {
    return ( 
        <div className="donate">
            Donate
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                <div align="center">
                    <input name="cmd" value="_s-xclick" type="hidden" />
                    <input name="submit" alt="PayPal - The safer, easier way to pay online!" src="https://www.paypal.com/en_US/i/btn/btn_donate_LG.gif" type="image" border="0" />
                    <img alt="" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" border="0" />
                    <input name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
                    " type="hidden" />
                </div>
    </form>
        </div>
     );
}
 
export default Donate;