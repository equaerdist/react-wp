import "./UserProfile.scss";
import Profile from "../../img/Ellipse 12.svg";
const UserProfile = (props) => {
  return (
    <div className="profile">
      <img src={Profile} alt="user-logo" className="profile-img" />
      <span className="profile-text">ADMIN</span>
    </div>
  );
};
export default UserProfile;
