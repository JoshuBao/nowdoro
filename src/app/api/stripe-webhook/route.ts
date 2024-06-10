// src/app/api/stripe-webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature')!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email ?? '',
        options: {
          emailRedirectTo: `http://${process.env.NEXT_PUBLIC_DOMAIN}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      console.log(`Magic link sent to ${email}`);
    } catch (err) {
      console.error(`Error sending magic link to ${email}:`, err);
    }
  }

  return NextResponse.json({ received: true });
}
