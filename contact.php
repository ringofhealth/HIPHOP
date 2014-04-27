<!doctype html>
<html>

<head>

    <meta charset="utf-8">

    <title>Contact Us</title>

    <!-- meta -->
    <meta name="author" content="Tyler Liu,Paradoxal Design">
    <meta name="description" content="She Got Game explores uncharted territory through the eyes of an aspiring young gamer. This quirky and dynamic documentary will feature interviews with corporate and indie developers, as well as hardcore and casual gamers. We’ll also lead you behind the scenes of major cosplay events and competitions to uncover some of the mysteries surrounding the hardcore fan scene.">
    <meta name="keywords" content="videogames,women,girls,girl gamer,cosplay,toronto,documentary,merge media,2014,she got game,">
    <META NAME="ROBOTS" CONTENT="INDEX, FOLLOW">
    <!-- favicon -->
    <link rel="shortcut icon" href="favicon.png">


    <!-- css -->
    <link rel="stylesheet" type="text/css" href="css/normalize.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/fonts.css">
    <link rel="stylesheet" type="text/css" href="css/custom.css">

    <!-- load modernizr -->
    <script type="text/javascript" src="js/modernizr-2.7.1.js"></script>

    <!-- google fonts -->
    <style>
        input#submit:hover {
        background-color: #fff;
        color: #000;
    }
    </style>

</head>

<body>


    <!-- main sidebar -->
    <div id="sidebar">

        <h1>
            <a id="logo" href="index.html">
                <img src="img/Logo.png">
            </a>
        </h1>

        <nav id="navigation">
            <ul>
                <li>
                    <a href="index.html">Home</a>

                </li>
                <li>
                    <a href="project.html">The Project</a>

                </li>
                <li>
                    <a href="involve.html">Get Involved</a>

                </li>
                <li>
                    <a href="story.html">Stories so far</a>
                </li>
                <li>
                    <a href="about.html">About</a>
                </li>
                <li>
                    <a href="gallery.html">Gallery</a>
                </li>
                <li>
                    <a href="http://shegotgamedoc.blogspot.ca/" target="_blank">Our Blog</a>
                </li>
                <li>
                    <a href="contact.html" class="active">Contact</a>
                </li>
            </ul>
        </nav>

        <a class="kick" href="http://www.kickstarter.com" target="_blank">
            <img src="img/kickstarter.png">
        </a>


        <ul id="social">
            <li>
                <a href="https://www.facebook.com/shegotgamedoc" target="_blank" class="fa fa-facebook"></a>
            </li>

            <li>
                <a href="https://twitter.com/shegotgamedoc" target="_blank" class="fa fa-twitter"></a>
            </li>
            <li>
                <a href="https://www.youtube.com/user/shegotgamedoc/videos" target="_blank" class="fa fa-youtube"></a>
            </li>
        </ul>
        <p class="trade">©2014 Shegotgame - All Rights Reserved</p>

    </div>

    <!-- wrapper -->
    <div id="wrapper">
        <!-- container -->
        <div id="container">

            <div class="page" id="contact">
                <div class="title">
                    <h2>We live in Toronto</h2>
                    <h3>But we work everywhere, get in contact with us!</h3>
                </div>
                <div id="map"></div>
                <ul class="map-nav">
                    <li>
                        <a href="#" id="zoomin"></a>
                    </li>
                    <li>
                        <a href="#" id="zoomout"></a>
                    </li>
                </ul>

                <!-- form -->
                <?php $name=$_POST['name']; $email=$_POST['email']; $message=$_POST['message']; $from='From: Shegotgame' ; $to='shegotgamethemovie@gmail.com' ; $subject='Hello' ; $human=$_POST['human']; $body="From: $name\n E-Mail: $email\n Message:\n $message" ; if ($_POST['submit']) { if ($name !='' && $email !='' ) { if ($human=='4' ) { if (mail ($to, $subject, $body, $from)) { echo '<script type="text/javascript">'; echo 'alert("Message Successfully Sent!")'; echo '</script>';} } else { echo '<script type="text/javascript">'; echo 'alert("Something Went Wrong, Please Go back")'; echo '</script>'; } } else if ($_POST[ 'submit'] && $human !='4' ) { echo '<script type="text/javascript">'; echo 'alert("You answered the anti-spam question incorrectly!")'; echo '</script>'; } else { echo '<script type="text/javascript">'; echo 'alert("You need to fill in all required fields!!")'; echo '</script>'; } } ?>

                <div class="get-in-touch">
                    <form action="contact.php" method="post" name="contacts">
                        <input name="name" value="" placeholder="Name*">

                        <input name="email" value="" type="email" placeholder="Email*">

                        <textarea name="message" value="" placeholder="Message"></textarea>

                        <input name="human" value="" placeholder="*What is 2+2? (Anti-spam)">


                        <div class="col">
                            <input id="submit" name="submit" type="submit" value="Submit">
                        </div>

                    </form>


                </div>

            </div>

        </div>
        <!-- container -->
    </div>
    <!-- wrapper -->

    <!-- google map -->
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script src="js/infobox.js"></script>

    <!-- js -->
    <script type="text/javascript" src="js/jquery-2.0.3.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/page/contact.js"></script>
    <script>
        App.start();
        Mapping.start();
    </script>
    <script>
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-44599513-3', 'shegotgame.ca');
        ga('send', 'pageview');
    </script>
</body>

</html>
