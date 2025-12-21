import Container from "@/components/ui/Container"

export default function PrivacyPage() {
    return (
        <div className="py-24 bg-white">
            <Container>
                <div className="prose prose-slate mx-auto lg:prose-lg text-justify">
                    <h1>Privacy Policy</h1>
                    <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
                    <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>

                    <h2>Collecting and Using Your Personal Data</h2>
                    <p>We collect personal data that you provide to us directly, such as when you fill out our contact form.</p>

                    <h3>Types of Data Collected</h3>
                    <ul>
                        <li>Email address</li>
                        <li>First name and last name</li>
                        <li>Phone number</li>
                    </ul>

                    <h2>Retention of Your Personal Data</h2>
                    <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy.</p>
                </div>
            </Container>
        </div>
    )
}
