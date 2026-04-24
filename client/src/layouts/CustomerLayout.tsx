import { Outlet } from "react-router-dom";

/**
 * Customer layout — just renders the page.
 * Header & Footer are included per-page (same pattern as the repo).
 */
const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
};

export default CustomerLayout;
