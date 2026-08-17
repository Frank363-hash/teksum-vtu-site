"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || ""
).replace(/\/+$/, "");

/*
 * ============================================================
 * FRONTEND DEVELOPMENT DEMO MODE
 * ============================================================
 *
 * Set:
 *
 * NEXT_PUBLIC_DEMO_AUTH=true
 *
 * in .env.local while building the frontend.
 *
 * Demo mode allows the dashboard to be tested before the
 * real authentication backend exists.
 *
 * IMPORTANT:
 * Demo mode must NOT be enabled in production.
 *
 * The demo session is created only when the user explicitly
 * signs in with the demo credentials. It is NOT automatically
 * created when someone visits the public website.
 */

const DEMO_AUTH_ENABLED =
  process.env.NEXT_PUBLIC_DEMO_AUTH === "true";

const ACCESS_TOKEN_KEY =
  "teksum_access_token";

const USER_KEY =
  "teksum_user";

const DEMO_LOGOUT_KEY =
  "teksum_demo_logged_out";

/*
 * ============================================================
 * TEMPORARY DEVELOPMENT USER
 * ============================================================
 */

const DEMO_USER = {
  id: "demo-user-001",
  userId: "demo-user-001",
  accountId: "TSM-DEMO-0001",

  name: "Frank Demo",
  fullName: "Frank Demo",
  firstName: "Frank",
  lastName: "Demo",

  email: "frank.demo@teksum.local",
  phone: "08012345678",
  phoneNumber: "08012345678",

  status: "verified",
  accountStatus: "verified",

  createdAt:
    "2026-08-01T10:00:00.000Z",
};

const DEMO_ACCESS_TOKEN =
  "teksum-demo-access-token";

/*
 * ============================================================
 * STORAGE HELPERS
 * ============================================================
 */

function getStoredAccessToken() {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    return (
      sessionStorage.getItem(
        ACCESS_TOKEN_KEY
      ) || ""
    );
  } catch {
    return "";
  }
}

function storeAccessToken(token) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (token) {
      sessionStorage.setItem(
        ACCESS_TOKEN_KEY,
        token
      );
    } else {
      sessionStorage.removeItem(
        ACCESS_TOKEN_KEY
      );
    }
  } catch {
    // Ignore storage failures.
  }
}

function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw =
      sessionStorage.getItem(USER_KEY);

    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeUser(user) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (user) {
      sessionStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
      );
    } else {
      sessionStorage.removeItem(USER_KEY);
    }
  } catch {
    // Ignore storage failures.
  }
}

function hasDemoLogoutFlag() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return (
      sessionStorage.getItem(
        DEMO_LOGOUT_KEY
      ) === "true"
    );
  } catch {
    return false;
  }
}

function setDemoLogoutFlag(value) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (value) {
      sessionStorage.setItem(
        DEMO_LOGOUT_KEY,
        "true"
      );
    } else {
      sessionStorage.removeItem(
        DEMO_LOGOUT_KEY
      );
    }
  } catch {
    // Ignore storage failures.
  }
}

/*
 * ============================================================
 * RESPONSE HELPERS
 * ============================================================
 */

function extractMessage(data, fallback) {
  if (!data) {
    return fallback;
  }

  if (typeof data === "string") {
    const trimmed = data.trim();

    /*
     * Never display a complete Next.js / HTML error page
     * inside the authentication UI.
     */
    if (
      trimmed.startsWith("<!DOCTYPE") ||
      trimmed.startsWith("<html") ||
      trimmed.includes("<html") ||
      trimmed.includes("<!DOCTYPE")
    ) {
      return fallback;
    }

    return trimmed || fallback;
  }

  return (
    data.message ||
    data.error ||
    data.errors?.[0]?.message ||
    data.errors?.[0] ||
    data.data?.message ||
    fallback
  );
}

function extractAccessToken(data) {
  return (
    data?.accessToken ||
    data?.access_token ||
    data?.token ||
    data?.data?.accessToken ||
    data?.data?.access_token ||
    data?.data?.token ||
    ""
  );
}

function extractUser(data) {
  return (
    data?.user ||
    data?.data?.user ||
    data?.data?.account ||
    data?.account ||
    null
  );
}

async function parseResponse(response) {
  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    try {
      return await response.json();
    } catch {
      return {
        message:
          "The server returned an invalid response.",
      };
    }
  }

  try {
    const text = await response.text();

    /*
     * Never pass an HTML error document into the UI.
     */
    if (
      text.trim().startsWith("<!DOCTYPE") ||
      text.trim().startsWith("<html") ||
      text.includes("<html") ||
      text.includes("<!DOCTYPE")
    ) {
      return {
        message:
          "The authentication server returned an unexpected response.",
      };
    }

    return text;
  } catch {
    return {
      message:
        "The server returned an unreadable response.",
    };
  }
}

/*
 * ============================================================
 * AUTH PROVIDER
 * ============================================================
 */

export function AuthProvider({
  children,
}) {
  const [
    accessToken,
    setAccessTokenState,
  ] = useState("");

  const [
    user,
    setUserState,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    authError,
    setAuthError,
  ] = useState("");

  const refreshInProgress =
    useRef(null);

  /*
   * ----------------------------------------------------------
   * Apply authenticated state
   * ----------------------------------------------------------
   */

  const applySession = useCallback(
    (
      token,
      authenticatedUser
    ) => {
      setAccessTokenState(
        token || ""
      );

      if (token) {
        storeAccessToken(token);
      } else {
        storeAccessToken("");
      }

      if (authenticatedUser) {
        setUserState(
          authenticatedUser
        );

        storeUser(
          authenticatedUser
        );
      } else if (
        authenticatedUser === null
      ) {
        setUserState(null);
        storeUser(null);
      }
    },
    []
  );

  /*
   * ----------------------------------------------------------
   * Clear authentication
   * ----------------------------------------------------------
   */

  const clearSession =
    useCallback(() => {
      setAccessTokenState("");
      setUserState(null);

      storeAccessToken("");
      storeUser(null);

      setAuthError("");
    }, []);

  /*
   * ----------------------------------------------------------
   * Demo session
   * ----------------------------------------------------------
   */

  const startDemoSession =
    useCallback(() => {
      if (!DEMO_AUTH_ENABLED) {
        return false;
      }

      if (hasDemoLogoutFlag()) {
        return false;
      }

      applySession(
        DEMO_ACCESS_TOKEN,
        DEMO_USER
      );

      return true;
    }, [applySession]);

  /*
   * ----------------------------------------------------------
   * Refresh session
   * ----------------------------------------------------------
   *
   * Production:
   * The backend should authenticate this request using an
   * HttpOnly refresh-token cookie.
   *
   * Development:
   * If the backend is not available and demo mode is enabled,
   * the demo session can be created after an explicit demo
   * login.
   */

  const refreshSession =
    useCallback(async () => {
      if (
        refreshInProgress.current
      ) {
        return refreshInProgress.current;
      }

      refreshInProgress.current =
        (async () => {
          try {
            const response =
              await fetch(
                `${API_BASE_URL}/api/auth/refresh`,
                {
                  method: "POST",
                  credentials:
                    "include",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                }
              );

            const data =
              await parseResponse(
                response
              );

            if (!response.ok) {
              /*
               * IMPORTANT:
               * Do NOT automatically create a demo
               * session here.
               *
               * Public pages must remain logged out
               * until the user explicitly signs in.
               */

              clearSession();

              return {
                success: false,
                message:
                  extractMessage(
                    data,
                    "Your session has expired."
                  ),
              };
            }

            const token =
              extractAccessToken(
                data
              );

            const refreshedUser =
              extractUser(data);

            /*
             * Some backends only return a new
             * access token. Preserve the existing
             * user in that situation.
             */
            const nextUser =
              refreshedUser ||
              getStoredUser();

            if (!token) {
              clearSession();

              return {
                success: false,
                message:
                  "Unable to restore your session.",
              };
            }

            /*
             * A real backend session has been restored.
             */
            setDemoLogoutFlag(false);

            applySession(
              token,
              nextUser
            );

            return {
              success: true,
              token,
              user: nextUser,
            };
          } catch {
            /*
             * IMPORTANT:
             * Backend failure does NOT automatically
             * log a public visitor into demo mode.
             *
             * Demo mode is started only from the
             * explicit demo login flow.
             */

            clearSession();

            return {
              success: false,
              message:
                "Unable to connect to the authentication server.",
            };
          } finally {
            refreshInProgress.current =
              null;
          }
        })();

      return refreshInProgress.current;
    }, [
      applySession,
      clearSession,
    ]);

  /*
   * ----------------------------------------------------------
   * Login
   * ----------------------------------------------------------
   */

  const login = useCallback(
    async ({
      email,
      password,
    }) => {
      setAuthError("");

      /*
       * ------------------------------------------------------
       * FRONTEND DEMO LOGIN
       * ------------------------------------------------------
       *
       * Demo credentials:
       *
       * Email:
       * frank.demo@teksum.local
       *
       * Password:
       * Demo@12345
       *
       * The demo session starts ONLY when these credentials
       * are explicitly submitted.
       */

      if (
        DEMO_AUTH_ENABLED &&
        email
          ?.trim()
          .toLowerCase() ===
          "frank.demo@teksum.local" &&
        password === "Demo@12345"
      ) {
        setDemoLogoutFlag(false);

        applySession(
          DEMO_ACCESS_TOKEN,
          DEMO_USER
        );

        return {
          success: true,
          demo: true,
          user: DEMO_USER,
          token: DEMO_ACCESS_TOKEN,
        };
      }

      /*
       * If demo mode is enabled but the user enters
       * different credentials, continue to the real backend.
       */

      try {
        const response =
          await fetch(
            `${API_BASE_URL}/api/auth/login`,
            {
              method: "POST",
              credentials:
                "include",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                email: email
                  ?.trim()
                  .toLowerCase(),
                password,
              }),
            }
          );

        const data =
          await parseResponse(
            response
          );

        if (!response.ok) {
          const message =
            extractMessage(
              data,
              "Unable to sign in. Please check your details and try again."
            );

          setAuthError(message);

          return {
            success: false,
            message,
          };
        }

        const token =
          extractAccessToken(
            data
          );

        const authenticatedUser =
          extractUser(data);

        /*
         * If the backend returns the access token directly,
         * establish the authenticated state immediately.
         */
        if (token) {
          setDemoLogoutFlag(false);

          applySession(
            token,
            authenticatedUser
          );

          setAuthError("");

          return {
            success: true,
            user:
              authenticatedUser,
            data,
          };
        }

        /*
         * Cookie-only authentication:
         * ask the backend to restore the session.
         */
        const refreshed =
          await refreshSession();

        if (!refreshed.success) {
          const message =
            "Sign in succeeded, but your session could not be established.";

          setAuthError(message);

          return {
            success: false,
            message,
          };
        }

        setAuthError("");

        return {
          success: true,
          user:
            refreshed.user,
          token:
            refreshed.token,
          data,
        };
      } catch {
        const message =
          "Unable to connect to the authentication server. Please try again.";

        setAuthError(message);

        return {
          success: false,
          message,
        };
      }
    },
    [
      applySession,
      refreshSession,
    ]
  );

  /*
   * ----------------------------------------------------------
   * Register
   * ----------------------------------------------------------
   */

  const register = useCallback(
    async ({
      name,
      email,
      phone,
      password,
    }) => {
      setAuthError("");

      try {
        const response =
          await fetch(
            `${API_BASE_URL}/api/auth/register`,
            {
              method: "POST",
              credentials:
                "include",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                name: name?.trim(),
                email: email
                  ?.trim()
                  .toLowerCase(),
                phone: phone?.trim(),
                password,
              }),
            }
          );

        const data =
          await parseResponse(
            response
          );

        if (!response.ok) {
          const message =
            extractMessage(
              data,
              "Unable to create your account. Please try again."
            );

          setAuthError(message);

          return {
            success: false,
            message,
            data,
          };
        }

        const token =
          extractAccessToken(
            data
          );

        const registeredUser =
          extractUser(data);

        /*
         * Some registration systems require email
         * verification before authentication.
         */
        const requiresVerification =
          Boolean(
            data?.requiresEmailVerification ||
              data?.emailVerificationRequired ||
              data?.data
                ?.requiresEmailVerification ||
              data?.data
                ?.emailVerificationRequired
          );

        /*
         * If registration immediately authenticates
         * the user, establish the session.
         */
        if (
          token &&
          !requiresVerification
        ) {
          setDemoLogoutFlag(false);

          applySession(
            token,
            registeredUser
          );
        }

        /*
         * If registration does not return a token
         * but also does not require verification,
         * restore the session.
         */
        if (
          !token &&
          !requiresVerification
        ) {
          const refreshed =
            await refreshSession();

          if (refreshed.success) {
            return {
              success: true,
              user:
                refreshed.user,
              token:
                refreshed.token,
              data,
              requiresEmailVerification:
                false,
            };
          }
        }

        return {
          success: true,
          user:
            registeredUser,
          data,
          requiresEmailVerification:
            requiresVerification,
        };
      } catch {
        const message =
          "Unable to connect to the authentication server. Please try again.";

        setAuthError(message);

        return {
          success: false,
          message,
        };
      }
    },
    [
      applySession,
      refreshSession,
    ]
  );

  /*
   * ----------------------------------------------------------
   * Logout
   * ----------------------------------------------------------
   */

  const logout =
    useCallback(async () => {
      const token =
        accessToken ||
        getStoredAccessToken();

      /*
       * In demo mode, remember that the user intentionally
       * logged out. This prevents the demo session from being
       * recreated accidentally.
       */
      if (
        DEMO_AUTH_ENABLED &&
        token === DEMO_ACCESS_TOKEN
      ) {
        setDemoLogoutFlag(true);
      }

      try {
        /*
         * Don't attempt a backend request for the
         * temporary demo token.
         */
        if (
          token !==
          DEMO_ACCESS_TOKEN
        ) {
          await fetch(
            `${API_BASE_URL}/api/auth/logout`,
            {
              method: "POST",
              credentials:
                "include",
              headers: token
                ? {
                    Authorization:
                      `Bearer ${token}`,
                    "Content-Type":
                      "application/json",
                  }
                : {
                    "Content-Type":
                      "application/json",
                  },
            }
          );
        }
      } catch {
        /*
         * Even if the backend is unavailable,
         * clear local authentication state.
         */
      } finally {
        clearSession();
      }

      return {
        success: true,
      };
    }, [
      accessToken,
      clearSession,
    ]);

  /*
   * ----------------------------------------------------------
   * Authenticated fetch helper
   * ----------------------------------------------------------
   *
   * Dashboard, wallet, profile, purchase history
   * and future purchase APIs can use authFetch().
   *
   * If the backend returns 401, the helper attempts
   * one session refresh and retries the request.
   */

  const authFetch =
    useCallback(
      async (
        input,
        options = {}
      ) => {
        let token =
          accessToken ||
          getStoredAccessToken();

        const makeRequest =
          async (
            currentToken
          ) => {
            const headers = {
              ...(options.headers ||
                {}),
            };

            if (currentToken) {
              headers.Authorization =
                `Bearer ${currentToken}`;
            }

            return fetch(input, {
              ...options,
              credentials:
                "include",
              headers,
            });
          };

        let response =
          await makeRequest(
            token
          );

        if (
          response.status === 401
        ) {
          const refreshed =
            await refreshSession();

          if (refreshed.success) {
            token =
              refreshed.token;

            response =
              await makeRequest(
                token
              );
          }
        }

        return response;
      },
      [
        accessToken,
        refreshSession,
      ]
    );

  /*
   * ----------------------------------------------------------
   * Restore session on application startup
   * ----------------------------------------------------------
   */

  useEffect(() => {
    let cancelled = false;

    async function initializeAuth() {
      setLoading(true);

      const storedToken =
        getStoredAccessToken();

      const storedUser =
        getStoredUser();

      /*
       * Restore an existing session first.
       *
       * This means:
       * - an authenticated user stays authenticated
       * - a logged-out visitor stays logged out
       * - demo mode is NOT automatically activated
       */
      if (
        storedToken &&
        !cancelled
      ) {
        setAccessTokenState(
          storedToken
        );

        setUserState(
          storedUser
        );
      }

      /*
       * Ask the backend to restore a real session.
       *
       * If there is no backend yet, this simply fails
       * and the user remains logged out unless they
       * explicitly use the demo login.
       */
      if (!storedToken) {
        const refreshed =
          await refreshSession();

        if (cancelled) {
          return;
        }

        /*
         * If the backend successfully restored a real
         * session, refreshSession() already applied it.
         */
        if (
          refreshed.success
        ) {
          setLoading(false);
          return;
        }
      } else {
        /*
         * There is already a stored token.
         *
         * We can attempt a backend refresh, but if the
         * backend is unavailable we preserve the stored
         * development session rather than silently
         * logging the user out.
         */
        const refreshed =
          await refreshSession();

        if (cancelled) {
          return;
        }

        if (
          !refreshed.success &&
          storedToken
        ) {
          setAccessTokenState(
            storedToken
          );

          setUserState(
            storedUser
          );
        }
      }

      /*
       * IMPORTANT:
       *
       * There is intentionally NO:
       *
       * startDemoSession()
       *
       * here.
       *
       * This prevents public pages from automatically
       * becoming authenticated simply because demo mode
       * is enabled.
       */

      setLoading(false);
    }

    initializeAuth();

    return () => {
      cancelled = true;
    };
  }, [
    refreshSession,
  ]);

  /*
   * ----------------------------------------------------------
   * Derived authentication state
   * ----------------------------------------------------------
   */

  const isAuthenticated =
    Boolean(
      accessToken ||
        getStoredAccessToken()
    );

  /*
   * ----------------------------------------------------------
   * Context value
   * ----------------------------------------------------------
   */

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated,
      loading,
      authError,

      login,
      register,
      logout,

      refreshSession,
      authFetch,

      clearSession,

      /*
       * Useful for identifying the frontend-only
       * development state.
       */
      isDemoMode:
        DEMO_AUTH_ENABLED &&
        accessToken ===
          DEMO_ACCESS_TOKEN,
    }),
    [
      user,
      accessToken,
      isAuthenticated,
      loading,
      authError,
      login,
      register,
      logout,
      refreshSession,
      authFetch,
      clearSession,
    ]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
 * ============================================================
 * useAuth hook
 * ============================================================
 */

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}