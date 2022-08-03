import axios from "axios";

const API_KEY = "edf2a6114dde6136eb7db095302e37415c606";

// had CORS error & that is why i've set the domain in package.json to proxy for preventing CORS error, so here we've to only write the endpoints
// declaring endpoints variables
const ACCOUNT = "/rest/accounts";
const ACCOUNT_TYPES = "/rest/accounttypes";

export const fetchAccounts = async () => {
  const { data } = await axios.get(ACCOUNT, {
    headers: {
      "x-apikey": API_KEY,
    },
  });
  return data;
};

export const fetchAccountTypes = async () => {
  const { data } = await axios.get(ACCOUNT_TYPES, {
    headers: {
      "x-apikey": API_KEY,
    },
  });
  return data;
};
