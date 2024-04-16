import { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowsRotate } from "react-icons/fa6";
import boy from '/boy.png';
import girl from '/girl.png';
import back from '/back.jpg';
import { Link } from 'react-router-dom';
import LogoComponent from '../components/LogoComponent';
import SignOut from '../components/SignOut';
import DeleteContact from '../components/alerts/DeleteContact';
import DeleteContactSuccess from '../components/alerts/DeleteContactSuccess';
import EditSuccess from '../components/alerts/EditSuccess';
import { useSnackbar } from 'notistack';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);

  const [editedContact, setEditedContact] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


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

  const handleEdit = (id, contact) => {
    setEditingContactId(id);
    setEditedContact(contact);
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedContact),
      });

      if (res.ok) {
        setEditingContactId(null);
        fetchContacts();
        setShowEditSuccess(true);
      } else {
        console.error('Failed to update contact');
        enqueueSnackbar('Failed to update contact ☹️', {
          variant: 'error', autoHideDuration: 1500, style: {
            backgroundColor: '#aa4d4d',
            color: 'white',
            borderRadius: '16px',
          }
        });
      }
    } catch (error) {
      enqueueSnackbar('Failed to update contact ☹️', {
        variant: 'error', autoHideDuration: 1500, style: {
          backgroundColor: '#aa4d4d',
          color: 'white',
          borderRadius: '16px',
        }
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    const contact = contacts.find((c) => c._id === id);
    setContactToDelete(contact);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/contacts/${contactToDelete._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchContacts();
        setShowDeleteConfirmation(false);
        setShowDeleteSuccess(true);
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancelDelete = () => {
    setContactToDelete(null);
    setShowDeleteConfirmation(false);
  };
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  return (
    <div className="relative min-h-screen bg-[#083F46] overflow-hidden">
      {/* Top right triangle */}
      <div
        className="hidden md:block absolute -top-20 -mt-2 -right-60 h-64 w-96 bg-white rotate-45"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${back}) `,
          backgroundSize: '100%',
        }}
      ></div>
      <div className="hidden md:block absolute -right-6 -top-6">
        <div className="w-[650px] h-[650px] bg-[#083F46] rounded-full"></div>
      </div>

      {/* main area */}
      <div className="relative z-50 ml-5 mt-10">
        <div className="flex flex-col mt-10 ml-5 md:ml-40 z-50">
          <LogoComponent />
        </div>
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl md:text-5xl text-[#ffffff] font-semibold mb-2 ml-5 md:ml-40 mt-10">Contacts</h1>
          <div className='mt-6 md:mt-14 mr-5 md:mr-40'>
            <Link to='/contacts/new' className=" border border-gray-100 hover:bg-[#183a55] text-white font-bold py-2 px-6 md:px-10 rounded-3xl"> add new contact</Link>
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
              <table className="min-w-full">
                {/* Table header */}
                <thead className="sticky top-0 bg-gray-50">
                  <tr className=''>
                    <th className="px-1 py-3 text-left text-md font-bold text-[#083F46] tracking-wider"></th>
                    <th className="px-1 py-3 text-left text-md font-bold text-[#083F46] tracking-wider">full name</th>
                    <th className="px-1 py-3 text-left text-md font-bold text-[#083F46] tracking-wider">gender</th>
                    <th className="px-1 py-3 text-left text-md font-bold text-[#083F46] tracking-wider">e-mail</th>
                    <th className="px-1 py-3 text-left text-md font-bold text-[#083F46] tracking-wider">phone number</th>
                    <th className="px-1 py-3 text-left text-md font-bold text-[#083F46] tracking-wider"></th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className=''>
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="">
                      {/* Display avatar based on gender */}
                      <td className="px-4  py-2 whitespace-nowrap">
                        {contact.gender === 'male' ? (
                          <img src={boy} alt="Boy Avatar" className="w-10 h-10 rounded-full" />
                        ) : (
                          <img src={girl} alt="Girl Avatar" className="w-10 h-10 rounded-full" />
                        )}
                      </td>
                      {/* Display full name */}
                      <td className=" py-2 text-[#083F46] whitespace-nowrap">
                        {editingContactId === contact._id ? (
                          <input type="text" name="fullName" value={editedContact.fullName} onChange={handleChange} className=" focus:outline-none bg-slate-200 p-1" />
                        ) : (
                          contact.fullName
                        )}
                      </td>
                      {/* Display gender */}
                      <td className="px-1 py-2 text-[#083F46] whitespace-nowrap">
                        {editingContactId === contact._id ? (
                          <div className="flex items-center">
                            <div style={{ position: 'relative' }}>
                              <input
                                type="text"
                                name="gender"
                                value={editedContact.gender}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-1 w-24 mr-2 focus:outline-none bg-slate-200"
                              />
                              <button
                                onClick={() => setEditedContact((prev) => ({ ...prev, gender: prev.gender === 'male' ? 'female' : 'male' }))}
                                className="text-[#083F46] hover:text-indigo-900 absolute right-2 top-1/2 transform -translate-y-1/2"
                              >
                                <FaArrowsRotate className="mr-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          contact.gender
                        )}
                      </td>
                      {/* Display email */}
                      <td className="px-1 py-2 text-[#083F46] whitespace-nowrap ">
                        {editingContactId === contact._id ? (
                          <input type="text" name="email" value={editedContact.email} onChange={handleChange} className="focus:outline-none w-58 bg-slate-200 p-1" />
                        ) : (
                          contact.email
                        )}
                      </td>
                      {/* Display phone number */}
                      <td className="px-1 py-2 text-[#083F46] whitespace-nowrap mr-10">
                        {editingContactId === contact._id ? (
                          <input type="text" name="phoneNumber" value={editedContact.phoneNumber} onChange={handleChange} className="focus:outline-none w-32  bg-slate-200 p-1" />
                        ) : (
                          contact.phoneNumber
                        )}
                      </td>
                      {/* Display edit/delete buttons */}
                      <td className="px-1 py-2 whitespace-nowrap">
                        {editingContactId === contact._id ? (
                          <button onClick={() => handleSave(contact._id)} className="text-white bg-[#083F46] py-1.5 px-4 rounded-2xl hover:text-white-200">Save</button>
                        ) : (
                          <div>
                            <button onClick={() => handleEdit(contact._id, contact)} className="text-[#083F46] hover:text-indigo-900"><MdEdit /></button>
                            <button onClick={() => handleDelete(contact._id)} className="text-[#083F46] hover:text-red-900 ml-2"><RiDeleteBin6Line /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {showDeleteConfirmation && (
        <DeleteContact
          contactName={contactToDelete.fullName}
          onDelete={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {showDeleteSuccess && <DeleteContactSuccess onClose={() => setShowDeleteSuccess(false)} />}
      {showEditSuccess && <EditSuccess onClose={() => setShowEditSuccess(false)} />}
      <div className="fixed bottom-0 right-0 m-4 md:m-8">
        <SignOut />
      </div>
      <div className="absolute z-10 -left-6 -bottom-6">
        <div className="w-[650px] h-[650px] bg-[#083F46] rounded-full"></div>
      </div>
      <div className="hidden md:block absolute -bottom-40 -left-40 h-96 w-64 bg-white -rotate-45"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${back})`,
          backgroundSize: '100%',
        }}>
      </div>
    </div>
  );
}
