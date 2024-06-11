// src/app/api/stripe-webhook/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/client';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const supabase = createClient();
    const buf = await buffer(req);
    const rawBody = buf.toString('utf8');
    const signature = req.headers['stripe-signature'] as string;
    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      console.error('Webhook Error:', err.message);
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;

      if (email) {
        try {
          const { error } = await supabase.auth.signInWithOtp({
            email,
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
      } else {
        console.error('No email found in session data');
      }
    }

    return res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
}
