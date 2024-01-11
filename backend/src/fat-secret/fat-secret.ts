import { createHmac, randomBytes } from "crypto";
import { IntegratedFatSecretMethods } from "types";

import { FAT_SECRET_API_ENDPOINT } from "utils";

type OAuth1Parameters = {
  format: "json";
  oauth_version: "1.0";
  oauth_signature_method: "HMAC-SHA1";
  oauth_nonce: string;
  oauth_timestamp: number;
  oauth_consumer_key: string;
};

type RequestParameters = {
  method: IntegratedFatSecretMethods;
  access_token: string;
  search_expression?: string;
  max_results?: number;
  page_number?: number;
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

    console.log("path ->", path);

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
      .then((response) => {
        console.log("JSON response ->", response);
        return response as Promise<T>;
      })
      .catch((error) => {
        console.error("Error:", error);
        return error;
      }) as Promise<T>;
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
    const reqParams: OAuth1Parameters & Partial<RequestParameters> = {
      method: parameters.method,
      format: "json",
      oauth_version: "1.0",
      oauth_signature_method: "HMAC-SHA1",
      // @ts-ignore
      oauth_nonce: randomBytes(10).toString("HEX"),
      oauth_timestamp: Math.floor(new Date().getTime() / 1000),
      oauth_consumer_key: this.#accessKey,
    };

    // Optional parameters
    if (parameters.search_expression)
      reqParams.search_expression = parameters.search_expression;

    if (parameters.max_results) reqParams.max_results = parameters.max_results;

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
