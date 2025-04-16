export const sendResponse = async (jobId: string, loremResponse: string) => {
	try{
		const response = await fetch(`http://localhost:5000/api/job/complete/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ jobId, result: loremResponse }),
		});

		if (response.ok) {
			//TODO: Give some feedback to the user about the completed job
		} else {
			throw new Error('Failed to complete job');
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error("An unknown error occurred");
		}
	}
}