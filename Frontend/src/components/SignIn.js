import React from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import axios from "axios";

export class SignIn extends React.Component {
    FormSubmit = e => {
        e.preventDefault();

        var formData = $('#SignInForm').serialize();

        var TickCol = $('#Tick');

        if(TickCol[0].checked)
        {
            Swal.fire({
                title: 'Submitting...',
                text: 'Please Wait',
                allowOutsideClick: false,
                allowEscapeKey: false
            });
            Swal.showLoading();

            axios
                .post('login_user', formData)
                .then((resp) => {
                    Swal.close();
                    var json = resp['data'];

                    var Status = json['Status'];
                    if(Status == "Error")
                    {
                        alert('Some Error Occurred');
                        console.log(e);
                    }
                    else if(Status == "Invalid")
                    {
                        alert('Invalid Credentials');
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
            alert('Please Confirm the terms');
            TickCol.focus();
        }
    };

    render() {
        return (
            <div className="SignInForm">
                <form id='SignInForm' onSubmit={this.FormSubmit}>
                    <p className="SignInTitle">Sign In</p>
                    <label className="SignIn_InnerCols">
                        <span>Email Id</span>
                        <input type="email" required id="EmailId" name="EmailId" />
                    </label>
                    <label className="SignIn_InnerCols">
                        <span>Password</span>
                        <input type="password" required id="Password" name="Password" />
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', marginTop: '5px', marginBottom: '5px', fontFamily: 'Calibri'}}>
                        <input type={"checkbox"} id="Tick" required style={{margin: '0 5px 0 0'}} />
                        <span>I agree to <a style={{color: '#0066c0',display: 'inline-block',cursor: 'pointer'}}>Terms of Service</a> and <a style={{color: '#0066c0',display: 'inline-block',cursor: 'pointer'}}>Privacy Policy</a></span>
                    </label>
                    <center>
                        <button className="Button" id="SignInBtn">Sign In</button>
                    </center>
                    <p style={{fontFamily: 'Calibri', marginTop: '10px'}}>
                        <span>Not Registered yet, </span>
                        <a href="/SignUp" style={{color: '#ff1e1e',display: 'inline-block',cursor: 'pointer'}}>Sign Up</a>
                    </p>
                </form>
            </div>
        );
    }
}