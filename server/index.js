const express = require("express");
const path = require('path');
const date = require('date-format');
const uuid = require('uuid');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

const MySQLCon = mysql.createConnection({
  host: '122.160.82.57',
  user: 'DBUser',
  password: 'Pramukh2002@1234',
  database: 'EcommerceApp',
  port: '3002'
});

var MySQLConnection = MySQLCon.state != "disconnected";
function ConnectDB()
{
  MySQLCon.connect(function(err)
  {
    if(err)
    {
      if (!err.fatal) {
        return;
      }
  
      if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
        {console.log(err);return;}
      }
    }

    MySQLConnection = true;
  });
}

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post("/create_user", (req, res) => {
  var Name = req.body.Name;
  var EmailId = req.body.EmailId;
  var ContactNo = req.body.ContactNo;
  var Password = req.body.Password;

  if(Name != "" && EmailId != "" && Password != "")
  {
    try
    {
      var CDate = date('dd/MM/yyyy', new Date());
      var CTime = date('hh:mm:ss', new Date());
      var UserId = uuid.v1();
      
      if(!MySQLConnection)
      {
        ConnectDB();
      }
  
      var Exists = false;
      MySQLCon.query("SELECT * FROM UserDetails WHERE EmailId = '" + EmailId + "'", function (err, result, fields) {
        if (err) {console.log(err);return;}

        for (var i = 0; i < result.length; i++)
        {
          var Row = result[i];
          if(Row['EmailId'] == EmailId)
          {
            Exists = true;
          }
        }
      });

      if(Exists)
      {
        res.json({
          'Status': 'Exists'
        })
      }
      else
      {
        var sql = "INSERT INTO UserDetails (UserId, Name, EmailId, ContactNo, Password, GenDate) VALUES ?";
        var values = [
          [UserId, Name, EmailId, ContactNo, Password, CDate + " " + CTime]
        ];
        MySQLCon.query(sql, [values], function (err, result) {
            if (err) {console.log(err);return;}
            res.json({
              'Status': 'Done',
              'UserId': UserId,
              'Name': Name
            })
        });
      }
    }
    catch(e)
    {
      res.json({
        'Status': 'Error',
        'Message': e
      })
    }
  }
  else
  {
    res.json({
      'Status': 'Invalid'
    })
  }
});

app.post("/login_user", (req, res) => {
  var EmailId = req.body.EmailId;
  var Password = req.body.Password;

  if(EmailId != "" && Password != "")
  {
    try
    {
      var UserId = "";
      var Name = "";
      
      if(!MySQLConnection)
      {
        ConnectDB();
      }

      MySQLCon.query("SELECT * FROM UserDetails WHERE EmailId = '" + EmailId + "' AND Password = '" + Password + "'", function (err, result, fields) {
        if (err) {console.log(err);return;}

        for (var i = 0; i < result.length; i++)
        {
          var Row = result[i];
          console.log(Row);
          UserId = Row['UserId'];
          Name = Row['Name'];
        }

        if(UserId == "")
        {
          res.json({
            'Status': 'Invalid'
          })
    
        }
        else
        {
          res.json({
            'Status': 'Done',
            'UserId': UserId,
            'Name': Name
          });
        }
      });
    }
    catch(e)
    {
      res.json({
        'Status': 'Error',
        'Message': e
      })
    }
  }
  else
  {
    res.json({
      'Status': 'Invalid'
    })
  }
});

app.post("/get_products", (req, res) => {
  try
  {
    if(!MySQLConnection)
    {
      ConnectDB();
    }

    MySQLCon.query("SELECT ProductId,ProductName,Photo,Amount FROM ProductDetails WHERE ProductShow = 'T' ORDER BY ProductName", function (err, result, fields) {
      if (err) {console.log(err);return;}

      res.json({
        'Status': 'Valid',
        'Products': result
      });
    });
  }
  catch(e)
  {
    res.json({
      'Status': 'Error',
      'Message': e
    })
  }
})

app.post("/get_product_details", (req, res) => {
  try
  {
    if(!MySQLConnection)
    {
      ConnectDB();
    }

    var ProductDetails = new Object();
    var ProductInfo = new Object();
    MySQLCon.query("SELECT * FROM ProductDetails WHERE ProductShow = 'T' AND ProductId = '" + req.body.Id + "'", function (err, result, fields) {
      if (err) {console.log(err);return;}

      ProductDetails = result;

      MySQLCon.query("SELECT * FROM ProductInformation WHERE ProductId = '" + req.body.Id + "'", function (err, result, fields) {
        if (err) {console.log(err);return;}

        ProductInfo = result;

        res.json({
          'Status': 'Valid',
          'Product': ProductDetails,
          'ProductInfo': ProductInfo
        });
      });
    });
  }
  catch(e)
  {
    res.json({
      'Status': 'Error',
      'Message': e
    })
  }
})

app.post("/add_to_cart", (req, res) => {
  try
  {
    if(!MySQLConnection)
    {
      ConnectDB();
    }

    var CDate = date('dd/MM/yyyy', new Date());
    var CTime = date('hh:mm:ss', new Date());
  var UserId = req.body.UserId;
    var ProductId = req.body.ProductId;
    var AlreadyAdded = false;
    MySQLCon.query("SELECT * FROM CartDetails WHERE UserId = '" + UserId + "' AND ProductId = '" + ProductId + "' AND Ordered IS NULL", function (err, result, fields) {
      if (err) {console.log(err);return;}

      for(var i = 0; i < result.length; i++)
      {
        AlreadyAdded = true;
        break;
      }

      if(AlreadyAdded)
      {
        res.json({
          'Status': 'Already'
        })
      }
      else
      {
        var sql = "INSERT INTO CartDetails (UserId, ProductId, AddTime) VALUES ?";
        var values = [
          [UserId, ProductId, CDate + " " + CTime]
        ];
        MySQLCon.query(sql, [values], function (err, result) {
            if (err) {console.log(err);return;}
            res.json({
              'Status': 'Done'
            })
        });
      }
    });
  }
  catch(e)
  {
    res.json({
      'Status': 'Error',
      'Message': e
    })
  }
})

app.post("/get_products_in_cart", (req, res) => {
  try
  {
    if(!MySQLConnection)
    {
      ConnectDB();
    }

    // var ProductDetails = req.body.ProductDetails == null ? false : (req.body.ProductDetails == "T" ? true : false);
    var UserId = req.body.UserId;
    var ProductId = req.body.ProductId;
    MySQLCon.query("SELECT t1.ProductId,t2.ProductName,t2.Category,t2.Colour,t2.Photo,t1.AddTime,t2.Amount FROM CartDetails t1 JOIN ProductDetails t2 WHERE t1.UserId = '" + UserId + "' AND (" + (ProductId != null ? "t1.ProductId = '" + ProductId + "'" : "t1.ProductId IS NOT NULL") + ") AND t1.Ordered IS NULL AND t1.ProductId = t2.ProductId", function (err, result, fields) {
      if (err) {console.log(err);return;}

      res.json({
        'Status': 'Valid',
        'Products': result
      });
    });
  }
  catch(e)
  {
    res.json({
      'Status': 'Error',
      'Message': e
    })
  }
})

app.post("/place_order", (req, res) => {
  var UserId = req.body.UserId;
  var HouseNo = req.body.HouseNo;
  var Building = req.body.Building;
  var Landmark = req.body.Landmark;
  var Area = req.body.Area;
  var District = req.body.District;
  var State = req.body.State;
  var Pincode = req.body.Pincode;

  // if(Name != "" && EmailId != "" && Password != "")
  // {
    try
    {
      if(!MySQLConnection)
      {
        ConnectDB();
      }
  
      var sql = "UPDATE UserDetails SET HouseNo = '" + HouseNo + "', Building = '" + Building + "', Landmark = '" + Landmark + "', Area = '" + Area + "', District = '" + District + "', State = '" + State + "', Pincode = '" + Pincode + "' WHERE UserId = '" + UserId + "'";
      MySQLCon.query(sql, function (err, result) {
          if (err) {console.log(err);return;}
      });

      MySQLCon.query("SELECT ProductId FROM CartDetails WHERE UserId = '" + UserId + "' AND ProductId IS NOT NULL AND Ordered IS NULL", function (err, result, fields) {
        if (err) {console.log(err);return;}
  
        var OrderId = uuid.v1();
        var CDate = date('dd/MM/yyyy', new Date());
        var CTime = date('hh:mm:ss', new Date());

        for(var i = 0; i < result.length; i++)
        {
          var Row = result[i];
          var ProductId = Row['ProductId'];

          var sql = "UPDATE CartDetails SET Ordered = 'T' WHERE UserId = '" + UserId + "' AND ProductId = '" + ProductId + "'";
          MySQLCon.query(sql, function (err, innerResult) {
              if (err) {console.log(err);return;}
          });

          var sql = "INSERT INTO OrderDetails (OrderId, UserId, ProductId, OrderedTime, Status) VALUES ?";
          var values = [
            [OrderId, UserId, ProductId, CDate + " " + CTime, null]
          ];
          MySQLCon.query(sql, [values], function (err, innerResult) {
              if (err) {console.log(err);return;}
          });
        }

        res.json({
          'Status': 'Done'
        });
      });
    }
    catch(e)
    {
      res.json({
        'Status': 'Error',
        'Message': e
      })
    }
  // }
  // else
  // {
  //   res.json({
  //     'Status': 'Invalid'
  //   })
  // }
});

app.post("/get_products_ordered", (req, res) => {
  try
  {
    if(!MySQLConnection)
    {
      ConnectDB();
    }

    var UserId = req.body.UserId;
    var ProductId = req.body.ProductId;
    MySQLCon.query("SELECT t1.OrderId,t1.Status,t1.ProductId,t2.ProductName,t2.Category,t2.Colour,t2.Photo,t1.OrderedTime,t2.Amount FROM OrderDetails t1 JOIN ProductDetails t2 WHERE t1.UserId = '" + UserId + "' AND (" + (ProductId != null ? "t1.ProductId = '" + ProductId + "'" : "t1.ProductId IS NOT NULL") + ") AND t1.ProductId = t2.ProductId", function (err, result, fields) {
      if (err) {console.log(err);return;}

      res.json({
        'Status': 'Valid',
        'Products': result
      });
    });
  }
  catch(e)
  {
    res.json({
      'Status': 'Error',
      'Message': e
    })
  }
})

app.post("/get_address", (req, res) => {
  try
  {
    if(!MySQLConnection)
    {
      ConnectDB();
    }

    var UserId = req.body.UserId;
    var ProductId = req.body.ProductId;
    MySQLCon.query("SELECT HouseNo,Building,Landmark,Area,District,State,Pincode FROM UserDetails WHERE UserId = '" + UserId + "'", function (err, result, fields) {
      if (err) {console.log(err);return;}

      res.json({
        'Status': 'Valid',
        'AddressDetails': result
      });
    });
  }
  catch(e)
  {
    res.json({
      'Status': 'Error',
      'Message': e
    })
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});