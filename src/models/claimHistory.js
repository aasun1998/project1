const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const claimHistorySchema = new mongoose.Schema({
      date: {
        type: String,
        default: ''
      },
      fault: {
        type: String,
        default: ''
      },
      insurance: {
        type: String,
        default: ''
      },
      driverName: {
        type: String,
        default: ''
      },
      handwrittenForm: {
        type: String,
        default: ''
      },
      make: {
        type: String,
        default: ''
      },
      year: {
        type: String,
        default: ''
      },
      company: {
        type: String,
        default: ''
      },
      model: {
        type: String,
        default: ''
      },
      rego: {
        type: String,
        default: ''
      },
      policyNo: {
        type: String,
        default: ''
      },
      claimNo: {
        type: String,
        default: ''
      },
      insured: {
        type: String,
        default: ''
      },
      oName: {
        type: String,
        default: ''
      },
      oState: {
        type: String,
        default: ''
      },
      oSuburb: {
        type: String,
        default: ''
      },
      oAddress: {
        type: String,
        default: ''
      },
      oPost: {
        type: String,
        default: ''
      },
      oMobile: {
        type: String,
        default: ''
      },
      dName: {
        type: String,
        default: ''
      },
      dState: {
        type: String,
        default: ''
      },
      dSuburb: {
        type: String,
        default: ''
      },
      dPost: {
        type: String,
        default: ''
      },
      dAddress: {
        type: String,
        default: ''
      },
      dMobile: {
        type: String,
        default: ''
      },
      dBirth: {
        type: String,
        default: ''
      },
      dLicenceNo: {
        type: String,
        default: ''
      },
      place: {
        type: String,
        default: ''
      },
      location: {
        type: String,
        default: ''
      },
      street: {
        type: String,
        default: ''
      },
      aDate: {
        type: String,
        default: ''
      },
      damageLocation: {
        type: String,
        default: ''
      },
      aPolicyNo: {
        type: String,
        default: ''
      },
      time: {
        type: String,
        default: ''
      },
      preVehicleDamage: {
        type: String,
        default: ''
      },
      roadSurface: {
        type: String,
        default: ''
      },
      carsInvolved: {
        type: String,
        default: ''
      },
      whoFault: {
        type: String,
        default: ''
      },
      insuredVehiclePlace: {
        type: String,
        default: ''
      },
      whatHappen: {
        type: String,
        default: ''
      },
      damageCarPicture1: {
        type: Object,
        default: {}
      },
      damageCarPicture2: {
        type: Object,
        default: {}
      },
      policeReport: {
        type: String,
        default: ''
      },
      policefName: {
        type: String,
        default: ''
      },
      policelName: {
        type: String,
        default: ''
      },
      ps: {
        type: String,
        default: ''
      },
      vehicleTowed: {
        type: String,
        default: ''
      },
      towedPlace: {
        type: String,
        default: ''
      },
      towedBy: {
        type: String,
        default: ''
      },
      repairable: {
        type: String,
        default: ''
      },
      witnessoName: {
        type: String,
        default: ''
      },
      witnesstName: {
        type: String,
        default: ''
      },
      witnessoNo: {
        type: String,
        default: ''
      },
      witnesstNo: {
        type: String,
        default: ''
      },
      customerSign: {
        type: Array,
        default: []
      },
      authoritySign: {
        type: Array,
        default: []
      },
      customerId: {
        type: ObjectId,
        ref: "customers",
        required: true
    },
    claimId: {
        type: String,
        default: ""
    }
},{timestamps: true});


module.exports=mongoose.model("claimHistory", claimHistorySchema);