import { Job } from '../interfaces/Job';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Box, List, CircularProgress } from "@mui/material";

const Jobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Track loading state

    useEffect(() => {
        const getJobs = async () => {
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
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        };
        getJobs();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ paddingTop: 3 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Job Listings
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    <CircularProgress />
                </Box>
            ) : jobs.length === 0 ? (
                <Typography variant="h6" align="center">All jobs completed!</Typography>
            ) : (
                <List>
                    {jobs.map((job) => (
                        <Box
                            key={job._id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 2,
                                padding: 2,
                                borderRadius: 2,
                                boxShadow: 3,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#1976d2',
                                    boxShadow: 6,
                                    cursor: 'pointer',
                                    animation: 'greenHover 0.5s forwards',
                                },
                            }}
                        >
                            <Link to={`/dashboard/jobs/${job._id}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                <Box
                                    sx={{
                                        padding: 2,
                                        border: '1px solid #ccc',
                                        borderRadius: 1,
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography variant="h6" component="h2">
                                        Type: {job.type}
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default Jobs;
