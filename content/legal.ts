/**
 * Legal page copy.
 *
 * Finalized, client-approved text for Orenyx AI Engine™, a product of
 * Orenyx Labs, LLC. Supplied 2026-09-15. Do not paraphrase, renumber, or
 * summarise the drafted clauses. If the client sends a revised document,
 * replace the text wholesale rather than editing it clause by clause.
 */

export type LegalClause = {
  heading: string;
  /** Body paragraphs, in order. */
  body?: string[];
  /** Defined terms rendered as a list. */
  bullets?: { label: string; body: string }[];
  /** Related-document links, rendered as a list at the end of the clause. */
  links?: { label: string; href: string }[];
};

export type LegalOutline = {
  title: string;
  crumb: string;
  description: string;
  titleTag: string;
  path: string;
  /** Counsel-approved effective date. Omitted while the page is an outline. */
  effective?: string;
  /**
   * Drafted, counsel-approved clauses. Presence of this switches the page
   * from outline mode to full-text mode.
   */
  clauses?: LegalClause[];
  /** Section headings counsel will fill in. Outline mode only. */
  sections?: string[];
  /** Extra note from the packet, rendered under the outline. */
  note?: string;
};


export const terms: LegalOutline = {
  title: 'Terms of Service',
  crumb: 'Terms of Service',
  titleTag: 'Terms of Service — Orenyx AI Engine™',
  description: 'Terms of Service for Orenyx AI Engine™, a product of Orenyx Labs, LLC.',
  path: '/legal/terms',
  effective: 'September 15, 2026',
  clauses: [
      {
        heading: 'Acceptance of Terms',
        body: [
          'These Terms of Service (these "Terms") constitute a binding agreement between Orenyx Labs, LLC, a Wyoming limited liability company ("Orenyx," "Company," "we," "us," or "our"), and the entity or individual accessing or using the Orenyx AI Engine platform ("Customer," "you," or "your"). These Terms govern access to and use of the Orenyx AI Engine, including its dashboards, sandbox environment, application programming interface, webhooks, and related services (collectively, the "Service"). By creating an Account, executing an Order Form, or otherwise accessing or using the Service, you agree to be bound by these Terms, together with the Orenyx Privacy Policy, Payment Terms, Acceptable Use Policy, API Terms, Disclaimer, and, where applicable, Data Processing Addendum, each of which is incorporated herein by reference.',
        ],
      },
      {
        heading: 'Eligibility',
        body: [
          'The Service is restricted to users eighteen (18) years of age or older. By using the Service, you represent and warrant that you are at least eighteen (18) years of age, that you have the legal authority to enter into these Terms on behalf of yourself or the entity you represent, and that your use of the Service does not violate any applicable law.',
        ],
      },
      {
        heading: 'Description of the Service',
        body: [
          'The Orenyx AI Engine is a decision and routing platform that uses a combination of rules-based logic and artificial intelligence to route calls, tasks, tickets, and workflows, execute bot flows across voice, SMS, chat, and social channels, score and route payment events, and maintain conversation and workflow state across connected Orenyx products. The Service is available for direct programmatic access via Orenyx\'s REST API and webhooks, and serves as the shared backend for other Orenyx-branded products. Orenyx reserves the right to modify, suspend, or discontinue any feature of the Service, in whole or in part, at any time, with or without notice, provided that Orenyx will use commercially reasonable efforts to notify Customer of any material adverse change affecting a paid Plan.',
        ],
      },
      {
        heading: 'Call Recording',
        body: [
          'The Service may record and transcribe calls between the Customer and its End Customers as part of its automated call handling functions. The Customer is solely responsible for providing any notice and obtaining any consent required by applicable law, including any two-party or all-party consent recording laws applicable to the jurisdictions in which the Customer operates, before enabling or continuing to use call recording functions.',
        ],
      },
      {
        heading: 'Accounts and Registration',
        body: [
          'To access the Service, Customer must register for an Account and provide accurate, current, and complete information. Customer is responsible for maintaining the confidentiality of its Account credentials and API keys, and for all activities that occur under its Account, whether or not authorized by Customer. Customer must notify Orenyx promptly of any unauthorized use of its Account or any other known or suspected breach of security.',
        ],
      },
      {
        heading: 'Subscription Plans and Sandbox Environment',
        body: [
          'Orenyx offers Starter, Growth, and Enterprise subscription Plans, each with defined included usage, features, and overage rates as described in the applicable Order Form and the Payment Terms. Orenyx also provides a free, uncapped Sandbox Environment using test API keys, requiring no credit card and no time limit, for the purpose of development and testing. The Sandbox Environment is not intended for, and must not be used to process, live production data, and Orenyx makes no representation that data submitted to the Sandbox Environment will be preserved, secured to the same standard as production data, or treated as live Customer data. Orenyx does not offer a free trial of any paid Plan.',
        ],
      },
      {
        heading: 'API Access and Use',
        body: [
          'Access to the Service, including all routing, bot execution, and payment decisioning functionality, is provided principally through Orenyx\'s REST API and webhooks, as further described in the Orenyx API Terms, which are incorporated into these Terms by reference. Customer is solely responsible for its own integration with the API, including for any errors, overloads, or misuse arising from Customer\'s implementation.',
        ],
      },
      {
        heading: 'Multi-Tenant Infrastructure',
        body: [
          'Starter and Growth Plan Customers are served on shared, multi-tenant infrastructure with logical data isolation between tenants. Enterprise Plan Customers may be provisioned on dedicated infrastructure as set forth in the applicable Order Form. Orenyx does not guarantee that shared infrastructure will be free of service interruptions affecting multiple tenants concurrently, and Customer acknowledges the shared nature of the infrastructure underlying the Starter and Growth Plans.',
        ],
      },
      {
        heading: 'Customer Data and Content',
        body: [
          'As between Orenyx and Customer, Customer retains all right, title, and interest in and to the data, information, and content submitted, transmitted, or processed by Customer, its Authorized Users, or its End Users through the Service ("Customer Data"). Customer grants Orenyx a non-exclusive, worldwide, royalty-free license to host, process, transmit, and use Customer Data solely as necessary to provide, maintain, secure, and improve the Service, to meter usage, and to comply with applicable law. Orenyx may use aggregated or de-identified data derived from Customer Data for analytics, benchmarking, and Service improvement purposes, provided such data does not identify Customer or any individual.',
        ],
      },
      {
        heading: 'Acceptable Use',
        body: [
          'Customer\'s use of the Service, including its API access, is subject to the Orenyx Acceptable Use Policy, which is incorporated into these Terms by reference. Orenyx reserves the right to suspend or terminate access to the Service, without liability, for any use that violates the Acceptable Use Policy or these Terms.',
        ],
      },
      {
        heading: 'Intellectual Property',
        body: [
          'The Service, including all software, models, routing logic, documentation, and underlying technology, and all intellectual property rights therein, are and will remain the exclusive property of Orenyx and its licensors. These Terms do not grant Customer any right, title, or interest in the Service except for the limited right to access and use the Service in accordance with these Terms. No rights are granted by implication, estoppel, or otherwise.',
        ],
      },
      {
        heading: 'Fees and Payment',
        body: [
          'Customer\'s payment obligations, including Plan fees, usage-based overage charges, upgrade and downgrade timing, and billing methodology, are governed by the Orenyx Payment Terms, which are incorporated into these Terms by reference.',
        ],
      },
      {
        heading: 'Disclaimers',
        body: [
          'THE SERVICE, INCLUDING ALL ROUTING, BOT EXECUTION, AND PAYMENT-DECISIONING FUNCTIONALITY, IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, EXCEPT AS EXPRESSLY SET FORTH IN AN APPLICABLE ORDER FORM. Without limiting the foregoing, Orenyx provides payment event risk-scoring and routing infrastructure only, and does not guarantee the prevention of fraud, chargebacks, or unauthorized transactions; liability for the underlying transaction remains with Customer and its payment processor relationship. Additional disclaimers applicable to the Service are set forth in the Orenyx Disclaimer, which is incorporated into these Terms by reference.',
        ],
      },
      {
        heading: 'Limitation of Liability',
        body: [
          'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL ORENYX OR ITS OFFICERS, MEMBERS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE, REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF ORENYX HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ORENYX\'S AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE WILL NOT EXCEED THE TOTAL FEES PAID BY CUSTOMER TO ORENYX UNDER THE APPLICABLE ORDER FORM DURING THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.',
        ],
      },
      {
        heading: 'Indemnification',
        body: [
          'Customer will indemnify, defend, and hold harmless Orenyx and its officers, members, employees, and agents from and against any third-party claims, damages, losses, liabilities, and expenses, including reasonable attorneys\' fees, arising out of or relating to: (a) Customer Data; (b) Customer\'s or its Authorized Users\' or End Users\' use of the Service in violation of these Terms or applicable law; (c) Customer\'s integration with the API; or (d) any dispute between Customer and an End User, Authorized User, or third party arising from Customer\'s use of the Service.',
        ],
      },
      {
        heading: 'Service Availability',
        body: [
          'Orenyx will use commercially reasonable efforts to make the Service available in accordance with the uptime commitments, if any, specified for Customer\'s Plan in the applicable Order Form. Because the Service serves as shared infrastructure for multiple Orenyx-branded products, a disruption to the Service may affect other connected products; Orenyx does not guarantee uninterrupted or error-free operation of the Service.',
        ],
      },
      {
        heading: 'Confidentiality',
        body: [
          'Each party agrees to protect the other party\'s confidential information with the same degree of care it uses to protect its own confidential information of similar nature, and in no event with less than reasonable care, and to use such confidential information solely to perform its obligations and exercise its rights under these Terms.',
        ],
      },
      {
        heading: 'Term and Termination',
        body: [
          'These Terms remain in effect for so long as Customer maintains an Account or otherwise accesses the Service. Orenyx may suspend or terminate Customer\'s access to the Service, in whole or in part, immediately and without liability, if Customer breaches these Terms, fails to pay applicable fees when due, or engages in conduct that Orenyx determines, in its reasonable discretion, poses a security, legal, or reputational risk to Orenyx or other Customers. Upon termination, Customer\'s right to access the Service will immediately cease, and Sections 8, 10, 12, 13, 14, 16, and 18 through 20 will survive termination.',
        ],
      },
      {
        heading: 'Governing Law and Dispute Resolution',
        body: [
          'These Terms are governed by the laws of the State of Wyoming, without regard to its conflict of laws principles. Any dispute arising out of or relating to these Terms or the Service that cannot be resolved informally will be resolved by binding arbitration administered in Wyoming in accordance with the rules of a mutually agreed arbitral body then in effect, and judgment on the award rendered by the arbitrator may be entered in any court having jurisdiction. Each party waives any right to a jury trial and to participate in a class, collective, or representative action. Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in a court of competent jurisdiction located in Wyoming to prevent actual or threatened infringement, misappropriation, or violation of a party\'s intellectual property or confidentiality rights.',
        ],
      },
      {
        heading: 'Modifications to these Terms',
        body: [
          'Orenyx may amend these Terms from time to time by posting the revised Terms and updating the "Last Updated" date above. Material changes will be communicated to Customer through the Service or by email where reasonably practicable. Continued use of the Service following the effective date of any revised Terms constitutes acceptance of those Terms.',
        ],
      },
      {
        heading: 'General Provisions',
        body: [
          'These Terms, together with the documents incorporated by reference, constitute the entire agreement between the parties regarding the Service and supersede all prior agreements and understandings, written or oral, regarding the subject matter herein. Customer may not assign these Terms, in whole or in part, without Orenyx\'s prior written consent; Orenyx may assign these Terms without restriction, including in connection with a merger, acquisition, or sale of assets. If any provision of these Terms is held invalid or unenforceable, the remaining provisions will remain in full force and effect. Neither party will be liable for any failure or delay in performance to the extent caused by circumstances beyond its reasonable control. No waiver of any provision of these Terms will be effective unless in writing and signed by the waiving party.',
        ],
      },
      {
        heading: 'Contact Information',
        body: [
          'Questions regarding these Terms may be directed to legal@orenyxengine.com or 30 N Gould St, Sheridan, WY 82801, Wyoming.',
        ],
      },
      {
        heading: 'Related Policies',
        body: [
          'These Terms incorporate by reference the following documents, each governing a specific part of the Service:',
        ],
        links: [
          { label: 'Acceptable Use Policy', href: '/legal/aup' },
          { label: 'Payment Terms', href: '/legal/payment-terms' },
          { label: 'API Terms', href: '/legal/api-terms' },
          { label: 'Disclaimer', href: '/legal/disclaimer' },
          { label: 'Cookies Policy', href: '/legal/cookies' },
        ],
      },
  ],
};

export const privacy: LegalOutline = {
  title: 'Privacy Policy',
  crumb: 'Privacy Policy',
  titleTag: 'Privacy Policy — Orenyx AI Engine™',
  description: 'Privacy Policy for Orenyx AI Engine™, a product of Orenyx Labs, LLC.',
  path: '/legal/privacy',
  effective: 'September 15, 2026',
  clauses: [
      {
        heading: 'Introduction and Scope',
        body: [
          'This Privacy Policy describes how Orenyx Labs, LLC, a Wyoming limited liability company ("Orenyx," "Company," "we," "us," or "our"), collects, uses, discloses, and safeguards information in connection with the Orenyx AI Engine platform, including all associated dashboards, application programming interfaces, webhooks, sandbox environments, and related services (collectively, the "Service"). This Privacy Policy applies to Customers, Authorized Users, and, where applicable, End Users whose information is processed through the Service. This Privacy Policy does not apply to any third-party website, application, or service that is not operated by Orenyx, even if accessed through or linked from the Service.',
          'By accessing or using the Service, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with this Privacy Policy, you must not access or use the Service.',
        ],
      },
      {
        heading: 'Eligibility and Age Restriction',
        body: [
          'The Service is intended solely for use by individuals and entities capable of forming a legally binding contract and is restricted to users who are eighteen (18) years of age or older. Orenyx does not knowingly collect, solicit, or maintain personal information from individuals under eighteen (18) years of age. If Orenyx becomes aware that it has inadvertently collected personal information from an individual under eighteen (18) years of age, Orenyx will take commercially reasonable steps to delete such information promptly. Any person who registers for an Account, or who is designated as an Authorized User, represents and warrants that they are eighteen (18) years of age or older.',
        ],
      },
      {
        heading: 'Information We Collect',
        body: [
          'We collect the following categories of information in connection with the Service: (a) Account and Subscription Data, including company name, contact information, billing address, Plan tier, billing history, and API key or credential metadata; (b) Usage and Telemetry Data, including dispatch events, bot executions, payment decisioning calls, and API request logs, which are used, among other purposes, to meter and bill usage; (c) Decision and Routing Data, including records of routing decisions, payment-decisioning outcomes, and risk signals evaluated in connection with payment events processed through the Service; (d) Workflow and Conversation State Data, including open tickets, in-flight payment records, and active bot conversation state maintained to preserve continuity across touchpoints and connected Orenyx products; (e) Payment Data, which is processed by our third-party payment processor, Stripe, Inc. ("Stripe"); Orenyx does not store raw payment card numbers; and (f) Multi-Tenant Account Data, reflecting the logical or physical separation of Customer data on shared infrastructure (Starter and Growth Plans) or dedicated infrastructure (Enterprise Plan).',
          'We may also collect technical information automatically, such as IP addresses, device and browser identifiers, and log data generated through Customer\'s or Authorized Users\' interaction with the Service\'s dashboards and administrative interfaces.',
        ],
      },
      {
        heading: 'How We Use Information',
        body: [
          'We use the information described above to: provide, operate, maintain, and improve the Service; process and route calls, tasks, tickets, workflows, and payment events on Customer\'s behalf; meter usage and generate invoices; evaluate risk signals in connection with payment-decisioning requests; maintain workflow and conversation state across connected Orenyx products; enforce tenant isolation and platform security; provide customer support; detect, investigate, and prevent fraud, abuse, and security incidents; comply with applicable law and enforceable governmental requests; and communicate with Customers regarding their Account, billing, and material changes to the Service.',
        ],
      },
      {
        heading: 'Call Recording and Consent',
        body: [
          'The Service answers, processes, and may record and transcribe calls between a Customer\'s business and its End Customers as part of its automated call handling functions. Each Customer is solely responsible for providing any notice and obtaining any consent required under applicable law, including two-party or all-party consent recording laws in the jurisdictions in which the Customer operates, before calls are recorded or processed through the Service. Orenyx provides the Customer with the capability to enable appropriate call disclosures but does not independently verify that a Customer has provided such notice or obtained such consent.',
        ],
      },
      {
        heading: 'Disclosure of Information',
        body: [
          'We may disclose information to: (a) Stripe, for the purpose of processing subscription and usage-based billing; (b) infrastructure, hosting, and cloud service providers that support the multi-tenant and dedicated environments on which the Service operates; (c) other Orenyx-operated products that share the Orenyx AI Engine backend, solely to the extent necessary to provide cross-product routing and workflow continuity that Customer has enabled; (d) professional advisors, including legal, accounting, and audit service providers; (e) a successor entity in connection with a merger, acquisition, financing, or sale of assets; and (f) governmental or regulatory authorities where required by applicable law, subpoena, or other legal process, or where necessary to protect the rights, property, or safety of Orenyx, its Customers, or third parties. We do not sell personal information, as that term is defined under applicable state privacy law, in exchange for monetary consideration.',
        ],
      },
      {
        heading: 'Multi-Tenant Data Isolation',
        body: [
          'The Service enforces logical data isolation between Customer tenants on shared infrastructure and provides physically or logically dedicated infrastructure for Enterprise Plan Customers. Notwithstanding these safeguards, no method of data isolation, transmission, or storage is completely secure, and Orenyx cannot and does not guarantee the absolute security of any information processed through the Service.',
        ],
      },
      {
        heading: 'Data Retention',
        body: [
          'Usage, telemetry, decision, and routing logs are retained according to Customer\'s subscribed logging tier: basic logging is retained for seven (7) days, full logging is retained for thirty (30) days, and premium or custom retention periods are retained as separately agreed with Enterprise Customers. Account and billing records are retained for so long as reasonably necessary to comply with our legal, accounting, and tax obligations, to resolve disputes, and to enforce our agreements, after which such records are deleted or de-identified in accordance with our internal data retention practices.',
        ],
      },
      {
        heading: 'Your Rights and Choices',
        body: [
          'Depending on the jurisdiction in which you reside, you may have certain rights with respect to personal information we hold about you, which may include the right to request access to, correction of, or deletion of your personal information, and the right to opt out of certain processing activities. Where Orenyx acts as a processor or service provider on behalf of a Customer with respect to End User data, such requests should be directed to the applicable Customer, who acts as the controller of that data; Orenyx will provide reasonable assistance to Customers in responding to such requests as described in the applicable Data Processing Addendum. Where Orenyx acts as a controller of Customer Account data, requests may be directed to us using the contact information in Section 13.',
        ],
      },
      {
        heading: 'U.S. State Privacy Disclosures',
        body: [
          'To the extent applicable state privacy laws (including but not limited to laws of California, Colorado, Connecticut, Utah, and Virginia) apply to our processing of personal information, Orenyx processes such information as described in this Privacy Policy and, where Orenyx is the processor or service provider, in accordance with its contractual obligations to the applicable Customer. Orenyx does not use, retain, or disclose personal information it processes on behalf of Customers for any purpose other than providing the Service, as required or permitted by applicable law.',
        ],
      },
      {
        heading: 'International Data Transfers',
        body: [
          'The Service is operated from the United States, and information collected through the Service may be transferred to, stored, and processed in the United States or other jurisdictions in which Orenyx or its service providers maintain infrastructure. By using the Service, you consent to such transfer, storage, and processing.',
        ],
      },
      {
        heading: 'Data Security',
        body: [
          'Orenyx maintains administrative, technical, and organizational safeguards designed to protect the confidentiality, integrity, and availability of information processed through the Service, consistent with the practices described in the Orenyx Security Statement. No security program can guarantee absolute security, and Orenyx disclaims liability for unauthorized access resulting from causes outside its reasonable control.',
        ],
      },
      {
        heading: 'Changes to this Privacy Policy',
        body: [
          'Orenyx may update this Privacy Policy from time to time. Material changes will be indicated by revising the "Last Updated" date above, and, where required by applicable law, additional notice will be provided. Continued use of the Service following the posting of an updated Privacy Policy constitutes acceptance of the revised terms.',
        ],
      },
      {
        heading: 'Governing Law and Contact',
        body: [
          'This Privacy Policy is governed by the laws of the State of Wyoming, without regard to its conflict of laws principles, except to the extent such laws are preempted by or inconsistent with applicable federal law. If you have questions regarding this Privacy Policy or Orenyx\'s data practices, you may contact us at legal@orenyxengine.com or at 30 N Gould St, Sheridan, WY 82801, Wyoming.',
        ],
      },
  ],
};

export const refund: LegalOutline = {
  title: 'Refund & Cancellation Policy',
  crumb: 'Refund & Cancellation Policy',
  titleTag: 'Refund & Cancellation Policy — Orenyx AI Engine™',
  description: 'Refund and cancellation terms for Orenyx AI Engine™, a product of Orenyx Labs, LLC.',
  path: '/legal/refund',
  effective: 'September 15, 2026',
  clauses: [
      {
        heading: 'Scope',
        body: [
          'This Refund Policy applies to all subscription fees, usage-based overage charges, and any other amounts paid to Orenyx Labs, LLC ("Orenyx," "we," "us," or "our") in connection with the Orenyx AI Engine platform (the "Service"). This Refund Policy is incorporated into, and should be read together with, the Orenyx Terms of Service and Payment Terms.',
        ],
      },
      {
        heading: 'General No-Refund Policy',
        body: [
          'Except as expressly set forth in this Refund Policy or as required by applicable law, all fees paid for the Service, including Starter, Growth, and Enterprise Plan subscription fees and all usage-based overage charges, are non-refundable and non-creditable, regardless of whether Customer accesses or uses the Service during the applicable billing period. Fees are earned upon invoicing and are not subject to proration for partial use, except as expressly described in the Payment Terms with respect to Plan downgrades.',
        ],
      },
      {
        heading: 'Sandbox Environment',
        body: [
          'The Sandbox Environment is provided free of charge, does not require a credit card, and is not subject to this Refund Policy because no fees are charged for its use.',
        ],
      },
      {
        heading: 'Cancellation',
        body: [
          'Customer may cancel its subscription at any time through its Account settings or by written notice to Orenyx. Upon cancellation, Customer will retain access to the Service through the end of the then-current paid billing period, after which access will terminate. No refund or credit will be issued for the unused portion of any billing period following cancellation.',
        ],
      },
      {
        heading: 'Plan Changes',
        body: [
          'Upgrades to a higher Plan take effect immediately, with the new fee applied to Customer\'s next invoice; no refund is issued for the then-current billing period upon an upgrade. Downgrades to a lower Plan take effect at the start of the next billing cycle, and no partial-period refund is issued in connection with a downgrade.',
        ],
      },
      {
        heading: 'Overage Charges',
        body: [
          'Usage-based overage charges, billed in accordance with the Payment Terms, are non-refundable once incurred, except where Orenyx determines, in its reasonable discretion, that an overage charge resulted from a documented and verifiable metering error attributable to Orenyx, in which case Orenyx will issue a corrective credit as described in Section 7.',
        ],
      },
      {
        heading: 'Billing Disputes and Discretionary Adjustments',
        body: [
          'If Customer believes it has been billed in error, Customer must submit a written dispute to Orenyx within thirty (30) days of the disputed invoice date, together with reasonable supporting documentation. Orenyx will investigate timely disputes in good faith. Any refund, credit, or adjustment issued under this Section is granted at Orenyx\'s sole discretion and does not constitute a waiver of this Refund Policy with respect to any other invoice or Customer.',
        ],
      },
      {
        heading: 'Chargebacks',
        body: [
          'Customer agrees not to initiate a chargeback or payment dispute with its card issuer or bank for fees properly charged in accordance with these terms. Orenyx reserves the right to suspend or terminate Customer\'s Account, and to pursue collection of amounts owed, in the event of an unauthorized or bad-faith chargeback.',
        ],
      },
      {
        heading: 'Legal Requirements',
        body: [
          'Nothing in this Refund Policy limits any right Customer may have under applicable law that cannot be waived by agreement. Where applicable law requires a refund notwithstanding the foregoing, Orenyx will issue a refund to the extent, and only to the extent, required by such law.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'Refund inquiries should be directed to legal@orenyxengine.com.',
        ],
      },
  ],
};

export const dpa: LegalOutline = {
  title: 'Data Processing Agreement',
  crumb: 'Data Processing Agreement',
  titleTag: 'Data Processing Agreement — Orenyx AI Engine™',
  description: 'Data Processing Agreement for Orenyx AI Engine™, a product of Orenyx Labs, LLC.',
  path: '/legal/dpa',
  effective: 'September 15, 2026',
  clauses: [
      {
        heading: 'Introduction',
        body: [
          'This Data Processing Addendum ("DPA") supplements the Orenyx Terms of Service between Orenyx Labs, LLC ("Orenyx," "Processor," "we," "us," or "our") and Customer ("Controller," "Customer," or "you") governing Customer\'s use of the Orenyx AI Engine platform (the "Service"). This DPA applies to the extent Orenyx Processes Personal Data on Customer\'s behalf in the course of providing the Service. Capitalized terms not defined in this DPA have the meanings given in the Terms of Service.',
        ],
      },
      {
        heading: 'Definitions',
        body: [
          '"Personal Data" means any information relating to an identified or identifiable natural person that is submitted to, or processed by, the Service on Customer\'s behalf, including information relating to Customer\'s Authorized Users and End Users. "Process" or "Processing" means any operation performed on Personal Data, including collection, recording, storage, use, disclosure, and deletion. "Data Protection Laws" means all applicable laws and regulations governing the Processing of Personal Data, including applicable U.S. state privacy laws. "Sub-processor" means any third party engaged by Orenyx to Process Personal Data in connection with the Service.',
        ],
      },
      {
        heading: 'Roles of the Parties',
        body: [
          'As between the parties, Customer is the Controller of Personal Data relating to its Authorized Users and End Users, and determines the purposes and means of Processing such Personal Data. Orenyx is a Processor acting on Customer\'s behalf and will Process Personal Data solely for the purpose of providing the Service, in accordance with Customer\'s documented instructions as set forth in the Terms of Service, the applicable Order Form, and this DPA, except where otherwise required by applicable law.',
        ],
      },
      {
        heading: 'Scope of Processing',
        body: [
          'Orenyx Processes Personal Data submitted through Customer\'s use of the Service, including Personal Data reflected in dispatch events, bot executions, payment-decisioning calls, routing and workflow records, and conversation state maintained across connected Orenyx products, for the duration of Customer\'s subscription and as further described in the Orenyx Privacy Policy.',
        ],
      },
      {
        heading: 'Confidentiality',
        body: [
          'Orenyx will ensure that personnel authorized to Process Personal Data are subject to a binding obligation of confidentiality with respect to such Personal Data.',
        ],
      },
      {
        heading: 'Security Measures',
        body: [
          'Orenyx will implement and maintain appropriate technical and organizational measures designed to protect Personal Data, consistent with the practices described in the Orenyx Security Statement, including logical tenant isolation for Starter and Growth Plan Customers and dedicated infrastructure for Enterprise Plan Customers where applicable.',
        ],
      },
      {
        heading: 'Sub-processors',
        body: [
          'Customer authorizes Orenyx to engage Sub-processors to Process Personal Data in connection with the Service, including Stripe, Inc. for payment processing, and Orenyx\'s hosting and infrastructure providers. Orenyx will impose data protection obligations on its Sub-processors that are substantially consistent with those set forth in this DPA and will remain responsible for its Sub-processors\' performance of their obligations. Orenyx will provide notice of the addition of a new material Sub-processor, and Customer\'s continued use of the Service following such notice constitutes acceptance of the new Sub-processor.',
        ],
      },
      {
        heading: 'Assistance with Data Subject Requests',
        body: [
          'Taking into account the nature of the Processing, Orenyx will provide reasonable assistance to Customer, at Customer\'s expense where the request requires material engineering or administrative effort, to enable Customer to respond to requests from individuals seeking to exercise their rights under applicable Data Protection Laws with respect to Personal Data Processed through the Service.',
        ],
      },
      {
        heading: 'Personal Data Breach Notification',
        body: [
          'Orenyx will notify Customer without undue delay after becoming aware of a confirmed breach of security leading to the accidental or unlawful destruction, loss, alteration, or unauthorized disclosure of, or access to, Personal Data Processed through the Service. Such notification will include such information as Orenyx has available at the time to enable Customer to meet any of its own notification obligations under applicable Data Protection Laws.',
        ],
      },
      {
        heading: 'Retention and Deletion',
        body: [
          'Personal Data reflected in usage, telemetry, decision, and routing logs is retained in accordance with Customer\'s subscribed logging tier, as described in the Orenyx Privacy Policy, being seven (7) days for basic logging, thirty (30) days for full logging, and a custom period for premium or Enterprise retention as separately agreed. Following termination of Customer\'s Account, Orenyx will delete or, at Orenyx\'s election, anonymize Personal Data in accordance with its standard data retention practices, except to the extent retention is required by applicable law or for legitimate business archival, audit, tax, or dispute-resolution purposes.',
        ],
      },
      {
        heading: 'Audit Rights',
        body: [
          'Upon Customer\'s reasonable written request, and no more than once per twelve-month period, Orenyx will make available information reasonably necessary to demonstrate compliance with this DPA, which may take the form of a summary of Orenyx\'s security practices, a relevant third-party audit report if available, or written responses to a reasonable security questionnaire, at Orenyx\'s discretion, in lieu of an on-site audit.',
        ],
      },
      {
        heading: 'International Transfers',
        body: [
          'Personal Data Processed under this DPA is Processed in the United States. To the extent Personal Data originating outside the United States is transferred to Orenyx for Processing, Customer is responsible for ensuring that such transfer is lawful under applicable Data Protection Laws.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'Each party\'s liability arising out of or relating to this DPA is subject to the limitations of liability set forth in the Terms of Service.',
        ],
      },
      {
        heading: 'Term and Governing Law',
        body: [
          'This DPA remains in effect for as long as Orenyx Processes Personal Data on Customer\'s behalf under the Terms of Service, and is governed by the laws of the State of Wyoming, consistent with Section 18 of the Terms of Service.',
        ],
      },
  ],
};

export const aup: LegalOutline = {
  title: 'Acceptable Use Policy',
  crumb: 'Acceptable Use Policy',
  titleTag: 'Acceptable Use Policy — Orenyx AI Engine™',
  description: 'Acceptable Use Policy for Orenyx AI Engine™, a product of Orenyx Labs, LLC.',
  path: '/legal/aup',
  effective: 'September 15, 2026',
  clauses: [
      {
        heading: 'Purpose',
        body: [
          'This Acceptable Use Policy ("AUP") governs Customer\'s and its Authorized Users\' use of the Orenyx AI Engine platform, including its dashboards, Sandbox Environment, application programming interface, and webhooks (collectively, the "Service"), operated by Orenyx Labs, LLC ("Orenyx," "we," "us," or "our"). This AUP is incorporated into the Orenyx Terms of Service by reference. Violation of this AUP constitutes a material breach of the Terms of Service.',
        ],
      },
      {
        heading: 'Eligibility',
        body: [
          'The Service may be used only by individuals eighteen (18) years of age or older, acting on their own behalf or on behalf of an eligible business entity. Customer is responsible for ensuring that all Authorized Users satisfy this requirement.',
        ],
      },
      {
        heading: 'Prohibited Conduct',
        body: [
          'Customer will not, and will not permit any Authorized User or third party to, use the Service to: violate any applicable law or regulation, including laws governing telemarketing, automated calling or texting, and unsolicited commercial communications; recording or processing calls without required notice or consent; misrepresenting the identity of the caller or the Customer\'s business to End Customers; transmit unlawful, fraudulent, deceptive, defamatory, or harassing content through voice, SMS, chat, or social bot flows; engage in or facilitate payment fraud, money laundering, or the processing of transactions the Customer knows or reasonably should know to be unauthorized or fraudulent; attempt to circumvent, disable, or interfere with tenant isolation, rate limits, authentication mechanisms, or other security features of the Service; access or attempt to access another Customer\'s tenant, data, or Account without authorization; reverse engineer, decompile, or attempt to extract the underlying models, routing logic, or source code of the Service, except to the extent such restriction is prohibited by applicable law; resell, sublicense, or provide third-party access to the Service otherwise than through Customer\'s own integration for its own internal business purposes or for the benefit of its own End Users, without Orenyx\'s prior written consent; or use the Service to build a competing product or service.',
        ],
      },
      {
        heading: 'API and Credential Security',
        body: [
          'Customer will maintain the confidentiality of its API keys and other credentials and will not share production API keys with any unauthorized party. Customer will not use Sandbox Environment credentials to process live production data or transactions, and will not represent Sandbox Environment activity as live Customer or End User activity.',
        ],
      },
      {
        heading: 'Rate Limits and System Integrity',
        body: [
          'Customer will not submit API requests, webhooks, or bot flow executions at a volume or pattern designed to circumvent applicable rate limits, degrade Service performance for other Customers on shared infrastructure, or otherwise place unreasonable load on the Service, other than through Customer\'s good-faith production usage consistent with its subscribed Plan.',
        ],
      },
      {
        heading: 'Communications Compliance',
        body: [
          'Customer is solely responsible for ensuring that any voice, SMS, chat, or social bot flows executed through the Service, and any outbound communications generated by such flows, comply with applicable law, including consent and disclosure requirements applicable to automated and recorded communications. Orenyx provides the underlying execution infrastructure and does not review or approve the content or legality of Customer\'s bot flows in advance.',
        ],
      },
      {
        heading: 'Security Testing',
        body: [
          'Customer will not conduct penetration testing, vulnerability scanning, or other security testing against the Service without Orenyx\'s prior written authorization.',
        ],
      },
      {
        heading: 'Reporting Violations',
        body: [
          'Suspected violations of this AUP may be reported to legal@orenyxengine.com.',
        ],
      },
      {
        heading: 'Enforcement',
        body: [
          'Orenyx reserves the right to investigate suspected violations of this AUP and to suspend or terminate access to the Service, in whole or in part, immediately and without liability to Customer, for any conduct that Orenyx reasonably believes violates this AUP, regardless of whether such conduct results in actual harm.',
        ],
      },
      {
        heading: 'Changes to this AUP',
        body: [
          'Orenyx may update this AUP from time to time by posting a revised version and updating the "Last Updated" date above. Continued use of the Service following such update constitutes acceptance of the revised AUP.',
        ],
      },
  ],
};

export const paymentTerms: LegalOutline = {
  title: 'Payment Terms',
  crumb: 'Payment Terms',
  titleTag: 'Payment Terms — Orenyx AI Engine™',
  description: 'Payment Terms for Orenyx AI Engine™, a product of Orenyx Labs, LLC.',
  path: '/legal/payment-terms',
  effective: 'September 15, 2026',
  clauses: [
      {
        heading: 'Scope',
        body: [
          'These Payment Terms govern all fees, billing, and payment obligations applicable to the Orenyx AI Engine platform (the "Service"), operated by Orenyx Labs, LLC ("Orenyx," "we," "us," or "our"), and are incorporated into the Orenyx Terms of Service by reference.',
        ],
      },
      {
        heading: 'Subscription Plans and Fees',
        body: [
          'Orenyx offers the following subscription Plans: the Starter Plan, priced at $299.00 per month, which includes 50,000 API calls, with overage billed at $3.00 per 1,000 events beyond the included allowance; the Growth Plan, priced at $1,499.00 per month, which includes 500,000 API calls, with overage billed at $0.50 per 1,000 events beyond the included allowance; and the Enterprise Plan, which is priced on custom, negotiated terms reflecting Customer\'s specific usage limits and infrastructure requirements, as set forth in the applicable Order Form. Plan fees are billed in advance on a recurring monthly basis, unless otherwise specified in an Order Form.',
        ],
      },
      {
        heading: 'Sandbox Environment',
        body: [
          'Orenyx provides a free, uncapped Sandbox Environment using test API keys, which requires no credit card and is subject to no time limit. No fees apply to use of the Sandbox Environment. Orenyx does not offer a free trial of any paid Plan; Customers seeking to evaluate the Service prior to subscribing should use the Sandbox Environment.',
        ],
      },
      {
        heading: 'Usage Metering and Overage Billing',
        body: [
          'Orenyx meters Customer\'s usage of the Service, including dispatch events, bot executions, and payment-decisioning calls, against the included allowance for Customer\'s subscribed Plan. Usage in excess of the included allowance in a given billing period is billed as an overage charge at the rate applicable to Customer\'s Plan, as set forth in Section 2, and reflected on Customer\'s next invoice. Orenyx\'s metering records are the authoritative basis for billing, subject to Customer\'s dispute rights under Section 8.',
        ],
      },
      {
        heading: 'Upgrades and Downgrades',
        body: [
          'A Plan upgrade takes effect immediately upon Customer\'s request, and the new Plan\'s fee will be applied to Customer\'s next invoice on a prorated or full basis as determined by Orenyx\'s then-current billing practices. A Plan downgrade takes effect at the start of Customer\'s next billing cycle; Customer will retain the benefits of its higher Plan, including its included usage allowance, for the remainder of the then-current billing period.',
        ],
      },
      {
        heading: 'Payment Method and Authorization',
        body: [
          'All payments are processed through Stripe, Inc. ("Stripe"). By providing a payment method, Customer authorizes Orenyx, through Stripe, to charge such payment method for all Plan fees, overage charges, and other amounts owed under these Payment Terms on a recurring basis, without further authorization from Customer, until Customer cancels its subscription in accordance with the Terms of Service. Orenyx does not store raw payment card numbers; such information is collected, stored, and processed by Stripe in accordance with Stripe\'s own terms and privacy practices.',
        ],
      },
      {
        heading: 'Taxes',
        body: [
          'All fees are exclusive of applicable sales, use, value-added, or similar taxes. Customer is responsible for all such taxes associated with its purchase of the Service, other than taxes based on Orenyx\'s net income.',
        ],
      },
      {
        heading: 'Billing Disputes',
        body: [
          'Customer must notify Orenyx in writing of any dispute regarding usage counts or billed amounts within thirty (30) days of the applicable invoice date, together with reasonable supporting detail. Failure to timely dispute an invoice constitutes a waiver of Customer\'s right to dispute that invoice. Orenyx will investigate timely disputes in good faith and issue any corrective adjustment determined to be warranted.',
        ],
      },
      {
        heading: 'Late Payment and Suspension',
        body: [
          'If a payment fails or is not received when due, Orenyx may suspend Customer\'s access to the Service, including production API access, until payment is received. Orenyx reserves the right to charge interest on overdue amounts at the lesser of one and one-half percent (1.5%) per month or the maximum rate permitted by applicable law, and to recover reasonable costs of collection, including attorneys\' fees.',
        ],
      },
      {
        heading: 'Changes to Pricing',
        body: [
          'Orenyx may modify Plan fees or overage rates prospectively upon at least thirty (30) days\' notice to Customer, except that fees fixed under an Enterprise Order Form for its stated term will not be modified during that term absent Customer\'s written agreement.',
        ],
      },
      {
        heading: 'No Refunds',
        body: [
          'All fees are non-refundable except as expressly set forth in the Orenyx Refund Policy, which is incorporated into these Payment Terms by reference.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'Billing inquiries should be directed to legal@orenyxengine.com.',
        ],
      },
  ],
};

export const apiTerms: LegalOutline = {
  title: 'API Terms',
  crumb: 'API Terms',
  titleTag: 'API Terms — Orenyx AI Engine™',
  description: 'API Terms for Orenyx AI Engine™, a product of Orenyx Labs, LLC.',
  path: '/legal/api-terms',
  effective: 'September 15, 2026',
  clauses: [
      {
        heading: 'Scope',
        body: [
          'These API Terms govern access to and use of the application programming interface, webhooks, and related developer tools (collectively, the "API") made available by Orenyx Labs, LLC ("Orenyx," "we," "us," or "our") as part of the Orenyx AI Engine platform (the "Service"). Because every capability of the Service, including routing, bot execution, and payment-decisioning, is exposed as a REST endpoint or webhook, these API Terms apply broadly to Customer\'s programmatic use of the Service and are incorporated into the Orenyx Terms of Service by reference.',
        ],
      },
      {
        heading: 'API Access and Credentials',
        body: [
          'Access to the API requires API keys issued to Customer\'s Account, which may consist of Sandbox Environment test keys or production keys tied to a paid Plan. Customer is solely responsible for the security and confidentiality of its API keys, for restricting access to such keys to Authorized Users with a legitimate need, and for all activity conducted using its API keys, whether or not authorized by Customer. Customer must notify Orenyx promptly upon suspecting that an API key has been compromised, and Orenyx may revoke and reissue API keys at Customer\'s request or at Orenyx\'s discretion where warranted by a security concern.',
        ],
      },
      {
        heading: 'Sandbox versus Production Access',
        body: [
          'Sandbox Environment API keys are provided free of charge, are uncapped, and are intended solely for development and testing. Sandbox Environment keys must not be used to process live production data, live payment events, or live End User communications. Production API keys are tied to Customer\'s subscribed Plan and are subject to the included usage allowance and overage rates described in the Payment Terms.',
        ],
      },
      {
        heading: 'Rate Limits and Fair Use',
        body: [
          'Orenyx may impose rate limits, throttling, or other technical measures on API usage to protect the stability, security, and performance of the Service for all Customers on shared infrastructure. Customer will design its integration to operate within applicable rate limits and to implement reasonable retry and backoff logic. Orenyx is not liable for any delay, failure, or data loss resulting from Customer\'s integration exceeding applicable rate limits.',
        ],
      },
      {
        heading: 'Acceptable Use of the API',
        body: [
          'Customer\'s use of the API is subject to the Orenyx Acceptable Use Policy. Customer will not use the API to circumvent tenant isolation, access another Customer\'s data, extract or reverse engineer the underlying routing logic or models, or resell API access to a third party without Orenyx\'s prior written consent.',
        ],
      },
      {
        heading: 'Customer Integration Responsibility',
        body: [
          'Customer is solely responsible for the design, implementation, security, and performance of its own integration with the API. Orenyx is not responsible or liable for any error, data loss, service disruption, overage charge, or third-party claim arising from a defect, misconfiguration, or misuse of Customer\'s own integration, including any integration that overloads or improperly invokes the API.',
        ],
      },
      {
        heading: 'Webhooks',
        body: [
          'Where Customer configures webhook endpoints to receive event notifications from the Service, Customer is responsible for securing such endpoints, validating the authenticity of incoming webhook payloads, and maintaining the availability of such endpoints. Orenyx is not responsible for data loss resulting from a webhook endpoint that is unavailable, misconfigured, or insecure.',
        ],
      },
      {
        heading: 'Data and Logging',
        body: [
          'Every routing and payment-decisioning decision made through the API is logged and queryable by Customer, subject to the retention periods applicable to Customer\'s subscribed logging tier as described in the Privacy Policy. Customer\'s use of decision and routing data obtained through the API is subject to the Terms of Service and, where applicable, the Data Processing Addendum.',
        ],
      },
      {
        heading: 'Availability and Changes to the API',
        body: [
          'Orenyx will use commercially reasonable efforts to provide advance notice of material changes to the API, including breaking changes or the deprecation of an API version, except where immediate changes are required for security or legal reasons. Continued use of the API following a notified change constitutes acceptance of that change. Orenyx does not guarantee that any particular API version will remain available indefinitely.',
        ],
      },
      {
        heading: 'Service Level',
        body: [
          'Availability commitments applicable to the API, if any, are determined by Customer\'s subscribed Plan and are set forth in the applicable Order Form, ranging from best-effort availability for Starter and Growth Plans to enhanced uptime commitments for Enterprise Plans.',
        ],
      },
      {
        heading: 'Intellectual Property',
        body: [
          'Orenyx retains all right, title, and interest in and to the API, including its documentation, software development kits, and underlying technology. Customer receives no rights in the API other than the limited right to access and use it in accordance with these API Terms.',
        ],
      },
      {
        heading: 'Disclaimers and Limitation of Liability',
        body: [
          'THE API IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, AND ORENYX\'S LIABILITY ARISING OUT OF OR RELATING TO THE API IS SUBJECT TO THE DISCLAIMERS AND LIMITATIONS OF LIABILITY SET FORTH IN THE ORENYX DISCLAIMER AND TERMS OF SERVICE.',
        ],
      },
      {
        heading: 'Termination of API Access',
        body: [
          'Orenyx may suspend or terminate Customer\'s API access immediately, without liability, for any violation of these API Terms, the Acceptable Use Policy, or the Terms of Service, or where necessary to protect the security or integrity of the Service.',
        ],
      },
      {
        heading: 'Governing Law',
        body: [
          'These API Terms are governed by the laws of the State of Wyoming, consistent with Section 18 of the Terms of Service.',
        ],
      },
  ],
};

export const disclaimer: LegalOutline = {
  title: 'Disclaimer',
  crumb: 'Disclaimer',
  titleTag: 'Disclaimer — Orenyx AI Engine™',
  description: 'Disclaimer for Orenyx AI Engine™, a product of Orenyx Labs, LLC.',
  path: '/legal/disclaimer',
  effective: 'September 15, 2026',
  clauses: [
      {
        heading: 'General Disclaimer',
        body: [
          'This Disclaimer applies to the Orenyx AI Engine platform (the "Service"), operated by Orenyx Labs, LLC ("Orenyx," "we," "us," or "our"), and is incorporated into the Orenyx Terms of Service by reference. THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT ANY WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. ORENYX DISCLAIMS ALL WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTY ARISING FROM COURSE OF DEALING OR USAGE OF TRADE, EXCEPT AS EXPRESSLY SET FORTH IN AN APPLICABLE ORDER FORM.',
        ],
      },
      {
        heading: 'Automated and AI-Driven Decision-Making',
        body: [
          'The Service uses a combination of rules-based logic and artificial intelligence to route calls, tasks, tickets, and workflows, and to execute bot flows across voice, SMS, chat, and social channels, in each case without human review by default. Orenyx does not warrant that any routing, bot execution, or other automated decision made by the Service will be accurate, complete, uninterrupted, or free of error. Customer is solely responsible for reviewing and validating the suitability of the Service\'s automated outputs for Customer\'s intended use, and for maintaining appropriate escalation paths for its End Users.',
        ],
      },
      {
        heading: 'Call Recording Disclaimer',
        body: [
          'The Service may record and transcribe calls as part of its automated call handling functions. Orenyx does not independently verify that a Customer has provided the notice or obtained the consent required under applicable recording laws, including two-party or all-party consent laws, and disclaims responsibility for a Customer\'s failure to do so.',
        ],
      },
      {
        heading: 'Payment Risk-Scoring and Routing',
        body: [
          'The Service provides payment event risk-scoring and transaction routing infrastructure. Orenyx does not guarantee, and expressly disclaims, any warranty that use of the Service will prevent fraud, chargebacks, or unauthorized transactions. Liability for the underlying transaction, and for the relationship between Customer and its payment processor, remains solely with Customer.',
        ],
      },
      {
        heading: 'Multi-Tenant and Shared Infrastructure',
        body: [
          'Starter and Growth Plan Customers are served on shared, multi-tenant infrastructure. While Orenyx implements logical tenant isolation designed to segregate each Customer\'s data, Orenyx does not warrant that shared infrastructure will be free from incidents that may affect multiple tenants concurrently.',
        ],
      },
      {
        heading: 'No Professional Advice',
        body: [
          'The Service, including any compliance-related tooling, logging, or reporting functionality, is provided as a technology platform only and does not constitute legal, financial, tax, compliance, or other professional advice. Customer remains solely responsible for its own compliance with applicable law and for obtaining independent professional advice as needed.',
        ],
      },
      {
        heading: 'Third-Party Services and Downstream Products',
        body: [
          'The Service integrates with and relies upon third-party services, including Stripe for payment processing, and serves as the shared backend for other Orenyx-branded products. Orenyx is not responsible for the acts, omissions, availability, or performance of third-party services, and a disruption to the Service may have cascading effects on connected Orenyx products, for which Orenyx disclaims liability to the maximum extent permitted by law.',
        ],
      },
      {
        heading: 'Customer Integrations',
        body: [
          'Orenyx disclaims responsibility for any error, security vulnerability, data loss, or Service disruption arising from Customer\'s own integration with the API, including integrations that misuse, misconfigure, or overload the Service.',
        ],
      },
      {
        heading: 'No Guarantee of Uninterrupted Service',
        body: [
          'Orenyx does not warrant that the Service will be uninterrupted, timely, secure, or error-free, or that any defect will be corrected. Availability commitments, if any, applicable to a given Plan are set forth exclusively in the applicable Order Form.',
        ],
      },
      {
        heading: 'Limitation of Liability',
        body: [
          'This Disclaimer is subject to, and does not expand, the limitations of liability set forth in the Orenyx Terms of Service.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'Questions regarding this Disclaimer may be directed to legal@orenyxengine.com.',
        ],
      },
  ],
};

export const cookies: LegalOutline = {
  title: 'Cookies Policy',
  crumb: 'Cookies Policy',
  titleTag: 'Cookies Policy — Orenyx AI Engine™',
  description: 'Cookies Policy for Orenyx AI Engine™, a product of Orenyx Labs, LLC.',
  path: '/legal/cookies',
  effective: 'September 15, 2026',
  clauses: [
      {
        heading: 'Overview',
        body: [
          'This Cookie Policy explains how Orenyx Labs, LLC ("Orenyx," "we," "us," or "our") uses cookies and similar tracking technologies in connection with the Orenyx AI Engine platform, including its web-based dashboard and account management interfaces (the "Service"). This Cookie Policy should be read together with the Orenyx Privacy Policy.',
        ],
      },
      {
        heading: 'What Are Cookies',
        body: [
          'Cookies are small text files placed on your device when you visit a website or web-based application. Cookies allow a website to recognize your device, remember your preferences, and, in some cases, track activity across sessions or websites.',
        ],
      },
      {
        heading: 'Categories of Cookies We Use',
        body: [
          'We use the following categories of cookies: (a) "Strictly Necessary Cookies," which are required for the operation of the Service, including authentication, session management, and security functions, and cannot be disabled; (b) "Functional Cookies," which allow the Service to remember Customer and Authorized User preferences, such as dashboard configuration and display settings; and (c) "Analytics Cookies," which help us understand how the Service is used so that we can improve its performance and reliability. Orenyx does not use cookies for third-party behavioral advertising.',
        ],
      },
      {
        heading: 'Third-Party Cookies',
        body: [
          'Certain features of the Service, including billing and checkout flows, rely on cookies set by our payment processor, Stripe, Inc., for fraud prevention and payment processing purposes. We may also use cookies set by third-party analytics providers to help us understand aggregate usage patterns of the dashboard. These third parties\' use of cookies is governed by their own privacy and cookie policies.',
        ],
      },
      {
        heading: 'How to Control Cookies',
        body: [
          'Most web browsers allow you to control cookies through browser settings, including blocking or deleting cookies. Because Strictly Necessary Cookies are required for the Service to function, disabling them may prevent you from accessing or using the dashboard or completing checkout. The Sandbox Environment and production API do not rely on browser cookies, as API access is authenticated using API keys rather than cookies.',
        ],
      },
      {
        heading: 'Changes to this Cookie Policy',
        body: [
          'Orenyx may update this Cookie Policy from time to time by posting a revised version and updating the "Last Updated" date above.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'Questions regarding this Cookie Policy may be directed to legal@orenyxengine.com.',
        ],
      },
  ],
};
