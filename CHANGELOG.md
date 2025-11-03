# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2024-11-03

### Added
- Credential test function to verify API credentials (required for n8n verification)

## [0.3.0] - 2024-11-03

### Added
- TypeScript source files in credentials/ and nodes/ folders (required for n8n verification)
- Proper project structure matching n8n community node standards

### Changed
- Updated .gitignore to exclude dist/ folder (source files tracked, compiled files in npm package only)
- Reorganized project to follow n8n best practices

## [0.2.2] - 2024-11-03

### Fixed
- Remove duplicate node files from dist/nodes root directory
- Correct file structure: node files only in dist/nodes/Streamline/

## [0.2.1] - 2024-11-03

### Fixed
- Include compiled node and credential files in npm package
- Fixed "Cannot find module" error when installing from npm

## [0.2.0] - 2024-11-03

### Changed
- Updated documentation and package metadata
- Fixed typo in package.json keywords
- Updated LICENSE to reflect Streamline Connector copyright
- Improved README with comprehensive installation and usage instructions

### Fixed
- Corrected "product-recomendations" to "product-recommendations" in keywords

## [0.1.5] - Previous Release

### Added
- Initial release of Streamline node for n8n
- Support for Shopify data integration through Streamline API
- Operations: Get Products, Get Orders, Get Customers, Get Inventory
- Streamline API credentials support
