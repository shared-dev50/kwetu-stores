import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";

const CheckoutSuccess = () => {
  const clearCart = useCartStore(s => s.clearCart);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    clearCart();

    const timer = setTimeout(() => {}, 5000);

    return () => clearTimeout(timer);
  }, [clearCart, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl text-center">
        <div className="card-body items-center">
          <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="card-title text-2xl font-bold">Payment Successful!</h2>
          <p className="text-base-content/70">
            The transaction has been processed. You can now print the receipt or
            start a new order.
          </p>

          {sessionId && (
            <div className="badge badge-ghost mt-2">
              Ref: {sessionId.slice(-10)}
            </div>
          )}

          <div className="card-actions mt-8 w-full">
            <button
              className="btn btn-primary w-full"
              onClick={() => navigate("/")}
            >
              Back to POS Dashboard
            </button>
            <button
              className="btn btn-outline w-full"
              onClick={() => window.print()}
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
