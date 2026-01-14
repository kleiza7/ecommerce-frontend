const ErrorPage = ({
  error,
  onReset,
}: {
  error?: Error;
  onReset: () => void;
}) => {
  return (
    <div className="bg-gray-1 flex min-h-screen items-center justify-center px-4">
      <div className="flex max-w-xl flex-col items-center gap-6 text-center">
        <span className="text-orange text-[96px] leading-none font-bold">
          Oops!
        </span>

        <span className="text-text-primary text-s28-l36 font-semibold">
          Something went wrong
        </span>

        <p className="text-text-primary text-s16-l24">
          An unexpected error occurred. Please try again or return to the
          products page.
        </p>

        {error?.message && (
          <pre className="text-s12-l16 text-error-primary max-w-full overflow-x-auto rounded px-4 py-2">
            {error.message}
          </pre>
        )}

        <button
          type="button"
          onClick={onReset}
          className="bg-orange hover:bg-orange-dark text-s16-l24 rounded-lg px-8 py-3 font-medium text-white transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
