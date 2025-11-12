import Link from "daisyui/components/link";

const NotFound = () => {
    return (
      <div className="text-center py-20">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl">Page not found</p>
      <Link to="/" className="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded">Go Home</Link>
    </div>
    );
};

export default NotFound;