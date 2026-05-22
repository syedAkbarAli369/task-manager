

const SelectedMembers = ({ users, selectedMembers }) => {
  const selectedUsers = users.filter(user => selectedMembers.includes(user._id))

  return (
    <div className='flex items-center'>
      {selectedUsers.slice(0, 3).map((user, index) => {
        // DEBUG: log the actual URL being used
        const imageUrl = user.profileImageUrl
          ? user.profileImageUrl
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`;

        return (
          <img
            key={user._id}
            src={imageUrl}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`;
            }}
            alt={user.name}
            className='w-10 h-10 rounded-full border-2 border-white object-cover -ml-2 first:ml-0'
          />
        );
      })}
      {selectedUsers.length > 3 && (
        <div className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm -ml-2 border-2 border-white'>
          +{selectedUsers.length - 3}
        </div>
      )}
    </div>
  );
};

export default SelectedMembers  