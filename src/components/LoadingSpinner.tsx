
const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      <p className="mt-4 text-slate-600">Chargement en cours...</p>
    </div>
  );
};

export default LoadingSpinner;
