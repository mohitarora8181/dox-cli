# Project Title & Description
### Docs Cli
#### CLI tool for generating README and making perfect commits

Fast and development friendly, Docs Cli is a command line interface tool designed to assist developers in creating optimized README files and committing their code with ease.

## Table of Contents

1. [Installation Instructions](#installation-instructions)
2. [Usage Guide](#usage-guide)
3. [Project Structure](#project-structure)
4. [API Documentation](#api-documentation)
5. [Key Features](#key-features)
6. [Environment Variables](#environment-variables)
7. [Contributing Guidelines](#contributing-guidelines)
8. [License](#license)

## Installation Instructions
```bash
# Install using npm
npm install @docs-cmd/cli

# Install using yarn
yarn add @docs-cmd/cli
```

## Usage Guide
```bash
# Generate a README file
docs-cli generate

# Make a perfect commit
docs-cli commit
```

## Project Structure
```markdown
docs-cli/
├── src/
│   ├── cli.js
│   ├── README_generator.js
│   └── commit_helper.js
├── tests/
│   └── README_generator.spec.js
├── package.json
└── README.md
```

## API Documentation

### README Generator
| Method | URL | Description |
| --- | --- | --- |
| GET | /README | Generates a new README file |

### Commit Helper
| Method | URL | Description |
| --- | --- | --- |
| POST | /commit | Creates a new commit |

## Key Features

- Fast and efficient
- Development friendly
- Optimized README files

## Environment Variables

- `GEN_README`: Enable or disable README generation (`true` or `false`)
- `COMMIT_MESSAGE`: Define a custom commit message

## Contributing Guidelines

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Make changes
4. Commit changes (`docs-cli commit`)
5. Push changes to origin (`git push origin feature/new-feature`)
6. Open a pull request

## License
### MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.