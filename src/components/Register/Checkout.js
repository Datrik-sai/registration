import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import RegistrationForm from "./registration";
import MobileValidation from "./MobileValidation";
import MentorSlotBooking from "./MentorSlotBooking";
import logo from "../Images/RabbitBoard.PNG";
// import Review from './Review';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://rabbitboardapp.com">
        RabbitBoardApp.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Registration", "OTP Validation", "Mentor Slot Booking"];
  const [mobileOTPValue, setMobileOTPValue] = useState("");
  const [basicFormData, setbasicFormData]= useState({});
  const [basicbookingData, setbasicBookingData] = useState({});

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <RegistrationForm
            getFormData={(formData)=>getFormData(formData)}
            handleNextScreen={(value, otp) => handleNextScreen(value, otp)}
          />
        );
      case 1:
        return (
          <MobileValidation
            handleNextScreen={(value, otp) => handleNextScreen(value, otp)}
            mobileOTP={mobileOTPValue}
          />
        );
      case 2:
        return <MentorSlotBooking getBookingDetails={(bookingData)=>getBookingDetails(bookingData)} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const getFormData = (formData)=> {
    setbasicFormData(formData)
  }

  const getBookingDetails = (bookingData) => {
    setbasicBookingData(bookingData)
  }

  const handleNextScreen = (value, mobileOTP) => {
    if (value) {
      setActiveStep(activeStep + 1);
      setMobileOTPValue(mobileOTP);
      
    }
  };

  const onConfirmSlotClick = () => {
    console.log(basicFormData, basicbookingData)
    debugger
    const url =
        "http://rabbitnonprod-login.us-east-1.elasticbeanstalk.com/rabbit/user/summerregistration";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          "firstName":basicFormData.firstName,
          "lastName":basicFormData.lastName,
          "email":basicFormData.email,
          "phone":basicFormData.phone,
          "childList":basicFormData.childList,
          "days":[basicbookingData.day],
          "hours":[basicbookingData.time]
          }),
        crossDomain: true,
        // headers: {
        //  " x-api-key" : "3XU9oFBTVJ5CAkZtddhiU4WrINPiQRQ89n0ISQrj",
        // }
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
        .then((data) => {
          if (data) {
            this.setState({ mobileOTP: data.mobileVerificationCode }, () => {
              this.props.handleNextScreen(true, data.mobileVerificationCode, this.state.data);
            });
          }
        })
        // .then(function(data) {
        //   if(data){
        //     debugger
        //   }
        //   debugger
        //   this.setState({mobileOTP:data.mobileVerificationCode})// need to reverify the response
        // })
        .catch(function (error) {
          console.log(error);
        });
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const myStyle = {
    borderRadius: "50%",
    maxWidth: "30%",
    height: "auto",
    display: "block",
    marginLeft: "20px",
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        className={classes.appBar}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,0,0,0), rgba(200,0,0,1))",
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <img src={logo} alt="Logo" style={myStyle} />
            <Link color="inherit" href="/">
              Rabbit Board
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ fontSize: "22px" }}
          >
            RabbitBoard Free Summer Classes
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you we have Registerd your Information successfully
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep == 2 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={()=>onConfirmSlotClick()}
                      className={classes.button}
                    >
                      Confirm Slot
                      {/* {activeStep === steps.length - 1 ? "Confirm Slot" : "Next"} */}
                    </Button>
                  ) : null}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
