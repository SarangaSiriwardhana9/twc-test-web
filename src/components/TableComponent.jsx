import { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowsRotate } from "react-icons/fa6";
import boy from '/boy.png';
import girl from '/girl.png';
import DeleteContact from '../components/alerts/DeleteContact';
import DeleteContactSuccess from '../components/alerts/DeleteContactSuccess';
import EditSuccess from '../components/alerts/EditSuccess';
import { useSnackbar } from 'notistack';


export default function TableComponent() {
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
        <div>
        <table className="min-w-full ">
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

      {showDeleteConfirmation && (
        <DeleteContact
          contactName={contactToDelete.fullName}
          onDelete={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {showDeleteSuccess && <DeleteContactSuccess onClose={() => setShowDeleteSuccess(false)} />}
      {showEditSuccess && <EditSuccess onClose={() => setShowEditSuccess(false)} />}
      </div>
    )
}