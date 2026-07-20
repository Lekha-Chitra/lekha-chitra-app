// import { useRef, useState } from "react";
// import { FiCamera } from "react-icons/fi";

// import { FaBars } from "react-icons/fa";

// import Sidebar from "../../client/components/Sidebar";
// import Header from "../../auth/pages/Header";

// const ProfilePage = () => {
//   // TODO: Replace this with API data when backend provides profile endpoint
//   const user = {
//     fullName: "Dipesh Marasini",
//     email: "dipesh@gmail.com",
//     phoneNumber: "9800000000",
//   };
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [profileImage, setProfileImage] = useState(
//     localStorage.getItem("profileImage") || "",
//   );

//   const fileInputRef = useRef(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     // Optional validation
//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image.");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       const image = reader.result;
//       localStorage.setItem("profileImage", image);
//       setProfileImage(image);
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="bg-[#F3F3F3] min-h-screen">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       <main
//         className="
//         md:ml-[70px]
//         px-4 pt-1 pb-4
//         md:px-6 md:pt-2 md:pb-6
//         lg:px-8 lg:pt-2 lg:pb-8
//         min-h-screen
//         transition-all
//         duration-300
//       "
//       >
//         <Header title="Profile" />

//         {/* Mobile Menu Button */}
//         <div className="md:hidden mt-4 mb-6">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="bg-[#032A5C] text-white p-3 rounded-md shadow-md"
//           >
//             <FaBars size={18} />
//           </button>
//         </div>

//         {/* Profile Card */}
//         <div className="flex justify-center mt-6">
//           <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
//             {/* Header */}
//             <h1 className="text-2xl font-bold text-center text-gray-800">
//               My Profile
//             </h1>

//             {/* Avatar */}
//             <div className="flex flex-col items-center mt-8">
//               <div className="relative">
//                 {profileImage ? (
//                   <img
//                     src={profileImage}
//                     alt="Profile"
//                     className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
//                   />
//                 ) : (
//                   <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold">
//                     {user.fullName.charAt(0)}
//                   </div>
//                 )}

//                 <button
//                   onClick={() => fileInputRef.current.click()}
//                   className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md"
//                 >
//                   <FiCamera size={18} />
//                 </button>

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   hidden
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                 />
//               </div>

//               <p className="text-sm text-gray-500 mt-3">
//                 Click the camera icon to change your profile picture
//               </p>
//             </div>

//             {/* User Details */}
//             <div className="mt-10 space-y-6">
//               <div>
//                 <label className="block mb-2 font-medium text-gray-700">
//                   Full Name
//                 </label>

//                 <input
//                   value={user.fullName}
//                   readOnly
//                   className="w-full rounded-lg border bg-gray-100 px-4 py-3 cursor-not-allowed"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 font-medium text-gray-700">
//                   Email
//                 </label>

//                 <input
//                   value={user.email}
//                   readOnly
//                   className="w-full rounded-lg border bg-gray-100 px-4 py-3 cursor-not-allowed"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 font-medium text-gray-700">
//                   Phone Number
//                 </label>

//                 <input
//                   value={user.phoneNumber}
//                   readOnly
//                   className="w-full rounded-lg border bg-gray-100 px-4 py-3 cursor-not-allowed"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ProfilePage;
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { User, Mail, Phone } from "lucide-react";

import Sidebar from "../../client/components/Sidebar";
import Header from "../../auth/pages/Header";

import profileImage from "../../../assets/images/profile.jpg";

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Temporary data
  // Replace with API response later
  const user = {
    fullName: "Dipesh Marasini",
    email: "marasinidipesh@gmail.com",
    phoneNumber: "9841297450",
  };

  return (
    <div className="bg-[#F3F3F3] h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className="
           md:ml-[70px]
    px-4
    pt-1
    pb-4
    md:px-6
    md:pt-2
    lg:px-8
    h-screen
    overflow-hidden
    transition-all
    duration-300
        "
      >
        <Header title="Profile" />

        {/* Mobile Menu */}
        <div className="md:hidden mt-4 mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-[#032A5C] text-white p-3 rounded-md shadow-md"
          >
            <FaBars size={18} />
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Top Section */}
            <div className="bg-[#032A5C] h-24 relative">
              <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>
            </div>

            {/* User Name */}
            <div className="pt-20 pb-8 text-center">
              <h2 className="text-3xl font-bold text-[#032A5C]">
                {user.fullName}
              </h2>

              <p className="text-gray-500 mt-2">
                Construction Expense Tracker User
              </p>
            </div>

            {/* User Details */}
            <div className="px-8 pb-10 space-y-5">
              {/* Name */}
              <div className="flex items-center gap-5 bg-gray-50 border rounded-xl p-5 hover:shadow transition">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={24} className="text-[#032A5C]" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Full Name</p>

                  <p className="text-lg font-semibold text-gray-800">
                    {user.fullName}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-5 bg-gray-50 border rounded-xl p-5 hover:shadow transition">
                <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Mail size={24} className="text-[#E59C11]" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email Address</p>

                  <p className="text-lg font-semibold text-gray-800">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-5 bg-gray-50 border rounded-xl p-5 hover:shadow transition">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                  <Phone size={24} className="text-green-600" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>

                  <p className="text-lg font-semibold text-gray-800">
                    {user.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;