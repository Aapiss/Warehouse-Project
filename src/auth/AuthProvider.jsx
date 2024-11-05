import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/SupaClient";
import Loading from "../components/ui/Loading";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

// function login
const login = (email, password) => {
  supabase.auth.signInWithPassword({ email, password });
};

// function logout
const logout = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // Tambahkan state untuk avatar

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;

      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);

      if (currentUser) {
        getDataUser(currentUser.id);
      } else {
        console.log("User not found");
        setLoading(false);
      }
    };

    getUser();

    const getDataUser = async (userId) => {
      try {
        const { data: userData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        setUsername(userData.username);
        setRole(userData.role);
        setAvatarUrl(userData.avatar_url); // Set avatar URL dari tabel profiles
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, user, role, username, avatarUrl, auth, loading }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
