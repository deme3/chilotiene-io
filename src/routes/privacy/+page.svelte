<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="small-logo font-bold text-zinc-200/50" id="logo">Chi lo tiene...</h1>
		<h2 class="text-xl font-bold"><strong>Privacy Policy</strong></h2>
	</div>
	<div class="flex items-center justify-end gap-4">
		<button class="circular-button" aria-label="Go Home" onclick={() => goto(`${base}/`)}>
			<i class="ti ti-home"></i>
		</button>
		<button class="circular-button" aria-label="Go Back" onclick={() => history.back()}>
			<i class="ti ti-arrow-left"></i>
		</button>
	</div>
</div>

<section class="mt-4 flex flex-col gap-4">
	<Accordion title="Privacy Policy" noncollapsible>
		<article class="prose prose-base prose-invert !max-w-full px-2 prose-headings:mb-0">
			<p>
				Welcome to "Chi lo tiene..." (the "Service"). This is a personal project. This page informs
				you of the policies regarding the collection, use, and disclosure of personal data when you
				use the Service and the choices you have associated with that data.
			</p>

			<p>
				Your data is used to provide the Service. By using the Service, you agree to the collection
				and use of information in accordance with this policy.
			</p>

			<h3>Information Collection and Use</h3>
			<p>
				The Service collects several different types of information for various purposes to provide
				the Service.
			</p>

			<h4>Types of Data Collected</h4>
			<p>
				<strong>Personal Data. </strong><br />
				While using the Service, you may be asked to provide certain personally identifiable information
				that can be used to contact or identify you ("Personal Data"). Personally identifiable information
				may include, but is not limited to:
			</p>
			<ul>
				<li>Email address</li>
				<li>Password (stored as a secure hash)</li>
			</ul>

			<p>
				<strong>Usage Data. </strong><br />
				Information may also be collected on how the Service is accessed and used ("Usage Data"). This
				Usage Data may include information such as your computer's Internet Protocol address (e.g. IP
				address), browser type, browser version, the pages of the Service that you visit, the time and
				date of your visit, the time spent on those pages, unique device identifiers and other diagnostic
				data.
			</p>

			<h3>How Your Information Is Used</h3>
			<p>The collected data is used for various purposes:</p>
			<ul>
				<li>To provide and maintain the Service</li>
				<li>To manage your account and provide you with support</li>
				<li>
					To communicate with you, for example, by sending emails for account verification or other
					transactional purposes using services like Resend.
				</li>
				<li>
					To monitor the usage of the Service, analyze data for service improvement, and ensure
					security.
				</li>
				<li>To detect, prevent, and address technical issues.</li>
			</ul>

			<h3>Data Storage and Security</h3>
			<p>
				The security of your data is important. Steps are taken to protect your data, including:
			</p>
			<ul>
				<li>
					Hashing your passwords using <strong>modern, industry-standard hashing algorithms</strong>
					before storing them.
				</li>
				<li>Using industry-standard security measures to protect the servers and database.</li>
			</ul>
			<p>
				However, remember that no method of transmission over the Internet or method of electronic
				storage is 100% secure. While commercially acceptable means are used to protect your
				Personal Data, absolute security cannot be guaranteed.
			</p>
			<h3>Data Sharing</h3>
			<p>
				Your Personal Data is not sold, traded, or rented to others. Your information may be shared
				with third-party service providers to facilitate the Service, such as for sending emails
				(e.g., Resend) or hosting the application and database. These third parties are obligated to
				protect your information and are not authorized to use it for any other purpose.
			</p>

			<h3>Your Data Protection Rights</h3>
			<p>
				Depending on your location, you may have the following rights regarding your personal data:
			</p>
			<ul>
				<li>
					<strong>The right to access</strong> – You have the right to request copies of your personal
					data.
				</li>
				<li>
					<strong>The right to rectification</strong> – You have the right to request the correction
					of any information you believe is inaccurate.
				</li>
				<li>
					<strong>The right to erasure</strong> – You have the right to request the erasure of your personal
					data, under certain conditions.
				</li>
				<li>
					<strong>The right to restrict processing</strong> – You have the right to request the restriction
					of the processing of your personal data, under certain conditions.
				</li>
				<li>
					<strong>The right to object to processing</strong> – You have the right to object to the processing
					of your personal data, under certain conditions.
				</li>
				<li>
					<strong>The right to data portability</strong> – You have the right to request the transfer
					of the data that has been collected to another organization, or directly to you, under certain
					conditions.
				</li>
			</ul>
			<p>
				If you make a request, a response will be provided within one month. If you would like to
				exercise any of these rights, please use the contact information below.
			</p>

			<h3>Cookies</h3>
			<p>
				The Service uses cookies and similar tracking technologies to track activity on the Service
				and hold certain information. Cookies are files with a small amount of data which may
				include an anonymous unique identifier. You can instruct your browser to refuse all cookies
				or to indicate when a cookie is being sent. However, if you do not accept cookies, you may
				not be able to use some portions of the Service. Cookies are primarily used for session
				management (e.g., keeping you logged in).
			</p>

			<h3>Changes to This Privacy Policy</h3>
			<p>
				This Privacy Policy may be updated from time to time. You will be notified of any changes by
				the posting of the new Privacy Policy on this page. You are advised to review this Privacy
				Policy periodically for any changes. Changes to this Privacy Policy are effective when they
				are posted on this page.
			</p>

			<h3>Contact</h3>
			<p>
				If you have any questions about this Privacy Policy, please contact me at:
				<a href="mailto:hello@deme3.me">hello@deme3.me</a>
			</p>
		</article>
	</Accordion>
</section>
