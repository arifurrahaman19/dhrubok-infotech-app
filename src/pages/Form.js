import { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { isUserExist } from "../utils";

axios.defaults.baseURL = "http://localhost:5000";

const Form = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
  });

  const [error, setError] = useState(null);

  const formInputHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setError(null);
  }, [userInfo]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await axios.get("/users").then((res) => {
      let users = res.data;
      if (!isUserExist(users, userInfo.email)) {
        axios.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });
      } else {
        setError({
          email: "Email already exist!",
        });
      }

      setUserInfo({
        name: "",
        email: "",
        gender: "",
        phone: "",
      });
    });
  };

  return (
    <div className="contact-form">
      <h3>Contact Form</h3>
      <form>
        <input
          onChange={formInputHandler}
          name="name"
          placeholder="Name"
          type="text"
          value={userInfo.name}
        />
        <div className="email">
          <input
            className={error && error.email ? "error" : ""}
            onChange={formInputHandler}
            placeholder="Email"
            type="email"
            name="email"
            value={userInfo.email}
          />

          {error && error.email && <p>{error.email}</p>}
        </div>

        <div className="flex items-center">
          <select
            onChange={formInputHandler}
            name="gender"
            value={userInfo.gender}
            defaultValue=""
          >
            <option value="" disabled="disabled">
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            onChange={formInputHandler}
            placeholder="Phone Number"
            type="tel"
            name="phone"
            value={userInfo.phone}
          />
        </div>
        <Button onClick={onSubmitHandler} type={"submit"} btnText={"Submit"} />
      </form>
    </div>
  );
};

export default Form;
