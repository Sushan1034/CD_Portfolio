const React = require('react');

function parseRawUrls(text, offsetKey = 0) {
  if (!text) return text;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    let url = match[1];
    let trailingPunctuation = '';
    // Strip trailing punctuation that often gets caught in raw URLs
    if (/[.,;!?)]$/.test(url)) {
      trailingPunctuation = url.slice(-1);
      url = url.slice(0, -1);
    }

    parts.push(
      { type: 'a', props: { href: url, children: url } }
    );
    if (trailingPunctuation) {
      parts.push(trailingPunctuation);
    }
    lastIndex = urlRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts;
}

function renderTextWithLinks(text) {
  if (!text) return null;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const linkText = match[1];
    const linkUrl = match[2];
    const startIndex = match.index;

    if (startIndex > lastIndex) {
      parts.push(...parseRawUrls(text.substring(lastIndex, startIndex), lastIndex));
    }

    const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://');
    
    if (isExternal) {
      parts.push(
        { type: 'a', props: { href: linkUrl, children: linkText } }
      );
    } else {
      parts.push(
        { type: 'Link', props: { href: linkUrl, children: linkText } }
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(...parseRawUrls(text.substring(lastIndex), lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

const input1 = "🌐 Website: https://sushanaryal.com.np 📷 Instagram: https://www.instagram.com/nepalcodeharbor/ 💼 LinkedIn: https://www.linkedin.com/in/sushan-aryal/";
console.log("TEST 1:");
console.log(JSON.stringify(renderTextWithLinks(input1), null, 2));

const input2 = "Amazon Web Services (AWS): https://aws.amazon.com/ AWS Documentation: https://docs.aws.amazon.com/ AWS Skill Builder: https://explore.skillbuilder.aws/ Microsoft Azure: https://azure.microsoft.com/ Azure Learn: https://learn.microsoft.com/azure/ Google Cloud Platform (GCP): https://cloud.google.com/ Google Cloud Documentation: https://cloud.google.com/docs Google Cloud Skills Boost: https://www.cloudskillsboost.google/ Oracle Cloud Infrastructure (OCI): https://www.oracle.com/cloud/ OCI Documentation: https://docs.oracle.com/en-us/iaas/ My Vision";
console.log("TEST 2:");
console.log(JSON.stringify(renderTextWithLinks(input2), null, 2));
