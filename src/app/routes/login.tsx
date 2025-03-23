import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '~/components/auth/login-form'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <LoginForm />
      </div>
    </div>
  )
} 