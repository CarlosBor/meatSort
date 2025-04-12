import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, TextareaAutosize} from '@mui/material';

const JobDetail = () => {
  const { jobId } = useParams();
  //TODO Handle the any case
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [job, setJob] = useState<{ _id: string; status: string; payload: any } | null>(null);
  const [loremResponse, setLoremResponse] = useState('');

useEffect(() => {
	const getJob = async () => {
		try {
			const response = await fetch(`http://localhost:5000/api/job/${jobId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			});
			const { job } = await response.json();
			setJob(job);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error("An unknown error occurred");
			}
		}
	};
	getJob();
}, [jobId]);

const sendResponse = async () =>{
	event.preventDefault(); // This prevents the page from reloading
	try{
		console.log("Whatafac");
		await fetch(`http://localhost:5000/api/job/complete/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ jobId, result: loremResponse }),
		})
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error("An unknown error occurred");
		}
	}
}

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
				onClick={sendResponse}
			>
				Mark Completed
			</Button>
			</form>
		</div>
  	);
};

export default JobDetail;
