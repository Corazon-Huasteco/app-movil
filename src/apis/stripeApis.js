import axios from "axios";

const creatPaymentIntent = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('https://conexion-stripe-q7o5.vercel.app/payment-sheet', data).then(function (res) {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

export default creatPaymentIntent