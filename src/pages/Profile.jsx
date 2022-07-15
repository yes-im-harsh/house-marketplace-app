import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData; //Destructuring it for data.

  const onLogout = (e) => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={onLogout}>
            Logout
          </button>
        </header>
      </div>
    </>
  );
};

export default Profile;
