import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from '@mui/material';
import { sendResponse } from '../utils/sendResponse';
import { SimpleFormProps } from "../interfaces/Job";
import CanvasDraw from "react-canvas-draw";

const DrawForm = (props: SimpleFormProps) => {
    const navigate = useNavigate();
    const canvasRef = useRef<CanvasDraw>(null);

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const drawData = canvasRef.current?.getSaveData();
        sendResponse(props.jobId, drawData);
        navigate('/dashboard/jobs');
    }

    return (
        <form onSubmit={submitForm}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '800px',
                    margin: '0 auto',
                }}
            >
                <CanvasDraw
                    ref={canvasRef}
                    brushColor="#000"
                    brushRadius={4}
                    lazyRadius={0}
                    canvasWidth={800}
                    canvasHeight={600}
                    style={{
                        maxWidth: '100%',
                        border: '1px solid #ccc',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
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

export default DrawForm;
