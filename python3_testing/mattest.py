import numpy as np # module for scientific computing
import matplotlib.pyplot as plt # for generating plots

X_train = np.array([[1,1],[2,2.5],[3,1.2],[5.5,6.3],[6,9],[7,6]])
Y_train = ['red','red','red','blue','blue','blue']

print(X_train[5,0])
print(X_train[5,1])

print(X_train[:,0]) # print all zero indexed data of array elements
print(X_train[:,1]) 

# print dots on a plot, 's' is size of a dot, 'color' - we take from array
plt.figure()
plt.scatter(X_train[:,0],X_train[:,1], s = 170, color = Y_train[:])
plt.show()

# add test point and print iter
x_test = np.array([3,4])
plt.figure()
plt.scatter(X_train[:,0],X_train[:,1], s = 170, color = Y_train[:])
plt.scatter(x_test[0],x_test[1], s = 50, color = 'green')
plt.show()

# define a function that will callable a distance between dots
def dist(x,y):
    return np.sqrt(np.sum((x-y)**2))

# calculate the distance between green dot and every dot on a plot
num = len(X_train) # get number of points
distance = np.zeros(num) # initiate array with zeroes
for i in range(num):
    distance[i] = dist(X_train[i],x_test)
print(distance)

# find color of the closest point to the test point
min_index = np.argmin(distance) # get index of minimum value from array
print(Y_train[min_index]) # print value from color array by index

#########################################################################
#### NOW RECOGNITION ####################################################
#########################################################################

# load digits dataset from sklearn
from sklearn import datasets
digits = datasets.load_digits()
# there are 1797 images in dataset. Two arrays: digits.images and digits.target
print(digits.images[0])

# digits.images[0] is actually a zero 8x8 pixels
plt.figure()
plt.imshow(digits.images[0],cmap = plt.cm.gray_r, interpolation = 'nearest')
plt.show()

# digits.target[0] is actually digit assosiated with image in digits.images[0] 
print(digits.target[0])

############ ACTUAL RECOGNITION #############################################
# get first 10 images from the data set, from index 0 to index 9
X_train = digits.data[0:10]
Y_train = digits.target[0:10]

# get some test image
x_test = digits.data[345]

# let's  print this image just to see what we got
plt.figure()
plt.imshow(digits.images[345],cmap = plt.cm.gray_r, interpolation = 'nearest')
plt.show()

# now let's actually find the closest corresponding image using the code that we had before
num = len(X_train) # get number of points
distance = np.zeros(num) # initiate array with zeroes
for i in range(num):
    distance[i] = dist(X_train[i],x_test)
print(distance)

# find color of the closest point to the test point
min_index = np.argmin(distance) # get index of minimum value from array
print(Y_train[min_index]) # print value from color array by index

# let's make sure we recognized correctly and print target at min index 
print(digits.target[min_index])


#######################################################################
####### CHECK HOW MANY ERROS IF WE TEST 100 IMAGES ####################
#######################################################################
num = len(X_train)
no_errors = 0
distance = np.zeros(num)
for j in range(1697,1797):
    x_test = digits.data[j]
    for i in range(num):
        distance[i] = dist(X_train[i], x_test)
    min_index = np.argmin(distance)
    if Y_train[min_index] != digits.target[j]:
        no_errors += 1
print(no_errors)
# -> 3 errors

# now let's test 1000 images -> only 3 errors
X_train = digits.data[0:1000]
Y_train = digits.target[0:1000]

num = len(X_train)
no_errors = 0
distance = np.zeros(num)
for j in range(1697,1797):
    x_test = digits.data[j]
    for i in range(num):
        distance[i] = dist(X_train[i], x_test)
    min_index = np.argmin(distance)
    if Y_train[min_index] != digits.target[j]:
        no_errors += 1
print(no_errors)


######################################################################
##### ANALYZING TEXT #################################################
######################################################################

X = np.array([[1,1],[2,2.5],[3,1.2],[5.5,6.3],[6,9],[7,6],[8,8]])

plt.figure()
plt.scatter(X[:,0],X[:,1], s = 170, color = 'black')
plt.show()

# import cluster algorithm

from sklearn.cluster import KMeans

k = 2
kmeans = KMeans (n_clusters = k)
kmeans.fit(X)
centroids = kmeans.cluster_centers_ # get centroid's coordinates
labels = kmeans.labels_ # get label assignment

colors = ['r.','g.']
plt.figure()
for i in range(len(X)):
    plt.plot(X[i,0],X[i,1],colors[labels[i]],markersize = 10)
plt.scatter(centroids[:,0],centroids[:,1],marker = 'x', s = 300, linewidth=5)
plt.show()

############################################################################

k = 3
kmeans = KMeans (n_clusters = k)
kmeans.fit(X)
centroids = kmeans.cluster_centers_ # get centroid's coordinates
labels = kmeans.labels_ # get label assignment

colors = ['r.','g.','y.']
plt.figure()
for i in range(len(X)):
    plt.plot(X[i,0],X[i,1],colors[labels[i]],markersize = 30)
plt.scatter(centroids[:,0],centroids[:,1],marker = 'x', s = 300, linewidth=5)
plt.show()

############### CLUSTER TEXT ##################################################

corpus = ['I love CS50. Staff is awesome, awesome, awesome!',
          'I have a dog and a cat.',
          'Best of CS50? Staff. And cakes. Ok, CS50 staff.',
          'My dog keeps chasing my cat. Dogs!'] # This represents a list of strings in Python

# Create bags-of-words matrix
from sklearn.feature_extraction.text import CountVectorizer
count_vect = CountVectorizer(stop_words = 'english')
Z = count_vect.fit_transform(corpus)
# The function fit_transform() takes as input a list of strings and does two things:
# first, it "fits the model," i.e., it builds the vocabulary; second, it transforms the data into a matrix.

# now make dictionary
vocab = count_vect.get_feature_names()
print(vocab)
# -> ['awesome', 'best', 'cakes', 'cat', 'chasing', 'cs50', 'dog', 'dogs', 'keeps', 'love', 'ok', 'staff']          

# Create matrix
from sklearn.feature_extraction.text import TfidfVectorizer
vectorizer = TfidfVectorizer(stop_words = 'english')
X = vectorizer.fit_transform(corpus)
X.todense()

k = 2 # Define the number of clusters in which we want to partion THE data
# Define the proper notion of distance to deal with documents
from sklearn.metrics.pairwise import cosine_similarity
dist = 1 - cosine_similarity(X)
# Run the algorithm KMeans
model = KMeans(n_clusters = k)
model.fit(X)

print("Top terms per cluster:\n")
order_centroids = model.cluster_centers_.argsort()[:, ::-1]
terms = vectorizer.get_feature_names()
for i in range(k):
    print ("Cluster %i:" % i)
    for ind in order_centroids[i, :3]:
        print (' %s,' % terms[ind])
    print ("")