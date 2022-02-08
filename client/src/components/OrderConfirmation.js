import React from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import axios from "axios";

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

const GetAddress = () => {

    if(sessionStorage.getItem("UserId") != null)
    {
        var UserId = sessionStorage.getItem("UserId");
        axios
            .post('../../get_address', "UserId=" + UserId)
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
                    var AddressDetails = json['AddressDetails'];

                    for(var i = 0; i < AddressDetails.length; i++)
                    {
                        var Address = AddressDetails[i];
                        $('#Address_HouseNo').val(Address['HouseNo'] == null ? "" : Address['HouseNo']);
                        $('#Address_Building').val(Address['Building'] == null ? "" : Address['Building']);
                        $('#Address_Landmark').val(Address['Landmark'] == null ? "" : Address['Landmark']);
                        $('#Address_Area').val(Address['Area'] == null ? "" : Address['Area']);
                        $('#Address_District').val(Address['District'] == null ? "" : Address['District']);
                        $('#Address_State').val(Address['State'] == null ? "" : Address['State']);
                        $('#Address_Pincode').val(Address['Pincode'] == null ? "" : Address['Pincode']);
                    }
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

export class OrderConfirmation extends React.Component {

    ProceedBtnClickEvent = e => {
        if(sessionStorage.getItem("UserId") != null)
        {
            var UserId = sessionStorage.getItem("UserId");
            if($('#Address_HouseNo').val() == "")
            {
                $('#Address_HouseNo').focus();
            }
            else if($('#Address_Building').val() == "")
            {
                $('#Address_Building').focus();
            }
            else if($('#Address_District').val() == "")
            {
                $('#Address_District').focus();
            }
            else if($('#Address_State').val() == "")
            {
                $('#Address_State').focus();
            }
            else if($('#Address_Pincode').val() == "")
            {
                $('#Address_Pincode').focus();
            }
            else
            {
                var formData = $('#AddressForm').serialize();
                Swal.fire({
                    title: 'Processing...',
                    text: 'Please Wait',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
                Swal.showLoading();
                axios
                    .post('place_order', "UserId=" + UserId + "&" +formData)
                    .then((resp) => {
                        Swal.close();
                        var json = resp['data'];
        
                        var Status = json['Status'];
                        if(Status == "Error")
                        {
                            alert('Some Error Occurred');
                            console.log(e);
                        }
                        else
                        {
                            Swal.fire({
                                title: 'Order Placed Successfully',
                                icon: 'success',
                                confirmButtonText: 'View Orders'
                            }).then((result) => {
                                window.open('MyOrders', '_self');
                            })
                            // axios
                            //     .post('process_order', formData)
                            //     .then((resp) => {
                            //         Swal.close();
                            //         var json = resp['data'];
        
                            //         var Status = json['Status'];
                            //         if(Status == "Error")
                            //         {
                            //             alert('Some Error Occurred');
                            //             console.log(e);
                            //         }
                            //         else
                            //         {
                            //             Swal.fire({
                            //                 title: 'Order Placed Successfully',
                            //                 type: 'success',
                            //                 confirmButtonText: 'View Orders'
                            //             }).then((result) => {
                            //                 window.open('MyOrders', '_self');
                            //             })
                            //         }
                            //     })
                            //     .catch(err => {
                            //         console.error(err);
                            //     });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }
        // $('#AddressForm')[0].submit();
    }


    render() {
        return (
            <div className="Cart_MainDiv">
                <div style={{width: '100%', display: 'flex'}}>
                    <div className="CartProductsListMainCol">
                        <h2>Address</h2>
                        <form id='AddressForm' style={{margin: '10px 0 35px 0', padding: '0 0 20px 20px', borderBottom: '1px solid gray', fontFamily: 'Calibri', fontSize: '17px'}}>
                            <p style={{display: 'flex', margin: '0 0 3px 0', alignItems: 'center'}}>
                                <span style={{width: '180px'}}>House / Flat No. <i className="Required"></i></span>
                                <span>
                                    <input required name='HouseNo' id="Address_HouseNo" type='text' style={{width: '300px', height: '23px'}} />
                                </span>
                            </p>
                            <p style={{display: 'flex', margin: '0 0 3px 0', alignItems: 'center'}}>
                                <span style={{width: '180px'}}>Building / Block <i className="Required"></i></span>
                                <span>
                                    <input required name='Building' id="Address_Building" type='text' style={{width: '300px', height: '23px'}} />
                                </span>
                            </p>
                            <p style={{display: 'flex', margin: '0 0 3px 0', alignItems: 'center'}}>
                                <span style={{width: '180px'}}>Landmark</span>
                                <span>
                                    <input name='Landmark' id="Address_Landmark" type='text' style={{width: '300px', height: '23px'}} />
                                </span>
                            </p>
                            <p style={{display: 'flex', margin: '0 0 3px 0', alignItems: 'center'}}>
                                <span style={{width: '180px'}}>Area</span>
                                <span>
                                    <input name='Area' id="Address_Area" type='text' style={{width: '300px', height: '23px'}} />
                                </span>
                            </p>
                            <p style={{display: 'flex', margin: '0 0 3px 0', alignItems: 'center'}}>
                                <span style={{width: '180px'}}>District <i className="Required"></i></span>
                                <span>
                                    <input required name='District' id="Address_District" type='text' style={{width: '300px', height: '23px'}} />
                                </span>
                            </p>
                            <p style={{display: 'flex', margin: '0 0 3px 0', alignItems: 'center'}}>
                                <span style={{width: '180px'}}>State <i className="Required"></i></span>
                                <span>
                                    <input required name='State' id="Address_State" type='text' style={{width: '300px', height: '23px'}} />
                                </span>
                            </p>
                            <p style={{display: 'flex', margin: '0 0 3px 0', alignItems: 'center'}}>
                                <span style={{width: '180px'}}>Pincode <i className="Required"></i></span>
                                <span>
                                    <input required name='Pincode' id="Address_Pincode" type='number' style={{width: '300px', height: '23px'}} />
                                </span>
                            </p>
                            {/* <center>
                                <button className="Button">Update Address</button>
                            </center> */}
                        </form>
                        <h2>Shopping Cart</h2>
                        <p style={{borderBottom: '1px solid gray', textAlign: 'right', fontSize: '16px', fontFamily: 'Calibri', padding: '0 3px 2px 0'}}>Price</p>
                        <div id="ProductsInCart"></div>
                        <p style={{textAlign: 'right', fontSize: '25px', fontFamily: 'Calibri', padding: '10px 3px 2px 0', fontWeight: 'bold'}} id="TotalPrice">Total : <i style={{fontSize: '18px'}} className="fas fa-rupee-sign"></i> <span className='AmountCol'>0</span></p>
                    </div>
                    <div className="CartTotalMainCol">
                        <center>
                            <a id='Cart_BuyBtn' onClick={this.ProceedBtnClickEvent} className="Button" style={{margin: '20px auto', fontSize: '20px', background: 'brown', padding: '6px 54px'}}>Proceed to Buy</a>
                        </center>
                    </div>
                </div>
                {GetProductsInCart()}
                {GetAddress()}
            </div>
        );
    };
};