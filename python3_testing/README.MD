================ STEP 1
https://www.scipy.org/install.html

To install via pip on Mac or Linux, first upgrade pip to the latest version:

python -m pip install --upgrade pip
Then install the SciPy stack packages with pip. We recommend a user install, using the --user flag to pip (note: don’t use sudo pip, that will give problems). This installs packages for your local user, and does not need extra permissions to write to the system directories:

pip install --user numpy scipy matplotlib ipython jupyter pandas sympy nose

================ STEP 2
https://www.howtoinstall.co/en/ubuntu/xenial/python-tk
Install python-tk 
sudo apt-get update
sudo apt-get install python-tk

================ STEP 3
install scikit-learn module
pip install --user scikit-learn 

=======================================================
========== MATERIALS ==================================
=======================================================

https://www.kaggle.com/ - datasets
https://www.tensorflow.org/ - open source machine learning
https://deepdreamgenerator.com/ - modify photos using AI

============= RUNNING FLASK ===========================
INSTRUCTIONS HERE http://stackoverflow.com/a/31253927/6261255
Must install virtual env
    $ sudo apt install virtualenv
Run below, flask folder gets created
    $ virtualenv flask
Go to flask folder
    $ cd flask
Activate virtualenv
    $ source bin/activate
Install flask in virtualenv
    $ pip install flask

# if running via virtualenv - http://127.0.0.1:5000/

# OR below, but need to activate virtualenv as above
# $ export FLASK_APP=hello.py
# $ export FLASK_DEBUG=1
# $ flask run --host=0.0.0.0 --port=8080
# it will be at http://127.0.0.1:8080/

# run command to exit flask enviroment
#  $ deactivate