import Container from "@/components/ui/Container"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Data Deletion Request | LexNova EU",
    description: "Request deletion of your data from LexNova EU mobile application.",
}

export default function DataDeletionPage() {
    return (
        <div className="py-24 bg-white">
            <Container>
                <div className="prose prose-slate mx-auto lg:prose-lg text-justify">
                    <h1>Data Deletion Request</h1>
                    <p className="lead"><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>

                    <p>
                        At "LexNova EU", we value your privacy and are committed to ensuring you have control over your personal information.
                        In accordance with Google Play's Data Safety policies and GDPR, users may request the deletion of their data at any time.
                    </p>

                    <h2>1. Data We Collect</h2>
                    <p>To provide our legal consultation services and manage appointments, we may accept the following information if submitted voluntarily via our app's forms:</p>
                    <ul>
                        <li><strong>Personal Information</strong>: Name, Email Address, Phone Number.</li>
                        <li><strong>Appointment Details</strong>: Preferred Date, Time, and reason for the consultation.</li>
                    </ul>
                    <p>
                        We do not require user accounts or login credentials. Data is collected solely for the purpose of facilitating communication and simulating the booking process.
                    </p>

                    <h2>2. Purpose of Data Retention</h2>
                    <p>
                        We retain submitted data for a limited time to:
                    </p>
                    <ul>
                        <li>Respond to your inquiries or callback requests.</li>
                        <li>Manage and display your appointment status locally within the app.</li>
                        <li>Prevent abuse of our booking systems.</li>
                    </ul>
                    <p>
                        We do not sell your personal data to third parties or use it for unrelated marketing purposes without your consent.
                    </p>

                    <h2>3. How to Request Data Deletion</h2>
                    <p>
                        If you wish to have your data permanently deleted from our systems, please follow these steps:
                    </p>
                    <ol>
                        <li>Send an email to our Data Protection Officer at <strong>mdshahadat196@gmail.com</strong>.</li>
                        <li>Use the subject line: <strong>"Data Deletion Request - LexNova EU"</strong>.</li>
                        <li>In the body of the email, please include:
                            <ul>
                                <li>The Name and Email Address you used in the app (so we can locate your record).</li>
                                <li>A brief statement confirming you want your data to be deleted.</li>
                            </ul>
                        </li>
                    </ol>

                    <h2>4. Processing Your Request</h2>
                    <p>
                        Upon receiving your valid request:
                    </p>
                    <ul>
                        <li>We will verify your identity to ensure the safety of your data.</li>
                        <li>We will permanently delete your personal information from our databases within <strong>7 business days</strong>.</li>
                        <li>You will receive a confirmation email once the deletion is complete.</li>
                    </ul>
                    <p>
                        Please note that some data may be retained in secure backup logs for a short period as required by law or for system security, after which it will be automatically purged.
                    </p>

                    <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="mb-0 text-sm text-slate-600">
                            <strong>Contact Us:</strong> <br />
                            If you have questions about this policy, please contact us at mdshahadat196@gmail.com.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    )
}
