require("dotenv").config();
const axios = require("axios");

const getShortURL = async (queries) => {
  const [target, ...args] = queries;
  const config = {
    headers: {
      "X-API-KEY": process.env.KUTT_API_KEY,
      "Content-Type": "application/json",
    },
  };
  let expires, domain, password, description;
  const expiresIndex = args.indexOf("expires");
  const domainIndex = args.indexOf("domain");
  const passwordIndex = args.indexOf("password");
  const descIndex = args.indexOf("description");

  if (expiresIndex !== -1) {
    expires = [args[expiresIndex + 1], args[expiresIndex + 2]].join(" ");
  } else {
    expires = process.env.EXPIRES_IN;
  }
  if (domainIndex !== -1) {
    domain = args[domainIndex + 1];
  } else {
    domain = process.env.DOMAIN;
  }
  if (passwordIndex !== -1) {
    password = args[passwordIndex + 1];
  } else {
    password = process.env.PASSWORD;
  }
  if (descIndex !== -1) {
    description = args[descIndex + 1];
  } else {
    description = process.env.DESCRIPTION;
  }
  const jsonBody =
    args.length !== 1
      ? {
          target: target,
          password: password,
          description: description,
          expire_in: expires,
          domain: domain,
        }
      : {
          target: target,
        };
  if (password === "none") {
    delete jsonBody.password;
  }
  console.log(jsonBody);
  const body = JSON.stringify(jsonBody);
  const getShortUrl = async () => {
    const res = await axios.post("https://kutt.it/api/v2/links", body, config);
    return res.data;
  };
  try {
    const { link } = await getShortUrl();
    return link;
  } catch (err) {
    return new Error(err);
  }
};

module.exports = {
  getShortURL,
};
