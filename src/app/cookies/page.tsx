import Container from "@/components/ui/Container"

export default function CookiesPage() {
    return (
        <div className="py-24 bg-white">
            <Container>
                <div className="prose prose-slate mx-auto lg:prose-lg text-justify">
                    <h1>Cookie Policy</h1>
                    <p>This Cookie Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used.</p>

                    <h2>What are Cookies?</h2>
                    <p>Cookies are small text files that are sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.</p>

                    <h2>How We Use Cookies</h2>
                    <p>We use cookies for the following purposes:</p>
                    <ul>
                        <li>To enable certain functions of the Service</li>
                        <li>To provide analytics</li>
                        <li>To store your preferences</li>
                    </ul>
                </div>
            </Container>
        </div>
    )
}
