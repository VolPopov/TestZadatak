export class BillingInfo {
  constructor(page) {
    this.page = page;
  }

  async updateBillingInfo(
    customerID,
    cardholder,
    card_type,
    card_number,
    cvv,
    card_expiration_date,
    token
  ) {
    let response = await this.page.request.put(
      `/api/v1/customers/${customerID}/billing-info`,
      {
        data: {
          cardholder: cardholder,
          card_type: card_type,
          card_number: card_number,
          cvv: cvv,
          card_expiration_date: card_expiration_date,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let responseJSON = await response.json();
    return responseJSON;
  }
}
