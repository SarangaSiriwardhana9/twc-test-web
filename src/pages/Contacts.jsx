import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoComponent from '../components/LogoComponent';
import SignOut from '../components/SignOut';
import RightTopShape from '../components/Shapes/RightTopShape';
import LeftBottomShape from '../components/Shapes/LeftBottomShape';
import TableComponent from '../components/TableComponent';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      setContacts(data);

    } catch (error) {
      console.error(error);

    }
  };


  return (
    <div className="relative min-h-screen bg-[#083F46] overflow-hidden">
      {/*Right Top Shape */}
      <RightTopShape />

      {/* main area */}
      <div className="relative z-50 ml-5 mt-10">
        <div className="flex flex-col mt-10 ml-5 md:ml-40 z-50">
          <LogoComponent />
        </div>
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl md:text-5xl text-[#ffffff] font-semibold mb-2 ml-5 md:ml-40 mt-10">Contacts</h1>
          <div className='mt-6 md:mt-14 mr-5 md:mr-40'>
            <Link to='/contacts/new' className=" border border-gray-100 hover:bg-[#0b525b] text-white font-bold py-2 px-6 md:px-10 rounded-3xl"> add new contact</Link>
          </div>
        </div>
        <div className="overflow-x-auto md:px-40">
          <div className="overflow-y-auto mb-10 bg-white rounded-3xl mt-6 md:mt-8 md:h-[calc(100vh-240px)] lg:h-[calc(80vh-240px)]">
            {/* Contacts table */}
            {contacts.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-[#083F46] text-lg font-semibold">There are no contacts.</p>
              </div>
            ) : (
              
              <TableComponent/>
            )}
          </div>
        </div>
      </div>
      
      <div className="fixed z-50 bottom-0 right-0 m-4 md:m-8">
        <SignOut />
      </div>
      {/*Left bottom Shape */}
      <LeftBottomShape />
    </div>
  );
}
