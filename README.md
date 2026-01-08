# n8n-nodes-haveibeenpwned

This is an n8n community node for [Have I Been Pwned](https://haveibeenpwned.com/) - check if emails or passwords have been exposed in data breaches.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Breach

Check if email addresses have been exposed in data breaches. Requires an API key.

- **Get by Email** - Get all breaches an email has been found in
- **Get by Name** - Get details of a specific breach
- **Get Latest** - Get the most recently added breach
- **Get Many** - List all breaches in the system

### Password

Check if passwords have been exposed in data breaches. Uses k-anonymity - passwords are never sent to the API.

- **Check Password** - Check if a password has been pwned (no API key required)

## Credentials

### API Key (required for Breach operations)

1. Go to [haveibeenpwned.com/API/Key](https://haveibeenpwned.com/API/Key)
2. Purchase an API key (supports the service and Troy Hunt's work)
3. Copy the API key and add it to your n8n credential

**Note:** The Password resource uses the free Pwned Passwords API and does not require an API key.

## Compatibility

Compatible with n8n v1.0.0 and later.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Have I Been Pwned API documentation](https://haveibeenpwned.com/API/v3)
- [Pwned Passwords API](https://haveibeenpwned.com/API/v3#PwnedPasswords)
