const SendOtp = require('sendotp');
module.exports = {
   /* sendOTP :  async (req ,res ,next) => {
        const sendOtp = new SendOtp('MSG91');
        sendOtp.send("0629675445", "PRIIND", "4635", function (error, data) {
            res.send(data)
            console.log(data);
          });
    }
    */
    sendOTP :  async (req ,res ,next) => {
                    res.send("send OTP ")
    }
}