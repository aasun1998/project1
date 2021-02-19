const express = require("express");
const router = express.Router();
const lead = require("../models/lead");
const car = require("../models/car");
const toyota = require("../models/model");
const fuel = require("../models/fuel");
const year = require("../models/year");
const vehicle = require("../models/vehicle");
const state = require("../models/state");
const color = require("../models/color");
const honda = require("../models/honda");
const hyundai = require("../models/hyundai");
const nissan = require("../models/nissan");
const kia = require("../models/kia");
const ford = require("../models/ford");
const holden = require("../models/holden");
const mazda = require("../models/mazda");
const mitsubishi = require("../models/mitsubishi");
const benz = require("../models/benz");
const bmw = require("../models/bmw");
const volkswagen = require("../models/volkswagen");
const authRoute = require("../Midlewire/adminAuth");

router.post("/api/account/lead", (req, res, next) => {
  const {
    regoNo,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    email,
    phone,
    date,
    make,
    model,
    body,
    insurance,
    year,
    color,
    state,
    address,
    suburb,
    post,
    package,
    packagePrice,
    dFName1,
    dLName1,
    dFName2,
    dLname2,
    policyType,
  } = req.body;

  console.log("here");

  // email = email.toLowerCase();

  //verify
  // lead.find(
  //   {
  //     firstName,
  //   },
  //   (err, previousLeads) => {
  //     if (err) {
  //       return res.status(400).json({
  //         success: false,
  //         messege: "Error: Server error.",
  //       });
  //     } else if (previousLeads.length > 0) {
  //       return res.status(400).json({
  //         success: false,
  //         messege: "Error: Account already exist.",
  //       });
  //     }
  //save
  let newLead = new lead({
    regoNo,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    email,
    phone,
    date,
    make,
    model,
    body,
    insurance,
    year,
    color,
    state,
    address,
    suburb,
    post,
    package,
    packagePrice,
    dFName1,
    dLName1,
    dFName2,
    dLname2,
    policyType,
  });

  newLead
    .save()
    .then((lead) => {
      return res.status(201).json({
        success: true,
        messege: "Done",
        _id: lead._id,
      });
    })
    .catch((err) => {
      console.log("error", err);
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.put("/second/lead/update", (req, res, next) => {
  const {
    regoNo,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    email,
    phone,
    date,
    make,
    model,
    body,
    insurance,
    year,
    color,
    state,
    address,
    suburb,
    post,
    package,
    packagePrice,
    dFName1,
    dLName1,
    dFName2,
    dLname2,
    policyType,
    _id,
  } = req.body;

  lead
    .findByIdAndUpdate(
      { _id },
      {
        regoNo,
        firstName,
        middleName,
        lastName,
        dob,
        gender,
        email,
        phone,
        date,
        make,
        model,
        body,
        insurance,
        year,
        color,
        state,
        address,
        suburb,
        post,
        package,
        packagePrice,
        dFName1,
        dLName1,
        dFName2,
        dLname2,
        policyType,
      }
    )
    .then((lead) => {
      return res.status(201).json({
        success: true,
        messege: "Done",
        _id: lead._id,
      });
    })
    .catch((err) => {
      console.log("error", err);
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.get("/api/lead/data", (req, res, next) => {
  lead
    .find()
    .then((result) => {
      return res.status(201).json({
        leadData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/api/data/one/:id", (req, res, next) => {
  console.log(req.params.id);
  lead
    .findById(req.params.id)
    .then((result) => {
      return res.status(201).json({
        leadData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/car/detail", (req, res, next) => {
  const { carName, carImage } = req.body;

  // console.log("right");

  car.find(
    {
      carName,
    },
    (err, previousCars) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousCars.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newCar = new car();

      newCar.carName = carName;
      newCar.carImage = carImage;
      newCar
        .save()
        .then((car) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/car/data", (req, res, next) => {
  car
    .find()
    .then((result) => {
      return res.status(201).json({
        carData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/toyota/model", (req, res, next) => {
  const { carModel } = req.body;

  // console.log("right");

  toyota.find(
    {
      carModel,
    },
    (err, previousToyota) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousToyota.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newToyota = new toyota();

      newToyota.carModel = carModel;
      newToyota
        .save()
        .then((toyota) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/toyota/data", (req, res, next) => {
  toyota
    .find()
    .then((result) => {
      return res.status(201).json({
        toyotaData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/fuel/detail", (req, res, next) => {
  const { carFuel } = req.body;

  // console.log("right");

  fuel.find(
    {
      carFuel,
    },
    (err, previousFuel) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousFuel.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newFuel = new fuel();

      newFuel.carFuel = carFuel;
      newFuel
        .save()
        .then((fuel) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/fuel/data", (req, res, next) => {
  fuel
    .find()
    .then((result) => {
      return res.status(201).json({
        fuelData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/year/detail", (req, res, next) => {
  const { carYear } = req.body;

  // console.log("right");

  year.find(
    {
      carYear,
    },
    (err, previousYear) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousYear.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newYear = new year();

      newYear.carYear = carYear;
      newYear
        .save()
        .then((year) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/year/data", (req, res, next) => {
  year
    .find()
    .then((result) => {
      return res.status(201).json({
        yearData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/vehicle/detail", (req, res, next) => {
  const { carVehicle } = req.body;

  // console.log("right");

  vehicle.find(
    {
      carVehicle,
    },
    (err, previousVehicle) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousVehicle.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newVehicle = new vehicle();

      newVehicle.carVehicle = carVehicle;
      newVehicle
        .save()
        .then((vehicle) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/vehicle/data", (req, res, next) => {
  vehicle
    .find()
    .then((result) => {
      return res.status(201).json({
        vehicleData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/state/detail", (req, res, next) => {
  const { carState } = req.body;

  // console.log("right");

  state.find(
    {
      carState,
    },
    (err, previousState) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousState.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newState = new state();

      newState.carState = carState;
      newState
        .save()
        .then((state) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/state/data", (req, res, next) => {
  state
    .find()
    .then((result) => {
      return res.status(201).json({
        stateData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/color/model", (req, res, next) => {
  const { modelColor } = req.body;

  // console.log("right");

  color.find(
    {
      modelColor,
    },
    (err, previousColor) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousColor.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newColor = new color();

      newColor.modelColor = modelColor;
      newColor
        .save()
        .then((color) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/color/data", (req, res, next) => {
  color
    .find()
    .then((result) => {
      return res.status(201).json({
        allColor: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/honda/model", (req, res, next) => {
  const { hondaModel } = req.body;

  // console.log("right");

  honda.find(
    {
      hondaModel,
    },
    (err, previousHonda) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousHonda.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newHonda = new honda();

      newHonda.hondaModel = hondaModel;
      newHonda
        .save()
        .then((honda) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/honda/data", (req, res, next) => {
  honda
    .find()
    .then((result) => {
      return res.status(201).json({
        hondaData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/hyundai/model", (req, res, next) => {
  const { hyundaiModel } = req.body;

  // console.log("right");

  hyundai.find(
    {
      hyundaiModel,
    },
    (err, previousHyundai) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousHyundai.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newHyundai = new hyundai();

      newHyundai.hyundaiModel = hyundaiModel;
      newHyundai
        .save()
        .then((hyundai) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/hyundai/data", (req, res, next) => {
  hyundai
    .find()
    .then((result) => {
      return res.status(201).json({
        hyundaiData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/nissan/model", (req, res, next) => {
  const { nissanModel } = req.body;

  // console.log("right");

  nissan.find(
    {
      nissanModel,
    },
    (err, previousNissan) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousNissan.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newNissan = new nissan();

      newNissan.nissanModel = nissanModel;
      newNissan
        .save()
        .then((nissan) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/nissan/data", (req, res, next) => {
  nissan
    .find()
    .then((result) => {
      return res.status(201).json({
        nissanData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/kia/model", (req, res, next) => {
  const { kiaModel } = req.body;

  // console.log("right");

  kia.find(
    {
      kiaModel,
    },
    (err, previousKia) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousKia.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newKia = new kia();

      newKia.kiaModel = kiaModel;
      newKia
        .save()
        .then((kia) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/kia/data", (req, res, next) => {
  kia
    .find()
    .then((result) => {
      return res.status(201).json({
        kiaData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/ford/model", (req, res, next) => {
  const { fordModel } = req.body;

  // console.log("right");

  ford.find(
    {
      fordModel,
    },
    (err, previousFord) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousFord.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newFord = new ford();

      newFord.fordModel = fordModel;
      newFord
        .save()
        .then((ford) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/ford/data", (req, res, next) => {
  ford
    .find()
    .then((result) => {
      return res.status(201).json({
        fordData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/holden/model", (req, res, next) => {
  const { holdenModel } = req.body;

  // console.log("right");

  holden.find(
    {
      holdenModel,
    },
    (err, previousHolden) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousHolden.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newHolden = new holden();

      newHolden.holdenModel = holdenModel;
      newHolden
        .save()
        .then((holden) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/holden/data", (req, res, next) => {
  holden
    .find()
    .then((result) => {
      return res.status(201).json({
        holdenData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/mazda/model", (req, res, next) => {
  const { mazdaModel } = req.body;

  // console.log("right");

  mazda.find(
    {
      mazdaModel,
    },
    (err, previousMazda) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousMazda.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newMazda = new mazda();

      newMazda.mazdaModel = mazdaModel;
      newMazda
        .save()
        .then((mazda) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/mazda/data", (req, res, next) => {
  mazda
    .find()
    .then((result) => {
      return res.status(201).json({
        mazdaData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/mitsubishi/model", (req, res, next) => {
  const { mitsubishiModel } = req.body;

  // console.log("right");

  mitsubishi.find(
    {
      mitsubishiModel,
    },
    (err, previousMitsubishi) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousMitsubishi.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newMitsubishi = new mitsubishi();

      newMitsubishi.mitsubishiModel = mitsubishiModel;
      newMitsubishi
        .save()
        .then((mitsubishi) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/mitsubishi/data", (req, res, next) => {
  mitsubishi
    .find()
    .then((result) => {
      return res.status(201).json({
        mitsubishiData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/benz/model", (req, res, next) => {
  const { benzModel } = req.body;

  // console.log("right");

  benz.find(
    {
      benzModel,
    },
    (err, previousBenz) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousBenz.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newBenz = new benz();

      newBenz.benzModel = benzModel;
      newBenz
        .save()
        .then((benz) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/benz/data", (req, res, next) => {
  benz
    .find()
    .then((result) => {
      return res.status(201).json({
        benzData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/bmw/model", (req, res, next) => {
  const { bmwModel } = req.body;

  // console.log("right");

  bmw.find(
    {
      bmwModel,
    },
    (err, previousBmw) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousBmw.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newBmw = new bmw();

      newBmw.bmwModel = bmwModel;
      newBmw
        .save()
        .then((bmw) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/bmw/data", (req, res, next) => {
  bmw
    .find()
    .then((result) => {
      return res.status(201).json({
        bmwData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/volkswagen/model", (req, res, next) => {
  const { volkswagenModel } = req.body;

  // console.log("right");

  volkswagen.find(
    {
      volkswagenModel,
    },
    (err, previousVolkswagen) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousVolkswagen.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }

      // console.log("right");
      //save
      let newVolkswagen = new volkswagen();

      newVolkswagen.volkswagenModel = volkswagenModel;
      newVolkswagen
        .save()
        .then((volkswagen) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/api/volkswagen/data", (req, res, next) => {
  volkswagen
    .find()
    .then((result) => {
      return res.status(201).json({
        volkswagenData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

module.exports = router;
