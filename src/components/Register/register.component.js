import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap';
import { isEmail, isMobilePhone } from 'validator';


class Register extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        data: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
           
        },
        errors: {}
    });

    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
    }

    validate = () => {
        const { data } = this.state;
        let errors = {};

        if (data.firstName === '') errors.firstName = 'First Name can not be blank.';
        if (data.lastName === '') errors.lastName = 'Last Name can not be blank.';
        if (!isEmail(data.email)) errors.email = 'Email must be valid.';
        if (data.email === '') errors.email = 'Email can not be blank.';
        if (data.phoneNumber === '') errors.phoneNumber = 'Phone number  can not be blank.';
        if (!isMobilePhone(data.phoneNumber)) errors.phoneNumber = 'Mobile Number must be valid.';

        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            console.log(data);
            //Call an api here
            //Resetting the form
            this.setState(this.getInitialState());
        } else {
            this.setState({ errors });
        }
    }

    render() {
        const { data, errors } = this.state;
        return (
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                id="firstName"
                value={data.firstName}
                invalid={errors.firstName ? true : false}
                name="firstName"
                onChange={this.handleChange}
              />
              <FormFeedback>{errors.firstName}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={data.lastName}
                invalid={errors.lastName ? true : false}
                name="lastName"
                onChange={this.handleChange}
              />
              <FormFeedback>{errors.lastName}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                value={data.email}
                invalid={errors.email ? true : false}
                name="email"
                onChange={this.handleChange}
              />
              <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
<FormGroup>
              <Label for="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                value={data.phoneNumber}
                invalid={errors.phoneNumber ? true : false}
                name="phoneNumber"
                onChange={this.handleChange}
              />
              <FormFeedback>{errors.phoneNumber}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="firstName">First Child</Label>
              <Input
                id="firstName"
                value={data.firstName}
                invalid={errors.firstName ? true : false}
                name="firstName"
                onChange={this.handleChange}  placeholder= "Enter Child first name"
              />
              <br/>
               <Input
                id="firstName"
                value={data.firstName}
                invalid={errors.firstName ? true : false}
                name="firstName"
                onChange={this.handleChange}  placeholder= "Enter child last name"
              />
              <FormFeedback>{errors.firstName}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="firstName">Second  Child</Label>
              <Input
                id="firstName"
                value={data.firstName}
                invalid={errors.firstName ? true : false}
                name="firstName"
                onChange={this.handleChange}  placeholder= "Enter Child first name"
              />
              <br/>
               <Input
                id="firstName"
                value={data.firstName}
                invalid={errors.firstName ? true : false}
                name="firstName"
                onChange={this.handleChange}  placeholder= "Enter child last name"
              />
              <FormFeedback>{errors.firstName}</FormFeedback>
            </FormGroup>
           

            <Button color="primary">Next</Button>
          </Form>
        );
    }
}

export default Register;