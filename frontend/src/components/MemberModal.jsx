

import React from 'react'

const MemberModal = ({ users, selectedMembers, setSelectedMembers, isOpen, onClose }) => {

  if (!isOpen) return null

  const toggleMember = (id) => {
    setSelectedMembers(prev =>
      prev.includes(id)
        ? prev.filter(memberId => memberId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
      style={{ fontFamily: 'AEONIK' }}
    >

      <div className='bg-white w-full max-w-lg rounded-2xl p-6'>

        {/* HEADER */}
        <div className='flex items-center justify-between mb-6'>

          <h2 className='text-2xl dark:text-black font-bold'
            style={{ fontFamily: 'LEMONMILK' }}
          >
            Team Members
          </h2>

          <button
            onClick={onClose}
            className='text-xl dark:text-black'
          >
            ✕
          </button>

        </div>

        {/* USERS */}
        <div className='flex flex-col gap-4 max-h-[400px] overflow-y-auto'>

          {users.map(user => (

            <div
              key={user._id}
              className='flex items-center justify-between border p-3 rounded-xl'
            >

              <div className='flex items-center gap-3'>

                <img
                  src={
                    user.profileImageUrl && !user.profileImageUrl.startsWith('blob:')
                      ? `${import.meta.env.VITE_API_URL}${user.profileImageUrl}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
                  }}
                  alt={user.name}
                  className='w-12 h-12 rounded-full object-cover'
                />

                <div>
                  <h3 className='font-semibold dark:text-black'>
                    {user.name}
                  </h3>

                  <p className='text-sm text-zinc-500'>
                    {user.email}
                  </p>
                </div>

              </div>

              <input
                type='checkbox'
                checked={selectedMembers.includes(user._id)}
                onChange={() => toggleMember(user._id)}
                className='w-5 h-5'
              />

            </div>

          ))}

        </div>

        {/* FOOTER */}
        <button
          onClick={onClose}
          className='bg-black text-white w-full p-3 rounded-xl mt-6'
        >
          Done
        </button>

      </div>

    </div>
  )
}

export default MemberModal