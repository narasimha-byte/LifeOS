import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen pt-24 lg:pl-72 px-6 lg:px-10 pb-10 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Review your performance, trends, and progress over time.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
            <CardDescription>See how your goals, habits, and tasks are progressing.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Visualize your growth and adapt your plan for better results.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
