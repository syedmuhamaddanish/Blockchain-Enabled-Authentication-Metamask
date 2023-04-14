import withAuth from '@/utils/withAuth';

function ProtectedRoute() {
  return <h1>This is a protected route.</h1>;
}

export default withAuth(ProtectedRoute);
