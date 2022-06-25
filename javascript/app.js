let sendRequest,
    response;

$(window).on('load', function(){

    new WOW().init(); 
});
document.addEventListener('scroll', function(){
    if(document.documentElement.scrollTop >= 2700){
        $('.backUp').removeClass('d-none')
    }else{
        $('.backUp').addClass('d-none')
    }
})
$('.backUp').click(function(){
    document.documentElement.scrollTop = 0
})
$('.items ul li').not('.item6').click(function(){
    $('.items ul li').removeClass('active')
    $('.items ul li a').removeClass('active')
    $(this).addClass('active')
})
$('.item6 a').click(function(){
    $('.items ul li').removeClass('active')
    $('.item6 a').addClass('active')
})
async function displayMovies(api){
    let movies = ``
    let release,
        title;
    sendRequest = await fetch(api),
    response = await sendRequest.json();
    for(let i=0; i<response.results.length; i++){
        if(response.results[i].first_air_date == undefined){
            release = response.results[i].release_date
        }else if(response.results[i].release_date == undefined){
            release = response.results[i].first_air_date
        }
        
        if(response.results[i].title == undefined && response.results[i].original_name == undefined){
            title = response.results[i].original_title
        }else if(response.results[i].original_title == undefined){
            title = response.results[i].original_name
        }else if(response.results[i].original_name == undefined){
        title = response.results[i].title
        }
        movies += `
        <div class="col-lg-4 col-md-6">
            <div class="rounded shadow position-relative">
                <div class="overlay position-absolute top-0 bottom-0 start-0 end-0  d-flex align-items-center justify-content-center text-center flex-column">
                    <h2 class="title fw-light">${title}</h2>
                    <p class="description fw-bold">${response.results[i].overview}</p>
                    <p class="rate fw-bold">rate: ${response.results[i].vote_average}</p>
                    <p class="relase fw-bold">${release}</p>
                </div>
                <img src="https://image.tmdb.org/t/p/w500/${response.results[i].poster_path}" class="img-fluid">
            </div>
        </div>
    </div>`
    }
    $('.moviesCont .row').html(movies)
}
displayMovies('https://api.themoviedb.org/3/trending/all/day?api_key=d5d818c1f370c4bd1751aaac8c9daf38')
$('.sideBar .close .fa-bars').click(function(){
    $('.sideBar .main').css({
        left: '250px'
    })
        $('.sideBar .close .fa-xmark').removeClass('d-none')
        $(this).addClass('d-none')
        $('.content').animate({
            width: '250px'
        }, function(){
            $('.socials-links').html(`  <div class="links d-flex wow bounceInUp">
            <div><i class="fa-brands fa-facebook-f"></i></div>
            <div><i class="fa-brands fa-twitter"></i></div>
            <div><i class="fa-solid fa-globe"></i></div>
        </div>
        <p class="copyright wow bounceInLeft">Copyright Â© 2019 All Rights Reserved.</p>`)
            $('.item1').animate({
                opacity: '1'
            }, function(){
                $('.content .socials-links').removeClass('visually-hidden')
                $('.item2').animate({
                    opacity: '1'
                }, function(){
                    $('.item3').animate({
                        opacity: '1'
                    }, function(){
                        $('.item4').animate({
                            opacity: '1'
                        }, function(){
                            $('.item5').animate({
                                opacity: '1'
                            }, function(){
                                $('.item6').animate({
                                    opacity: '1'
                                })
                            })
                        })
                    })
                })
            })
        })
})

$('.sideBar .close .fa-xmark').click(function(){
    $(this).addClass('d-none')
    $('.sideBar .close .fa-bars').removeClass('d-none')
    $('.sideBar .main').css({
        left: '0'
    })
    $('.content').css({
        width: '0px'
    })
    $('.content ul li').animate({
        opacity: '0'
    })
    $('.content .socials-links').addClass('visually-hidden')
    
})
$('.item1').click( function(){ //Now Playing
    displayMovies('https://api.themoviedb.org/3/movie/now_playing?api_key=d5d818c1f370c4bd1751aaac8c9daf38')
})
$('.item2').click(function(){ //Popular
    displayMovies('https://api.themoviedb.org/3/movie/popular?api_key=d5d818c1f370c4bd1751aaac8c9daf38')
})
$('.item3').click(function(){ //Top Rated
    displayMovies('https://api.themoviedb.org/3/movie/top_rated?api_key=d5d818c1f370c4bd1751aaac8c9daf38')
})
$('.item4').click(function(){ //Trending
    displayMovies('https://api.themoviedb.org/3/trending/all/day?api_key=d5d818c1f370c4bd1751aaac8c9daf38')
})
$('.item5').click(function(){ //Upcoming
    displayMovies('https://api.themoviedb.org/3/movie/upcoming?api_key=d5d818c1f370c4bd1751aaac8c9daf38')
})
function validation(){
    let nameRegex = /^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/,
        emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/,
        passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        ageRegex = /^(1[89]|[2-9]\d)$/;
        if($('.name').val().toLowerCase().match(nameRegex) && $('.email').val().toLowerCase().match(emailRegex) && $('.phone').val().toLowerCase().match(phoneRegex) && $('.password').val().toLowerCase().match(passwordRegex) && $('.age').val().toLowerCase().match(ageRegex) ){
            if( $('.password').val().toLowerCase().match(passwordRegex) ==  $('.confirm').val().toLowerCase()){
                $('.submit').removeClass('grayed')
            }else{
                $('.submit').addClass('grayed')
            }
        }

        $('.name').keyup(function(){
            if(!$('.name').val().toLowerCase().match(nameRegex)){
                $('.validName').removeClass('d-none')
            }else{
                $('.validName').addClass('d-none')
            }
        })
        $('.email').keyup(function(){
            if(!$('.email').val().toLowerCase().match(emailRegex)){
                $('.validEmail').removeClass('d-none')
            }else{
                $('.validEmail').addClass('d-none')
            }
        })
        $('.phone').keyup(function(){
            if(!$('.phone').val().toLowerCase().match(phoneRegex)){
                $('.validPhone').removeClass('d-none')
            }else{
                $('.validPhone').addClass('d-none')
            }
        })
        $('.password').keyup(function(){
            if(!$('.password').val().toLowerCase().match(passwordRegex)){
                $('.validPass').removeClass('d-none')
            }else{
                $('.validPass').addClass('d-none')
            }
        })
        $('.confirm').keyup(function(){
            if($('.password').val().toLowerCase() != $('.confirm').val().toLowerCase()){
                $('.validConfirm').removeClass('d-none')
            }else{
                $('.validConfirm').addClass('d-none')
            }
        })
        $('.age').keyup(function(){
            if($(this).val() < 18){
                $('.validAge').removeClass('d-none')
                $('.validAge2').addClass('d-none')
            }else if(!$('.age').val().toLowerCase().match(ageRegex)){
                $('.validAge2').removeClass('d-none')
                $('.validAge1').addClass('d-none')
            }
            else{
                $('.validAge').addClass('d-none')
                $('.validAge2').addClass('d-none')
            }
        })
}

$(document).keyup(validation)
let tracker = false;
$('.showPassword').click(function(){
    if(tracker == false){
        $(this).html(`<i class="fa-solid fa-lock-open"></i>`)
        document.querySelector('.password').type = 'text'
        tracker = true
    }else{
        $(this).html(`<i class="fa-solid fa-lock"></i>`)
        document.querySelector('.password').type = 'password'

        tracker = false
    }
})
let tracker2 = false;
$('.showPassword2').click(function(){
    if(tracker2 == false){
        $(this).html(`<i class="fa-solid fa-lock-open"></i>`)
        document.querySelector('.confirm').type = 'text'
        tracker2 = true
    }else{
        $(this).html(`<i class="fa-solid fa-lock"></i>`)
        document.querySelector('.confirm').type = 'password'

        tracker2 = false
    }
})
let search = ``;
$('.search').keyup(function(){
    search = this.value
    let url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=81e23fe235051c37f5bf3559cf4ea894`
    if(search.length >= 2){
        displayMovies(url)
    }else if(search == ''){
        displayMovies('https://api.themoviedb.org/3/trending/all/day?api_key=d5d818c1f370c4bd1751aaac8c9daf38')
    }
})
