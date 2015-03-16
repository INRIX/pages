var gettext = gettext || function (text) {return text;};


(function($) {

    $.fn.pages = function() {

        var pageContainer = this,
            pages = pageContainer.find('.page');

        pageContainer.find('.page-title, .page-nav, .page-back-button, .page-next-button').remove();

        pages.each(function(index) {

            var pageName = getName(this),
                allPageNames = getNames(pages, pageName);

            $(this).prepend(
                '<div class="page-title">' +
                pageName +
                '</div>' +
                '<div class="page-nav">' +
                allPageNames.join(pageTitleSeparator) +
                '</div>' +
                clearDiv);

            if (index !== pages.length -1) {
                $(this).append(nextButton(pages, index));
            }

            if (index !== 0) {
                $(this).hide();
                $(this).append(backButton(pages, index));
            }

        });
    };

    var clearDiv = '<div class="clear" />',
        pageTitleSeparator = ' <hr class="page-nav-separator"> ';

    function getName(page) {
        if ($(this).attr('page-name')) {
            return $(this).attr('page-name');
        }
        return $(page).attr('page-name');
    }

    function getNames(pages, pageName) {
        var allPageNames = pages.map(getName).get();
        $.each(allPageNames, function (index, value) {
            if (pageName === value) {
                allPageNames[index] = '<span class="active">' + value + '</span>';
            }
        });
        return allPageNames;
    }

    function backButton(pages, index) {
        var buttonText = gettext('Back'),
            button = $(clearDiv + '<div class="page-back-button">' + buttonText + '</div>');
        button.click(function () {
            $(pages[index]).hide();
            $(pages[index - 1]).show();
        });
        return button;
    }

    function nextButton(pages, index) {
        var buttonText = gettext('Next') + '&#62',
            button = $('<div class="page-next-button">' + buttonText + '</div>');
        button.click(function () {
            $(pages[index]).hide();
            $(pages[index + 1]).show();
        });
        return button;
    }

}(jQuery));
