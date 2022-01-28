var options
let amount;
let id;
let currency;
var razorpayObject
async function sendRequest(){
const serverResponse =await axios({
      method: 'post',
      url: '/createOrder',
   //   headers: {'X-Requested-With': 'XMLHttpRequest'},
      data: {
      amount :"49900",
      currency :"INR",
      receipt :"1234" 
      }
    })
  
    return(serverResponse)
}
sendRequest().then((response)=>{
      id= response.data.id
      amount =response.data.amount
      currency =response.data.currency



 options = {
    "key": "rzp_test_16ZqgdfIagtXbt", 
    "amount":amount, 
    "currency":currency,
    "name": "DSA Course",
    "description": "Pay & Checkout this Course, Upgrade your DSA Skill",
     "image": "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png",
    "order_id": id,  
    "handler": function (response){

        alert("This step of Payment Succeeded");
    },
    "prefill": {
       //Here we are prefilling random contact
      "contact":"9000000000", 
        //name and email id, so while checkout
      "name": "Alok Sharma",  
      "email": "alok92iit@gmail.com"  
    },
   "notes" : {
      "description":"Best Course for SDE placements",
      "language":"Available in 4 major Languages JAVA,C/C++, Python, Javascript",
      "access":"This course have Lifetime Access"
    }, 
    "theme": {
        "color": "#2300a3"
    }
};
return options}).then((options)=>{
razorpayObject = new Razorpay(options);
//console.log(razorpayObject);
razorpayObject.on('payment.failed', function (response){
      console.log(response);
      alert("This step of Payment Failed");
});
})
document.getElementById('pay-button').onclick =function(e){
    razorpayObject.open();
    e.preventDefault();
}