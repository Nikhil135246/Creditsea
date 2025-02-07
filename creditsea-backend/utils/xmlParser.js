const fs = require('fs');
const xml2js = require('xml2js');

const parseXML = async (filePath) => {
  try {
    const xmlData = fs.readFileSync(filePath, 'utf-8');
    // console.log('Raw XML Data:', xmlData); // Log the raw XML data

    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xmlData);
    console.log('Parsed XML Result:', JSON.stringify(result, null, 2)); // Log the parsed result

    // Safely access nested properties
    const creditProfile = result.INProfileResponse || {};
    const currentApplication = creditProfile.Current_Application?.Current_Application_Details || {};
    const currentApplicant = currentApplication.Current_Applicant_Details || {};
    const caisSummary = creditProfile.CAIS_Account?.CAIS_Summary || {};
    const caisAccounts = creditProfile.CAIS_Account?.CAIS_Account_DETAILS || [];
    const matchResult = creditProfile.Match_result || {};
    const totalCAPS = creditProfile.TotalCAPS_Summary || {};
    const caps = creditProfile.CAPS?.CAPS_Summary || {};
    const nonCreditCAPS = creditProfile.NonCreditCAPS?.NonCreditCAPS_Summary || {};
    const score = creditProfile.SCORE || {};

    // Handle single account (object) or multiple accounts (array)
    let accounts = [];
    if (caisAccounts) {
      accounts = Array.isArray(caisAccounts)
        ? caisAccounts // Multiple accounts (array)
        : [caisAccounts]; // Single account (convert to array)
    }

    // Transform the parsed XML data into the required format
    const transformedData = {
      basicDetails: {
        name: `${currentApplicant.First_Name || ''} ${currentApplicant.Last_Name || ''}`.trim(),
        mobile: currentApplicant.MobilePhoneNumber || 'N/A',
        pan: currentApplicant.IncomeTaxPan || 'N/A',
        creditScore: score.BureauScore || 0,
      },
      reportSummary: {
        totalAccounts: caisSummary.Credit_Account?.CreditAccountTotal || 0,
        active: caisSummary.Credit_Account?.CreditAccountActive || 0,
        closed: caisSummary.Credit_Account?.CreditAccountClosed || 0,
        currentBalance: caisSummary.Total_Outstanding_Balance?.Outstanding_Balance_All || 0,
        securedAmount: caisSummary.Total_Outstanding_Balance?.Outstanding_Balance_Secured || 0,
        unsecuredAmount: caisSummary.Total_Outstanding_Balance?.Outstanding_Balance_UnSecured || 0,
        enquiriesLast7Days: totalCAPS.TotalCAPSLast7Days || 0,
      },
      creditAccounts: accounts.map((account) => ({
        type: account.Account_Type || 'N/A',
        bank: account.Subscriber_Name || 'N/A',
        address: account.CAIS_Holder_Address_Details?.First_Line_Of_Address_non_normalized || 'N/A',
        accountNumber: account.Account_Number || 'N/A',
        amountOverdue: account.Amount_Past_Due || 0,
        currentBalance: account.Current_Balance || 0,
      })),
      matchResult: {
        exactMatch: matchResult.Exact_match === 'Y',
      },
      capsSummary: {
        last7Days: caps.CAPSLast7Days || 0,
        last30Days: caps.CAPSLast30Days || 0,
        last90Days: caps.CAPSLast90Days || 0,
        last180Days: caps.CAPSLast180Days || 0,
      },
      nonCreditCAPS: {
        last7Days: nonCreditCAPS.NonCreditCAPSLast7Days || 0,
        last30Days: nonCreditCAPS.NonCreditCAPSLast30Days || 0,
        last90Days: nonCreditCAPS.NonCreditCAPSLast90Days || 0,
        last180Days: nonCreditCAPS.NonCreditCAPSLast180Days || 0,
      },
    };

    return transformedData;
  } catch (err) {
    console.error('Error parsing XML file:', err); // Log the full error
    throw new Error('Error parsing XML file');
  }
};

module.exports = { parseXML };