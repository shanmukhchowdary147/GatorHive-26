import React, { useState } from 'react';
import './StudentOrgs.css';

function StudentOrgs() {
  const [cardData, setCardData] = useState([
    {
      imagePath: require('../../images/bg4.jpg'),
      name: 'Card Name 1',
      date: '15th March, 2023',
    },
    {
      imagePath: require('../../images/bg5.jpg'),
      name: 'Card Name 2',
      date: '14th March, 2023',
    },
    {
      imagePath: require('../../images/bg3.jpg'),
      name: 'Card Name 3',
      date: '13th March, 2023',
    },
    {
      imagePath: require('../../images/bg4.jpg'),
      name: 'Card Name 4',
      date: '12th March, 2023',
    },
    {
      imagePath: require('../../images/bg5.jpg'),
      name: 'Card Name 5',
      date: '11th March, 2023',
    },
    {
      imagePath: require('../../images/bg3.jpg'),
      name: 'Card Name 3',
      date: '13th March, 2023',
    },
    {
      imagePath: require('../../images/bg4.jpg'),
      name: 'Card Name 4',
      date: '12th March, 2023',
    },
    {
      imagePath: require('../../images/bg5.jpg'),
      name: 'Card Name 5',
      date: '11th March, 2023',
    },
  ]);

  // hhhhhhhhhhhhhh
  const [secondaryEmails, setSecondaryEmails] = useState(['']);

  const handleAddEmail = () => {
    setSecondaryEmails([...secondaryEmails, '']);
  };

  const handleRemoveEmail = (index) => {
    setSecondaryEmails(secondaryEmails.filter((email, i) => i !== index));
  };

  const handleEmailChange = (index, event) => {
    const newEmails = [...secondaryEmails];
    newEmails[index] = event.target.value;
    setSecondaryEmails(newEmails);
  };

  // hjjjjjjjjjj

  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleButtonClick() {
    setIsFormOpen(true);
  }

  function handleOverlayClick(event) {
    if (event.target.classList.contains('overlay')) {
      setIsFormOpen(false);
    }
  }

  const redirectToCreateOrg = () => {
    window.location.href = '/create-org';
  };
  const handleSearchOrg = () => {};

  return (
    <div className="student-orgs" onClick={handleOverlayClick}>
      <div className="first-row">
        <h1>Student Organizations</h1>
        <form className="search-orgs" onSubmit={handleSearchOrg}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </form>
        <button className="create-org" onClick={handleButtonClick}>
          Create an Organization
        </button>
        {isFormOpen && (
          <div className="overlay">
            <div className="form">
              <div className="header">
                <h2>Create Organization</h2>
                <button onClick={() => setIsFormOpen(false)}>X</button>
              </div>
              <form className="create-orgs-form">
                <label>Organization Name:</label>
                <input type="text" required />
                <br />
                {secondaryEmails.map((email, index) => (
                  <div key={index}>
                    <label>Secondary Email ID:</label>
                    <input
                      type="text"
                      value={email}
                      placeholder="Can create events for your Org"
                      onChange={(event) => handleEmailChange(index, event)}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail(index)}
                        className="remove-email"
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="add-email"
                >
                  Add another email
                </button>
                <button type="submit" className="create-button">
                  Register Organization
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="org-cards">
        {cardData.map((card, index) => (
          <div key={index} className="org-card">
            <img src={card.imagePath} alt={`Card ${index}`} />
            <div className="org-card-info">
              <h3>{card.name}</h3>
              <button className="subscribe-button">Subscribe</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentOrgs;
