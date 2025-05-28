import DashboardLayout from "../components/DashboardLayout";

export default function ProfilePage() {
  const user = {
    name: "Lê Hoàng Hải",
    email: "lehoanghai@gmail.com",
    age: 21,
    gender: "Male",
    location: "Hà Nội, Việt Nam",
    bio: "A software engineer passionate about health, fitness, and technology.",
    avatar: "/profile.jpg",
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-32 h-32 rounded-full shadow-md mb-6 object-cover"
        />
        <h1 className="text-3xl font-bold font-nunito mb-1 text-gray-800">{user.name}</h1>
        <p className="text-gray-500 mb-4 font-nunito">{user.email}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-4 font-nunito">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Age</h2>
            <p className="text-lg font-semibold text-gray-800">{user.age}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Gender</h2>
            <p className="text-lg font-semibold text-gray-800">{user.gender}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Location</h2>
            <p className="text-lg font-semibold text-gray-800">{user.location}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Bio</h2>
            <p className="text-base text-gray-700">{user.bio}</p>
          </div>
        </div>

        <button className="mt-8 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </DashboardLayout>
  );
}
