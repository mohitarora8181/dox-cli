# Doxs Cli
================
README Generator and Commit Message Generator
--------------------------------------------

Table of Contents
-----------------

1. [Project Title & Description](#project-title-description)
2. [Installation Instructions](#installation-instructions)
3. [Usage Guide](#usage-guide)
4. [Project Structure](#project-structure)
5. [API Documentation](#api-documentation)
6. [Key Features](#key-features)
7. [Environment Variables](#environment-variables)
8. [Contributing Guidelines](#contributing-guidelines)
9. [License](#license)

### Project Title & Description

Doxs Cli is a command-line tool designed to generate high-quality README files and commit messages with ease. It is aimed at developers who value efficient development processes.

### Installation Instructions

#### Install from npm

```bash
npm install -g doxs-cli
```

#### Install from GitHub (Clone and Link)

```bash
git clone https://github.com/your-username/doxs-cli.git
cd doxs-cli
npm install
npm link
```

### Usage Guide

Doxs Cli provides two primary commands:

- `doxs init`: Initializes a new project by generating a basic README file and commit message.
- `doxs update`: Updates the README file based on the project's changes.

```bash
doxs init
# or
doxs update
```

### Project Structure

```markdown
Doxs Cli/
config.js
index.js
package.json
README.md
templates/
README.template.md
commit.template
```

### API Documentation

| Endpoint | Description | HTTP Method |
| --- | --- | --- |
| `/generate` | Generates a README file based on project data | `POST` |
| `/update` | Updates the README file based on project changes | `PUT` |

Example API request (JSON):
```json
{
  "title": "My Project",
  "description": "High-quality documentation"
}
```

### Key Features

- **Easy-to-use interface**: Intuitive commands for generating high-quality README files and commit messages.
- **Customizable templates**: Supports user-defined templates for README files and commit messages.
- **Streamlined development**: Simplifies project documentation and commit message management.

### Environment Variables

| Variable | Description | Default Value |
| --- | --- | --- |
| ` TEMPLATE_DIR` | Path to template directory | `./templates` |

### Contributing Guidelines

- Fork this repository on GitHub.
- Create a new branch for your feature or bug fix.
- Commit and push your changes.
- Create a pull request.

### License

Doxs Cli is released under the MIT License. See LICENSE.txt for details.