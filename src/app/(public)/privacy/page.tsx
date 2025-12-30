import Container from "@/components/ui/Container"

export default function PrivacyPage() {
    return (
        <div className="py-24 bg-white">
            <Container>
                <div className="prose prose-slate mx-auto lg:prose-lg text-justify">
                    <h1>Privacy Policy</h1>
                    <p className="lead"><strong>Last Updated: 2025-12-27</strong></p>

                    <h2>1. Introduction</h2>
                    <p>This Privacy Policy explains how "LexNova (Demo)" collects and uses data when you use our mobile application.</p>

                    <h2>2. Data We Collect</h2>
                    <p>We generate prospective client leads and appointment requests. To fulfill these functions, we may collect:</p>
                    <ul>
                        <li><strong>Personal Information</strong>: Name, Email Address, Phone Number.</li>
                        <li><strong>Appointment Data</strong>: Preferred Date and Time, Reason for Visit.</li>
                    </ul>

                    <h2>3. How We Use Data</h2>
                    <ul>
                        <li>To simulate the process of booking a legal consultation.</li>
                        <li>To display "user profile" data locally on your device.</li>
                        <li><strong>Note</strong>: As this is a demo app, data entered may be stored in a temporary database (Supabase) for demonstration of the admin panel features. It is not used for marketing or sold to third parties.</li>
                    </ul>

                    <h2>4. Data Retention</h2>
                    <p>Data submitted to this demo environment is purged periodically. We do not maintain long-term records of standard users.</p>

                    <h2>5. Your Rights (GDPR)</h2>
                    <p>Under GDPR, you have the right to access, rectify, or erase your personal data. If you have entered real data by mistake and wish for it to be removed, please contact the developer email associated with this listing.</p>
                </div>
            </Container>
        </div>
    )
}
