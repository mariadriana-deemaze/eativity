import https from "https";
import crypto from "crypto";

type OAuth1Parameters = {
  format: string; // json
  oauth_version: "1.0";
  oauth_signature_method: "HMAC-SHA1";
  oauth_timestamp: number; // The date and time, expressed in the number of seconds since January 1, 1970 00:00:00 GMT. The timestamp value must be a positive integer and must be equal or greater than the timestamp used in previous requests
  oauth_consumer_key: string;
};

export class FatSecret {
  #accessKey: string;
  #sharedSecret: string;

  static get API_BASE() {
    return "https://platform.fatsecret.com/rest/server.api";
  }

  constructor(accessKey: string, sharedSecret: string) {
    if (!accessKey || !sharedSecret) {
      throw new Error("FAT_SECRET ENV not found");
    }
    this.#accessKey = accessKey;
    this.#sharedSecret = sharedSecret;
  }

  request(parameters: OAuth1Parameters) {
    const query = this._createQuery(parameters);
    const signature = this._createSignature(query);
    return new Promise((resolve, reject) => {
      https
        .request({
          host: "platform.fatsecret.com",
          method: "GET",
          path: `${FatSecret.API_BASE}?${query}&oauth_signature=${signature}`,
        })
        .on("error", (error) => reject(error))
        .on("response", (response) => {
          let data = "";
          response
            .on("error", (error) => reject(error))
            .on("data", (chunk) => (data += chunk))
            .on("end", () => {
              try {
                resolve(JSON.parse(data.toString()));
              } catch (error) {
                reject(error);
              }
            });
        })
        .end();
    });
  }

  _createSignature(query: string) {
    const mac = crypto.createHmac("sha1", this.#sharedSecret + "&");
    mac.update(
      `GET&${encodeURIComponent(FatSecret.API_BASE)}&${encodeURIComponent(
        query
      )}`
    );
    return encodeURIComponent(mac.digest("base64"));
  }

  _createQuery(parameters: OAuth1Parameters) {
    parameters["format"] = "json";
    parameters["oauth_version"] = "1.0";
    parameters["oauth_signature_method"] = "HMAC-SHA1";
    parameters["oauth_nonce"] = crypto.randomBytes(10).toString("HEX");
    parameters["oauth_timestamp"] = Math.floor(new Date().getTime() / 1000);
    parameters["oauth_consumer_key"] = this.#accessKey;

    return Object.keys(parameters)
      .sort()
      .reduce((accumulator, parameter) => {
        const data = `&${parameter}=${encodeURIComponent(
          parameters[parameter]
        )}`;
        return accumulator + data;
      }, "")
      .slice(1);
  }
}
