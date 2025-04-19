import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoremForm from "./LoremForm";
import DrawForm from "./DrawForm";

const JobDetail = () => {
  const { jobId } = useParams();
  //TODO Handle the any case
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [job, setJob] = useState<{ _id: string; status: string; payload: any } | null>(null);
  
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
			console.log(job);
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


  if (!job) return <p>Loading job details...</p>;

	return (
		<div>
			<h2>Job Type: {job.type}</h2>
			<p>Status: {job.status}</p>
			<p>Comments: {JSON.stringify(job.payload.comments)}</p>
			{job.type === "lorem" && <LoremForm jobId={job._id}/>}
			{job.type === "draw" && <DrawForm jobId={job._id}/>}
		</div>
  	);
};

export default JobDetail;
