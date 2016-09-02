$(function () {

    'use strict'

    var selectedPage = 0;
    var posts = [];
    var numberOfPostsOnPage = 10;
    var next10Pages = '';
    var previous10Pages = '';
    var next10PagesCounter = 0;
    var timeStampParameter;

    AddSearchNavigation();

    function AddSearchNavigation() {

        
        // wrap our search plugin
        $('.search').wrap("<div class='search-wrapper'></div>");

        // add search text field and search button
        $('.search').append('<input id="q" class="search__textfield" type="text" placeholder="Search for..."  />');
        $('.search').append('<input class="search__button" type="button" value="Search" />');

        // add event listener to search button and search textfield
        //$('.search__button').on('click', { direction: 'search button' }, UpdateResultsPage);

        $('.search__button').on('click', function () {
                selectedPage = 0;
                resetSearch()
        });
        
        $(".search__textfield").keyup(function (e) {
            if (e.keyCode == 13) {
                resetSearch()
            }
        });
    }

    function resetSearch() {
        selectedPage = 0;
        next10Pages = '';
        previous10Pages = '';
        next10PagesCounter = 0;
        timeStampParameter = '';
        RequestData();
    }

    function AddNavigationLinks(data) {
        // add pevious 1 2 3 4 5 6 7 8 9 10 next navigation
        // get total results number

        if ($('.search-navigation-links').length) {
            $('.search-navigation-links').remove();
            selectedPage = 0;

            //console.log('clear navigation links');
        }

        if ($('.search__summary').length) {
            $('.search__summary').remove();
        }

        // add search data
        if (data['moreResultsAvailable'] === 0) {
            $('.search').append('<div class="search__summary">There are ' + data['totalResults'] + ' results in total</div>');
        } else {
            $('.search').append('<div class="search__summary">There are ' + data['moreResultsAvailable'] + ' more results available</div>');
        }
        //console.log('total results: ', data['totalResults']);

        posts = data['posts'];

        var postsNumber = data['posts'].length;
        //console.log('posts: ', postsNumber);

        var totalResults = data['totalResults'];

        var numberOfPages = Math.ceil(totalResults / numberOfPostsOnPage);
        //console.log('number of pages: ', numberOfPages);

        // add navigation div
        $('.search').append('<div class="search-navigation-links"></div>');

        // here we add pages and event listeners
        // add 1st page as selected by default
        $('.search-navigation-links').append('<a class="search-navigation-links__numbers--selected">' + (1 + next10PagesCounter * numberOfPostsOnPage) + '</a>');
        var pageCounter = 1;
        while (pageCounter < numberOfPages && pageCounter < numberOfPostsOnPage) {
            $('.search-navigation-links').append('<a class="search-navigation-links__numbers">' + (pageCounter + 1 + next10PagesCounter * numberOfPostsOnPage) + '</a>');
            pageCounter++;
        }
        $('.search-navigation-links__numbers').on('click', { direction: 'number clicked' }, UpdateResultsPage);

        //trigger initial page results
        $('.search-navigation-links__numbers--selected').on('click', { direction: 'initiate' }, UpdateResultsPage);
        $('.search-navigation-links__numbers--selected').trigger('click');

        // if next button was clicked at least once we must add previous button
        if (next10PagesCounter > 0) {
            $('.search-navigation-links').prepend('<a class="search-navigation-links__previous">' + 'Previous 10' + '</a>');
            $('.search-navigation-links__previous').on('click', { direction: 'previous clicked' }, UpdateResultsPage);
        }

        // if there are more than 10 pages we must add next 10 pages button
        if (numberOfPages > 10) {
            next10Pages = getParameterByName('ts', data['next']);
            timeStampParameter = next10Pages;
            $('.search-navigation-links').append('<a class="search-navigation-links__next">' + 'Next 10' + '</a>');
            $('.search-navigation-links__next').on('click', { direction: 'next clicked' }, UpdateResultsPage);
        }

    }


    function UpdateResultsPage(event) {

        //if (event.data.direction === 'initiate') {
        //    selectedPage = 0;

        //} else if (event.data.direction === 'next clicked') {
        if (event.data.direction === 'next clicked') {
            next10PagesCounter++;

            previous10Pages = next10Pages;

            RequestData();
        } else if (event.data.direction === 'previous clicked') {
            next10PagesCounter--;

            if (next10PagesCounter === 0) {
                previous10Pages = '';
            }

            timeStampParameter = previous10Pages;

            RequestData();
        } else if (event.data.direction === 'search button') {
            // if search button was clicked

            selectedPage = 0;
            next10Pages = '';
            previous10Pages = '';
            next10PagesCounter = 0;
            timeStampParameter = '';

            RequestData();

        }
        else {
            // number link was clicked
            // get index of selected page
            selectedPage = ($(this).html() - 1 - (next10PagesCounter * numberOfPostsOnPage));
        }

        setActivePage();

        if ($('.search-results').length) {
            $('.search-results').remove();
        }

        addSearchResultsToPage();

    }

    function addSearchResultsToPage() {
        for (var i = selectedPage * numberOfPostsOnPage; i < ((selectedPage + 1) * numberOfPostsOnPage) ; i++) {
            if (i < posts.length) {
                if (posts[i].title === '') {
                    var title = posts[i].text.slice(0, 100) + '...';
                    $(".search").append('<div class="search-results"><a href="' + posts[i].url + '" target="_blank">' + title + '</a>' + '<p class="search-results__text">' + posts[i].text.slice(0, 200) + '...' + '</p>' + '</div>');
                } else {
                    $(".search").append('<div class="search-results"><a href="' + posts[i].url + '" target="_blank">' + posts[i].title + '</a>' + '<p class="search-results__text">' + posts[i].text.slice(0, 200) + '...' + '</p>' + '</div>');
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
            ts: timeStampParameter,
            q: $("#q").val()
        };

        $.getJSON("https://webhose.io/search", parameters)
        .done(function (data, textStatus, jqXHR) {

            // read more about parameters at https://webhose.io/documentation

            // here we analyze data and add search results to the page
            console.log(data);

            AddNavigationLinks(data);

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