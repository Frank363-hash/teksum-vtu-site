"use client";

import ServicePurchasePanel from "@/components/ServicePurchasePanel";
import { useAuth } from "@/context/AuthContext";

export default function ServicePurchasePanelWrapper({
  service,
}) {
  const {
    isAuthenticated = false,
    accessToken = null,
  } = useAuth();

  return (
    <ServicePurchasePanel
      service={service}
      isAuthenticated={isAuthenticated}
      accessToken={accessToken}
    />
  );
}