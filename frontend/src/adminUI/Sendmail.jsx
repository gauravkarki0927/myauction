import React, { useState } from 'react';

const Sendmail = () => {
  const [to, setTo] = useState(['']);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleAddToRecipient = () => {
    setTo([...to, '']);
  };

  const handleRecipientChange = (index, value) => {
    const newTo = [...to];
    newTo[index] = value;
    setTo(newTo);
  };

  const handleRemoveRecipient = (index) => {
    const newTo = to.filter((_, i) => i !== index);
    setTo(newTo);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleAttachmentChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  const handleSend = () => {
    // Implement send email logic here
    console.log('Sending email:', { to, subject, body, attachments });
    // Reset form after sending (optional)
    setTo(['']);
    setSubject('');
    setBody('');
    setAttachments([]);
  };

  return (
    <div className="bg-white rounded-md shadow-lg p-4 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-semibold">Send Mail</h2>
      </div>
      <div className="mb-2">
        <label htmlFor="to" className="block text-sm font-semibold mb-1">
          To:
        </label>
        {to.map((recipient, index) => (
          <div key={index} className="flex items-center mb-1">
            <input
              type="email"
              id={`to-${index}`}
              className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 text-[14px]"
              value={recipient}
              onChange={(e) => handleRecipientChange(index, e.target.value)}
            />
            {to.length > 1 && (
              <button
                type="button"
                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleRemoveRecipient(index)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h12a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 01-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="text-blue-500 hover:text-blue-700 focus:outline-none text-sm"
          onClick={handleAddToRecipient}
        >
          + Add Recipient
        </button>
      </div>

      <div className="mb-2">
        <label htmlFor="subject" className="block text-sm font-semibold mb-1">
          Subject:
        </label>
        <input
          type="text"
          id="subject"
          className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 text-[14px]"
          value={subject}
          onChange={handleSubjectChange}
        />
      </div>

      <div className="mb-4 flex-grow">
        <label htmlFor="body" className="block text-sm font-semibold mb-1">
          Body:
        </label>
        <textarea
          id="body"
          rows="7"
          className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 text-[14px] resize-none"
          value={body} 
          onChange={handleBodyChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="attachment" className="block text-sm font-semibold mb-1">
          Attachments:
        </label>
        <input
          type="file"
          id="attachment"
          className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 text-[14px] cursor-pointer"
          multiple
          onChange={handleAttachmentChange}
        />
        {attachments.length > 0 && (
          <div className="mt-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600 mb-1">
                <span>{file.name} ({Math.round(file.size / 1024)} KB)</span>
                <button
                  type="button"
                  className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleRemoveAttachment(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h12a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 01-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center border-t border-gray-200 pt-4">
        <div className="flex items-center justify-end w-full space-x-2">
          <button
            className="bg-black text-white font-semibold py-1 px-4 rounded outline:none cursor-pointer"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sendmail;