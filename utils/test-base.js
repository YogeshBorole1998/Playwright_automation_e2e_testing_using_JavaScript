const base = require('@playwright/test')

exports.customtest = base.test.extend({
  testDataForOrder: {
    username: 'anshika@gmail.com',
    password: 'Iamking@000',
    productName: 'IPHONE 13 PRO' // Note : If Fail Please Check Product Available
  }
})
