import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { isEmail, isMobilePhone } from "validator";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    data: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      childList: [],
      childOnefirstName: "",
      childOnelastName: "",
      childOnegrade:"",
      childSecondfirstName: "",
      childSecondlastName: "",
      childSecondgrade:"",
    },
    errors: {},
    checked: false,
    mobileOTP: "",
  });

  handleChange = (e) => {
      this.setState({
        data: {
          ...this.state.data,
          [e.target.name]: e.target.value,

        },
        errors: {
          ...this.state.errors,
          [e.target.name]: "",
        },
      });
  };

  validate = () => {
    const { data, mobileOTP } = this.state;
    let errors = {};

    if (data.firstName === "")
      errors.firstName = "First Name can not be blank.";
    if (data.lastName === "") errors.lastName = "Last Name can not be blank.";
    if (!isEmail(data.email)) errors.email = "Email must be valid.";
    if (data.email === "") errors.email = "Email can not be blank.";
    if (data.phone === "")
      errors.phone= "Phone number  can not be blank.";
    if (!isMobilePhone(data.phone))
      errors.phone = "Mobile Number must be valid.";
    if (data.childOnefirstName === "")
      errors.childOnefirstName = "First Name can not be blank.";
    if (data.childOnelastName === "")
      errors.childOnelastName = "Last Name can not be blank.";
    // if (data.childOnegrade === "")
    //   errors.childOnegrade = "Child Grade can not be blank.";
    if (!this.state.checked) errors.checked = "please accept to proceed next";
    return errors;
  };

  handleNext = () => {
    // e.preventDefault();

    const { data, mobileOTP } = this.state;

    const errors = this.validate();

    if (Object.keys(errors).length === 0 && this.state.checked) {
      console.log(data);
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
            this.setState({ mobileOTP: result.mobileVerificationCode }, () => {
              console.log(data)
              this.props.handleNextScreen(true, result.mobileVerificationCode);
            });
           
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        this.props.getFormData(data);
    } else {
      this.setState({ errors });
      this.props.handleNextScreen(false);
    }
  };

  handleChecked = (e) => {
    this.setState({ checked: e.target.checked });
    if(this.state.data.childOnefirstName || this.state.data.childOnelastName || this.state.data.childOnegrade){
      this.state.data.childList.push({"firstName" : this.state.data.childOnefirstName,"lastName": this.state.data.childOnelastName,"currentLevel": this.state.data.childOnegrade})
    }
    if(this.state.data.childSecondfirstName || this.state.data.childSecondlastName || this.state.data.childSecondgrade){
      this.state.data.childList.push({"firstName" : this.state.data.childSecondfirstName,"lastName": this.state.data.childSecondlastName,"currentLevel":this.state.data.childSecondgrade})
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom style={{ fontSize: "18px" }}>
          Parent Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              value={data.firstName}
              invalid={errors.firstName ? true : false}
              name="firstName"
              onChange={this.handleChange}
              label="First name"
              fullWidth
              autoComplete="given-name"
            />
            <div style={{ color: "red" }}> {errors.firstName}</div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              value={data.lastName}
              invalid={errors.lastName ? true : false}
              name="lastName"
              onChange={this.handleChange}
              label="Last name"
              fullWidth
              autoComplete="family-name"
            />
            <div style={{ color: "red" }}> {errors.lastName}</div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              value={data.email}
              invalid={errors.email ? true : false}
              name="email"
              onChange={this.handleChange}
              label="Email Id"
              fullWidth
              autoComplete="given-name"
            />
            <div style={{ color: "red" }}> {errors.email}</div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="mobileNumber"
              value={data.phone}
              invalid={errors.phone ? true : false}
              name="phone"
              onChange={this.handleChange}
              label="Mobile Number"
              fullWidth
              autoComplete="family-name"
            />
            <div style={{ color: "red" }}> {errors.phone}</div>
          </Grid>
        </Grid>
        <br />
        <br />
        <Typography variant="h6" gutterBottom style={{ fontSize: "18px" }}>
          First Child Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} sm={4}>
            <TextField
              required
              id="childOnefirstName"
              value={data.childOnefirstName}
              invalid={errors.childOnefirstName ? true : false}
              name="childOnefirstName"
              onChange={this.handleChange}
              label="First Name"
              fullWidth
            />
            <div style={{ color: "red" }}> {errors.childOnefirstName}</div>
          </Grid>
          <Grid item xs={12} sm={4} sm={4}>
            <TextField
              required
              id="childOnelastName"
              value={data.childOnelastName}
              invalid={errors.childOnelastName ? true : false}
              name="childOnelastName"
              onChange={this.handleChange}
              label="Last Name"
              fullWidth
            />
            <div style={{ color: "red" }}> {errors.childOnelastName}</div>
          </Grid>
          <Grid item xs={12} sm={4} sm={4}>
            <FormControl required>
              <InputLabel id="demo-simple-select-required-label">
                Grade
              </InputLabel>
              <Select
                style={{ paddingRight: "30px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="childOnegrade"
                value={data.childOnegrade}
                onChange={(e)=>this.handleChange(e)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="P">Pre-K</MenuItem>
                <MenuItem value="K">Kinder-Garten</MenuItem>
                <MenuItem value="1">First-Grade</MenuItem>
                <MenuItem value="2">Second-Grade</MenuItem>
                <MenuItem value="3">Third-Grade</MenuItem>
                <MenuItem value="4">Fourth-Grade</MenuItem>
                <MenuItem value="5">Fifth-Grade</MenuItem>
                <MenuItem value="6">Sixth-Grade</MenuItem>
              </Select>
            </FormControl>
            <div style={{ color: "red" }}> {errors.childOnegrade}</div>
          </Grid>
        </Grid>
        <br />
        <br />
        <Typography variant="h6" gutterBottom style={{ fontSize: "18px" }}>
          Second Child Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} sm={4}>
            <TextField
              id="childSecondfirstName"
              value={data.childSecondfirstName}
              invalid={errors.childSecondfirstName ? true : false}
              name="childSecondfirstName"
              onChange={this.handleChange}
              label="First Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} sm={4}>
            <TextField
              id="childSecondlastName"
              value={data.childSecondlastName}
              invalid={errors.childSecondlastName ? true : false}
              name="childSecondlastName"
              onChange={this.handleChange}
              label="Last Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} sm={4}>
            <FormControl>
              <InputLabel id="demo-simple-select-required-label">
                Grade
              </InputLabel>
              <Select
                style={{ paddingRight: "28px" }}
                labelId="childSecondgrade"
                id="childSecondgrade"
                name="childSecondgrade"
                value={data.childSecondgrade}
                onChange={this.handleChange}
                // onBlur={(e)=>this.onBlur(e,"two")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="P">Pre-K</MenuItem>
                <MenuItem value="K">Kinder-Garten</MenuItem>
                <MenuItem value="1">First-Grade</MenuItem>
                <MenuItem value="2">Second-Grade</MenuItem>
                <MenuItem value="3">Third-Grade</MenuItem>
                <MenuItem value="4">Fourth-Grade</MenuItem>
                <MenuItem value="5">Fifth-Grade</MenuItem>
                <MenuItem value="6">Sixth-Grade</MenuItem>
              </Select>
            </FormControl>
            <div style={{ color: "red" }}> {errors.childSecondgrade}</div>
          </Grid>
        </Grid>
        <br />
        <br />
        {/* <Typography variant="h6" gutterBottom style={{ fontSize: "18px" }}>
          Address
        </Typography> */}
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="state" label="State" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
            />
          </Grid> */}
          <Grid
            item
            xs={12}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="saveAddress"
                  value="yes"
                  checked={this.state.checked}
                  onChange={(e) => this.handleChecked(e)}
                />
              }
              label="Accept Terms and Conditions , Privacy Policy"
            />
            <div style={{ color: "red" }}> {errors.checked}</div>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.handleNext()}
          // className={classes.button}
        >
          {/* {activeStep === steps.length - 1 ? "Confirm Slot" : "Next"} */}
          Next
        </Button>
      </React.Fragment>
    );
  }
}

export default RegistrationForm;
