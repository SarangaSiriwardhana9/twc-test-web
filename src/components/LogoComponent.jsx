
import { Link } from 'react-router-dom';
import logoIcon from '/logoIcon.png';

const LogoComponent = () => {
  return (
    <Link to="/">
    <div className="flex flex-col  mr-28 z-50">
      <div className="flex z-50  flex-row  ">
        <img src={logoIcon} alt="logo" className="h-6 w-7 mt-2" />
        <p className="text-[#ffffff] font-bold text-2xl">twc</p>
      </div>
      <h1 className="text-3xl text-[#ffffff] font-bold ">contacts</h1>
      <h1 className="text-3xl text-[#ffffff] mb-3">portal</h1>
    </div>
    </Link>
  );
};

export default LogoComponent;
