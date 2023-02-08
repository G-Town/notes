import os

directory = 'CourseContent'

for subdir, dirs, files in os.walk(directory):
    for file in files:
        if os.path.splitext(file)[1] == '.ipynb':
            exe_command = 'jupyter nbconvert "{}" --to html'.format(''.join(os.path.join(subdir, file)))
            
            # print the command`enter code here`
            # print (exe_command)
            
            os.system(exe_command)
            
            # Delete the file 
            # os.remove(''.join(os.path.join(subdir, file)))
        else:
            continue