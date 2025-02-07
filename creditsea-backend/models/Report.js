const mongoose = require('mongoose');

const creditAccountSchema = new mongoose.Schema({
  type: String,
  bank: String,
  address: String,
  accountNumber: String,
  amountOverdue: Number,
  currentBalance: Number,
});

const matchResultSchema = new mongoose.Schema({
  exactMatch: Boolean,
});

const capsSummarySchema = new mongoose.Schema({
  last7Days: Number,
  last30Days: Number,
  last90Days: Number,
  last180Days: Number,
});

const reportSchema = new mongoose.Schema({
  basicDetails: {
    name: String,
    mobile: String,
    pan: String,
    creditScore: Number,
  },
  reportSummary: {
    totalAccounts: Number,
    active: Number,
    closed: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    enquiriesLast7Days: Number,
  },
  creditAccounts: [creditAccountSchema],
  matchResult: matchResultSchema,
  capsSummary: capsSummarySchema,
  nonCreditCAPS: capsSummarySchema,
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);