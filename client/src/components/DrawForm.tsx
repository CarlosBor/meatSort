import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { sendResponse } from '../utils/sendResponse';
import { SimpleFormProps } from "../interfaces/Job";
import CanvasDraw from "react-canvas-draw";

const LoremForm = (props:SimpleFormProps) =>{
    const navigate = useNavigate();
    const canvasRef = useRef<CanvasDraw>(null);
    
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const drawData = canvasRef.current?.getSaveData();
        sendResponse(props.jobId, drawData);
        navigate('/dashboard/jobs');
    }

    return(
        <form>
            <CanvasDraw
                ref={canvasRef}
                brushColor="#000"
                brushRadius={4}
                lazyRadius={0}
                canvasWidth={800}
                canvasHeight={600}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 3, marginBottom: 2 }}
                onClick={submitForm}
            >
                Mark Completed
            </Button>
        </form>
    )
}

export default LoremForm;