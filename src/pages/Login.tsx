import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { AxiosError } from "axios";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [role, setRole] = useState<"cashier" | "manager">("cashier");

  const { loginMutation, registerMutation } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mutation = isRegister ? registerMutation : loginMutation;

    mutation.mutate(
      { name, pin, role },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error: AxiosError<{ message: string }>) => {
          const msg = error.response?.data?.message || "Auth failed";
          alert(msg);
        },
      },
    );
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            {isRegister ? "Create Staff Account" : "Staff Login"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">User Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Alex"
                className="input input-bordered focus:input-primary"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Security PIN</span>
              </label>
              <input
                type="password"
                placeholder="****"
                className="input input-bordered focus:input-primary text-center tracking-widest font-mono"
                value={pin}
                onChange={e => setPin(e.target.value)}
                required
              />
            </div>

            {isRegister && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Role</span>
                </label>
                <select
                  className="select select-bordered"
                  value={role}
                  onChange={e =>
                    setRole(e.target.value as "cashier" | "manager")
                  }
                >
                  <option value="cashier">Cashier</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            )}

            <div className="card-actions mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isRegister ? "Register" : "Login"}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Need to register staff?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
