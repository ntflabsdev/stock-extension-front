import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io, type Socket } from "socket.io-client";
import { resolveApiBase } from "@/lib/api";

export type OptionChainSocketPayload = {
  symbol?: string;
  expiry?: string | null;
  scrapedAt?: string;
  newRecords?: number;
  totalReceived?: number;
};

export function useOptionChainSocket(enabled = true) {
  const queryClient = useQueryClient();
  const [connected, setConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<OptionChainSocketPayload | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const base = resolveApiBase();
    const socket: Socket = io(base, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("optionchain:update", (payload: OptionChainSocketPayload) => {
      setLastEvent(payload);
      queryClient.invalidateQueries({ queryKey: ["optionchain"] });
      queryClient.invalidateQueries({ queryKey: ["optionchain-meta"] });
    });

    return () => {
      socket.disconnect();
    };
  }, [enabled, queryClient]);

  return { connected, lastEvent };
}
