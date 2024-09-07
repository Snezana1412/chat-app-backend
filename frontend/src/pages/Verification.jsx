import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const Verification = () => {
  const { vtoken, uid } = useParams();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios(
          `http://localhost:3000/api/users/confirm/${vtoken}/${uid}`
        );
        setIsVerified(res.statusText === "OK" ? true : false);
      } catch (error) {
        console.log(error.message);
      }
    };

    verify();
  }, []);

  return (
    <div>
      {isVerified && (
        <>
          <div>
            <h1>Account Verified Successfully</h1>
            <p>You can now login to your account</p>
          </div>
          <NavLink to='/login'>Login</NavLink>
          {/* <Navigate to='/login' replace={true} /> */}
        </>
      )}
    </div>
  );
};

export default Verification;
