const axios = require('axios');

class bKashPayment {
  constructor(apiKey, apiSecret, username, password) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.username = username;
    this.password = password;
    this.accessToken = null;
  }
  
  

  async generateAccessToken() {

    const headers = {
        'content-type': 'application/json',
        'password': this.password,
        'username': this.username
      };
      
      const data = {
        app_key: this.apiKey,
        app_secret: this.apiSecret
      };

    try {
      const response = await axios.post('https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant', data, {headers});

      this.accessToken = response.data.id_token;

    //   console.log('Access Token generated:', this.accessToken);
      return response.data;
    } catch (error) {
      throw new Error('Failed to generate access token');
    }
  }

  async refreshAccessToken() {

    const refToken = await this.generateAccessToken();

    // if (!this.refreshToken) {
    //   throw new Error('Refresh token not available');
    // }

    const headers = {
        'content-type': 'application/json',
        'password': this.password,
        'username': this.username
    };
      
    const data = {
        app_key: this.apiKey,
        app_secret: this.apiSecret,
        refresh_token: refToken.refresh_token
    };

    try {
      const response = await axios.post('https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/refresh', data, {headers});
      this.refreshToken = response.data.refresh_token;
    //   console.log('Access Token refreshed:', this.refreshToken);
    } catch (error) {
      throw new Error('Failed to refresh access token');
    }
  }

  async createAgreement(amount, callbackURL) {
    // if (!this.accessToken) {
    //   await this.generateAccessToken();
    //   this.startTokenRefreshInterval();
    // }

    const refToken = await this.generateAccessToken();

    const headers = {
        'Authorization': refToken.refresh_token,
        'X-APP-Key': this.apiKey,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
      
    const data = {
        mode: '0000',
        callbackURL: callbackURL,
        amount: amount,
        currency: 'BDT',
        intent: 'Sale'
    };

    try {
      const response = await axios.post('https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create', data, {headers});
      return response?.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await this.refreshAccessToken();
        return this.createAgreement(amount, callbackURL);
      }
      throw new Error('Failed to create agreement');
    }
  }

  async createCheckout(amount, currency, intent) {
    if (!this.accessToken) {
      await this.generateAccessToken();
    }

    try {
      const response = await axios.post('https://api.bkash.com/tokenized/checkout/v1/create', {
        amount,
        currency,
        intent,
      }, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'x-app-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create checkout');
    }
  }

  async executePayment(token, amount, trxID) {
    if (!this.accessToken) {
      await this.generateAccessToken();
    }

    try {
      const response = await axios.post('https://api.bkash.com/tokenized/checkout/v1/execute', {
        token,
        amount,
        trxID,
      }, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'x-app-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to execute payment');
    }
  }
}

module.exports = bKashPayment;
