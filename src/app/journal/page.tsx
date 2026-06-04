import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function JournalPage() {
  return (
    <main className="min-h-screen pt-24 lg:pl-72 px-6 lg:px-10 pb-10 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Journal</h1>
            <p className="text-muted-foreground">Capture thoughts, gratitude, and daily reflections.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Journal</CardTitle>
            <CardDescription>Write, review, and maintain your daily log.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">A quiet place for reflection and personal progress.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
