// neural network code

// define neural network variable
// and everything will be inside one function 

// this is FEED FORWARD NEURONET

var Neural = (function (Neural){
    'use strict';

    // there are 3 layes
    // each layer has a collection of nodes
    // here we want to get size of each layer
    // this will be a number of nodes(neurons) in each layer
    function getSizes(nodes){
        return nodes.map(function(layer){
            return layer.length;
        });
    }

    // create actual node 
    function makeNode(layerIndex, index, sizes, nodes){
        // initialize it
        // initial input of the node is ZERO
        var node = {
            input: 0
        }

        // define threshold
        // after threshold is reached it can propagate further
        // 'sizes.length' this is for layers
        if(layerIndex < sizes.length - 1){
            // initialize the threshold
            // it can be undefined of have value of 1
            node.threshold = (typeof nodes === 'undefined') ? 1 : 
                nodes[layerIndex][index].threshold;
            // each node is connected to each node in the next layer
            // so this is 2 dimentional matrix of values
        }

        // define nodes weigths
        node.weights = (typeof nodes === 'undefined') ? new Array[sizes[layerIndex + 1]] :
                nodes[layerIndex][index].weights.map(function(w){
                    return w;
                });

        return node;
    }

    // define neural network
    // size is equal to number of nodes
    function Net(sizesOrNodes){
        // define variables for both, sizes and nodes
        var sizes, nodes;

        // check if parameter is not empty
        if(Array.isArray(sizesOrNodes) && Array.isArray(sizesOrNodes[0])){
            sizes = getSizes(sizesOrNodes);
            nodes = sizesOrNodes;
        } else {
            sizes = sizesOrNodes;
        }

        // now define how many nodes we have
        // we calculate the number of nodes
        // we define nodes and initialize layers at the same time
        this.nodes = sizes.map(function(size, i){
            var layer = new Array(size);
            for(var j = 0; j < size; j++){
                layer[j] = makeNode(i, j, sizes, nodes);
            }
            return layer;
        });
    }

    // set weight values
    Net.prototype.setWeights = function Net_setWeights(weights){
        // in each Layer there is a collection of Nodes
        // and each Node has 2 dimentional matrix of weights
        // and is connected to every other Node in next Layer
        
        // we use 2 indexes, where we are in the layer and 
        // where we are in the weights matrix
        this.eachNode(false, function(node, layerIndex, index){
            node.weights = weights[layerIndex][index].map(function(w){
                return w;
            });
        });
    }

    // Say that our neural net equals to the neural net we just initialized
    Neural.Net = Net;

    return Neural;

    // STOPPED AT https://youtu.be/0a-52ntK3T8?t=39m28s

});