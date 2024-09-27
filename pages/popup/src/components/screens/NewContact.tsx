import React, { useState } from 'react';

type NewContactProps = {
  isLight: boolean;
  onBack: () => void;
};

const NewContact: React.FC<NewContactProps> = ({ isLight, onBack }) => {
  // State to hold form input
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // Function to handle form submission
  const handleSaveContact = async () => {
    if (!name || !address) {
      alert('Please enter both a contact name and wallet address.');
      return;
    }

    // Send data to the backend (replace with your API endpoint)
    try {
      const response = await fetch('http://localhost:3001/add-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Contact saved successfully!');
        onBack(); // Go back to the previous screen after saving
      } else {
        alert('Error saving contact: ' + data.message);
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('An error occurred while saving the contact.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-3 pt-1 overflow-y-auto">
      <div className="w-full flex items-center mb-4">
        <button
          className={`text-2xl p-3 w-12 h-12 mr-4 ${isLight ? 'bg-gray-100' : 'bg-gray-800'} mb-2 hover:scale-105 transition duration-300 ease-in-out rounded-full font-bold flex items-center justify-center`}
          onClick={onBack}>
          <img src="/popup/icons/back-arrow-2.svg" alt="Back" className="h-10 w-10" />
        </button>
        <h1 className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-gray-200'}`}>New Contact</h1>
      </div>

      {/* Contact Name Input */}
      <div className="w-full mb-2">
        <label className={`block mb-2 text-sm font-bold ${isLight ? 'text-gray-900' : 'text-gray-200'}`}>
          Contact Name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)} // Update state with input
          style={{ outline: 'none' }}
          className={`w-full p-3 rounded-lg ${isLight ? 'bg-gray-100 text-gray-900' : 'bg-gray-800 text-gray-200'}`}
        />
      </div>

      {/* Wallet Address Input */}
      <div className="w-full mb-2">
        <label className={`block mb-2 text-sm font-bold ${isLight ? 'text-gray-900' : 'text-gray-200'}`}>
          Wallet Address
        </label>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)} // Update state with input
          style={{ outline: 'none' }}
          className={`w-full p-3 rounded-lg ${isLight ? 'bg-gray-100 text-gray-900' : 'bg-gray-800 text-gray-200'}`}
        />
      </div>

      {/* Save New Contact Button */}
      <div className="w-full mb-4">
        <button
          className={`w-full text-base p-3 rounded-lg font-bold transition duration-300 ease-in-out ${
            isLight ? 'bg-[#70C7BA] text-white shadow-black' : 'bg-[#70C7BA] text-white'
          } hover:scale-105`}
          onClick={handleSaveContact}>
          Save New Contact
        </button>
      </div>
    </div>
  );
};

export default NewContact;
