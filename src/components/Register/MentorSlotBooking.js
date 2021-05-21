import React, { Component } from 'react';
import Button from "@material-ui/core/Button";

class MentorSlotBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleConfirm = () => {
        alert("sucessfully registered")

    }
    render() { 
        return ( 
            <div>
                Book the Slot
                <br/><br/><br/><br/>
                <Button style = {{textAlign:"center"}}
          variant="contained"
          color="primary"
          onClick={() => this.handleConfirm()}
          // className={classes.button}
        >
          {/* {activeStep === steps.length - 1 ? "Confirm Slot" : "Next"} */}
          Confirm the Slot
        </Button>
            </div>
         );
    }
}
 
export default MentorSlotBooking;