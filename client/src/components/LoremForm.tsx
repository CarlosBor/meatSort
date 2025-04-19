import { useState } from "react";
import { Button, TextareaAutosize, Box } from '@mui/material';
import { sendResponse } from '../utils/sendResponse';
import { SimpleFormProps } from "../interfaces/Job";
import { useNavigate } from "react-router-dom";

const LoremForm = (props: SimpleFormProps) => {
    const [loremResponse, setLoremResponse] = useState('');
    const navigate = useNavigate();

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendResponse(props.jobId, loremResponse);
        navigate('/dashboard/jobs');
    }

    return (
        <form onSubmit={submitForm}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px',
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
            >
                <TextareaAutosize
                    required
                    name="loremResponse"
                    id="loremResponse"
                    value={loremResponse}
                    aria-label="minimum height"
                    minRows={5}
                    placeholder="Please fill the requested content"
                    onChange={(e) => setLoremResponse(e.target.value)}
                    style={{ 
                        width: '100%',
                        maxWidth: '500px',
                        padding: '10px',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                        marginBottom: '16px',
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                        marginTop: 3, 
                        marginBottom: 4,
                        maxWidth: '500px',
                    }}
                >
                    Mark Completed
                </Button>
            </Box>
        </form>
    )
}

export default LoremForm;
