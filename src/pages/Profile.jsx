import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // Get Data Profile
  const getProfile = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setUsername(data.username);
      setFullName(data.full_name);
      setEmail(data.email);
      setTelephone(data.telephone);
      setAvatarUrl(data.avatar_url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getProfile();
    }
    document.getElementById("title").innerHTML = "Profile";
  }, [user]);

  const handleUpdate = async () => {
    console.log("handleUpdate function triggered"); // Tambahkan log untuk cek fungsi terpanggil
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ username, full_name: fullName, email, telephone })
        .eq("id", user.id);

      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleEditAvatar = async () => {
    const result = await Swal.fire({
      title: "Change Profile Picture?",
      text: "Do you want to change your profile picture?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        const file = await new Promise((resolve) => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = () => resolve(input.files[0]);
          input.click();
        });

        if (!file) return;

        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `avatar_url/${fileName}`; // Pastikan folder avatar_url ada dalam bucket avatars

        console.log("Uploading to path:", filePath);

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file, { upsert: true });

        if (uploadError) {
          console.error("Upload error details:", uploadError);
          throw new Error("Failed to upload the file to storage.");
        }

        const { data, error: urlError } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        if (urlError) {
          console.error("URL error details:", urlError);
          throw new Error("Failed to get public URL of the uploaded file.");
        }

        const newAvatarUrl = data.publicUrl;
        console.log("New avatar URL:", newAvatarUrl);

        const { error: updateError } = await supabase
          .from("profiles")
          .update({ avatar_url: newAvatarUrl })
          .eq("id", user.id);

        if (updateError) {
          console.error("Database update error details:", updateError);
          throw new Error("Failed to update avatar URL in the database.");
        }

        setAvatarUrl(newAvatarUrl);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Avatar updated successfully!",
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error updating avatar:", error.message);
        alert("Failed to update avatar.");
      }
    } else {
      console.log("Avatar update canceled.");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6">
        <div className="relative">
          <img
            src={avatarUrl || "https://via.placeholder.com/150"}
            alt="Profile Avatar"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-4 shadow-lg border-4 border-purple-500 dark:border-purple-300 transition duration-300"
          />
          <button
            className="absolute bottom-2 right-2 bg-purple-600 dark:bg-purple-400 text-white dark:text-gray-800 p-2 rounded-full shadow-md hover:bg-purple-700 dark:hover:bg-purple-500 transition"
            onClick={handleEditAvatar}
          >
            Update Image
          </button>
        </div>

        <div className="w-full max-w-md space-y-4 mt-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1">
              No Telepon
            </label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition duration-300"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="w-full py-3 mt-4 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition duration-300"
          >
            Update Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
