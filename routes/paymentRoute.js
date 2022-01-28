const express =require("express")
const router =express.Router()
const Razorpay =require("razorpay")
const bodyParser = require('body-parser')
router.use(bodyParser.json())
const razorpayInstance= new Razorpay({
  
     //Replace with your key_id
    key_id: process.env.key_id,
  
  //  Replace with your key_secret
    key_secret: process.env.key_secret

});
router.post('/createOrder',async (req, res)=>{ 
  
    // STEP 1:
    const {amount,currency,receipt}  = req.body;      

    // STEP 2:    
    const response =await razorpayInstance.orders.create({'amount':amount, 'currency':currency,'receipt': receipt}) 

        res.status(200).json({
          'id': response.id,
          'currency': response.currency,
          'amount': response.amount
        }) 
})    
router.post('/verification', (req, res) => {
	// do a validation
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

         
         
         
   //      if(!err){
  //          console.log(`message from server ${order}`)
     //       res.json(order)
    //      }
    //      else
    //        res.send(err);
   //     }
  //  )

router.get("/",(req,res)=>{
    console.log(process.env.name)
    res.render("index")
})




module.exports =router