import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'

import config from '@/payload.config'

export default async function HomePage() {
	const headers = await getHeaders()
	const payloadConfig = await config
	const payload = await getPayload({ config: payloadConfig })
	const { user } = await payload.auth({ headers })

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
			<div className="max-w-2xl w-full space-y-8">
				<div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center space-y-6">
					<div className="flex justify-center">
						<div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
							<div className="w-full h-full bg-white rounded-full flex items-center justify-center">
								<Image
									alt="Payload Logo"
									height={65}
									src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
									width={65}
									className="w-12 h-12"
								/>
							</div>
						</div>
					</div>

					{!user && (
						<h1 className="text-4xl md:text-5xl font-bold text-slate-900">Bienvenue sur votre nouveau projet</h1>
					)}
					{user && (
						<div className="space-y-2">
							<h1 className="text-4xl md:text-5xl font-bold text-slate-900">Bienvenue</h1>
							<p className="text-xl text-slate-600">{user.email}</p>
						</div>
					)}

					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
						<a
							href={payloadConfig.routes.admin}
							rel="noopener noreferrer"
							target="_blank"
							className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							Panel d'administration
						</a>
						<a
							href="https://payloadcms.com/docs"
							rel="noopener noreferrer"
							target="_blank"
							className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
						>
							Documentation
						</a>
					</div>
				</div>

				<div className="text-center text-sm text-slate-500">
					<p>
						Éditez <code className="px-2 py-1 bg-slate-200 rounded text-slate-700">app/(frontend)/page.tsx</code> pour
						commencer
					</p>
				</div>
			</div>
		</div>
	)
}
