import React from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import axios from "axios";

export class SignUp extends React.Component {

    // stringify = (x) => {
    //     console.log(Object.prototype.toString.call(x));
    // }

    FormSubmit = e => {
        e.preventDefault();

        var formData = $('#SignUpForm').serialize();

        var Password = $('#Password').val();
        var ConfirmPassword = $('#ConfirmPassword').val();
        var TickCol = $('#Tick');

        if(TickCol[0].checked)
        {
            if(Password == ConfirmPassword)
            {
                Swal.fire({
                    title: 'Submitting...',
                    text: 'Please Wait',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
                Swal.showLoading();

                axios
                    .post('create_user', formData)
                    .then((resp) => {
                        // alert(JSON.stringify(resp));
                        var json = resp['data'];
                        // alert(JSON.stringify(data));
                        // var json = JSON.parse(data);
                        // console.log(json);

                        var Status = json['Status'];
                        if(Status == "Error")
                        {
                            alert('Some Error Occurred');
                            console.log(e);
                        }
                        else if(Status == "Invalid")
                        {
                            alert('Invalid Details Found');
                        }
                        else if(Status == "Exists")
                        {
                            alert('Email Id already Exists');
                        }
                        else
                        {
                            window.sessionStorage.setItem("UserId", json['UserId']);
                            window.sessionStorage.setItem("Name", json['Name']);
                            window.open('Products', '_self');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
            else
            {
                alert('Password should match');
                $('#Password').focus();
            }
        }
        else
        {
            alert('Please Confirm the terms');
            TickCol.focus();
        }
    };

    render() {
        return (
            <div className="SignUpForm">
                <form id='SignUpForm' onSubmit={this.FormSubmit}>
                    <p className="SignUpTitle">Create Account</p>
                    <label className="SignUp_InnerCols">
                        <span>Your Name <i className="Required"></i></span>
                        <input type="text" required id="Name" name="Name" />
                    </label>
                    <label className="SignUp_InnerCols">
                        <span>Email Id <i className="Required"></i></span>
                        <input type="email" required id="EmailId" name="EmailId" />
                    </label>
                    <label className="SignUp_InnerCols">
                        <span>Contact No. (Optional)</span>
                        <input type="number" maxLength={10} id="ContactNo" name="ContactNo" />
                    </label>
                    <label className="SignUp_InnerCols">
                        <span>Password <i className="Required"></i></span>
                        <input type="password" required id="Password" name="Password" />
                    </label>
                    <label className="SignUp_InnerCols">
                        <span>Confirm Password <i className="Required"></i></span>
                        <input type="password" required id="ConfirmPassword" name="ConfirmPassword" />
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', marginTop: '5px', marginBottom: '5px', fontFamily: 'Calibri'}}>
                        <input type={"checkbox"} id="Tick" required style={{margin: '0 5px 0 0'}} />
                        <span>I agree to <a style={{color: '#0066c0',display: 'inline-block',cursor: 'pointer'}}>Terms of Service</a> and <a style={{color: '#0066c0',display: 'inline-block',cursor: 'pointer'}}>Privacy Policy</a></span>
                    </label>
                    <center>
                        <button className="Button" id="CreateBtn">Create</button>
                    </center>
                    <p style={{fontFamily: 'Calibri', marginTop: '10px'}}>
                        <span>Already have an account, </span>
                        <a href="/SignIn" style={{color: '#ff1e1e',display: 'inline-block',cursor: 'pointer'}}>Sign In</a>
                    </p>
                </form>
            </div>
        );
    }
}