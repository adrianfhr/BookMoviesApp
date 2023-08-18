import React, { useState } from "react";
import { toast } from "react-toastify";



const AuthForm = ({ onSubmit, isAdmin, handleCloseModal }) => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleClose = () => {
    handleCloseModal();
  }

  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Menambahkan validasi untuk memastikan email tidak kosong
    if (!inputData.email) {
      console.error("Email is required");    
      return;
    }
  
    try {
      await onSubmit({inputData, signup : isAdmin ? false : isSignup} );
    } catch (error) {
      console.error("Error submitting form:", error);
      // Tambahkan logika penanganan error yang sesuai di sini
    }


  };


  return (
  <div className="flex items-center justify-center h-full">
    <div className="bg-background rounded-xl p-8 relative border-2 border-primary" style={{ width: "398px", height: "450px" }}>
    <div className="flex justify-between mb-4">
      <h2 className="text-xl text-primary">{isSignup ? "Signup" : "Login"}</h2>
      <button className=" hover:text-black top-0 right-0 text-primary" onClick={handleClose}>
        X
      </button>
    </div>
    <form onSubmit={handleSubmit}>
      {!isAdmin && isSignup && (
        <div className="mb-4">
          <label className="block mb-2 text-primary" htmlFor="name">
            Name
          </label>
          <input
           className="w-full bg-primary rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            type="text"
            id="name"
            name="name"
            value={inputData.name}
            onChange={handleChange}
            required
            style={{ padding: "8px" }}
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-primary " htmlFor="email">
          Email
        </label>
        <input
          className="w-full bg-primary rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          type="email"
          id="email1"
          name="email"
          value={inputData.email}
          onChange={handleChange}
          required
          aria-label="email"
          style={{ padding: "8px" }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-primary" htmlFor="password" >
          Password
        </label>
        <input
          className="w-full bg-primary rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          type="password"
          id="password1"
          name="password"
          value={inputData.password}
          onChange={handleChange}
          required
          aria-label="password"
          style={{ padding: "8px" }}
        />
      </div>
      <div className="flex justify-between gap-x-4">
        <button
          type="submit"
          className="bg-primary hover:bg-[rgb(244 211 94 / var(--tw-bg-opacity)] text-black font-medium py-2 px-4 rounded-md "
        >
          {isSignup ? "SignUp" : "Login"}
        </button>

        {!isAdmin && (
            <button className="text-primary" onClick={() => setIsSignup(!isSignup)}>
                Switch to {isSignup ? "Login" : "SignUp"}
            </button>
        )}

      </div>
    </form>
  </div>
</div>

  );
};

export default AuthForm;
