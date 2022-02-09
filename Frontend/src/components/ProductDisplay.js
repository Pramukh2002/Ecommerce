import React from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import axios from "axios";
import "../css/single_product.css";
import COD from '../images/COD.png'
import Replacement from '../images/Replacement.png'
import Warranty from '../images/Warranty.png'

var ProductId = "";
const GetProductDetails = () => {
    var url = window.location.pathname;
    ProductId = url.split("/")[2];

    axios
        .post('../../get_product_details', "Id=" + ProductId)
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
                var Products = json['Product'];

                if(Products.length < 0)
                {
                    alert('Invalid Product');
                    window.open("../../Products",'_self');
                }
                else
                {
                    for(var i = 0; i < Products.length; i++)
                    {
                        var Product = Products[i];
                        // var ProductDiv = document.createElement('div');
                        // ProductDiv.className = "Display_ProductDiv";
        
                        // var ProductImgCol = document.createElement('div');
                        // ProductImgCol.className = "Display_ProductImgCol";
                        // ProductImgCol.innerHTML = "<img src='" + Product['Photo'] + "' />";
                        // ProductDiv.append(ProductImgCol);
                        
                        // var ProductsDetailsCol = document.createElement('div');
                        // ProductsDetailsCol.className = "Display_ProductsDetailsCol";
                        // ProductDiv.append(ProductsDetailsCol);
                        
                        // $('.ProductDisplayCol').append(ProductDiv);

                        $('#Display_Img').attr('src', Product['Photo']);
                        $('#Display_ProductName').html(Product['ProductName']);
                        $('#Display_ProductAmt').html("<i class='fas fa-rupee-sign'></i> " + Product['Amount']);
                        $('#Display_ProductDesc').html("<div style='display: flex'><i style='margin: 0 5px 0 0; color: #ba2704' class='fas fa-long-arrow-alt-right'></i>" + Product['Description'].replaceAll("\n", "</div><div style='display: flex'><i style='margin: 0 5px 0 0; color: #ba2704' class='fas fa-long-arrow-alt-right'></i>") + "</div");
                    }

                    var ProductInformations = json['ProductInfo'];
                    if(ProductInformations.length < 0)
                    {
                        $('#Display_ProductInfoRows').parent().parent().hide();
                    }
                    else
                    {
                        for(var i = 0; i < ProductInformations.length; i++)
                        {
                            var ProductInfo = ProductInformations[i];

                            var tr = document.createElement('tr');

                            var td1 = document.createElement('td');
                            $(td1).html(ProductInfo['Name']);
                            $(tr).append(td1);
                            
                            var td2 = document.createElement('td');
                            $(td2).html(ProductInfo['Value']);
                            $(tr).append(td2);

                            $('#Display_ProductInfoRows').append(tr);
                        }
                    }
                }
            }
        })
        .catch(err => {
            console.error(err);
        });
};

const GetCartDetails = () => {
    var url = window.location.pathname;
    ProductId = url.split("/")[2];

    var AddedInCart = false;

    if(sessionStorage.getItem("UserId") != null)
    {
        var UserId = sessionStorage.getItem("UserId");
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
                        for(var i = 0; i < Products.length; i++)
                        {
                            var Product = Products[i];
                            if(ProductId == Product['ProductId'])
                            {
                                AddedInCart = true;
                            }
                        }
                    }
                }

                if(AddedInCart)
                {
                    var Col = $('#AddToCartBtn').parent();
                    $('#AddToCartBtn').remove();
                    Col.append("<span class='AddedToCartMsg'><i class='fas fa-check'></i> Added to Cart</span>")
                }
                else
                {
                    $('#AddToCartBtn').css('display', 'block');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    // if(AddedInCart)
    // {
    //     $('#AddToCartBtn').remove();
    // }
    // else
    // {
    //     alert();
    //     $('#AddToCartBtn').css('display', 'block');
    // }
};


export class ProductDisplay extends React.Component {

    AddToCartBtnClickEvent = e => {
        if(sessionStorage.getItem("UserId") != null)
        {
            var UserId = sessionStorage.getItem("UserId");

            Swal.fire({
                title: 'Adding...',
                text: 'Please Wait',
                allowOutsideClick: false,
                allowEscapeKey: false
            });
            Swal.showLoading();
            axios
                .post('../../add_to_cart', "UserId=" + UserId + "&ProductId=" + ProductId)
                .then((resp) => {
                    Swal.close();
                    var json = resp['data'];
    
                    var Status = json['Status'];
                    if(Status == "Error")
                    {
                        alert('Some Error Occurred');
                        console.log(e);
                    }
                    else if(Status == "Already")
                    {
                        alert('Product already in Cart');
                    }
                    else
                    {
                        var Col = $('#AddToCartBtn').parent();
                        $('#AddToCartBtn').remove();
                        Col.append("<span class='AddedToCartMsg'><i class='fas fa-check'></i> Added to Cart</span>")
                        $('#CartQuan').html((parseInt($('#CartQuan').html()) + 1));
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
        else
        {
            alert('Please Sign In to Continue');
            window.open('../../SignIn','_self');
        }
    };

    render() {
        return (
            <div className="ProductDisplayCol" style={{margin: '10px 10px'}}>
                {GetProductDetails()}
                <div className="Display_ProductDiv">
                    <div className="Display_ProductImgCol">
                        <img id='Display_Img' />
                    </div>
                    <div className="Display_ProductsDetailsCol">
                        <div className="Display_ProductName" id="Display_ProductName"></div>
                        <div className="AddToCartBtnCol">
                            <button className="Button" onClick={this.AddToCartBtnClickEvent} id="AddToCartBtn">
                                <i className="fas fa-cart-plus"></i>
                                Add to Cart
                            </button>
                            {GetCartDetails()}
                        </div>
                        <div className="Display_PriceCol">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span>M.R.P. :</span>
                                <span id="Display_ProductAmt"></span>
                            </div>
                        </div>
                        <div className="Display_Widgets">
                            <div className="Display_Widget">
                                <img src={COD} />
                                <span>Cash on Delivery</span>
                            </div>
                            <div className="Display_Widget">
                                <img src={Replacement} />
                                <span>7 Days Replacement</span>
                            </div>
                            <div className="Display_Widget">
                                <img src={Warranty} />
                                <span>12 Month Warranty</span>
                            </div>
                        </div>
                        <div className="Display_Description">
                            <span style={{fontFamily: 'monospace', marginBottom: '8px'}}><strong>About this Product</strong></span>
                            <span id="Display_ProductDesc"></span>
                        </div>
                        <div className="Display_ProductInformation">
                            <span style={{fontFamily: 'monospace', marginBottom: '8px'}}><strong>Product Information</strong></span>
                            <table cellSpacing={0} cellPadding={10} style={{marginTop: '8px'}}>
                                <tbody id='Display_ProductInfoRows'></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}