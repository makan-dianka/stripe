from django.shortcuts import render
import stripe
from web import settings


def paiement(request):
    stripe.api_key = settings.STRIPE_TEST_KEY
    if request.method == 'POST':
        customer = stripe.Customer.create(
            name="Makan_stripe_test",
            email="makan_stripe_test@gmail.com",
            source=request.POST.get()
        )
        

        charge = stripe.Charge.create(
            customer=customer,
            amount=50,
            currency='eur',
            source='tok_mastercard',
            description="Ma premier test de paiment avec stripe"
        )

      
    return render(request, "paiement/index.html")
