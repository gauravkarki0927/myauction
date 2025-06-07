import React, { useState } from 'react';
import API from '../api/API.js';
import toast from 'react-hot-toast'

const Sendmail = () => {
  const [to, setTo] = useState(['']);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    to.forEach((email, index) => {
      if (!email.trim()) {
        newErrors[`to-${index}`] = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(email)) {
        newErrors[`to-${index}`] = 'Invalid email format';
        isValid = false;
      }
    });

    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!body.trim()) {
      newErrors.body = 'Body is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddToRecipient = () => {
    setTo([...to, '']);
  };

  const handleRecipientChange = (index, value) => {
    const newTo = [...to];
    newTo[index] = value;
    setTo(newTo);

    setErrors((prev) => ({ ...prev, [`to-${index}`]: undefined }));
  };

  const handleRemoveRecipient = (index) => {
    const newTo = to.filter((_, i) => i !== index);
    setTo(newTo);
  };

  const handleAttachmentChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  const handleSend = async () => {
    if (!validate()) return;

    try {
      const formData = new FormData();

      formData.append('to', JSON.stringify(to));
      formData.append('subject', subject);
      formData.append('body', body);
      attachments.forEach((file) => formData.append('attachments', file));

      const response = await API.post(`${API}/sendAmail`, formData);

      const data = await response.data;

      if (data.success) {
        toast.success('Email sent successfully', { position: "top-right" });
        setTo(['']);
        setSubject('');
        setBody('');
        setAttachments([]);
        setErrors({});
      } else {
        toast.error(('Failed to send email: ' + data.message), { position: "top-right" });
      }
    } catch (error) {
      toast.error(('Error sending email: ' + error.message), { position: "top-right" });
    }
  };

  return (
    <div className="bg-white rounded-md p-4 flex flex-col h-auto">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-semibold">Send Mail To Users</h2>
      </div>

      <div className="mb-2">
        <label htmlFor="to" className="block text-sm font-semibold mb-1">To:</label>
        {to.map((recipient, index) => (
          <div key={index} className="mb-1">
            <input
              type="email"
              className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 text-[14px]"
              value={recipient}
              onChange={(e) => handleRecipientChange(index, e.target.value)}
            />
            {errors[`to-${index}`] && (
              <p className="mt-1 text-red-500 text-xs">{errors[`to-${index}`]}</p>
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
        <label className="block text-sm font-semibold mb-1">Subject:</label>
        <input
          type="text"
          className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 text-[14px]"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setErrors((prev) => ({ ...prev, subject: undefined }));
          }}
        />
        {errors.subject && <p className="mt-1 text-red-500 text-xs">{errors.subject}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Body:</label>
        <textarea
          rows="7"
          className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 text-[14px] resize-none"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            setErrors((prev) => ({ ...prev, body: undefined }));
          }}
        />
        {errors.body && <p className="text-red-500 text-xs">{errors.body}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="attachment" className="block text-sm font-semibold mb-1">Attachments:</label>
        <input
          type="file"
          id="attachment"
          className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 text-[14px] cursor-pointer"
          multiple
          onChange={handleAttachmentChange}
        />
        {attachments.map((file, index) => (
          <div key={index} className="flex items-center text-sm mt-1 text-gray-700">
            <span>{file.name} ({Math.round(file.size / 1024)} KB)</span>
            <button
              className="ml-2 text-red-500"
              onClick={() => handleRemoveAttachment(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center border-t border-gray-200 p-4 h-auto">
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
