import { Outlet, Link } from 'react-router-dom';

const Dashboard = () =>{
    return (
        <div>
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li><Link to="/dashboard/apikey">API Keys</Link></li>
                    <li><Link to="/dashboard/jobs">Jobs</Link></li>
                </ul>
            </nav>

            {/* This is where the nested route content will be displayed */}
            <Outlet />
        </div>
    );
}

export default Dashboard;