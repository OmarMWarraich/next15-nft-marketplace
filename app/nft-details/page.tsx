"use client";
import React, { Suspense } from "react";
import { Account } from "@/components/Account";
import { useSearchParams } from "next/navigation";

const PaymentBodyCmpInner = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  return (
    <div>
      <Account status={status} />
    </div>
  );
};

const PaymentBodyCmp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentBodyCmpInner />
    </Suspense>
  );
};

export default PaymentBodyCmp;
