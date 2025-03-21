import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '~/components/auth/register-form'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <RegisterForm />
      </div>
    </div>
  )
} 