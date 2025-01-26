// Member.js (React Component)
import React from 'react';
import '/styles/member.css';

const Member = ({ members, onMemberSelect, isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleMemberClick = (member) => {
    onMemberSelect(member);
    onClose();
  };

  return (
    <div className="member-popup-overlay">
      <div className="member-popup">
        <div className="member-options">
          {members.map((member) => (
            <div
              key={member.id}
              className="member-option"
              onClick={() => handleMemberClick(member)}
            >
              <img
                src={member.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff`}
                alt={member.name}
                className="member-profile-picture"
              />
              <span className="member-username">{member.name}</span>
            </div>
          ))}
        </div>
        <button className="done-button" onClick={onClose} aria-label="Close member selection">
          Done
        </button>
      </div>
    </div>
  );
};

export default Member;
