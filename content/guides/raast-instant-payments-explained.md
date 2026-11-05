---
title: "Raast, explained: the rail under Pakistan's instant payments"
description: "Raast more than doubled in FY26 to 2.76 billion payments, and merchant payments grew faster still. Here is how Pakistan's instant payment system works."
date: 2026-10-22
updated: 2026-11-05
author: FP Admin
tags: [Payments]
coverImage: ""
coverAlt: ""
draft: false
chart: raast-merchant
label: ""
keyPoints:
  - "Raast is Pakistan's instant payment system, owned by the State Bank."
  - "It handled about 2.76 billion payments worth Rs 80 trillion in FY26, on provisional figures."
  - "Merchant payments grew from 4.9 million to 182.5 million in a year."
  - "It only works inside Pakistan, so it doesn't compete directly with cross-border apps."
faqs:
  - q: "Is Raast free?"
    a: "Raast's person-to-person service is widely described as free. We could not find a published fee schedule, so check with your bank or wallet."
  - q: "Does Raast work outside Pakistan?"
    a: "No. Raast is a domestic system, so it can move money inside Pakistan but it can't send money abroad."
  - q: "What is a Raast ID?"
    a: "A Raast ID links your mobile number to your bank account, so someone can pay you using your phone number instead of a long account number."
sources:
  - title: "Pakera, Raast handled 2.76 billion payments in FY26, SBP shows (12 October 2026)"
    url: "https://pakera.pk/raast-2-76-billion-payments-fy26-sbp-payment-systems-review/"
  - title: "The Nation, SBP releases Quarterly Report on Payment Systems for Jan-March quarter (26 June 2026)"
    url: "https://www.nation.com.pk/26-Jun-2026/sbp-releases-quarterly-report-payment-systems-jan-march-quarter"
  - title: "State Bank of Pakistan, Quarterly Payment Systems Review Q3 FY26 (press release, 25 June 2026)"
    url: "https://www.sbp.org.pk/assets/documents/press-release/Pr-25-Jun-2026.pdf"
  - title: "Profit, SBP releases annual payment systems review for FY25 (3 November 2025)"
    url: "https://profit.pakistantoday.com.pk/2025/11/03/sbp-releases-annual-payment-systems-review-for-fy25/"
  - title: "Wikipedia, Raast"
    url: "https://en.wikipedia.org/wiki/Raast"
---

If you have sent money in Pakistan by typing in a phone number, Raast may well have moved it. You may never have used the name, but the system now carries billions of payments a year, and it has changed what a new fintech can build here.

## What Raast is

Raast is Pakistan's instant payment system. It is owned by the State Bank of Pakistan and operated by Raast Payments Pakistan, a wholly owned State Bank subsidiary. Development began in 2018, with backing from the Bill & Melinda Gates Foundation and Karandaaz Pakistan and assistance from the World Bank.

Financial institutions connect to it, so a customer of one can pay a customer of another immediately.

The key idea is the Raast ID. It links a mobile number to a bank account, so you can pay someone with a phone number instead of an account number. The State Bank's FY26 annual review counts 49.2 million Raast person-to-person IDs, according to Pakera, though that counts IDs rather than people.

## How it rolled out

<ul class="timeline">
<li><span class="when">2018</span><span>Development begins.</span></li>
<li><span class="when">January 2021</span><span>Raast launches with bulk payments, such as dividend payouts.</span></li>
<li><span class="when">February 2022</span><span>Person-to-person payments go live.</span></li>
<li><span class="when">September 2025</span><span>The State Bank starts funding merchant QR payments.</span></li>
<li><span class="when">FY26</span><span>Annual volume more than doubles to about 2.76 billion payments.</span></li>
</ul>

## How big it is now

Raast handled 2.76 billion payments worth about Rs 80 trillion in FY26, up from 1.28 billion worth Rs 29.6 trillion in FY25. Those FY26 figures come from Pakera's reading of the State Bank's annual review, which marks them as provisional, so they may be revised.

| Raast, payments | FY25 | FY26 (provisional) |
| --- | --- | --- |
| Person to person | 1,266.0 million | 2,537.2 million |
| Person to merchant | 4.9 million | 182.5 million |
| Bulk | 5.0 million | 35.5 million |
| Total | 1,276.0 million | 2,755.2 million |

The value of payments grew even faster than the count. It rose about 2.7 times, while the number of payments rose about 2.2 times.

Person-to-person transfers remain the core, at more than nine in ten payments. In the January to March 2026 quarter alone, Raast handled 742.1 million transactions worth Rs 23.3 trillion, of which 664 million were person to person, The Nation reported.

For context, Pakistan's total retail payments that quarter came to 3.7 billion transactions worth Rs 168.8 trillion, with 92% of them digital. Our report on [the State Bank's latest payments data](/news/pakistan-digital-payments-92-percent) looks at why the value picture is so different.

## The merchant story

The most interesting line in that table is the second one.

Merchant payments went from 4.9 million in FY25 to 182.5 million in FY26. By value, they rose from Rs 14.9 billion to Rs 994.4 billion, according to Pakera. Comparing the final quarter of each year, they rose from 2.2 million to 86.0 million.

<div data-chart="raast-merchant"></div>

<p class="pull">Merchant payments on Raast: <em>2.2 million a quarter to 86 million in a year.</em></p>

Two things sit behind that. More shops can accept these payments, with QR-enabled merchants registered with banks rising from about 1.09 million to 3.84 million in a year.

Money also helped. A State Bank circular set aside Rs 3.5 billion for merchant QR payments from 1 September 2025 to 30 June 2026, paying banks 0.5% of each payment or Rs 100, whichever is lower. Pakera found no notice extending it, which makes the next set of quarterly figures important. If merchant growth holds without that support, it is real demand. If it fades, some of it was bought.

Merchant counts need care, because different reports measure different things. A shop registered for QR payments and a merchant with a Raast alias are not the same count, and neither tells you how many actually use it.

## What Raast doesn't do

**It doesn't cross borders.** Raast is domestic. It can deliver money once it is in Pakistan, but it can't bring money in, so it doesn't compete with [remittance](/news/pakistan-remittances-fy26-record) corridors or dollar accounts. It works alongside them as the last mile.

**It doesn't handle stablecoins.** It moves rupees between regulated accounts. A stablecoin app paying out in PKR still needs a licensed route onto the rail, which is part of why [PVARA licensing](/guides/pvara-virtual-asset-licensing) matters.

**It isn't clearly priced in public.** Person-to-person use is widely described as free, but Pakera could not find a fee schedule and the annual review doesn't give customer fees.

## Why it matters if you're building

Raast changes the cost of the boring part. A new app doesn't have to build its own payment network to move rupees quickly, because the rail already exists.

That shifts competition to everything around it: onboarding, checkout, merchant tools, credit, and the international leg that Raast leaves open. With more than 3.8 million QR-enabled merchants on bank books, the opportunity now is less about getting shops connected and more about getting them to use it.

## What to watch

- **Merchant volumes after June 2026**, now that the funded period has ended unless it was renewed.
- **Revisions to the FY26 figures** when the State Bank finalises them.
