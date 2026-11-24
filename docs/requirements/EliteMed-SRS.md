# EliteMed

## Medical Educational Platform

# Software Requirements Specification (SRS)

## 1. Executive summary

The platform will centralize medical educational resources for students across all academic years. It
will support both free and paid materials, resource discovery, student accounts, purchasing and
payment verification, secure access to purchased resources, and administrative operations. The client
selected an administrator assisted by staff members. The client also wants the academy’s credibility
and outcomes to be visible through an explanatory video, genuine reviews, total student reach, and
student academic achievements.

The platform is commercially sensitive: a wrong access decision can expose paid course files, a wrong
payment state can grant unpaid access, and missing backups can destroy business records. These
requirements therefore treat payment confirmation, access control, auditability, and recovery as core
system behavior—not optional polish.

## 2. Source-derived requirements and interpretation

- Confirmed from the questionnaire: mixed free and paid educational resources.
- Confirmed: one administrator assisted by staff members; intended users include medical students
and the platform administrator.
- Confirmed: students from all academic years are in scope.
- Confirmed: the client expects both manual and online-business operations to be considered,
including content management, purchases/payments, reporting, and access control.
- Confirmed: the additional request includes an academy explanatory video, genuine reviews,
student-count/reach information, and academic achievements.

## 3. Business objectives

- Provide one organized online destination for medical courses, documents, exercises, solved exercise
collections, past examinations, MCQs, and revision notes.
- Make resources discoverable by academic year, subject/module, semester, course, resource type,
keywords, and price where applicable.
- Sell selected resources while allowing free educational resources.
- Give administrators/staff a controlled way to publish, update, price, organize, and retire content.
- Grant paid access only after a verified payment or an explicitly audited manual grant.
- Build trust by presenting credible academy information and verifiable student feedback/outcomes.
- Operate reliably with protected student and transaction records, recovery procedures, and minimal
downtime.

## 4. Stakeholders and roles

| Role | Purpose | Minimum permissions |
|---|---|---|
| Visitor | Discover the academy and public catalogue | Read published public catalogue fields, previews, and public pages; cannot access protected full files or private student data. |
| Student | Browse, buy, and consume resources | Manage own profile; view eligible resources; create orders; submit payment proof if manual payments are enabled; view own orders/receipts; access resources only when entitlement is valid. |
| Staff | Help operate the platform | Only the capabilities explicitly assigned by an administrator; access must be role-based and least-privilege. |
| Administrator | Owns business operation and oversight | Manage content, users, prices, payment review, entitlements, announcements, inquiries, and reports; sensitive actions audited. |
| Payment provider | Processes or reports external payment outcomes | Communicates transaction state through a verified server-side integration; never receives platform admin credentials. |

## 5. Scope

### 5.1 Proposed first release (MVP)

- Responsive public web app.
- Email/password registration and login; password reset; profile management. Google login is an
option to confirm.
- Academic year and subject/module catalogue structure.
- Resource detail pages with metadata, preview/sample when supplied, price/free status, and access
state.
- Admin/staff content management for resource metadata and files.
- Orders and purchase history; manual payment verification and/or gateway payment, depending on
confirmed provider availability.
- Secure resource access for eligible students; controlled PDF viewing/download according to policy.
- Admin dashboard for students, resources, pending payments, purchases, and basic sales figures.
- Basic contact/support channel and transactional status messages.
- Public academy video, reviews, student reach, and achievement highlights, with consent and
evidence checks.


### 5.2 Candidate later releases (Not required in the 1 version of the platform)

- Bundles, subscriptions, discount/promo codes, advanced analytics, reviews/rating workflows beyond
curated reviews, recommendations, quizzes.
- Advanced anti-copying/DRM controls, watermarking, and sophisticated content-protection
integrations.
- Instructor self-service portals if the business model later includes independent instructors.

## 6. Functional requirements

FR-01 Public catalogue: Visitors can browse published resources and see public metadata without
being able to retrieve protected files.

FR-02 Taxonomy: Resources can be organized by academic year, subject/module, semester, course,
resource type, and optionally instructor/author.

FR-03 Search and filters: Users can search by title/keyword and filter by year, subject, type, price, and
sort by newest/price, subject to the confirmed scope.

FR-04 Resource details: A resource can have title, description, year, subject, type, author/instructor,
publication date, price/currency, preview, file/media references, publication state, and access policy.

FR-05 Free resources: A resource marked free can be accessed according to its publication and
account policy; free must not mean all private files are public by default.

FR-06 Accounts: Students can register, sign in/out, reset passwords, edit permitted profile fields, and
view account-related information.

FR-07 Academic profile: Student academic year and university may be stored if required; verification
method remains a client decision.

FR-08 Orders: A student can create an order for one or more eligible resources; the order snapshots
item names, unit prices, currency, discount, total, and policy at purchase time.

FR-09 Payment lifecycle: Payments have explicit states such as pending, awaiting_review, succeeded,
failed, expired, refunded, and disputed where applicable. State transitions are validated server-side.

FR-10 Manual proof: If manual payment is enabled, a student can submit a receipt/reference and proof
image; it remains pending until an authorized reviewer accepts/rejects it.

FR-11 Gateway payment: If an online gateway is enabled, the server creates payment sessions and
verifies signed webhooks/status with the provider. Browser return URLs alone never grant access.

FR-12 Entitlement: A confirmed purchase creates an entitlement for the purchased resource(s). The
entitlement stores grant reason, source order/payment, start/end dates if limited, and revocation
reason/history.

FR-13 Secure consumption: Protected PDFs/videos are served only after checking entitlement.
Downloadability and access duration are configurable by resource policy.

FR-14 Content management: Authorized admin/staff can create, edit, publish, unpublish, archive, and
remove content according to assigned permissions. Changes to sold resources should preserve
historical purchase records.

FR-15 User administration: Authorized administrators can suspend/reactivate accounts according to
policy; suspension must not silently erase financial records.

FR-16 Manual access correction: An administrator may grant/revoke access only if the client approves
the policy; every action records actor, timestamp, target, reason, and previous/new state.

FR-17 Receipts: Students can view an order confirmation/receipt in their account; email delivery is
configurable. Receipt includes order number, student/account identifier, resource names, timestamp,
currency/amount, method/status, transaction reference, discounts, and refund details when relevant.

FR-18 Notifications: Provide agreed notifications for purchase confirmation, payment state changes,
new materials, material updates, announcements, and account-security events.

FR-19 Support: Students can contact the platform through the selected channel(s); inquiries are visible
to authorized staff and can be marked open/in-progress/resolved.

FR-20 Administration reporting: Dashboard shows registered/active students, orders, revenue, popular
resources, sales by academic year, and pending payments where data exists.

FR-21 Refund workflow: A refund request can be recorded, reviewed, approved/rejected, processed
externally or through a supported gateway, and reflected in entitlement state according to policy.

FR-22 Audit trail: Record sensitive administrative actions and payment/access state changes with
actor, timestamp, old/new values, reason, and correlation/reference ID.

FR-23 Academy trust content: Public pages support academy explainer video, approved
testimonials/reviews, student reach statistics, and academic achievements. Evidence, consent, update
date, and source should be retained for claims.

FR-24 Account deletion: Account deletion flow must explain effects and preserve legally required
transaction records in an anonymized/restricted form where required; final retention rules require
legal/client approval.

FR-25 Accessibility/responsive UI: Core journeys work on desktop, tablet, and mobile browsers;
language and right-to-left behavior are decided before design freeze.

## 7. Business rules

The following rules apply to the whole system, regardless of how the interface looks or which payment
method is enabled. They are referenced as BR-1 to BR-10.

Access and payment
BR-1: An order does not give access to a resource. Access is granted only when the payment is
confirmed, or when an administrator grants it manually and the grant is audited.

BR-2: A client-side redirect, success page, hidden button, or modified browser request is never proof of
payment. Only server-side confirmation from the payment provider counts.

BR-3: Payment notifications (webhooks) must be authenticated and idempotent. Receiving the same
notification more than once must not create duplicate entitlements or receipts.

BR-4: Manual payment approvals and manual access grants or revocations must include a reason and
be recorded in the audit log.

Pricing and orders
BR-5: The server always calculates the final price from the current catalogue and pricing rules. Totals
sent by the client are never trusted.

BR-6: Each order keeps the price and currency applied at purchase time. Later price changes affect
only new orders.

Content and users
BR-7: Removing a resource normally means archiving it, so order and audit references are preserved.
What happens to already-purchased material is defined in a published policy.

BR-8: The student’s academic year may be used for discovery and personalization. Open decision for
the client: whether it restricts which resources a student can browse, or only filters and recommends
content.

Credibility and data protection
BR-9: Testimonials, reviews, student counts, and academic achievements must be genuine and never
fabricated. Consent and evidence must be obtained, and a procedure to refresh them must be defined.

BR-10: The application database must never store card numbers, CVV codes, passwords in plain text,
or payment-provider secrets.

## 8. Non-functional requirements (NFRs)

| Area | Requirement / target |
|---|---|
| Availability | Target continuous access with minimal downtime; propose an initial 99.5% monthly availability objective only after hosting plan and exclusions are agreed. |
| Performance | Aim for catalogue and standard pages to render within 2 seconds under normal conditions; define measurement location, percentile, device, and network before acceptance. |
| Security | Least privilege, server-side authorization, secure sessions, rate limits, strong admin protection, encrypted transport, protected file access, audit logging, and dependency updates. |
| Privacy | Collect only required personal data; restrict staff access; publish privacy/retention policy; define deletion and export processes. |
| Backup/recovery | Automated daily backups are the baseline proposal; set retention and point-in-time recovery requirements; test restoration before launch and periodically. |
| Scalability | Start with a managed architecture sized to the confirmed audience; monitor resource usage and define thresholds for plan upgrades. |
| Maintainability | Version-controlled schema migrations, repeatable deployments, separate dev/staging/production environments, and documented runbooks. |
| Compatibility | Responsive modern browsers on desktop/tablet/mobile. Confirm supported browser versions. |
| Localization | Arabic, French, and English appear in the questionnaire; confirm whether all three are launch requirements. Arabic requires RTL testing. |
| Accessibility | Keyboard access, visible focus, labels, contrast, semantic structure, and captions/transcripts for academy video where feasible. |
| Observability | Centralized error reporting, uptime checks, database/storage usage alerts, payment failure alerts, and security event review. |
| Data integrity | Transactions/constraints for order/payment/entitlement workflows; idempotency for payment events; no reliance on client-only validation. |

## 9. Security and privacy requirements

- Enable multi-factor authentication for administrators/staff where supported; separate admin
accounts from ordinary student accounts.
- Use role-based access control and deny-by-default rules for all non-public data.

- Apply row-level policies to every browser-accessible table and private storage policies to every
protected object.
- Keep privileged keys, database passwords, payment secrets, webhook secrets, and email-provider
credentials on the server only.
- Validate uploaded file size, MIME type, extension, and authorization; consider malware scanning for
user-submitted payment evidence.
- Use private object storage for paid files; issue short-lived signed links only after server-side
entitlement checks. Avoid permanent public URLs for paid content.
- Log sensitive actions without storing passwords, card data, full payment secrets, or unnecessary
personal data in logs.
- Rate-limit sign-in, password reset, payment creation, receipt upload, and support submission; add
bot protection where needed.
- Test authorization with at least two students, staff, and admin accounts; attempt cross-account
reads, ID tampering, direct object URL access, and role escalation.
- Use HTTPS only in production; configure security headers, safe cookie/session handling, and
dependency scanning.
- Define incident response: detect, contain, rotate secrets, restore service/data if needed, notify
stakeholders as legally required.

## 10. Payment and content-access lifecycle

## 1. Student selects resource(s); backend reloads current published resource/price data and creates an

order snapshot.

## 2. For online payment, backend creates a provider checkout session using server-held credentials;

student completes checkout on the provider’s page.

## 3. Provider sends a signed webhook to a server-side endpoint. The endpoint verifies signature,

amount, currency, merchant reference, and expected order state.

## 4. The payment event is recorded idempotently. The backend transitions payment/order state only

through valid transitions.

## 5. Only after verified success does the backend create entitlements and an order confirmation/receipt.

## 6. For manual transfer, the order remains pending; student uploads proof/reference; authorized staff

verifies against the merchant account and records the decision/reason.

## 7. Protected-file request checks identity, entitlement state, access window, resource publication

policy, and any suspension/revocation before returning a short-lived signed URL or streaming the
file.

## 8. Refund/reversal updates payment and entitlement states according to the agreed refund policy; all

transitions are auditable.

## 11. Acceptance criteria for MVP

- A visitor can browse published catalogue metadata but cannot retrieve paid files through direct
URLs.
- A student cannot read or modify another student’s profile, order, payment proof, notes/inquiries, or
entitlements by changing identifiers.
- A pending/failed payment never grants paid access.

- A verified successful payment grants the correct resources exactly once, even if a webhook is
delivered repeatedly.
- A manual payment can only be approved by an authorized staff/admin user and every decision
records the reviewer and reason.
- A price change affects new orders but does not alter historical order totals.
- Admin/staff capabilities are distinct and tested; an ordinary student cannot assign roles or publish
resources.
- A backup can be restored in a documented test, and the recovery procedure is recorded.
- Responsive layouts and selected languages pass agreed device/browser checks.
- Public testimonials and outcome statistics have documented approval/consent and are editable
without developer intervention.
