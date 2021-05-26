import React, { Component } from "react";
import OtpInput from "react-otp-input";
import Button from "@material-ui/core/Button";

class MobileValidation extends Component {
    constructor(props) {
        super(props);
        this.state = {
           otp: "",
           isResend: false,
           resendedOtp:""
       };
      }
  

  handleChange = (otp) => this.setState({ otp });

  handleReset = () => {
    // alert("OTP sent to your registered Mobile number");
    this.setState({isResend: true})
    const url =
        "http://rabbitnonprod-login.us-east-1.elasticbeanstalk.com/rabbit/user/sendotp/122445545";
      fetch(url, {
        method: "POST",
        crossDomain: true,
        headers: new Headers({
          // allowOrigins:"*",
          // allowCredentials:true,
          // Accept: 'application/json',
          "x-api-key": "3XU9oFBTVJ5CAkZtddhiU4WrINPiQRQ89n0ISQrj",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
        }), 
      })
        .then((resp) => resp.json())
        .then((result) => {
          if (result) {
            this.setState({ resendedOtp: result.mobileVerificationCode }, () => {
              // this.props.handleNextScreen(false, result.mobileVerificationCode);
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  };

   handleValidate = () => {
    alert("Thanks for Validating click ok to continue next");
    console.log(this.state, this.props)
    if(this.state.isResend){
      if(this.state.otp === this.state.resendedOtp){
        this.props.handleNextScreen(true);
        this.setState({isResend:false})
      }
      else{
        alert("Invalid OTP");
      }
    }
    else{
      if(this.state.otp === this.props.mobileOTP)
      this.props.handleNextScreen(true);
      else{
        alert("Invalid OTP");
      }
    }  
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
          onClick={() => this.handleReset()}
        >
          Resend OTP
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

