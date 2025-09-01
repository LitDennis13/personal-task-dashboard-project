import { Navigate } from 'react-router-dom';

function DashBoardRedirect() {
    return <Navigate to={"/"} replace/>;
}

export default DashBoardRedirect;