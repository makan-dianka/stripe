// This is your test publishable API key.
const stripe = Stripe("pk_test_51JRFBQKoo0ZeB3KHwFkaqb6UrxYQVjW2IEpvD4MVCC5s69hbGNAs6iCaEu3RkKtQjPTRquA3yx4HN2t6IHfTY8Fq008Vkaur6D");

var elements = stripe.elements()
var style = {
    base : {
        color: '#32325d',
        fontFamily: "helvetica sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        '::placeholder': {
            color: "#aab7c4",
        }
    },
    invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
    }
}

var card = elements.create('card', {style: style})
card.mount("#card-element")

card.addEvenListener('change', function(event){
    var displayError=document.getElementById("card-errors")
    if (event.errors) {
        displayError.textContent = event.error.message
    }else{
        displayError.textContent = ''
    }
})

var form = document.getElementById("payment-form")
form.addEventListener('submit', function(event){
    event.preventDefault()
    stripe.createToken(card).then(function(result){
        if (result.error) {
            var errorElement = document.getElementById("card-errors")
            errorElement.textContent = result.error.message
        }else{
            stripeTokenHandler(result.token)
        }
    })
})

function stripeTokenHandler(token){
    var form = document.getElementById("payment-form")
    var hiddenInput = document.getElementById("input")
    hiddenInput.setAttribute('type', 'hidden')
    hiddenInput.setAttribute('name', 'stripeToken')
    hiddenInput.setAttribute('value', token.id)
    form.appendChild(hiddenInput)
    form.submit()
}