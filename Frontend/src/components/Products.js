import React from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import axios from "axios";
import "../css/products.css";

const GetProducts = () => {

    axios
        .post('get_products', "")
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

                for(var i = 0; i < Products.length; i++)
                {
                    var Product = Products[i];
                    var ProductDiv = document.createElement('a');
                    ProductDiv.className = "ProductDiv";
                    ProductDiv.href = "Product/" + Product['ProductId'] + "/" + Product['ProductName'].replaceAll(" ", "+");
    
                    var ProductImgCol = document.createElement('div');
                    ProductImgCol.className = "ProductImgCol";
                    ProductImgCol.innerHTML = "<img src='" + Product['Photo'] + "' />";
                    ProductDiv.append(ProductImgCol);
                    
                    var ProductsPriceCol = document.createElement('div');
                    ProductsPriceCol.className = "ProductsPriceCol";
                    ProductsPriceCol.innerHTML = "<span class='RupeeSign'><i class='fas fa-rupee-sign'></i></span><span class='Products_Price'>" + parseFloat(Product['Amount']).toFixed(2) + "</span>";
                    ProductDiv.append(ProductsPriceCol);
                    
                    var ProductsDiv_Title = document.createElement('div');
                    ProductsDiv_Title.className = "ProductsDiv_Title";
                    ProductsDiv_Title.innerHTML = Product['ProductName'];
                    ProductDiv.append(ProductsDiv_Title);
                    
                    $('.ProductsDisplayCol').append(ProductDiv);
                }
            }
        })
        .catch(err => {
            console.error(err);
        });

};

export class Products extends React.Component {
    render() {
        return (
            <div className="ProductsCol">
                {GetProducts()}
                <div>
                    <p className="ProductsTitle">Explore Products</p>
                    <div className="ProductsDisplayCol"></div>
                </div>
            </div>
        );
    }
}