if (window.PaymentRequest) {
  const supportedInstruments = [
    {
      supportedMethods: 'https://google.com/pay',
      data: {
        environment: 'TEST',
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: [
                'AMEX',
                'DISCOVER',
                'JCB',
                'MASTERCARD',
                'VISA',
              ],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'stripe',
                'stripe:version': '2018-10-31',
                'stripe:publishableKey':
                  'pk_test_51PNcn6RrQfUQC5MYaOchK1YrrDtBrxRDbyzQ2rfUIw7QhiIPmOU0vLYBq17pyMSQKAw99bqVnmeYGELIq2KOncST00ysRkRCO0',
              },
            },
          },
        ],
      },
    },
  ];

  const pr = new PaymentRequest(supportedInstruments, {
    total: {
      label: 'Total',
      amount: { currency: 'USD', value: '1.00' },
    },
  });

  pr.canMakePayment()
    .then(result => {
      if (result) {
        console.log('Google Pay is available');
      } else {
        console.log('Google Pay is not available');
        console.log('Reason:', result);
      }
    })
    .catch(err => {
      console.error('Error:', err);
    });
} else {
  console.log('PaymentRequest API is not supported in this browser');
}
