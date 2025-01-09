**Readme Dox Generator**
========================

**Description**
---------------

Readme Dox Generator is a Node.js CLI tool used to generate professional README files based on user input and project files. The tool employs Markdown syntax for a neat and readable output.

**Features**
------------

- **Efficient Generation**: Fast and streamlined approach to generating README files.
- **Markdown Applied**: Utilizes Markdown syntax for a clear and concise output.
- **Proper README File**: Strictly generates a standard README file that follows best practices.

**Installation**
---------------

```bash
npm install -g @username/readme-dox-generator
```

**Usage**
---------

```bash
rdg  # Run the CLI
```

**Arguments**
------------

| Argument | Description |
| --- | --- |
| `--filename` | Specify the output file name. |

**Example**
-----------

```bash
rdg --filename my-project
```

This will generate a README file named `my-project.md` in the current directory. The file will be organized into sections and utilize Markdown syntax for a clear and readable format.

**Commit Messages**
-------------------

Use the following commit message formats:
```
feat: Add feature X
fix: Fix bug Y
docs: Update README
style: Update code formatting
refactor: Refactor code
perf: Improve performance
test: Add test for feature X
chore: Update dependencies
```
**License**
----------

MIT License

Copyright (c) [Current Year] [Your Name]

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