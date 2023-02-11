import os
import markdownify

directory = 'CourseContent\FSWebDev-HKST\Bootstrap\Module1'

for subdir, dirs, files in os.walk(directory):
    for file in files:
        if os.path.splitext(file)[1] == '.html':

            with open(os.path.join(subdir, file), 'r') as f:
                html_string = f.read()

            markdown_string = markdownify.markdownify(
                html_string, heading_style='ATX')

            with open(os.path.splitext(file)[0] + '.md', 'w') as f:
                f.write(markdown_string)

            # Delete the file
            # os.remove(''.join(os.path.join(subdir, file)))
        else:
            continue
