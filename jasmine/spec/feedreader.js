/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Makes sure all feeds have a url
        
         it('have url', function(){
            let allHaveURL = true;
            for(let feed of allFeeds){
                if(feed.url ==null|| feed.url ==""){
                    allHaveURL = false;
                }
            }
            expect(allHaveURL).toBe(true);

         });


        // Makes sure all feeds have a name
        

         it('have name', function(){
            let allHaveName = true;
            for(let feed of allFeeds){
                if(feed.name ==null|| feed.name ==""){
                    allHaveName = false;
                }
            }
            expect(allHaveName).toBe(true);

         });
    });


    // test suite for menu
    describe('The menu', function(){
        // makes sure the slide menu starts off as hidden
        


         it('default is hidden', function(){
            var slide_menu = document.getElementsByClassName("slide-menu")[0];
            let computed_style = window.getComputedStyle(slide_menu);
            expect(computed_style.transform).toBe("matrix(1, 0, 0, 1, -192, 0)");

         })

         /* makes sure the menu's visibility is toggled when
         / menu-icon-link is clicked
          */

        it('visibility toggle works', function(){
            var menu_icon = $(".menu-icon-link")[0];
            menu_icon.click()
            expect($('body').hasClass("menu-hidden")).toBe(false);
            menu_icon.click();
            expect($('body').hasClass("menu-hidden")).toBe(true);
         })


    })

        

   
    describe('Initial Entries', function(){
           // Makes sure load Feed loads at least one entry
         

         beforeEach(function(done){
            loadFeed(0, done);
         })

         it('should have at least one entry', function(done) {
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
         })
    })

     


    describe('New Feed Selection', function(){
        // Esures Feed reader changes when loading a new feed
        

         beforeEach(function(done){
            window.feedList = [];

            
            loadFeed(0, function(){
                window.feedZero = document.getElementsByClassName("feed")[0].innerHTML;
            
                loadFeed(1, function(){
                window.feedOne = document.getElementsByClassName("feed")[0].innerHTML;
                done();
                })
            })

         })

         it('should change feed info changes when new feed is loaded', function(done){
            expect(window.feedZero!=window.feedOne).toBe(true);
            done();
         })

         
    })


}());
