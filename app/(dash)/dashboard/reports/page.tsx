// app/(dash)/dashboard/reports/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Download, TrendingUp, Users, DollarSign, Target } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Separator } from '@/components/ui/separator'
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns'

interface KPIData {
  quotesThisMonth: number
  quotesLastMonth: number
  winRate: number
  avgCycleTime: number
  totalValue: number
  valueByCountry: Array<{
    country: string
    value: number
    flag?: string
  }>
  statusDistribution: Array<{
    status: string
    count: number
    color: string
  }>
  monthlyTrend: Array<{
    month: string
    quotes: number
    won: number
    value: number
  }>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function ReportsPage() {
  const [kpiData, setKpiData] = useState<KPIData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState({
    from: startOfMonth(subMonths(new Date(), 5)),
    to: endOfMonth(new Date())
  })

  useEffect(() => {
    fetchKPIData()
  }, [dateRange])

  const fetchKPIData = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString()
      })

      const response = await fetch(`/api/reports/kpi?${params}`)
      if (!response.ok) throw new Error('Failed to fetch KPI data')
      
      const data = await response.json()
      setKpiData(data)
    } catch (error) {
      console.error('Error fetching KPI data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportCSV = async () => {
    try {
      const response = await fetch('/api/reports/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'csv',
          dateRange: {
            from: dateRange.from.toISOString(),
            to: dateRange.to.toISOString()
          }
        })
      })
      
      if (!response.ok) throw new Error('Export failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `reports-${format(new Date(), 'yyyy-MM-dd')}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in-50">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Analytics and insights for your sales performance
          </p>
        </div>
        <Button onClick={handleExportCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      <Separator className="my-4" />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="motion-safe:animate-in motion-safe:fade-in-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quotes This Month</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData?.quotesThisMonth || 0}</div>
            <p className="text-xs text-muted-foreground">
              {kpiData && kpiData.quotesLastMonth > 0 && (
                <>
                  {((kpiData.quotesThisMonth - kpiData.quotesLastMonth) / kpiData.quotesLastMonth * 100).toFixed(1)}% from last month
                </>
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="motion-safe:animate-in motion-safe:fade-in-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData?.winRate.toFixed(1) || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Percentage of quotes won
            </p>
          </CardContent>
        </Card>

        <Card className="motion-safe:animate-in motion-safe:fade-in-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Cycle Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData?.avgCycleTime || 0} days</div>
            <p className="text-xs text-muted-foreground">
              Average time to close
            </p>
          </CardContent>
        </Card>

        <Card className="motion-safe:animate-in motion-safe:fade-in-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${kpiData?.totalValue.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Total estimated value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Trend */}
        <Card className="motion-safe:animate-in motion-safe:fade-in-50">
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>
              Quotes and wins over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={kpiData?.monthlyTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="quotes" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Total Quotes"
                />
                <Line 
                  type="monotone" 
                  dataKey="won" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Won Quotes"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="motion-safe:animate-in motion-safe:fade-in-50">
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>
              Current distribution of quote statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={kpiData?.statusDistribution || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count }) => `${status}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(kpiData?.statusDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Value by Country */}
        <Card className="motion-safe:animate-in motion-safe:fade-in-50">
          <CardHeader>
            <CardTitle>Value by Country</CardTitle>
            <CardDescription>
              Total estimated value by country
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={kpiData?.valueByCountry || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Countries Table */}
        <Card className="motion-safe:animate-in motion-safe:fade-in-50">
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>
              Countries with highest quote values
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(kpiData?.valueByCountry || []).slice(0, 5).map((country, index) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">#{index + 1}</span>
                    <span>{country.flag}</span>
                    <span className="text-sm">{country.country}</span>
                  </div>
                  <span className="text-sm font-medium">
                    ${country.value.toLocaleString()}
                  </span>
                </div>
              ))}
              {(!kpiData?.valueByCountry || kpiData.valueByCountry.length === 0) && (
                <div className="text-center py-4 text-muted-foreground rounded-md border bg-muted/10">
                  No data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
