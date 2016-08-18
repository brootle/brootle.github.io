$(function () {
    console.log('DOM loaded with jQuery - short version');

    var html = $('#test').html();


    var articles = [
        {
            title: 'Article 1',
            content: 'kjhkdjf hskjdf skjf hskjdfh skj hfks dfhksj hfdksfh'
        },
        {
            title: 'Article 2',
            content: 'kjhkdjf hskjdf skjf hskjdfh skj hfks dfhksj hfdksfh'
        },
        {
            title: 'Article 3',
            content: 'kjhkdjf hskjdf skjf hskjdfh skj hfks dfhksj hfdksfh'
        }
    ]

    var content = tmpl(html, {
        data: articles
    });

    $('body').append(content);
});