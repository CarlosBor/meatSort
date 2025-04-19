import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Job } from "../interfaces/Job";
import LoremForm from "./LoremForm";
import DrawForm from "./DrawForm";
import SortForm from "./SortForm";
import { Container, Box, Typography, Divider, CircularProgress } from "@mui/material";

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      } finally {
        setLoading(false);
      }
    };
    getJob();
  }, [jobId]);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", paddingTop: 10 }} />;
  if (!job) return <Typography variant="h6" align="center" color="error">Failed to load job details.</Typography>;

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 10 }}> {/* Increased paddingTop for more space */}
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Job Type: {job.type}
      </Typography>
      <Box sx={{ padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: 'background.paper' }}>
        <Typography variant="h6" component="p">
          <strong>Status:</strong> {job.status}
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginTop: 2 }}>
          <strong>Comments:</strong> {job.payload.comments ? JSON.stringify(job.payload.comments) : "No comments available."}
        </Typography>
      </Box>

      <Divider sx={{ marginY: 4 }} /> {/* Increased marginY for more space between sections */}

      {/* Conditional rendering of forms based on job type */}
      {job.type === "lorem" && <LoremForm jobId={job._id} />}
      {job.type === "draw" && <DrawForm jobId={job._id} />}
      {job.type === "sortable" && <SortForm jobId={job._id} sortable={job.payload.sortable} />}
    </Container>
  );
};

export default JobDetail;
