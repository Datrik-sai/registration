import React, { Component } from "react";
import OtpInput from "react-otp-input";
import Button from "@material-ui/core/Button";

class MobileValidation extends Component {
    constructor(props) {
        super(props);
    
        // this.state = this.getInitialState();
      }
  state = { otp: "" };

  handleChange = (otp) => this.setState({ otp });

   handleGet = () => {
    alert("OTP sent to your registered Mobile number");
    
  };

   handleValidate = () => {
    alert("Thanks for Validating click ok to continue next");
    this.props.handleNextScreen(true);

  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h6 style={{ fontWeight: "bold", textAlign: "center" }}>
          Enter Verification Code
        </h6>
        <div style= {{display:"flex", justifyContent:"center"}}>
          <OtpInput
            inputStyle={{width:"2em"}}
            value={this.state.otp}
            onChange={this.handleChange}
            numInputs={6}
            separator={
              <span style={{ color: "black", padding: "20px" }}> - </span>
            }
          />
        </div>

        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => this.handleGet()}
        >
          Get OTP
        </Button>
        <span style={{ padding: "20px" }} />
        <Button style={{backgroundColor:"#0a800099",color:"white" }}
          size="small"
          variant="contained"
          color="success"
          onClick={() => this.handleValidate()}
        >
          Validate OTP
        </Button>
      </div>
    );
  }
}

export default MobileValidation;
