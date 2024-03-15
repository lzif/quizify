// app/routes/auth/google.tsx
import { ActionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export let loader = () => redirect('/login')

export let action = ({ request }: ActionArgs) => {
  return authenticator.authenticate('google', request)
}
