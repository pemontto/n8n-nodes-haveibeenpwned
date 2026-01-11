<img src="https://raw.githubusercontent.com/pemontto/n8n-nodes-haveibeenpwned/main/icons/hibp.svg" width="180" alt="Have I Been Pwned Logo" />

# n8n-nodes-haveibeenpwned

This is an n8n community node for [Have I Been Pwned](https://haveibeenpwned.com/) - check if emails or passwords have been exposed in data breaches.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Install via **Settings > Community Nodes** in n8n and search for `n8n-nodes-haveibeenpwned`.

See the [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/installation/) for more details.

## Operations

### Breach

Check if email addresses have been exposed in data breaches. Requires an API key for some operations.

- **Get by Email** - Get all breaches an email has been found in
- **Get by Name** - Get details of a specific breach
- **Get by Domain** - Get breached email addresses on a verified domain
- **Get Latest** - Get the most recently added breach
- **Get Many** - List all breaches in the system
- **Get Data Classes** - Get all data class types exposed in breaches

### Domain

Manage verified domains on your HIBP account. Requires an API key.

- **Get Subscribed** - List all domains verified and added to your account

### Password

Check if passwords have been exposed in data breaches. Uses k-anonymity - passwords are never sent to the API.

- **Check Password** - Check if a password has been pwned (no API key required)

### Paste

Check if email addresses appear in public pastes. Requires an API key.

- **Get by Email** - Get all pastes containing an email address

### Stealer Log

Check if email addresses or domains appear in stealer logs (malware-captured credentials). Requires an API key.

- **Get by Email** - Get website domains where an email was captured
- **Get by Website Domain** - Get email addresses captured for a website
- **Get by Email Domain** - Get email aliases and associated websites for a domain

### Subscription

View your HIBP API subscription details. Requires an API key.

- **Get Status** - Get current subscription details and rate limits

## Credentials

### API Key (required for most operations)

1. Go to [haveibeenpwned.com/API/Key](https://haveibeenpwned.com/API/Key)
2. Purchase an API key (supports the service and Troy Hunt's work)
3. Copy the API key and add it to your n8n credential

**Note:** The Password resource uses the free Pwned Passwords API and does not require an API key. Some Breach operations (Get by Name, Get Latest, Get Many, Get Data Classes) also work without an API key.

## Compatibility

Compatible with n8n v1.0.0 and later.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Have I Been Pwned API documentation](https://haveibeenpwned.com/API/v3)
- [Pwned Passwords API](https://haveibeenpwned.com/API/v3#PwnedPasswords)
