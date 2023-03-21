# md2sapbloghtml
Transpile MD files to HTML for SAP Blogs to enable collboration

To collaborate on SAP Blogs we can use [Markdown](https://en.wikipedia.org/wiki/Markdown) for the draft, collaborate on it e.g. using git and transpile it into the HTML required for creating an [SAP Blog](https://blogs.sap.com).

Markdown Cheat Sheet: https://www.markdownguide.org/cheat-sheet/ 

## Usage

Create your `markdown` file containing your blog post. I included an example [in here](sample.md) for [my own blog post](https://blogs.sap.com/2022/11/18/sap-business-one-event-mesh-integration-using-b1if/). The result of the transpilation can be seen in [this file](blog.html).

To transpile your `markdown` into the `html` required for SAP Blogs run the command `npm run transpile -- <name of markdown file> <name of html file>`. If you do not supply an input file, the name `input.md` will be assumed and searched for. If you do not supply an output file, the name `blog.html` will be assumed and the resulting file will be put in the location where the npm command was issued. If only one file is provided, it is assumed that it is the input markdown file. The resulting file would again be `blog.html`.

Copy & paste the resulting `html` content into the `Text` section of the blog editing pane on blogs.sap.com.

Since images must be uploaded to the server on the blog page, the image placeholders highlighted in red need to be replaced with the corresponding images in the `Visual` editor on the blog editing page.

## Todo:

Currently none 🤗 -> open an issue if you find something
