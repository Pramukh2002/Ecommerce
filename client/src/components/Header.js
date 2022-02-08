import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import axios from "axios";
import Cart from "../images/Cart.png"
import { Products } from "./Products";

var UserId = "", Name = "";
var Validated = false;

const RenderInnerHeader = () => {
    if(sessionStorage.getItem("UserId") != null)
    {
        Validated = true;
        UserId = sessionStorage.getItem("UserId");
        Name = sessionStorage.getItem("Name");

        axios
            .post('../../get_products_in_cart', "UserId=" + UserId)
            .then((resp) => {
                Swal.close();
                var json = resp['data'];

                var Status = json['Status'];
                if(Status == "Error")
                {
                    alert('Some Error Occurred');
                    console.log(json['Message']);
                }
                else
                {
                    var Products = json['Products'];

                    if(Products.length >= 0)
                    {
                        $('#CartQuan').html(Products.length);
                    }
                }
            })
            .catch(err => {
                console.error(err);
            });


        return (<>
            <div className="OrderDetailsBtnCol">
                <Link to="/MyOrders">My Orders</Link>
            </div>
            <div className="UserCol" style={{textAlign: 'left', fontFamily: 'Calibri', minWidth: '150px'}}>
                <i onClick={LogoutBtnClick} className="fas fa-power-off" id="LogoutBtn"></i>
                <span style={{fontSize: '12px'}}>Hello,<br></br><span>{Name}</span></span>
            </div>
            <div className="CartBtnCol">
                <Link to="/Cart" style={{width: 'fit-content', margin: '0 auto'}}>
                    <span id="CartQuan">0</span>
                    <img src={Cart} style={{width: '46px', marginRight: '7px'}} />
                </Link>
            </div>
        </>)
    }
    else
    {
        return (<>
            <div className="SignInBtnCol">
                <Link to="/SignIn">Sign In</Link>
            </div>
            <div className="SignUpBtnCol">
                <Link to="/SignUp">Sign Up</Link>
            </div>
        </>);
    }
}

const LogoutBtnClick = e => {

    if(window.confirm('Are you sure to Logout'))
    {
        sessionStorage.removeItem('UserId');
        
        var url = window.location.pathname;
        var Slashes = url.split("/").length;
    
        if(Slashes == 1)
        {
            window.open('Products', '_self');
        }
        else
        {
            var AddSlashes = ""
            for(var i = 0; i < (Slashes - 2); i++)
            {
                AddSlashes += "../";
            }
            window.open(AddSlashes + 'Products', '_self');
        }
        }
}

const SearchBtnClick = e => {
    var SearchTxt = $('#SearchTextCol').val();

    var url = window.location.pathname;
    var Slashes = url.split("/").length;

    if(Slashes == 1)
    {
        window.open('Products?Search=' + SearchTxt, '_self');
    }
    else
    {
        var AddSlashes = ""
        for(var i = 0; i < (Slashes - 2); i++)
        {
            AddSlashes += "../";
        }
        window.open(AddSlashes + 'Products?Search=' + SearchTxt, '_self');
    }
};

export const Header = (props) => {

    var HeaderInner;

    // useEffect(() => {
    //     if(sessionStorage.getItem("UserId") != null)
    //     {
    //         Validated = true;
    //         UserId = sessionStorage.getItem("UserId");
    //     }
    //     else
    //     {
    //     }
    // })

    return (
        <div className='Header'>
            <div style={{display: 'flex',width: '100%', alignItems: "center"}}>
                <div className="TitleName">ABC</div>
                <div className="ProductsBtnCol">
                    <Link to="/Products">Products</Link>
                </div>
                <div className="SearchFullCol">
                    <div className="SearchMainCol">
                        <input type="text" id="SearchTextCol" placeholder="Search Product" />
                        <button onClick={SearchBtnClick} id="SearchBtn"><i className="fas fa-search"></i></button>
                    </div>
                </div>
                {RenderInnerHeader()}
                
            </div>
        </div>
    )
}