import express from 'express'
import * as dotenv from 'dotenv'
import QiwiBillPaymentsAPI from '@qiwi/bill-payments-node-js-sdk'

dotenv.config()

const router = express.Router()


router.post("/", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    const qiwiApi = new QiwiBillPaymentsAPI(process.env.QIWI_SECRET);

    const billId = qiwiApi.generateId();

    const fields = {
        amount: req.body.amount,
        currency: "RUB",
        comment: req.body.text,
        expirationDateTime: qiwiApi.getLifetimeByDay(0.5),
        email: 'eugenemktrashmail@gmail.com',
        account: 'client4562342146333',
        successUrl: 'https://eugenemk.com/'
    };

    let url
    qiwiApi.createBill(billId, fields).then(data => {
        url = data.payUrl
        res.json({ payUrl: url })
    });
})

export default router 