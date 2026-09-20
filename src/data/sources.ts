export interface TeachingSource {
  id: string; publisher: string; title: string; url: string; scope: string; checked: string; use: string;
}
export const sources: TeachingSource[] = [
  {
    "id": "apple",
    "publisher": "Apple Support",
    "title": "Cancel a subscription from Apple",
    "url": "https://support.apple.com/en-au/118428",
    "scope": "Australian support page; Apple-billed subscriptions. Account, device and regional exceptions matter.",
    "checked": "2026-09-20",
    "use": "Find the purchasing account and billing route."
  },
  {
    "id": "google",
    "publisher": "Google Play Help",
    "title": "Cancel, pause or change a subscription",
    "url": "https://support.google.com/googleplay/answer/7018481?hl=en",
    "scope": "Google Play-billed subscriptions; prepaid plans and payment plans have separate conditions.",
    "checked": "2026-09-20",
    "use": "Distinguish app removal, cancellation and a pause."
  },
  {
    "id": "adobe-terms",
    "publisher": "Adobe Account Help",
    "title": "Subscription terms and refund policies",
    "url": "https://helpx.adobe.com/account/individual/terms-policies-and-regulations/adobe-subscription-terms.html",
    "scope": "US subscribers only in this article. Its fee examples are not a worldwide rule.",
    "checked": "2026-09-20",
    "use": "Read commitment separately from payment frequency."
  },
  {
    "id": "adobe-cancel",
    "publisher": "Adobe Account Help",
    "title": "Cancel your Adobe trial or subscription",
    "url": "https://helpx.adobe.com/account/individual/subscriptions-and-plans/renewals-and-cancellations/cancel-adobe-subscription.html",
    "scope": "Individual plans bought directly from Adobe; third-party purchases use the biller's process. Guide updated 24 July 2026.",
    "checked": "2026-09-20",
    "use": "Follow the official route and verify each plan."
  },
  {
    "id": "adobe-billing",
    "publisher": "Adobe Account Help",
    "title": "Understand billing charges",
    "url": "https://helpx.adobe.com/account/individual/billing-and-payments/view-billing-and-invoices/understand-billing-charges.html",
    "scope": "Adobe billing guidance; investigate the specific invoice, account and plan.",
    "checked": "2026-09-20",
    "use": "Investigate a charge after an attempted cancellation."
  },
  {
    "id": "adobe-doj",
    "publisher": "US Department of Justice",
    "title": "Adobe proposed settlement announcement",
    "url": "https://www.justice.gov/opa/pr/adobe-agrees-150-million-settlement-and-injunction-resolve-alleged-violations-restore-online",
    "scope": "US announcement, 13 March 2026, updated 16 March; allegations and a proposed stipulated order, not a worldwide refund entitlement.",
    "checked": "2026-09-20",
    "use": "Separate a documented enforcement case from account-specific instructions."
  },
  {
    "id": "adobe-response",
    "publisher": "Adobe Newsroom",
    "title": "Adobe's response to the settlement",
    "url": "https://news.adobe.com/news/2026/03/adobe-statement",
    "scope": "Company statement, 13 March 2026; Adobe disputes the allegations and denies wrongdoing.",
    "checked": "2026-09-20",
    "use": "Read the company's position alongside the regulator's account."
  },
  {
    "id": "netflix",
    "publisher": "Netflix Help Center",
    "title": "How to cancel Netflix",
    "url": "https://help.netflix.com/en/node/407",
    "scope": "Netflix memberships; partner billing, account holds and promotional balances have separate branches.",
    "checked": "2026-09-20",
    "use": "Identify who controls cancellation and when access ends."
  },
  {
    "id": "ftc-patterns",
    "publisher": "US Federal Trade Commission",
    "title": "Bringing Dark Patterns to Light",
    "url": "https://www.ftc.gov/reports/bringing-dark-patterns-light",
    "scope": "Historical staff report, September 2022. Examples are not current local legal advice.",
    "checked": "2026-09-20",
    "use": "Identify an obstruction using documented evidence."
  },
  {
    "id": "princeton",
    "publisher": "Princeton / University of Chicago researchers",
    "title": "Dark Patterns at Scale",
    "url": "https://webtransparency.cs.princeton.edu/dark-patterns/",
    "scope": "2019 study; screenshots and prevalence figures describe that dataset and time.",
    "checked": "2026-09-20",
    "use": "Support observations rather than assume intent."
  }
];
export function getTeachingSources(ids: unknown): TeachingSource[] {
  if (!Array.isArray(ids)) return [];
  return ids.map((id) => {
    const source = sources.find((item) => item.id === id);
    if (!source) throw new Error(`Unknown teaching source: ${id}`);
    return source;
  });
}
