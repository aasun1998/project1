const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const permanentIHistorySchema = new mongoose.Schema({
    policyNo: {
        type: String,
        default: ""
    },
    policyType: {
        type: String,
        default: ""
    },
    overdue: {
        type: String,
        default: ""
    },
    insuranceType: {
        type: String,
        default: ""
    },
    premium: {
        type: String,
        default: ""
    },
    excess: {
        type: String,
        default: ""
    },
    period: {
        type: String,
        default: ""
    },
    startDate: {
        type: String,
        default: ""
    },
    endDate: {
        type: String,
        default: ""
    },
    nextPaymentDue: {
        type: String,
        default: ""
    },
    customerId: {
        type: ObjectId,
        ref: "customers",
        required: true
    },
    historyId: {
        type: String,
        default: ""
    }
}, { timestamps: true })

module.exports = mongoose.model("permanentIHistory", permanentIHistorySchema)