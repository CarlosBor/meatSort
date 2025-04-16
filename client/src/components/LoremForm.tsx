import { useState } from "react";
import { Button, TextareaAutosize} from '@mui/material';
import { sendResponse } from '../utils/sendResponse';
import { LoremFormProps } from "../interfaces/Job";

const LoremForm = (props:LoremFormProps) =>{
    const [loremResponse, setLoremResponse] = useState('');
    
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendResponse(props.jobId, loremResponse);    
    }

    return(
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
                onClick={submitForm}
            >
                Mark Completed
            </Button>
        </form>
    )
}

export default LoremForm;