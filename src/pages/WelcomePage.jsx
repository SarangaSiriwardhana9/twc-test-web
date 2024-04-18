/* eslint-disable no-unused-vars */
import back from '/back.jpg';
import LogoComponent from "../components/LogoComponent";
import { Link } from "react-router-dom";
import SignOut from '../components/SignOut';
import LeftBottomShape from '../components/Shapes/LeftBottomShape';
import RightTopShape from '../components/Shapes/RightTopShape';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen bg-[#083F46] overflow-hidden">
      {/* Top curve */}
      <RightTopShape />

      {/* main area */}
      <div className="relative z-50 ml-5 mt-10 ">

        {/* Logo component */}
        <div className="flex flex-col mt-14 ml-5 md:ml-40 z-50">
          <LogoComponent />
        </div>

        {/* Welcome area */}
        <div className="flex flex-col mt-20 ml-5 md:ml-40 z-50 pr-5 md:pr-20">
          <h1 className="text-3xl md:text-5xl text-[#ffffff] font-bold mb-3 ">Welcome,</h1>
          <h1 className="text-lg md:text-2xl text-[#ffffff] mb-1 ">This is where your contacts will live. Click the button below to add a new contact.</h1>


          <Link to='/contacts'
            className=" mt-12 border  w-60   border-gray-100   hover:bg-[#0b525b] text-white font-bold py-1.5 px-8 rounded-3xl"
          >
            add your first contact
          </Link>
        </div>
      </div>

      {/* Logout Button in right site bottom */}
      <div className="fixed bottom-0 right-0 m-4 md:m-8">
        <SignOut />
      </div>

      {/* Left curve */}
      <LeftBottomShape />

    </div>
  );
}
