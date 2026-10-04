# Security Policy

## Supported Versions

SinterDB is currently in early development.

Security fixes are generally applied to the latest released version.

| Version        | Supported |
| -------------- | --------- |
| Latest release | ✅        |
| Older releases | ❌        |

## Reporting a Vulnerability

Please **do not** report security vulnerabilities through public GitHub issues, discussions, or pull requests.

If you discover a potential security vulnerability in SinterDB, please report it privately using GitHub's **Private Vulnerability Reporting** feature.

You can submit a report from the repository's **Security** tab by selecting **Report a vulnerability**.

When submitting a report, please include as much of the following information as possible:

- A clear description of the vulnerability
- Steps required to reproduce the issue
- The affected SinterDB version or commit
- The potential security impact
- Relevant configuration details
- Proof-of-concept code, logs, screenshots, or other supporting material when applicable

Providing a minimal reproducible example is especially helpful.

## Responsible Testing

When researching or testing a potential vulnerability, please avoid:

- Accessing data that does not belong to you
- Modifying or deleting third-party data
- Disrupting systems or services
- Performing denial-of-service testing
- Attempting to exploit the vulnerability beyond what is necessary to demonstrate its existence

Please use your own environment and data whenever possible.

## Disclosure

Please allow reasonable time for a reported vulnerability to be investigated and addressed before publicly disclosing it.

Confirmed vulnerabilities may be addressed through:

- A patched SinterDB release
- A GitHub Security Advisory
- Release notes
- Documentation updates

Details may be withheld temporarily when immediate disclosure could place users at additional risk.

## Security Updates

Security-related fixes may be included in regular releases or published separately depending on severity.

Users are encouraged to remain on the latest available SinterDB release, especially while the project is in active development.

## Early Development

SinterDB is currently pre-1.0 software.

APIs, protocols, storage formats, authentication mechanisms, security behavior, and other implementation details may change between releases.

SinterDB should not currently be considered production-ready for security-critical workloads unless it has been independently evaluated for the intended environment.

## Scope

Security reports are welcome for vulnerabilities affecting SinterDB itself, including issues involving areas such as:

- Authentication or authorization
- Network protocol handling
- Query processing
- Data validation
- Data storage and persistence
- Information disclosure
- Privilege escalation
- Remote code execution
- Denial-of-service vulnerabilities caused by unexpected behavior
- Cryptographic or security-sensitive implementation mistakes

General bugs, feature requests, performance issues, and non-security-related crashes should be reported through the normal GitHub issue tracker.
