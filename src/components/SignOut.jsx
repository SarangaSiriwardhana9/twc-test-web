import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import { useDispatch } from "react-redux";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function SignOut() {
    const dispatch = useDispatch();
  const handleSignOut = async () => {

    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      window.location.href = '/signin';
    } catch (error) {
      const data = error.response.data;
      dispatch(deleteUserFailure(data.message));
    }
  };


  return (
    <div className='flex flex-row'>
      <RiLogoutCircleLine className='text-white text-2xl mt-1' />
      <button onClick={handleSignOut} className='text-white text-xl ml-3 underline '>logout</button>

  </div>
)
}