import React, { use, useEffect, useState } from 'react';
import AuthForm from '@/auth/authForm';
import { sendUserAuthRequest, sendAdminAuthRequest, getUserDetails } from '../../api/api-helper';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userActions, adminActions } from '@/store';

import Modal from 'react-modal';
import { get } from 'http';
import { toast } from 'react-toastify';

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    zIndex: 9999,
  },
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "398px",
    height: "450px",
    padding: "20px",
    background: "transparent",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    border: "none",
  },
};

const Navbar: React.FC = () => {  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  const dispatch = useDispatch();
  const [detailUser, setDetailUser] = useState(null);
  
  const onResUserReceived = (data) => {
    console.log("data : ",data);
    setDetailUser(data.user.balance);
  };

  useEffect(() => {
    if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
      
    }else if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
      getUserDetails().then(onResUserReceived).catch((err) => console.log(err));
      console.log("detailUser : ", detailUser);
    }
  }, []);


  const onResReceived = async (data) => {
    console.log("dataId : ",data.id);
    if(data){
      await dispatch(isAdmin ? adminActions.login() : userActions.login());
      window.location.reload();
    }
    localStorage.setItem(isAdmin ? "adminId" :"userId", data.id);
    if(isAdmin){
      localStorage.setItem("token", data.token);
    }
    
    setDetailUser(data.user.balance);
    
  };

  const getData= (data) => {
    console.log(data);
    const sendRequest = isAdmin ? sendAdminAuthRequest : sendUserAuthRequest;
    console.log("Data : ",data);
    sendRequest(data.inputData, data.signup)
      .then(onResReceived)
      .catch((err) => console.log(err));
    handleCloseModal();
    toast.success("Login Success");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  const handleLogout = () => {
    if (isAdminLoggedIn) {
      dispatch(adminActions.logout());
    } else if (isUserLoggedIn) {
      dispatch(userActions.logout());
    }
    window.location.reload(); // Merefresh halaman
  };


  return (
    <div className='bg-primary fixed top-0 left-0 w-full h-14 flex items-center z-10 shadow-lg backdrop-blur-lg font-merriweather'>
  <div className='flex items-center justify-between w-full'>
    <div className='px-4'>
      <a href='/' className='text-black text-xl font-semibold hover:text-textColor'>
        SEA MOVIE
      </a>
    </div>
    <div className='flex items-center gap-7 mr-4 '>
      {isUserLoggedIn || isAdminLoggedIn ? (
        <>
          <div>
            Rp. {detailUser}
          </div>
          <button
            className='text-black text-xl font-semibold rounded-md hover:text-textColor'
          >
            <a href='/profile'>Profile</a> 
          </button>
          <button
            onClick={handleLogout}
            className='text-black text-xl font-semibold  hover:text-textColor'
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsAdmin(false);
            }}
            className='text-black text-xl font-semibold rounded-md hover:text-textColor'
          >
            User
          </button>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsAdmin(true);
            }}
            className='text-black text-xl font-semibold  hover:text-textColor'
          >
            Admin
          </button>
        </>
      )}
      <div className='border-10 border-red-500'>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={customStyles}>
        <div style={customStyles.overlay}>
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-denary rounded-xl p-8 relative" style={customStyles.content}>
              <AuthForm onSubmit={getData} isAdmin={isAdmin} handleCloseModal={handleCloseModal} />
            </div>
          </div>
        </div>
      </Modal>
      </div>  
    </div>
  </div>
</div>

  
  );
};


export default Navbar;

