import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const ResetPassword = dynamic(() => import('sections/Client/ResetPassword'))

const ResetPasswordPage: NextPage = () => <ResetPassword />

export default ResetPasswordPage
