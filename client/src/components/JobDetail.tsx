import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const { jobId } = useParams();  // Get jobId from the URL
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        //TODO Add auth
        const response = await fetch(`http://localhost:5000/api/job/${jobId}`);
        const data = await response.json();
        setJob(data.job);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchJob();
  }, [jobId]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div>
      <h2>Job Details: {job._id}</h2>
      {/* Display job details here */}
      <p>Status: {job.status}</p>
      <p>Payload: {JSON.stringify(job.payload)}</p>
      {/* Add any other relevant job details */}
    </div>
  );
};

export default JobDetail;
