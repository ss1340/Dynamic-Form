import React, { useState } from 'react';

const DataTable = ({ data, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData(data[index]);
  };

  const handleSaveClick = () => {
    onEdit(editIndex, editData);
    setEditIndex(null);
  };

  const handleDeleteClick = (index) => {
    onDelete(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <table>
      <thead>
        <tr>
          {data.length > 0 && Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            {Object.entries(entry).map(([key, value]) => (
              <td key={key}>
                {editIndex === index ? (
                  <input
                    type="text"
                    name={key}
                    value={editData[key] || ''}
                    onChange={handleChange}
                  />
                ) : (
                  value
                )}
              </td>
            ))}
            <td>
              {editIndex === index ? (
                <button onClick={handleSaveClick}>Save</button>
              ) : (
                <button onClick={() => handleEditClick(index)}>Edit</button>
              )}
              <button onClick={() => handleDeleteClick(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
