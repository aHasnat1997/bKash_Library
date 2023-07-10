
class Agreement {
  constructor(parent) {
    this.parent = parent;
  }


  /**
  * Create a new aggrement with the user
  * @param {*} data
  * @returns
  */
  async createAgreement(data) {
    data = { ...data, callbackURL: this.CALLBACK_URL };
    return await this.parent.req({
      url: '/checkout/create',
      data
    });
  }

  /**
   * Executes a previously created agreement
   * @param paymentID The payment id to create/execute an agreement
   * @returns Agreement object
   */
  async executeAgreement(paymentID) {
    data = { ...data, callbackURL: this.CALLBACK_URL };
    return await this.parent.req({
      url: '/checkout/execute',
      data: { paymentID }
    });
  }

  /**
   * Queries a previously created agreement
   * @param agreementID ID of the already created agreement
   * @returns Agreement object
   */
  async queryAgreement(agreementID) {
    data = { ...data, callbackURL: this.CALLBACK_URL };
    return await this.parent.req({
      url: '/checkout/agreement/status',
      data: { agreementID }
    });
  }

  /**
   * Cancels a previously created agreement
   * @param agreementID ID of the already created agreement
   * @returns Agreement object
   */
  async cancelAgreement(agreementID) {
    data = { ...data, callbackURL: this.CALLBACK_URL };
    return await this.parent.req({
      url: '/checkout/agreement/cancel',
      data: { agreementID }
    });
  }
}

module.exports = Agreement;
