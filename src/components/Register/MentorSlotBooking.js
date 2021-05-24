import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

class MentorSlotBooking extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }


    getInitialState = () => ({
        data: {
          day: "",
          time: "",
      }});


      handleChange = (e) => {
        this.setState({
          data: {
            ...this.state.data,
            [e.target.name]: e.target.value,
    
          },
        });
        console.log(this.state.data)
      };

      onBlur =() => {
          this.props.getBookingDetails(this.state.data)
      }
    render() { 
        return ( 
            <div>
                Book the Slot
                <FormControl required>
              <InputLabel id="day">
                Day
              </InputLabel>
              <Select
                style={{ paddingRight: "30px" }}
                labelId="day"
                id="day"
                name="day"
                value={this.state.day}
                onChange={this.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thrusday">Thrusday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
              </Select>
            </FormControl>
            <span/><span/>
            <FormControl required>
              <InputLabel id="time">
                Time
              </InputLabel>
              <Select
                style={{ paddingRight: "30px" }}
                labelId="time"
                id="time"
                name="time"
                value={this.state.time}
                onChange={this.handleChange}
                onBlur={()=>this.onBlur()}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="10 am">10 am</MenuItem>
                <MenuItem value="11 am">11 am</MenuItem>
                <MenuItem value="12 Noon">12 Noon</MenuItem>
                <MenuItem value="1 pm">1 pm</MenuItem>
                <MenuItem value="2 pm">2 pm</MenuItem>
                <MenuItem value="3 pm">3 pm</MenuItem>

              </Select>
            </FormControl>
                {/* <Button style = {{textAlign:"center"}}
          variant="contained"
          color="primary"
          onClick={() => this.handleConfirm()}
          className={classes.button}
        >
          {activeStep === steps.length - 1 ? "Confirm Slot" : "Next"}
          Confirm the Slot
        </Button> */}
            </div>
         );
    }
}
 
export default MentorSlotBooking;
