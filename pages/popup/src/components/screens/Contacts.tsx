import React, { useState, useEffect } from 'react';

type ContactsProps = {
  isLight: boolean;
  onBack: () => void;
  onContactInfo: () => void;
  onNewContact: () => void;
};

const reduceKaspaAddress = (address: string): string => {
  if (address.length > 20) {
    return `${address.slice(0, 12)}...${address.slice(-10)}`;
  }
  return address;
};

// Function to generate a random turquoise tone color
const getRandomTurquoiseColor = () => {
  const turquoiseColors = ['#40E0D0', '#48D1CC', '#00CED1', '#20B2AA', '#2C887A', '#2C8888', '#25AD92', '#278C89'];
  return turquoiseColors[Math.floor(Math.random() * turquoiseColors.length)];
};

const Contacts: React.FC<ContactsProps> = ({ isLight, onBack, onContactInfo, onNewContact }) => {
  // State to hold the fetched contacts from the backend
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true); // To show a loading state

  // Fetch the contacts from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:3001/contacts'); // Adjust the URL as needed
        const data = await response.json();
        setContacts(data); // Set the fetched contacts into state
        setLoading(false); // Turn off the loading state once contacts are fetched
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setLoading(false); // Ensure loading state is turned off even on error
      }
    };

    fetchContacts();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Show a loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-4 pt-6 overflow-y-auto">
      <div className="w-full flex items-center mb-4">
        <button
          className={`text-2xl p-3 w-12 h-12 mr-4 ${isLight ? 'bg-gray-100' : 'bg-gray-800'} mb-2 hover:scale-105 transition duration-300 ease-in-out rounded-full font-bold flex items-center justify-center`}
          onClick={onBack}>
          <img src="/popup/icons/back-arrow-2.svg" alt="Back" className="h-10 w-10" />
        </button>
        <h1 className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-gray-200'}`}>Contacts</h1>
      </div>

      {/* Contacts Section */}
      <div className="w-full space-y-4">
        {contacts.map((contact: any, index: number) => (
          <div
            key={index}
            className={`flex justify-between items-center cursor-pointer p-3 rounded-lg ${
              isLight ? 'bg-gray-100' : 'bg-gray-800'
            } transition duration-300 ease-in-out ${
              isLight ? 'hover:bg-gray-200 hover:text-gray-900' : 'hover:bg-gray-700 hover:text-gray-100'
            }`}
            onClick={onContactInfo}>
            <div className="flex items-center space-x-4">
              {/* Random Turquoise Logo */}
              <div
                className="rounded-full h-11 w-11 flex items-center justify-center space-x-4"
                style={{ backgroundColor: getRandomTurquoiseColor() }}>
                <span className="text-white text-xl font-bold">{contact.name.charAt(0).toUpperCase()}</span>
              </div>

              {/* Contact Name and Address */}
              <div>
                <h3 className={`text-base text-left font-bold ${isLight ? 'text-gray-900' : 'text-gray-200'}`}>
                  {contact.name}
                </h3>
                <p className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                  {reduceKaspaAddress(contact.address)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Button */}
      <div className="w-full mt-8">
        <button
          className={`w-full text-base mb-6 p-3 rounded-lg font-bold transition duration-300 ease-in-out ${
            isLight ? 'bg-[#70C7BA] text-white shadow-black' : 'bg-[#70C7BA] text-white'
          } hover:scale-105`}
          onClick={onNewContact}>
          Add New Contact
        </button>
      </div>
    </div>
  );
};

export default Contacts;
