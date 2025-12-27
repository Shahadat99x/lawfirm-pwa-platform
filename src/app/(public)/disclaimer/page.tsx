import Container from "@/components/ui/Container"

export default function DisclaimerPage() {
    return (
        <div className="py-24 bg-white">
            <Container>
                <div className="prose prose-slate mx-auto lg:prose-lg text-justify">
                    <h1>Disclaimer</h1>
                    <p>The information provided by LexNova Legal (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on this website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>

                    <h2>Not Legal Advice</h2>
                    <p>The content published on this website does not constitute legal advice. You should not act upon any information contained herein without seeking professional legal counsel from an attorney licensed in your jurisdiction.</p>

                    <h2>No Attorney-Client Relationship</h2>
                    <p>Using this website or contacting us through the forms provided does not create an attorney-client relationship between you and LexNova Legal.</p>
                </div>
            </Container>
        </div>
    )
}
