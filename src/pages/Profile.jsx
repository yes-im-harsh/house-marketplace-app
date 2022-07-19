import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData; //Destructuring it for data.

  const onLogout = (e) => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async (e) => {
    try {
      //Update Display Name in Firebase
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      //Update in firestore
      const userRef = doc(db, "users", auth.currentUser.uid);
      updateDoc(userRef, {
        name,
      });
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
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
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            <p
              className="changePersonalDetails"
              onClick={() => {
                setChangeDetails((prevState) => !prevState);
                onSubmit();
              }}
            >
              {changeDetails ? "done" : "change"}
            </p>
          </div>

          <div className="profileCard">
            <form>
              <input
                type="text"
                id="name"
                className={!changeDetails ? "profileName" : "profileNameActive"}
                disabled={!changeDetails}
                value={name}
                onChange={handleChange}
              />
              <input
                type="text"
                id="email"
                className={
                  !changeDetails ? "profileEmail" : "profileEmailActive"
                }
                disabled={!changeDetails}
                value={email}
                onChange={handleChange}
              />
            </form>
          </div>

          <Link to="/create-listing" className="createListing">
            <img src={homeIcon} alt="home-icon" />
            <p>Sell or rent your home</p>
            <img src={arrowRight} alt="arrow-right" />
          </Link>
        </main>
      </div>
    </>
  );
};

export default Profile;
