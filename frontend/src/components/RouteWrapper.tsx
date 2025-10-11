import { ReactNode, Suspense } from "react";
import PageLoader from "./PageLoader";
import ErrorBoundary from "./ErrorBoundary";

interface RouteWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const RouteWrapper = ({ children, fallback }: RouteWrapperProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback || <PageLoader message="Loading page..." />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default RouteWrapper;
