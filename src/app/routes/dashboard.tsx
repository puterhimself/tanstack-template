import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { trpc } from '~/lib/trpc/client'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const [count, setCount] = useState(0)
  const hello = trpc.hello.useQuery({ name: 'Dashboard' })

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Local State Example</CardTitle>
            <CardDescription>Using React state management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{count}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setCount(count + 1)}>Increment</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>tRPC Example</CardTitle>
            <CardDescription>Server-side data fetching</CardDescription>
          </CardHeader>
          <CardContent>
            {hello.isLoading ? (
              <p>Loading...</p>
            ) : hello.error ? (
              <p className="text-red-500">{hello.error.message}</p>
            ) : (
              <p className="text-xl">{hello.data?.greeting}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              onClick={() => hello.refetch()}
              disabled={hello.isLoading}
            >
              Refetch
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 