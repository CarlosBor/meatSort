1.- Login                             	GOOD
2.- Gen Api Key                       	GOOD              
3.- Request API                       	GOOD
4.- Make queries reach the backend    	GOOD
5.- Responses                         	GOOD
6.- Change usage of IDs with mongo IDs  GOOD
7.- Massive cleanup

Here's the workflow:
1.- The client makes a Job request.
2.- The server receives the request, returns a Job ID.
3.- The client builds an object with the Job ID and the request info. Saves it to localStorage
4.- The client queries the requested job through a SSE endpoint.
5.- The server responds to the SSE endpoint with the Job result if able.
6.- The client, if it gets the result, sends another query to the server to mark the job as complete.
7.- If the client queries the same job again (which it can check because it's in localStorage), rather than requesting another job, it will get the previous one
8.- For ease of use, this should be a library, npm let's fucking do it



TEST APIKEY:
2e705feab915fc69b322c898f30210cb23c7447b4396d8fee9cdf459ea563170