### Where should my files go?

&nbsp;

This guide will show you where to place your jupyter notebook and dataset files, so that IPython notebook can find them.

&nbsp;

##### **Option 1: Place your folders and files where Jupyter can find them by default**

1. Launch the Jupyter Notebook by typing

```powershell
jupyter notebook
```

in the command line (Mac & Linux) or Command Prompt (Windows). You should be greeted in the web browser with the main page:

![Where to Save Files 1](MachineLearning-UWash/where_to_save_files_1.png)

2. From the top right, find the button labeled "New▾". Click the button to get a drop-down menu, and select "Python 3" under the sub-heading "Notebook" This should create a new notebook inside the home directory of Jupyter notebook.

![Where to Save Files 2](MachineLearning-UWash/where_to_save_files_2.png)

3. In the new notebook, run

```powershell
import os
print os.getcwd()
```

to obtain the full path of the **home directory of Jupyter notebook. This path is where your files should go.** Highlight the path and copy it.

4. Place any files (notebooks and datasets) under this home directory using your file browser. You may organize your files using sub-folders.

![Where to Save Files 3](MachineLearning-UWash/where_to_save_files_3.png)

5. All files and folders placed inside the home folder will appear in the main page:

![Where to Save Files 4](MachineLearning-UWash/where_to_save_files_4.png)

&nbsp;

##### **Option 2: run Jupyter Notebook from where the files are**

If you feel comfortable moving around the file system via command line, you may also choose to store your files wherever you like, then simply navigate to that directory and run the notebook there. For example, on command line in Mac/Linux, this looks like:

```powershell
cd <directory_where_my_files_are_stored>
jupyter notebook
```

This option has the advantage of reducing clutter in your home directory.