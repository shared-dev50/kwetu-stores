import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeItem, updateQuantity, processPayment, isProcessing } =
    useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );
  const navigate = useNavigate();
  const [cashReceived, setCashReceived] = useState<string>("");

  const handleCashPayment = async () => {
    try {
      await processPayment("cash");
      closeCashModal();
      navigate("/checkout-success", {
        state: {
          amountReceived: cashReceived,
          total: total,
          paymentMethod: "cash",
        },
      });
    } catch (error) {
      console.error("Cash payment failed:", error);
    }
  };

  const closeCashModal = () => {
    setCashReceived("");
    const modal = document.getElementById("cash_modal") as HTMLDialogElement;
    if (modal) modal.close();
  };

  return (
    <>
      <div className="w-96 border-l bg-base-100 p-6 flex flex-col h-full shadow-2xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          🛒 Current Order
        </h2>

        {/* Scrollable Items List */}
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {cart.length === 0 ? (
            <div className="text-center mt-10 opacity-40">
              <p className="text-4xl mb-2">📥</p>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.product.id}
                className="flex flex-col gap-2 border-b pb-3 border-base-200"
              >
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-base-content">
                    {item.product.name}
                  </p>
                  <button
                    className="btn btn-ghost btn-xs text-error"
                    onClick={() => removeItem(item.product.id!)}
                  >
                    ✕
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="join">
                    <button
                      className="join-item btn btn-xs px-3"
                      onClick={() => updateQuantity(item.product.id!, -1)}
                    >
                      −
                    </button>
                    <span className="join-item px-4 bg-base-200 text-xs flex items-center font-bold">
                      {item.quantity}
                    </span>
                    <button
                      className="join-item btn btn-xs px-3"
                      onClick={() => updateQuantity(item.product.id!, 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="font-mono text-sm">
                    ${(Number(item.product.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        <div className="border-t pt-6 mt-4 space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-gray-500 uppercase text-xs font-bold tracking-widest">
              Total Amount
            </span>
            <span className="text-3xl font-black text-primary">
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* CASH BUTTON */}
            <button
              className="btn btn-outline btn-success font-bold"
              disabled={cart.length === 0 || isProcessing}
              onClick={() => {
                setCashReceived(" ");
                (
                  document.getElementById("cash_modal") as HTMLDialogElement
                ).showModal();
              }}
            >
              CASH
            </button>

            {/* STRIPE BUTTON */}
            <button
              className={`btn btn-primary font-bold ${isProcessing ? "loading" : ""}`}
              disabled={cart.length === 0 || isProcessing}
              onClick={() => processPayment("card")}
            >
              {!isProcessing && "STRIPE"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Logic */}
      <dialog id="cash_modal" className="modal">
        <div className="modal-box border-t-8 border-success">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeCashModal}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg text-center uppercase">
            Cash Payment
          </h3>

          <div className="py-6 space-y-4">
            <div className="flex justify-between text-xl font-mono border-b pb-2">
              <span>Total Due:</span>
              <span className="font-bold text-error">${total.toFixed(2)}</span>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Amount Received
                </span>
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered input-lg text-2xl font-mono focus:input-success"
                value={cashReceived}
                onChange={e => setCashReceived(e.target.value)}
                autoFocus
              />
            </div>

            {parseFloat(cashReceived) >= total && (
              <div className="bg-success text-success-content p-4 rounded-lg flex justify-between items-center shadow-inner">
                <span className="font-bold">CHANGE:</span>
                <span className="text-3xl font-black font-mono">
                  ${(parseFloat(cashReceived) - total).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <div className="modal-action grid grid-cols-2 gap-2">
            <button className="btn btn-ghost" onClick={closeCashModal}>
              CANCEL
            </button>
            <button
              className={`btn btn-success ${isProcessing ? "loading" : ""}`}
              disabled={parseFloat(cashReceived) < total || isProcessing}
              onClick={handleCashPayment}
            >
              FINALIZE SALE
            </button>
          </div>
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeCashModal}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Cart;
