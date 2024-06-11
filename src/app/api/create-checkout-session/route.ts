// src/app/api/create-checkout-session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const YOUR_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export async function POST(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1PQIPZFZFIYMWb7QukiL1jpN',
          quantity: 1,
        },

      ],
      discounts: [
        {
          coupon: 'eCWMtPdB',
        },
      ],
      allow_promotion_codes: true,
      mode: 'payment',

      success_url: `${YOUR_DOMAIN}/checkout/success`,
      cancel_url: `${YOUR_DOMAIN}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
