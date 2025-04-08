import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Jobs = () =>{
    const [error, setError] = useState('');
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () =>{
            try {
                const response = await fetch('http://localhost:5000/api/job/findjobs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                const data = await response.json();
                setJobs(data.jobs);
                if (response.ok) {
                console.log(data);
                } else {
                throw new Error(data.msg || 'Failed to validate API key');
                }
            } catch (err) {
                console.error(err.message);
            }
            }
            fetchJobs();
        }, []);

    //I have to disclose the jobs through the API first

    return(
        <span>
            {jobs.length === 0 ? (
                <p>No jobs available (yet!)</p>
            ) : (
                <ul>
                {jobs.map((job) => (
                  <li key={job.jobId}>
                    {/* Link to the job detail page */}
                    <Link to={`/dashboard/jobs/${job.jobId}`}>{job.jobId}</Link>
                  </li>
                ))}
              </ul>
            )}
        </span>
    )
}

export default Jobs;