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
import FormHelperText from "@material-ui/core/FormHelperText";

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
      phoneNumber: "",
      childOnefirstName: "",
      childOnelastName: "",
      childOnegrade: "",
    },
    errors: {},
    checked: false,
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
    const { data } = this.state;
    let errors = {};

    if (data.firstName === "")
      errors.firstName = "First Name can not be blank.";
    if (data.lastName === "") errors.lastName = "Last Name can not be blank.";
    if (!isEmail(data.email)) errors.email = "Email must be valid.";
    if (data.email === "") errors.email = "Email can not be blank.";
    if (data.phoneNumber === "")
      errors.phoneNumber = "Phone number  can not be blank.";
    if (!isMobilePhone(data.phoneNumber))
      errors.phoneNumber = "Mobile Number must be valid.";
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

    const { data } = this.state;

    const errors = this.validate();

    if (Object.keys(errors).length === 0 && this.state.checked) {
      console.log(data);

      // fetch("https://51g6p2l2k0.execute-api.us-east-1.amazonaws.com/nonprod/rabbit/user/sendotp/2222222222",
      //   {
      //     method: "POST",
      //     headers: {
      //       "x-api-key": "3XU9oFBTVJ5CAkZtddhiU4WrINPiQRQ89n0ISQrj",
      //     },
      //   }
      // )
      //   .then((res) => res.json())
      //   .then(
      //     (result) => {
      //       debugger;
      //       // this.setState({
      //       //   isLoaded: true,
      //       //   items: result.items,
      //       // });
      //     },
      //     // Note: it's important to handle errors here
      //     // instead of a catch() block so that we don't swallow
      //     // exceptions from actual bugs in components.
      //     (error) => {
      //       debugger;
      //       // this.setState({
      //       //   isLoaded: true,
      //       //   error,
      //       // });
      //     }
      //   );

        fetch(url, { method: "GET", withCredentials: true, headers: { "X-Auth-Token": "ef72570ff371408f9668e414353b7b2e", "Content-Type": "application/json" } }) .then(resp => resp.json()) .then(function(data) { console.log(data); }) .catch(function(error) { console.log(error); });

      this.props.handleNextScreen(true);

      //Call an api here
      //Resetting the form
    } else {
      this.setState({ errors });
      this.props.handleNextScreen(false);
    }
  };

  handleChecked = (e) => {
    this.setState({ checked: e.target.checked });
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
              value={data.phoneNumber}
              invalid={errors.phoneNumber ? true : false}
              name="phoneNumber"
              onChange={this.handleChange}
              label="Mobile Number"
              fullWidth
              autoComplete="family-name"
            />
            <div style={{ color: "red" }}> {errors.phoneNumber}</div>
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
            {/* <TextField
              required
              id="childOnegrade"
              value={data.childOnegrade}
              invalid={errors.childOnegrade ? true : false}
              name="childOnegrade"
              onChange={this.handleChange}
              label="Grade"
              fullWidth
            /> */}
            <FormControl>
              <InputLabel id="demo-simple-select-required-label">
                Grade
              </InputLabel>
              <Select
                style={{ paddingRight: "25px" }}
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Pre-k</MenuItem>
                <MenuItem value={20}>KG</MenuItem>
                <MenuItem value={30}>Grade-1</MenuItem>
                <MenuItem value={30}>Grade-2</MenuItem>
                <MenuItem value={30}>Grade-4</MenuItem>
                <MenuItem value={30}>Grade-5</MenuItem>
                <MenuItem value={30}>Grade-6</MenuItem>
              </Select>
              {/* <FormHelperText>Required</FormHelperText> */}
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
              required
              id="address1"
              name="address1"
              label="First Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} sm={4}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Last Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} sm={4}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Grade"
              fullWidth
            />
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
