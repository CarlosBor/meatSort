import { useState } from 'react';

const LoremJobCard = ({ job }) => {
  const [content, setContent] = useState('');

  const onComplete = (jobId) =>{
    console.log(jobId);
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/job/complete/${job._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result: content, artisan: 'Carlos' }),
      });

      const data = await response.json();
      if (response.ok) {
        onComplete(job._id);
      } else {
        throw new Error(data.msg || 'Failed to complete job');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="border p-4 rounded mb-4 shadow">
      <p><strong>Job ID:</strong> {job._id}</p>
      <textarea
        className="w-full p-2 mt-2 border"
        rows={4}
        placeholder="Write your artisanal Lorem Ipsum here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleSubmit}
      >
        Complete Job
      </button>
    </div>
  );
};

export default LoremJobCard;
