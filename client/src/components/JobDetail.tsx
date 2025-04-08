import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, TextareaAutosize} from '@mui/material';

const JobDetail = () => {
  const { jobId } = useParams();  // Get jobId from the URL
  const [job, setJob] = useState(null);
  const [loremResponse, setLoremResponse] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        //TODO Add auth
        console.log("This is the jobId:" ,jobId);
        const response = await fetch(`http://localhost:5000/api/job/${jobId}`);
        const data = await response.json();
        console.log(data);
        setJob(data.job);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchJob();
  }, [jobId]);

  if (!job) return <p>Loading job details...</p>;

  //TODO make the delivery reach the server to be returned by the API
  return (
    <div>
      <h2>Job Details: {job._id}</h2>
      {/* Display job details here */}
      <p>Status: {job.status}</p>
      <p>Payload: {JSON.stringify(job.payload)}</p>
      {/* Add any other relevant job details */}
      <form>
      <TextareaAutosize
            required
            name="loremResponse"
            id="loremResponse"
            value={loremResponse}
            aria-label="minimum height"
            minRows={5}
            placeholder="Please fill the requested content"
            style={{ width: 500 }}
            onChange={(e) => setLoremResponse(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Mark Completed
          </Button>
      </form>
    </div>
  );
};

export default JobDetail;
