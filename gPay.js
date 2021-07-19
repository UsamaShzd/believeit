const path = require("path");
const { google } = require("googleapis");
const androidpublisher = google.androidpublisher("v3");

async function main() {
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    keyFile: path.join(__dirname, "./google_service_account.json"),
    scopes: ["https://www.googleapis.com/auth/androidpublisher"],
  });

  // Acquire an auth client, and bind it to all future calls
  const authClient = await auth.getClient();
  google.options({ auth: authClient });

  try {
    const res = await androidpublisher.purchases.subscriptions.acknowledge({
      // The package name of the application for which this subscription was purchased (for example, 'com.some.thing').
      packageName: "me.believeit.www",
      // The purchased subscription ID (for example, 'monthly001').
      subscriptionId: "bi_premium_yearly",
      // The token provided to the user's device when the subscription was purchased.
      token:
        "kbfnpfdokmlpjamkakkbphkm.AO-J1OzVLNjOiIU9QZRfzd2POcg1tBdxRLDEw9fMBvmFlKXAEaxtXes0PvkyY2SJ7Qp6Ch9P_g1vCZI9l8UT_Pmh73xeJt5Y9Q",
    });

    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
  // Do the magic

  // Example response
  // {
  //   "acknowledgementState": 0,
  //   "autoRenewing": false,
  //   "autoResumeTimeMillis": "my_autoResumeTimeMillis",
  //   "cancelReason": 0,
  //   "cancelSurveyResult": {},
  //   "countryCode": "my_countryCode",
  //   "developerPayload": "my_developerPayload",
  //   "emailAddress": "my_emailAddress",
  //   "expiryTimeMillis": "my_expiryTimeMillis",
  //   "externalAccountId": "my_externalAccountId",
  //   "familyName": "my_familyName",
  //   "givenName": "my_givenName",
  //   "introductoryPriceInfo": {},
  //   "kind": "my_kind",
  //   "linkedPurchaseToken": "my_linkedPurchaseToken",
  //   "obfuscatedExternalAccountId": "my_obfuscatedExternalAccountId",
  //   "obfuscatedExternalProfileId": "my_obfuscatedExternalProfileId",
  //   "orderId": "my_orderId",
  //   "paymentState": 0,
  //   "priceAmountMicros": "my_priceAmountMicros",
  //   "priceChange": {},
  //   "priceCurrencyCode": "my_priceCurrencyCode",
  //   "profileId": "my_profileId",
  //   "profileName": "my_profileName",
  //   "promotionCode": "my_promotionCode",
  //   "promotionType": 0,
  //   "purchaseType": 0,
  //   "startTimeMillis": "my_startTimeMillis",
  //   "userCancellationTimeMillis": "my_userCancellationTimeMillis"
  // }
}

main();
