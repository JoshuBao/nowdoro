// src/app/payment/success/page.tsx

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-base-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-primary">Payment Successful!</h2>
        <p className="text-center text-neutral">Thank you for your purchase! Please check your email for a magic link to complete your sign-up.</p>
      </div>
    </div>
  );
}
