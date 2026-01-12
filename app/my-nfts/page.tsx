"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { resolveSchema } from "./resolveSchema";

const MyNFTs = () => {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <ResolverBody />
    </Suspense>
  );
};

const ResolverBody = () => {
  const searchParams = useSearchParams();
  const uri =
    searchParams.get("uri") ?? "ipfs://Qm... (pass ?uri=ipfs://<cid> to test)";

  const resolved = useMemo(() => resolveSchema(uri), [uri]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">IPFS URI Resolver</h1>

      <div className="mt-4 space-y-2">
        <div>
          <div className="text-sm font-medium">Input</div>
          <div className="break-all text-sm opacity-90">{uri}</div>
        </div>

        <div>
          <div className="text-sm font-medium">Resolved</div>
          <div className="break-all text-sm">
            {resolved.startsWith("http") ? (
              <a
                href={resolved}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {resolved}
              </a>
            ) : (
              <span className="opacity-90">{resolved}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNFTs;
