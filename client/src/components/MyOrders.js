import React from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import axios from "axios";

const GetProductsOrdered = () => {

    if(sessionStorage.getItem("UserId") != null)
    {
        var UserId = sessionStorage.getItem("UserId");
        axios
            .post('../../get_products_ordered', "UserId=" + UserId)
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

                    for(var i = 0; i < Products.length; i++)
                    {
                        var Product = Products[i];
                        var ProductDiv = document.createElement('a');
                        ProductDiv.className = "Orders_ProductDiv";   
                        ProductDiv.href = "../../Product/" + Product['ProductId'] + "/" + Product['ProductName'].replaceAll(" ", "+");
        
                        var ProductImgCol = document.createElement('div');
                        ProductImgCol.className = "Orders_ProductImgCol";
                        ProductImgCol.innerHTML = "<img src='" + Product['Photo'] + "' />";
                        ProductDiv.append(ProductImgCol);
                        
                        var ProductsDetailsCol = document.createElement('div');
                        ProductsDetailsCol.className = "Orders_ProductDetailsCol";

                        $(ProductsDetailsCol).append("<p style='margin: 0; font-size: 24px; font-family: Calibri; font-weight: bold'>" + Product['ProductName'] + "</p>");
                        $(ProductsDetailsCol).append("<p style='margin: 0px 0 0 0; font-size: 16px; font-family: Calibri'>Colour - <strong>" + Product['Colour'] + "</strong></p>");
                        $(ProductsDetailsCol).append("<p style='margin: 0px 0 0 0; font-size: 16px; font-family: Calibri'>Order Id - <strong>" + Product['OrderId'] + "</strong></p>");
                        $(ProductsDetailsCol).append("<p style='margin: 0px 0 0 0; font-size: 16px; font-family: Calibri'>Ordered on - <strong>" + Product['OrderedTime'] + "</strong></p>");

                        ProductDiv.append(ProductsDetailsCol);

                        var ProductsPriceCol = document.createElement('div');
                        ProductsPriceCol.className = "Orders_ProductPriceCol";
                        ProductsPriceCol.innerHTML = (Product['Status'] == null ? "<span style='color: #cb0a0a'>Out for Delivery</span>" : "");
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

export class MyOrders extends React.Component {

    BuyBtnClickEvent = e => {
        // window.open('')
    };

    render() {
        return (
            <div className="Orders_MainDiv">
                <div style={{width: '100%', display: 'flex'}}>
                    <div className="OrdersProductsListMainCol">
                        <h2>My Orders</h2>
                        <p style={{borderBottom: '1px solid gray', textAlign: 'right', fontSize: '16px', fontFamily: 'Calibri', padding: '0 3px 2px 0'}}>Status</p>
                        <div id="ProductsInCart"></div>
                    </div>
                </div>
                {GetProductsOrdered()}
            </div>
        );
    };
};