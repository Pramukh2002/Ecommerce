import React from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import axios from "axios";
import { Products } from "./Products";

var TotalProducts = 0;
const GetProductsInCart = () => {

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
                    var TotalAmt = 0;
                    TotalProducts = Products.length;

                    for(var i = 0; i < Products.length; i++)
                    {
                        var Product = Products[i];
                        var ProductDiv = document.createElement('a');
                        ProductDiv.className = "Cart_ProductDiv";   
                        ProductDiv.href = "../../Product/" + Product['ProductId'] + "/" + Product['ProductName'].replaceAll(" ", "+");
        
                        var ProductImgCol = document.createElement('div');
                        ProductImgCol.className = "Cart_ProductImgCol";
                        ProductImgCol.innerHTML = "<img src='" + Product['Photo'] + "' />";
                        ProductDiv.append(ProductImgCol);
                        
                        var ProductsDetailsCol = document.createElement('div');
                        ProductsDetailsCol.className = "Cart_ProductDetailsCol";

                        $(ProductsDetailsCol).append("<p style='margin: 0; font-size: 24px; font-family: Calibri; font-weight: bold'>" + Product['ProductName'] + "</p>");
                        $(ProductsDetailsCol).append("<p style='margin: 15px 0 0 0; font-size: 16px; font-family: Calibri'>Colour - <strong>" + Product['Colour'] + "</strong></p>");

                        ProductDiv.append(ProductsDetailsCol);

                        var ProductsPriceCol = document.createElement('div');
                        ProductsPriceCol.className = "Cart_ProductPriceCol";
                        ProductsPriceCol.innerHTML = "<i class='fas fa-rupee-sign'></i> " + parseFloat(Product['Amount']).toFixed(2);
                        ProductDiv.append(ProductsPriceCol);
                        
                        TotalAmt += parseFloat(Product['Amount']);

                        $('#ProductsInCart').append(ProductDiv);
                    }

                    $('.AmountCol').html((TotalAmt).toFixed(2));
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    else
    {
        window.open('../../Products', '_self');
    }

};

export class Cart extends React.Component {

    CheckCart = e => {
        if(TotalProducts < 1)
        {
            alert('There are no items in cart')
            e.preventDefault();
        }
    }

    render() {
        return (
            <div className="Cart_MainDiv">
                <div style={{width: '100%', display: 'flex'}}>
                    <div className="CartProductsListMainCol">
                        <h2>Shopping Cart</h2>
                        <p style={{borderBottom: '1px solid gray', textAlign: 'right', fontSize: '16px', fontFamily: 'Calibri', padding: '0 3px 2px 0'}}>Price</p>
                        <div id="ProductsInCart"></div>
                        <p style={{textAlign: 'right', fontSize: '25px', fontFamily: 'Calibri', padding: '10px 3px 2px 0', fontWeight: 'bold'}} id="TotalPrice">Total : <i style={{fontSize: '18px'}} className="fas fa-rupee-sign"></i> <span className='AmountCol'>0</span></p>
                    </div>
                    <div className="CartTotalMainCol">
                        <center>
                            <a onClick={this.CheckCart} href="OrderConfirmation" id='Cart_BuyBtn' className="Button" style={{margin: '20px auto', fontSize: '20px', background: 'brown', padding: '6px 54px'}}>Proceed to Buy</a>
                        </center>
                    </div>
                </div>
                {GetProductsInCart()}
            </div>
        );
    };
};