import React from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/common/sidebar'
import { TopBar } from '@/components/common/topbar'
import { StatsCard } from '@/components/dashboard/stats-card'
import { ProgressRing } from '@/components/dashboard/progress-ring'
import { Card } from '@/components/ui/card'
import { LayoutDashboard, Calendar, Target, CheckSquare } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <TopBar />

      <main className="pt-20 lg:pl-72 px-6 lg:px-10 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold">Good morning — welcome back</h1>
              <p className="text-sm text-muted-foreground mt-1">Here's your snapshot for today.</p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/planner" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold hover:opacity-95">New Entry</Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatsCard title="Today's Focus" value="3 items" description="Focus on top priorities" trend={{ value: 8, direction: 'up' }} icon={<LayoutDashboard className="w-5 h-5" />} />
            <StatsCard title="Habits Completed" value="4/7" description="Keep the streak!" trend={{ value: 12, direction: 'up' }} icon={<CheckSquare className="w-5 h-5" />} />
            <StatsCard title="Events Today" value="5" description="Scheduled events" trend={{ value: -4, direction: 'down' }} icon={<Calendar className="w-5 h-5" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Welcome Card */}
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Your dashboard</h2>
                    <p className="text-sm text-muted-foreground">At a glance: goals, habits, and today's timetable.</p>
                  </div>
                  <ProgressRing percentage={72} size={88} label="Productivity" />
                </div>
              </Card>

              {/* Daily goals */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Daily Goals</h3>
                  <span className="text-sm text-muted-foreground">3 left</span>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <div>
                      <div className="font-medium">Finish morning review</div>
                      <div className="text-sm text-muted-foreground">15m • High priority</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" defaultChecked />
                    <div>
                      <div className="font-medium">Check emails</div>
                      <div className="text-sm text-muted-foreground">10m • Low priority</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <div>
                      <div className="font-medium">Plan workout</div>
                      <div className="text-sm text-muted-foreground">30m • Medium priority</div>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Habits tracker */}
              <Card>
                <h3 className="text-lg font-medium mb-4">Habit Tracker</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">Hydration</div>
                    <div className="text-xs text-muted-foreground">6/8 glasses</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">Meditation</div>
                    <div className="text-xs text-muted-foreground">10 min</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">Reading</div>
                    <div className="text-xs text-muted-foreground">20 min</div>
                  </div>
                </div>
              </Card>

              {/* Timetable */}
              <Card>
                <h3 className="text-lg font-medium mb-4">Today's Timetable</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-sm text-muted-foreground">
                        <th className="py-2">Time</th>
                        <th className="py-2">Event</th>
                        <th className="py-2">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="align-top">
                      <tr>
                        <td className="py-2">08:00</td>
                        <td className="py-2">Morning review</td>
                        <td className="py-2">15m</td>
                      </tr>
                      <tr>
                        <td className="py-2">09:00</td>
                        <td className="py-2">Standup</td>
                        <td className="py-2">30m</td>
                      </tr>
                      <tr>
                        <td className="py-2">11:00</td>
                        <td className="py-2">Deep work</td>
                        <td className="py-2">2h</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Right column */}
            <aside className="space-y-6">
              <Card>
                <h4 className="text-sm text-muted-foreground">Quick Actions</h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/goals" className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-primary text-primary-foreground">Add Goal</Link>
                  <Link href="/habits" className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-secondary text-secondary-foreground">Add Habit</Link>
                  <Link href="/planner" className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-border">New Timetable Item</Link>
                </div>
              </Card>

              <Card>
                <h4 className="text-sm text-muted-foreground">Shortcuts</h4>
                <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4"/> Calendar</div>
                  <div className="flex items-center gap-2"><Target className="w-4 h-4"/> Goals</div>
                  <div className="flex items-center gap-2"><CheckSquare className="w-4 h-4"/> Habits</div>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
