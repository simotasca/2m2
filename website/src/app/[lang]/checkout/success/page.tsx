"use client";

export default function CheckoutSuccessPage() {
  let params = new URL(window.location.toString()).searchParams;

  return (
    <div className="text-white p-4">
      <div className="CIAO">SUCCESSFUL PAYMENT</div>
      <p>{params.get("email")}</p>
      <p>{params.get("redirect_status")}</p>
    </div>
  );
}
