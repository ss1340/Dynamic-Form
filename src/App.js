import React, { useState, useEffect } from 'react';
import Form from './Form';
import ProgressBar from './ProgressBar';
import DataTable from './DataTable';

const App = () => {
  const [formType, setFormType] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [progress, setProgress] = useState(0);

  // Simulate API call based on form type
  useEffect(() => {
    const fetchFormFields = async () => {
      let response;
      switch (formType) {
        case 'User Information':
          response = {
            fields: [
              { name: 'firstName', type: 'text', label: 'First Name', required: true },
              { name: 'lastName', type: 'text', label: 'Last Name', required: true },
              { name: 'age', type: 'number', label: 'Age', required: false },
            ],
          };
          break;
        case 'Address Information':
          response = {
            fields: [
              { name: 'street', type: 'text', label: 'Street', required: true },
              { name: 'city', type: 'text', label: 'City', required: true },
              { name: 'state', type: 'dropdown', label: 'State', options: ['California', 'Texas', 'New York'], required: true },
              { name: 'zipCode', type: 'text', label: 'Zip Code', required: false },
            ],
          };
          break;
        case 'Payment Information':
          response = {
            fields: [
              { name: 'cardNumber', type: 'text', label: 'Card Number', required: true },
              { name: 'expiryDate', type: 'date', label: 'Expiry Date', required: true },
              { name: 'cvv', type: 'password', label: 'CVV', required: true },
              { name: 'cardholderName', type: 'text', label: 'Cardholder Name', required: true },
            ],
          };
          break;
        default:
          response = { fields: [] };
      }
      setFormFields(response.fields);
    };

    fetchFormFields();
  }, [formType]);

  const handleFormSubmit = (data) => {
    setSubmittedData([...submittedData, data]);
    setProgress(100);
  };

  const handleEdit = (index, newData) => {
    const updatedData = [...submittedData];
    updatedData[index] = newData;
    setSubmittedData(updatedData);
  };

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
  };

  return (
    <div className="App">
      <header>
        <h1>Dynamic Form</h1>
        <select onChange={(e) => setFormType(e.target.value)} value={formType}>
          <option value="">Select Form Type</option>
          <option value="User Information">User Information</option>
          <option value="Address Information">Address Information</option>
          <option value="Payment Information">Payment Information</option>
        </select>
      </header>
      <ProgressBar progress={progress} />
      <Form fields={formFields} onSubmit={handleFormSubmit} />
      <DataTable data={submittedData} onEdit={handleEdit} onDelete={handleDelete} />
      <footer>
        <p>Dynamic Form Application</p>
      </footer>
    </div>
  );
};

export default App;
