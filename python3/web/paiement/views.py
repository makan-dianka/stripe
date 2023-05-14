from django.shortcuts import render
import stripe
from web import settings


def paiement(request):
    stripe.api_key = settings.STRIPE_TEST_KEY


    if request.method == 'POST':

        amount = int(request.POST.get('amount'))

        customer = stripe.Customer.create(
            name=request.POST.get("name"),
            email=request.POST.get('email'),
            source=request.POST.get('stripeToken'),
        )

        stripe.Charge.create(
            customer=customer,
            amount=amount*100,
            currency='eur',
            description="Ma premier test de paiment avec stripe"
        )

      
    return render(request, "paiement/index.html")
