

var canvasVideo = {

    init: function () {

        // Animated scrolls to show off the background
        $('a[data-scrollToID]').click(function () {
            $.scrollTo('#' + $(this).attr('data-scrollToID'), 1000);
        });

        // Canvas elementimizi oluşturuyoruz.
        var videoContainer = document.getElementById('canvasId');
        var videoContext = videoContainer.getContext('2d');

        // Filmde kaç frame oynatılacak.
        var numberOfFrames = 39;

        // window objesinde cache edilecek timeLapseVideo nesnesini oluşturuyoruz.
        timeLapseVideo = new Image();
        $window = $(window);

        // Define the timeLapseVideo element
        // Herbir Resimin boyutu 1280 * 720 
        timeLapseVideo.onload = function () {
            videoContainer.width = $window.width();
            videoContainer.height = $window.height();
            videoContext.drawImage(timeLapseVideo, 0, 0, $window.width(), $window.height());
        }

        // İlk resim karesini  yüklüyoruz.
        timeLapseVideo.src = "img/TimeLapse001.jpg";

        // Calculate how far we have to scroll before changing a frame
        var scrollDistance = $window.height() - $window.scrollTop();
        var totalHeight = $(document).height() - scrollDistance;
        frameDiff = totalHeight / (numberOfFrames - 1);
        // When the window scrolls
        $window.scroll(canvasVideo.windowScroll);

    }, // canvasVideo.init

    windowScroll: function () {

        // Which frame do we need to show
        frameString = (Math.round($window.scrollTop() / frameDiff) + 1).toString();

        // Prepend any 0's where needed - I was too lazy to delete them from the filenames ;)
        if (frameString.length == 1) frameString = '00' + frameString;
        if (frameString.length == 2) frameString = '0' + frameString;

        // Change the image in the canvas
        timeLapseVideo.src = 'img/TimeLapse' + frameString + '.jpg';

        // Display which frame we're on
        $('.frame').html('Frame: ' + frameString + "  Window Height :" + $window.height() + " Document Height :" + $(document).height()
        + " scrollTop :" +$window.scrollTop()
        );

    }, // canvasVideo.windowScroll

    

}

// Off we go...
$(document).ready(canvasVideo.init);