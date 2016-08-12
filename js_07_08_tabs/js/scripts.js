$(function () {
    console.log('DOM loaded with jQuery - short version');

    // get all links in tab menu
    var nabigationTabLinks = $('.tabs__navigation a');

    // get all DIVs with text
    var tabTexts = $('.tabs__text');

    // set selected tab by default to 0
    var selectedTab = 0;
    // show text of selected tab
    var selectedText = tabTexts.get(selectedTab);
    $(selectedText).show();

    // remove href from selected tab
    $(nabigationTabLinks.get(selectedTab)).removeAttr('href');

    nabigationTabLinks.on('click', function (e) {
        e.preventDefault(); // prevent default behavior of the link
        // e is the event that called our function

        // when we click link in a tab

        // 1. hide text of selected tab
        selectedText = tabTexts.get(selectedTab);
        $(selectedText).hide();

        // 2. add href to selected tab
        $(nabigationTabLinks.get(selectedTab)).attr('href', '#tabs-' + selectedTab);

        // 3. save the ID of the tab we selected now
        selectedTab = nabigationTabLinks.index(this);
        // 4. remove href for this tab
        $(nabigationTabLinks.get(selectedTab)).removeAttr('href');
        // 5. show text assosiated with this tab
        selectedText = tabTexts.get(selectedTab);
        $(selectedText).show();
    });
});