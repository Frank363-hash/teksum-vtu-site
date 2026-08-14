"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "";

const ACCESS_TOKEN_KEY =
  "teksum_access_token";

const USER_KEY =
  "teksum_user";

/*
 * ============================================================
 * AUTH CONTEXT
 * ============================================================
 *
 * This is the frontend authentication layer.
 *
 * It is intentionally written against the backend contract
 * described in the TEKSUM handoff:
 *
 * POST /api/auth/login
 * POST /api/auth/register
 * POST /api/auth/refresh
 * POST /api/auth/logout
 *
 * The actual backend can be connected later without changing
 * the UI architecture.
 *
 * IMPORTANT:
 * The refresh-token strategy should ultimately use the secure
 * HttpOnly cookie supplied by the backend.
 *
 * The frontend keeps the short-lived access token in memory
 * and sessionStorage for the current frontend stage.
 * When the real backend is connected, the refresh endpoint can
 * restore a fresh access token automatically.
 * ============================================================
 */

export function AuthProvider({ children }) {
  const [user, setUser] =
    useState(null);

  const [accessToken, setAccessToken] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [authError, setAuthError] =
    useState("");

  /*
   * ----------------------------------------------------------
   * RESTORE FRONTEND SESSION
   * ----------------------------------------------------------
   */

  useEffect(() => {
    let mounted = true;

    async function restoreSession() {
      try {
        /*
         * First try the refresh endpoint.
         *
         * When the backend is connected, this should use the
         * secure refresh-token cookie.
         */
        const response =
          await fetch(
            `${API_BASE_URL}/api/auth/refresh`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type":
                  "application/json",
              },
            }
          );

        if (response.ok) {
          const data =
            await response.json();

          if (!mounted) {
            return;
          }

          const token =
            data?.accessToken ||
            data?.token ||
            "";

          const authenticatedUser =
            data?.user ||
            data?.data?.user ||
            null;

          if (token) {
            setAccessToken(token);

            sessionStorage.setItem(
              ACCESS_TOKEN_KEY,
              token
            );
          }

          if (authenticatedUser) {
            setUser(
              authenticatedUser
            );

            sessionStorage.setItem(
              USER_KEY,
              JSON.stringify(
                authenticatedUser
              )
            );
          }

          return;
        }
      } catch {
        /*
         * This is expected while the backend is not connected.
         *
         * We continue below and check whether a frontend session
         * was already stored.
         */
      }

      /*
       * --------------------------------------------------------
       * FALLBACK TO CURRENT FRONTEND SESSION
       * --------------------------------------------------------
       */

      try {
        const storedToken =
          sessionStorage.getItem(
            ACCESS_TOKEN_KEY
          );

        const storedUser =
          sessionStorage.getItem(
            USER_KEY
          );

        if (!mounted) {
          return;
        }

        if (storedToken) {
          setAccessToken(
            storedToken
          );
        }

        if (storedUser) {
          try {
            setUser(
              JSON.parse(
                storedUser
              )
            );
          } catch {
            sessionStorage.removeItem(
              USER_KEY
            );
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * ----------------------------------------------------------
   * LOGIN
   * ----------------------------------------------------------
   */

  const login = useCallback(
    async ({
      email,
      password,
    }) => {
      setAuthError("");

      if (!email?.trim()) {
        const message =
          "Please enter your email address.";

        setAuthError(message);

        return {
          success: false,
          message,
        };
      }

      if (!password) {
        const message =
          "Please enter your password.";

        setAuthError(message);

        return {
          success: false,
          message,
        };
      }

      try {
        const response =
          await fetch(
            `${API_BASE_URL}/api/auth/login`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                email:
                  email.trim(),
                password,
              }),
            }
          );

        let data = null;

        try {
          data =
            await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          const message =
            data?.message ||
            data?.error ||
            "Unable to sign in. Please check your details and try again.";

          setAuthError(
            message
          );

          return {
            success: false,
            message,
            data,
          };
        }

        const token =
          data?.accessToken ||
          data?.token ||
          "";

        const authenticatedUser =
          data?.user ||
          data?.data?.user ||
          null;

        /*
         * The frontend does not require a refresh token to be
         * manually stored here.
         *
         * The intended production architecture is for the
         * backend to manage the refresh token using a secure
         * HttpOnly cookie.
         */

        if (token) {
          setAccessToken(
            token
          );

          sessionStorage.setItem(
            ACCESS_TOKEN_KEY,
            token
          );
        }

        if (authenticatedUser) {
          setUser(
            authenticatedUser
          );

          sessionStorage.setItem(
            USER_KEY,
            JSON.stringify(
              authenticatedUser
            )
          );
        }

        setAuthError("");

        return {
          success: true,
          user:
            authenticatedUser,
          accessToken:
            token,
          data,
        };
      } catch (error) {
        const message =
          "Unable to connect to TEKSUM. Please try again.";

        setAuthError(
          message
        );

        return {
          success: false,
          message,
          error,
        };
      }
    },
    []
  );

  /*
   * ----------------------------------------------------------
   * REGISTER
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

      if (!name?.trim()) {
        const message =
          "Please enter your full name.";

        setAuthError(message);

        return {
          success: false,
          message,
        };
      }

      if (!email?.trim()) {
        const message =
          "Please enter your email address.";

        setAuthError(message);

        return {
          success: false,
          message,
        };
      }

      if (!phone?.trim()) {
        const message =
          "Please enter your phone number.";

        setAuthError(message);

        return {
          success: false,
          message,
        };
      }

      if (!password) {
        const message =
          "Please enter a password.";

        setAuthError(message);

        return {
          success: false,
          message,
        };
      }

      try {
        const response =
          await fetch(
            `${API_BASE_URL}/api/auth/register`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                name:
                  name.trim(),
                email:
                  email.trim(),
                phone:
                  phone.trim(),
                password,
              }),
            }
          );

        let data = null;

        try {
          data =
            await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          const message =
            data?.message ||
            data?.error ||
            "Unable to create your account. Please check your details and try again.";

          setAuthError(
            message
          );

          return {
            success: false,
            message,
            data,
          };
        }

        const token =
          data?.accessToken ||
          data?.token ||
          "";

        const authenticatedUser =
          data?.user ||
          data?.data?.user ||
          null;

        if (token) {
          setAccessToken(
            token
          );

          sessionStorage.setItem(
            ACCESS_TOKEN_KEY,
            token
          );
        }

        if (authenticatedUser) {
          setUser(
            authenticatedUser
          );

          sessionStorage.setItem(
            USER_KEY,
            JSON.stringify(
              authenticatedUser
            )
          );
        }

        setAuthError("");

        return {
          success: true,
          user:
            authenticatedUser,
          accessToken:
            token,
          data,
        };
      } catch (error) {
        const message =
          "Unable to connect to TEKSUM. Please try again.";

        setAuthError(
          message
        );

        return {
          success: false,
          message,
          error,
        };
      }
    },
    []
  );

  /*
   * ----------------------------------------------------------
   * LOGOUT
   * ----------------------------------------------------------
   */

  const logout = useCallback(
    async () => {
      try {
        await fetch(
          `${API_BASE_URL}/api/auth/logout`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              ...(accessToken
                ? {
                    Authorization: `Bearer ${accessToken}`,
                  }
                : {}),
            },
          }
        );
      } catch {
        /*
         * Even if the backend is unavailable,
         * clear the local authenticated state.
         */
      }

      setUser(null);
      setAccessToken("");
      setAuthError("");

      try {
        sessionStorage.removeItem(
          ACCESS_TOKEN_KEY
        );

        sessionStorage.removeItem(
          USER_KEY
        );
      } catch {
        // Ignore storage errors.
      }
    },
    [accessToken]
  );

  /*
   * ----------------------------------------------------------
   * REFRESH ACCESS TOKEN
   * ----------------------------------------------------------
   */

  const refreshAccessToken =
    useCallback(
      async () => {
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

          if (!response.ok) {
            return null;
          }

          const data =
            await response.json();

          const token =
            data?.accessToken ||
            data?.token ||
            "";

          const refreshedUser =
            data?.user ||
            data?.data?.user ||
            null;

          if (!token) {
            return null;
          }

          setAccessToken(
            token
          );

          sessionStorage.setItem(
            ACCESS_TOKEN_KEY,
            token
          );

          if (refreshedUser) {
            setUser(
              refreshedUser
            );

            sessionStorage.setItem(
              USER_KEY,
              JSON.stringify(
                refreshedUser
              )
            );
          }

          return token;
        } catch {
          return null;
        }
      },
      []
    );

  /*
   * ----------------------------------------------------------
   * AUTHENTICATED FETCH
   * ----------------------------------------------------------
   *
   * This helper will be useful when we start connecting:
   *
   * - wallet
   * - transactions
   * - purchases
   * - profile
   */

  const authenticatedFetch =
    useCallback(
      async (
        url,
        options = {}
      ) => {
        let token =
          accessToken;

        const headers = {
          ...(options.headers ||
            {}),
        };

        if (token) {
          headers.Authorization =
            `Bearer ${token}`;
        }

        headers["Content-Type"] =
          headers["Content-Type"] ||
          "application/json";

        let response =
          await fetch(
            url,
            {
              ...options,
              credentials:
                "include",
              headers,
            }
          );

        /*
         * If access token has expired,
         * refresh it once and retry.
         */

        if (
          response.status === 401
        ) {
          const refreshedToken =
            await refreshAccessToken();

          if (
            refreshedToken
          ) {
            response =
              await fetch(
                url,
                {
                  ...options,
                  credentials:
                    "include",
                  headers: {
                    ...headers,
                    Authorization:
                      `Bearer ${refreshedToken}`,
                  },
                }
              );
          }
        }

        return response;
      },
      [
        accessToken,
        refreshAccessToken,
      ]
    );

  const value = useMemo(
    () => ({
      user,
      accessToken,
      loading,
      authError,

      isAuthenticated:
        Boolean(
          user &&
            accessToken
        ),

      login,
      register,
      logout,

      refreshAccessToken,
      authenticatedFetch,
    }),
    [
      user,
      accessToken,
      loading,
      authError,
      login,
      register,
      logout,
      refreshAccessToken,
      authenticatedFetch,
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
 * USE AUTH
 * ============================================================
 */

export function useAuth() {
  const context =
    useContext(
      AuthContext
    );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}