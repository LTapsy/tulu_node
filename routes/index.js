const express = require("express");
const pgroutr = express.Router();
const ROLE = require("../roles");
const { ensureAuthenticated, authRole } = require("../config/auth");

const Vehicle = require("../models/vehicleschema");
const Dealer = require("../models/dealershipschema");
const uploadController = require("../controllers/upload");
const fetchImage = require("../middleware/getImages");
const fetchFiles = require("../middleware/getFile");
const downloadFile = require("../middleware/downloadfile")
const Address = require("../models/addressschema");
const User = require("../models/userschema");
const TestDrive = require("../models/testdriveschema");
const Application = require("../models/applicationschema");
const Appointment = require("../models/appointmentschema");
const Event = require("../models/eventschema");
const Blog = require("../models/blogschema");
const Message = require("../models/messageschema");
const Thread = require("../models/messagethreadschema");
const VehicleImages = require("../models/vehicleimageschema")


pgroutr.get("/EditDealer", ensureAuthenticated, (req, res) =>
  Dealer.find({ uuid: req.user.toObject().dealerId }).then((dealer) => {
    Address.find({ targetId: req.user.toObject().dealerId }).then((address) => {
      res.render("EditDealer", {
        user: req.user,
        dealer: dealer,
        address: address,
      });
    });
  })
);

pgroutr.get("/HomeRemake", (req, res) =>
  Vehicle.find({ })
  .then((vehicles) => {
    User.find({ role: "dealeradmin" })
    .then((dealerAdmin) => {
      Dealer.find({})
      .then((dealer) => {
        Blog.find({})
        .then((blog) => {
          User.find({ role: "tulu" })
          .then((tulu) => {
            res.render("IndexRemake", {
              user: req.user,
              tulu:tulu,
              blog:blog,
              dealer:dealer,
              dealershipList:dealerAdmin,
              vehicles:vehicles,
            })
          })
        })
      })
    })
  })
);

pgroutr.get("/", (req, res) =>
  VehicleImages.find({}).then((vehicleimages) => {
    Vehicle.find({ })
    .then((vehicles) => {
      User.find({ role: "dealeradmin" })
      .then((dealerAdmin) => {
        Dealer.find({})
        .then((dealer) => {
          Blog.find({})
          .then((blog) => {
            User.find({ role: "tulu" })
            .then((tulu) => {
              res.render("IndexRemake", {
                user: req.user,
                tulu:tulu,
                blog:blog,
                dealer:dealer,
                dealershipList:dealerAdmin,
                vehicles:vehicles,
                vehicleimages:vehicleimages,
              })
            })
          })
        })
      })
    })
  })
);

pgroutr.get("/Events", (req, res) =>
  Event.find({})
  .then((event) => {
    res.render("Events", {
      user: req.user,
      event:event
    })
  })
);

pgroutr.get("/Messenger", ensureAuthenticated, (req, res) =>
  User.find({})
  .then((userList) => {
    Thread.find({})
    .then((thread) => {
      Message.find({})
      .then((messages) => {
        res.render("Messenger", {
          user: req.user,
          userList: userList,
          thread: thread,
          messages: messages,
        })
      })
    })
  })
);


pgroutr.get("/Inbox", ensureAuthenticated, (req, res) =>
  User.find({})
  .then((userList) => {
    Thread.find({})
    .then((thread) => {
      Message.find({})
      .then((message) => {
        res.render("Inbox", {
          user: req.user,
          message:message,
          thread:thread,
          userList:userList,
        })
      })
    })
  })
);

pgroutr.get("/TradeVehicle", (req, res) =>
  res.render("TradeVehicle", {
    user: req.user
  })
);

pgroutr.get("/message", ensureAuthenticated, (req, res) =>
  res.render("message", {
    user: req.user
  })
);

pgroutr.get("/CreditApplication", (req, res) =>
  res.render("CreditApplication", {
    user: req.user
  })
);

pgroutr.get("/EventList", (req, res) =>
  Event.find({})
  .then((eventList) => {
    res.render("EventList", {
      user: req.user,
      eventList:eventList
    })
  })
);


pgroutr.get("/TestDrive/:vin", (req, res) => {
  Vehicle.find({ vin: req.params.vin })
  .then((vehicles) => {
    Dealer.find({ uuid: vehicles[0].dealerId })
    .then((dealer) => {
      res.render("TestDrive", {
        user: req.user,
        vehicles:vehicles,
        dealer:dealer
      })
    })
  })
})

pgroutr.get("/UploadLicense/:targetId", (req, res) => {
  TestDrive.find({_id:req.params.targetId})
  .then((appointment)=>{
    res.render("UploadLicense", {
      user: req.user,
      targetId:req.params.targetId,
      appointment:appointment
    })
  })
})

pgroutr.get("/UploadEvent/:targetId", (req, res) => {
  Event.find({_id:req.params.targetId})
  .then((event)=>{
    res.render("UploadEvent", {
      user: req.user,
      targetId:req.params.targetId,
      event:event
    })
  })
})

pgroutr.get("/UploadBlog/:targetId", (req, res) => {
  Event.find({_id:req.params.targetId})
  .then((blog)=>{
    res.render("UploadBlog", {
      user: req.user,
      targetId:req.params.targetId,
      blog:blog
    })
  })
})

pgroutr.get("/UploadResume/:targetId", (req, res) => {
  Application.find({_id:req.params.targetId})
  .then((application)=>{
    res.render("UploadResume", {
      user: req.user,
      targetId:req.params.targetId,
      application:application
    })
  })
})

pgroutr.get("/Blog/:targetId", (req, res) =>
  Blog.find({_id:req.params.targetId})
  .then((blog)=>{
    res.render("Blog", {
      user: req.user,
      blog:blog,
    })
  })
);

pgroutr.get("/BlogList", (req, res) =>
  Blog.find({})
  .then((blogList) => {
    res.render("BlogList", {
      user: req.user,
      blogList:blogList
    })
  })
);

pgroutr.get("/404", (req, res) =>
  res.render("404", {
    user: req.user,
  })
);

pgroutr.get("/Store", (req, res) =>
  res.render("Store", {
    user: req.user,
  })
);

pgroutr.get("/Contact", (req, res) =>
  res.render("Contact", {
    user: req.user,
  })
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    req.isLogged = true;
    return next();
  }
  res.redirect("/");
}

pgroutr.get("/dashboard", ensureAuthenticated, (req, res) =>
  Vehicle.find({dealerId:req.user.toObject().dealerId}).then((vehicle) => {
    Dealer.find({uuid:req.user.toObject().dealerId}).then((dealer) => {
      Appointment.find({dealerId:dealer[0]._id}).then((appointment) => {
        TestDrive.find({dealershipNameTestDrive:dealer[0].name}).then((testDrive) => {
          res.render("Dashboard", {
            user: req.user,
            vehicle: vehicle,
            dealer: dealer,
            appointment: appointment, 
            testDrive: testDrive, 
          })
        })
      })
    })
  })
);


pgroutr.get("/vindecoder", ensureAuthenticated, (req, res) =>
  res.render("VinDecoder", {
    user: req.user,
  })
);

pgroutr.get("/tulu", ensureAuthenticated, authRole(ROLE.TULU), (req, res) =>
  res.render("Tulu", {
    user: req.user,
  })
);

pgroutr.get("/profile", ensureAuthenticated, authRole(ROLE.USER), (req, res) =>
  res.render("Profile", {
    user: req.user,
  })
);

pgroutr.get(
  "/dashboardsysadmin",
  ensureAuthenticated,
  authRole(ROLE.SYSADMIN),
  (req, res) =>
    res.render("DashboardSysAdmin", {
      user: req.user,
    })
);

pgroutr.get("/MessageTulu/:id", (req, res) => {
  User.find({ _id: req.params.id })
  .then((tulu) => {
    res.render("MessageTulu", {
      user: req.user,
      tulu:tulu
    })
  })
})

pgroutr.get("/carview/:vin", (req, res) => {
  VehicleImages.find({vin: req.params.vin}).then((vehicleimages) => {
    Vehicle.find({ vin: req.params.vin })
      .then((vehicles) => {
        Dealer.find({ uuid: vehicles[0].dealerId })
          .then(async (dealers) => {
            User.find({ dealerId: vehicles[0].dealerId }).then(
              async (dealerAdmin) => {
                Address.find({ targetId: vehicles[0].dealerId }).then(
                  async (address) => {
                    const images = await fetchImage.getImagesArray(
                      req.params.vin
                    );
                    var myquery = { vin: vehicles[0].vin };

                    var newView = vehicles[0].views + 1;

                    var newvalues = {
                      views:newView
                    }

                    Vehicle.updateOne(myquery, newvalues).then((updatedVehicle) => {
                      // console.log(images);
                      // console.log(vehicleimages);
                      console.log(dealers)
                      // console.log(dealers[0]._id)
                      res.render("CarView", {
                        vehicles: vehicles,
                        user: req.user,
                        dealers: dealers,
                        dealerAdmin: dealerAdmin,
                        address: address,
                        images: images,
                        vehicleimages: vehicleimages,
                      });
                    });
                  }
                );
              }
            );
          })
          .catch((err) => {
            res.status(500).send(error);
          })
          .catch((err) => {
            res.status(500).send(error);
          });
      })
      .catch((err) => {
        res.status(500).send(error);
      })
      .catch((err) => {
        res.status(500).send(error);
      });
      })
      .catch((err) => {
        res.status(500).send(error);
      });
});

pgroutr.get("/tululist", (req, res) => {
  User.find({ role: "tulu" })
    .then((tulu) => {
      res.render("TuluList", {
        tulu: tulu,
        user: req.user,
      });
    })
    .catch((err) => {
      res.status(500).send(error);
    })
    .catch((err) => {
      res.status(500).send(error);
    });
});

pgroutr.get("/BuyNow/:vin", (req, res) => {
  Vehicle.find({ vin: req.params.vin })
    .then((vehicle) => {
      Dealer.find({ uuid: vehicle[0].dealerId }).then((dealer) => {
        res.render("BuyNow", {
          dealer: dealer,
          vehicle: vehicle,
          user: req.user,
        });
      });
    })
    .catch((err) => {
      res.status(500).send(error);
    })
    .catch((err) => {
      res.status(500).send(error);
    });
});

pgroutr.get("/DashboardSysAdminTulu", (req, res) => {
  User.find({ role: "tulu" })
    .then((tulu) => {
      User.find({ role: "user" })
        .then((users) => {
          res.render("DashboardSysAdminTulu", {
            tulu: tulu,
            users: users,
            user: req.user,
          });
        })
        .catch((err) => {
          res.status(500).send(error);
        })
        .catch((err) => {
          res.status(500).send(error);
        });
    })
    .catch((err) => {
      res.status(500).send(error);
    })
    .catch((err) => {
      res.status(500).send(error);
    });
});

pgroutr.get("/DashboardSysAdminUser", (req, res) => {
  User.find({ role: "user" })
    .then((users) => {
      res.render("DashboardSysAdminUser", {
        users: users,
        user: req.user,
      });
    })
    .catch((err) => {
      res.status(500).send(error);
    })
    .catch((err) => {
      res.status(500).send(error);
    });
});

pgroutr.get("/DealerListing/:dealerId", (req, res) => {
  VehicleImages.find({targetId: req.params.dealerId}).then((vehicleimages) => {
    Dealer.find({ uuid: req.params.dealerId })
      .then((dealer) => {
        Address.find({ targetId: req.params.dealerId }).then((address) => {
          Vehicle.find({ dealerId: req.params.dealerId }).then((vehicle) => {
           
            res.render("DealerListing", {
              dealer: dealer,
              vehicle: vehicle,
              address: address,
              user: req.user,
              vehicleimages: vehicleimages,
            });
          });
        });
      })
    })
      .catch((err) => {
        res.status(500).send(error);
      });
});

pgroutr.post("/upload/:type/:targetid", uploadController.uploadFile),
  (req, res) => {
    console.log(req);
};

pgroutr.get("/image/:targetid", (req, res) => {
  fetchImage.getImage(req, res);
});

pgroutr.get("/file/:targetid", (req, res) => {
  fetchFiles.getFile(req, res);
});

pgroutr.get("/download/:targetid", (req, res) => {
  downloadFile.downloadFile(req, res);
});

pgroutr.get("/image/:targetid/:fileId", (req, res) => {
  fetchImage.getCarImage(req, res);
});

pgroutr.get("/tululist", (req, res) => {
  User.find({ role: "tulu" })
    .then((tulu) => {
      res.render("tululist", {
        tulu: tulu,
        user: req.user,
      });
    })
    .catch((err) => {
      res.status(500).send(error);
    })
    .catch((err) => {
      res.status(500).send(error);
    });
});

pgroutr.get("/DealershipList", (req, res) => {
  Dealer.find().then((dealer) => {
    Address.find().then((address) => {
      User.find({ role: "dealeradmin" }).then((dealerAdmin) => {
        res.render("DealershipList", {
          dealer: dealer,
          user: req.user,
          address: address,
          dealeradmin: dealerAdmin,
        });
      });
    });
  });
});

pgroutr.get("/about", function (req, res) {
  res.render("About", {
    user: req.user,
  });
});

pgroutr.get("/faq", function (req, res) {
  res.render("faq", {
    user: req.user,
  });
});

pgroutr.get("/careers", function (req, res) {
  res.render("Careers", {
    user: req.user,
  });
});

pgroutr.get("/privacypolicy", function (req, res) {
  res.render("PrivacyPolicy", {
    user: req.user,
  });
});

pgroutr.get("/JobApplication", function (req, res) {
  res.render("JobApplication", {
    user: req.user,
  });
});
module.exports = pgroutr;
