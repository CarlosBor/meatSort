import { Job } from '../interfaces/Job';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Jobs = () =>{
    const [jobs, setJobs] = useState<Job[]>([]);
    useEffect(() => {
        const getJobs = async () =>{
            try {
                const response = await fetch('http://localhost:5000/api/job/findjobs', {
                method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const { jobs } = await response.json();
                    setJobs(jobs);
                } else {
                    throw new Error('Failed to fetch jobs');
                }
            } catch (error) {
                if (error instanceof Error) {
                  console.error(error.message);
                } else {
                  console.error('An unknown error occurred');
                }
              }
            }
            getJobs();
        }, []);

    //I have to disclose the jobs through the API first

    return(
        <span>
            {jobs.length === 0 ? (
                <p>All jobs completed!</p>
            ) : (
                <ul>
                {jobs.map((job) => (
                  <li key={job._id}>
                    <Link to={`/dashboard/jobs/${job._id}`}>Type: {job.type}</Link>
                  </li>
                ))}
              </ul>
            )}
        </span>
    )
}

export default Jobs;