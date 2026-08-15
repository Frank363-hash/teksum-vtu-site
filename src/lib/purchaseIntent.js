const PURCHASE_INTENT_KEY =
  "teksum_purchase_intent";

export function savePurchaseIntent(
  intent
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  try {
    sessionStorage.setItem(
      PURCHASE_INTENT_KEY,
      JSON.stringify({
        ...intent,
        createdAt:
          Date.now(),
      })
    );
  } catch {
    // Ignore storage failures.
  }
}

export function getPurchaseIntent() {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  try {
    const raw =
      sessionStorage.getItem(
        PURCHASE_INTENT_KEY
      );

    if (!raw) {
      return null;
    }

    const parsed =
      JSON.parse(raw);

    /*
     * Don't retain an old purchase intention forever.
     * Five minutes is enough to survive login/register.
     */
    const maxAge =
      5 * 60 * 1000;

    if (
      !parsed.createdAt ||
      Date.now() -
        parsed.createdAt >
        maxAge
    ) {
      sessionStorage.removeItem(
        PURCHASE_INTENT_KEY
      );

      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearPurchaseIntent() {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  try {
    sessionStorage.removeItem(
      PURCHASE_INTENT_KEY
    );
  } catch {
    // Ignore storage failures.
  }
}