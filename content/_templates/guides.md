---
# Copy to content/guides/<slug>.md, or create the post in the admin at /admin.
# The filename is the URL: /guides/<slug>. Lowercase letters, numbers and hyphens.
title: "Headline, used as the page H1 and the title tag"
description: "150 to 160 characters. Used as the meta description, the social preview text and the intro under the headline. The build fails outside this range."
date: 2026-01-31                # YYYY-MM-DD
updated: 2026-02-01             # optional, YYYY-MM-DD when facts change. Delete the line otherwise
author: fp-admin                # file name in content/authors
mainTopic: stablecoins          # file name in content/topics, shown as the label
otherTopics: []                 # more topic file names
fromUs: false                   # true for posts about Fintech Pakistan itself
coverImage: /covers/my-post/coverImage.webp   # optional, 1600 x 900. Delete the line if none
coverAlt: ""                    # required when coverImage is set
draft: true                     # true keeps the post off the live site
label: none                     # none, Partner or Sponsored
lead: false                     # true puts this at the top of the homepage. Keep it on one post
chart: remittance-sources       # optional, a file name in content/charts. Delete the line if none
keyPoints: []                   # optional, 3 or 4 short points shown as "In short"
faqs: []                        # optional: - q: "Question" then a: "Answer". Adds FAQ schema
sources: []                     # every number needs one: - title: "Publisher, Headline (date)" then url: "https://..."
---

Open with the most important fact in the first two sentences. The title above is the only H1, so start sections at ## in the body.

## First section

Write the post here.

{% pull %}
Plain part. _Highlighted part._
{% /pull %}

{% timeline %}
{% timeline-item when="March 2026" %}
What happened.
{% /timeline-item %}
{% /timeline %}

{% status %}
{% status-item name="Name" pill="Live · Jan 2025" style="live" %}
Detail.
{% /status-item %}
{% /status %}

{% chart name="remittance-growth" /%}
