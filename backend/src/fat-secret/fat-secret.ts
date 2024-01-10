import { FAT_SECRET_API_ENDPOINT } from "utils";

// @ts-ignore
const { createHmac, randomBytes } = require("node:crypto");
// import { createHmac, randomBytes } from "node:crypto";

type FatSecretAPIMethods =
  | "foods.search"
  | "food.get"
  | "recipes.search"
  | "recipe.get"
  | "recipe_types.get";

type OAuth1Parameters = {
  format: "json";
  oauth_version: "1.0";
  oauth_signature_method: "HMAC-SHA1";
  oauth_nonce: string;
  oauth_timestamp: number;
  oauth_consumer_key: string;
};

type RequestParameters = {
  method: FatSecretAPIMethods;
  access_token?: string;
  search_expression?: string;
  max_results?: number;
};

export class FatSecret {
  #accessKey: string;
  #sharedSecret: string;

  constructor(accessKey: string) {
    if (!accessKey) {
      throw new Error("FAT_SECRET ENV not found");
    }
    this.#accessKey = accessKey;
    //this.#sharedSecret = parameters.access_token;
  }

  request<T>(parameters: RequestParameters) {
    this.#sharedSecret = parameters.access_token;

    const query = this._createQuery(parameters);
    const signature = this._createSignature(query, parameters.access_token);
    const path = `${FAT_SECRET_API_ENDPOINT}?${query}&oauth_signature=${signature}`;
    const authorization: string = `Bearer ${parameters.access_token}`;

    return fetch(path, {
      method: "GET",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response: Promise<T>) => {
        console.log("JSON response ->", response);
        return response;
      })
      .catch((error) => {
        console.error("Error:", error);
        return error;
      });
  }

  _createSignature(query: string, secret: string | undefined) {
    this.#sharedSecret = secret;

    const hmac = createHmac("sha1", this.#sharedSecret + "&");

    const enconded_path = `GET&${encodeURIComponent(
      FAT_SECRET_API_ENDPOINT
    )}&${encodeURIComponent(query)}`;

    hmac.update(enconded_path);

    return encodeURIComponent(hmac.digest("base64"));
  }

  _createQuery(parameters: RequestParameters) {
    const reqParams: OAuth1Parameters = {
      ...parameters,
      format: "json",
      oauth_version: "1.0",
      oauth_signature_method: "HMAC-SHA1",
      oauth_nonce: randomBytes(10).toString("HEX"),
      oauth_timestamp: Math.floor(new Date().getTime() / 1000),
      oauth_consumer_key: this.#accessKey,
    };

    // @ts-ignore
    delete reqParams.access_token;

    return Object.keys(reqParams)
      .sort()
      .reduce((accumulator, parameter) => {
        const data = `&${parameter}=${encodeURIComponent(
          reqParams[parameter]
        )}`;
        return accumulator + data;
      }, "")
      .slice(1);
  }
}
