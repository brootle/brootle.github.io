$(function () {

    'use strict'

    var selectedPage = 0;
    var posts;
    var numberOfPostsOnPage = 10;

    AddSearchNavigation();

    function AddSearchNavigation() {

        
        // wrap our search plugin
        $('.search').wrap("<div class='search-wrapper'></div>");

        // add search text field and search button
        $('.search').append('<input id="q" class="search__textfield" type="text" placeholder="Search for..."  />');
        $('.search').append('<input class="search__button" type="button" value="Search" />');

        // add event listener to search button
        $('.search__button').on('click', RequestData);
    }

    function AddResultsToPage(data) {
        // add pevious 1 2 3 4 5 6 7 8 9 10 next navigation
        // get total results number

        if ($('.search-navigation-links').length) {
            $('.search-navigation-links').remove();
            selectedPage = 0;
        }

        console.log('total results: ', data['totalResults']);

        posts = data['posts'];

        var postsNumber = data['posts'].length;
        console.log('posts: ', postsNumber);

        var totalResults = data['totalResults'];

        var numberOfPages = Math.ceil(totalResults / numberOfPostsOnPage);
        console.log('number of pages: ', numberOfPages);

        // add navigation div
        $('.search').append('<div class="search-navigation-links"></div>');

        // here we add pages and event listeners
        // add 1st page as selected by default
        $('.search-navigation-links').append('<a class="search-navigation-links__numbers--selected">' + 1 + '</a>');
        var pageCounter = 1;
        while (pageCounter < numberOfPages && pageCounter < numberOfPostsOnPage) {
            $('.search-navigation-links').append('<a class="search-navigation-links__numbers">' + (pageCounter + 1) + '</a>');
            pageCounter++;
        }
        $('.search-navigation-links__numbers').on('click', { direction: 'number clicked' }, UpdateResultsPage);

        //trigger initial page results
        $('.search-navigation-links__numbers--selected').on('click', { direction: 'initiate' }, UpdateResultsPage);
        $('.search-navigation-links__numbers--selected').trigger('click');

    }

    function UpdateResultsPage(event) {

        if (event.data.direction === 'initiate') {
            selectedPage = 0;
        } else {
            // round button was clicked
            selectedPage = $(this).index();
        }

        console.log('selected page: ', selectedPage);
        setActivePage();

        if ($('.search-results').length) {
            $('.search-results').remove();
        }

        // add results to the page!
        // here we must look through our data
        for (var i = selectedPage * numberOfPostsOnPage; i < ((selectedPage +1) * numberOfPostsOnPage); i++) {
            if (i < posts.length) {
                if (posts[i].title === '') {
                    var title = posts[i].text.slice(0, 100) + '...';
                    $(".search").append('<div class="search-results"><a href="' + posts[i].url + '" target="_blank">' + title + '</a>' + '<p>' + posts[i].text.slice(0, 200) + '...' + '</p>' + '</div>');
                } else {
                    $(".search").append('<div class="search-results"><a href="' + posts[i].url + '" target="_blank">' + posts[i].title + '</a>' + '<p>' + posts[i].text.slice(0, 200) + '...' + '</p>' + '</div>');
                }
            }
        }
    }

    function setActivePage() {
        // need to add event handler to the button that was SELECTED
        $('.search-navigation-links__numbers--selected').on('click', { direction: '0' }, UpdateResultsPage).removeClass('search-navigation-links__numbers--selected').addClass('search-navigation-links__numbers');
        // we also must remove event handler from selected button
        $('.search-navigation-links__numbers').eq(selectedPage).off('click').removeClass('search-navigation-links__numbers').addClass('search-navigation-links__numbers--selected');
    }


    function RequestData() {

        var parameters = {
            token: 'dc2e336c-0244-4317-be31-3b93bd72fc3c',
            format: 'json',
            language: 'english',
            q: $("#q").val()
        };

        $.getJSON("https://webhose.io/search", parameters)
        .done(function (data, textStatus, jqXHR) {

            // here we analyze data and add search results to the page
            console.log(data);

            AddResultsToPage(data);

        })
         .fail(function (jqXHR, textStatus, errorThrown) {

             // log error to browser's console
             console.log(errorThrown.toString());
         });
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
});