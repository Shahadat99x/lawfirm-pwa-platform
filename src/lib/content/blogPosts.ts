import { BlogPost } from "@/types/content"
import { lawyers } from "./lawyers"

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Guide to the EU Blue Card in Lithuania (2025)",
        slug: "eu-blue-card-guide-lithuania",
        excerpt: "Everything you need to know about the requirements, salary thresholds, and application process for the EU Blue Card.",
        content: `
      <p>The EU Blue Card is a residence permit for highly skilled non-EU citizens. In Lithuania, it offers a streamlined path to residency and employment.</p>
      <h3>Eligibility Criteria</h3>
      <p>To qualify, you must have:</p>
      <ul>
        <li>A higher education degree (at least 3 years of study).</li>
        <li>A valid employment contract for at least 6 months.</li>
        <li>A salary of at least 1.5 times the average monthly gross salary in Lithuania.</li>
      </ul>
      <h3>Benefits</h3>
      <p>Blue Card holders enjoy easier family reunification rules and mobility within the EU after a certain period.</p>
    `,
        publishedAt: "2024-12-10",
        author: lawyers[0],
        tags: ["Immigration", "Relocation"],
        readingTime: "5 min read"
    },
    {
        id: "2",
        title: "Setting up an MB vs UAB: Which is right for you?",
        slug: "mb-vs-uab-business-setup",
        excerpt: "Comparing the Small Partnership (MB) and Private Limited Liability Company (UAB) structures for foreign entrepreneurs.",
        content: `
      <p>Choosing the right legal entity is crucial for your business success. Here’s a breakdown of the two most common forms in Lithuania.</p>
      <h3>Small Partnership (MB)</h3>
      <p>Ideal for small businesses and freelancers. No minimum capital requirement and flexible management structure.</p>
      <h3>Private Limited Company (UAB)</h3>
      <p>Better for larger ventures or those planning to raise investment. Requires a minimum share capital of €2,500.</p>
    `,
        publishedAt: "2024-11-25",
        author: lawyers[0],
        tags: ["Business", "Startups"],
        readingTime: "7 min read"
    },
    {
        id: "3",
        title: "Changes to Lithuanian Labor Law in 2025",
        slug: "lithuania-labor-law-changes-2025",
        excerpt: "New regulations affecting overtime pay, remote work, and termination notices.",
        content: `
      <p>The new year brings important updates to the Labor Code. Employers must ensure their contracts are compliant.</p>
      <h3>Remote Work</h3>
      <p>New rules clarify the compensation for utilities and equipment for remote employees.</p>
    `,
        publishedAt: "2024-11-15",
        author: lawyers[1],
        tags: ["Employment Law", "Compliance"],
        readingTime: "4 min read"
    },
    {
        id: "4",
        title: "Bringing Your Family to Lithuania: Requirements",
        slug: "family-reunification-lithuania",
        excerpt: "How to apply for residence permits for your spouse and children.",
        content: `
      <p>Family reunification is a priority for many expats. Understanding the income requirements and documentation is key.</p>
    `,
        publishedAt: "2024-10-30",
        author: lawyers[0],
        tags: ["Immigration", "Family"],
        readingTime: "6 min read"
    },
    {
        id: "5",
        title: "Crypto License in Lithuania: VASP Regulation",
        slug: "crypto-license-lithuania-vasp",
        excerpt: "Navigating the regulatory landscape for Virtual Asset Service Providers.",
        content: `
      <p>Lithuania is a hub for fintech and crypto. Here is how to obtain your VASP authorization.</p>
    `,
        publishedAt: "2024-10-05",
        author: lawyers[1],
        tags: ["Business", "Crypto"],
        readingTime: "8 min read"
    }
]
