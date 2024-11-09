/**
 * @file: src/app/[locale]/dashboard/loading.tsx
 * @description: Dashboard loading component
 */

export default function DashboardLoading() {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }