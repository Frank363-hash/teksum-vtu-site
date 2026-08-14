"use client";

import ServicePurchasePanel from "@/components/ServicePurchasePanel";
import { useAuth } from "@/context/AuthContext";

export default function AuthenticatedServicePurchasePanel({
  service,
}) {
  const {
    isAuthenticated,
    accessToken,
  } = useAuth();

  return (
    <ServicePurchasePanel
      service={service}
      isAuthenticated={
        isAuthenticated
      }
      accessToken={
        accessToken
      }
    />
  );
}