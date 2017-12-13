(function($){
    $(function(){
        /* ---------------------------------点击小图片切换大图片---------------------------- */
        $('.small_img li img').click(function(){
            $('.big_img img').attr('src',$(this).attr('src'));
        });
        /* --------------------------------------左右切换图片------------------------------ */
        var index = 0;        
        $('.to_left').click(function(){
            var curImg = findBlock().find('img');
            index--;
            if(index >= 0){
                $('.to_right').show();
                $('.big_img img').attr('src',curImg.eq(index).attr('src'));
            }
            if(index === 0){
                $('.to_left').hide();
            }
        });
        $('.to_right').click(function(){
            var curImg = findBlock().find('img');
            index++;
            if(index < curImg.length){
                $('.to_left').show();
                $('.big_img img').attr('src',curImg.eq(index).attr('src'));
            }
            if(index === curImg.length - 1){
                $('.to_right').hide();
            }
        });
        // 当前显示的小图片列表
        function findBlock(){
            var curImgList = $('.small_img').filter(function(k,v){
                if($(v).css('display') === 'block'){
                    return v;
                }
            });
            return curImgList;
        }
        /* -----------------------------------选择颜色切换颜色----------------------------- */
        $('.color_tab li a img').click(function(){
            // 切换大图
            $('.big_img img').attr('src',$(this).attr('src'));
            // 切换小图片
            $('.small_img').hide().eq($(this).parents('li').index()).show();
            // 切换颜色信息
            $('.color').html($(this).next().html());
        });
        /* -----------------------------------选择尺码------------------------------------ */
        $('.size_num').click(function(){
            $('.size_num').removeClass('size_num_checked').eq($(this).index() - 1).addClass('size_num_checked'); 
        });
        /* -----------------------------------加减数量------------------------------------ */
        $('.reduce').click(function(){
            var num = Number($('.num').html());
            num--;
            if(num < 1){
                $('.num').html(1);
            } else{
                $('.num').html(num);
                $('.add').css('color', '#000');
            }
            if(num === 1){
                $('.add').css('color', '#000');
                $('.reduce').css('color', '#ccc');
            };
        });
        $('.add').click(function () {
            var num = Number($('.num').html());
            num++;
            if(num > 2){
                $('.num').html(2);
                $(this).css('color','#ccc');
                $('.no').css('visibility','visible');
                setTimeout(function(){
                    $('.no').css('visibility','hidden');
                },2000);
            } else{
                $('.num').html(num);
                $('.reduce').css('color', '#000');
            }
        }); 
        /* ----------------------------------------倒计时--------------------------------------- */
        var starttime = new Date("2017/12/20");
        setInterval(function () {
            var nowtime = new Date();
            var countdown = starttime - nowtime;
            var day = parseInt(countdown / 1000 / 60 / 60 / 24);
            var hour = parseInt(countdown / 1000 / 60 / 60 % 24);
            var minute = parseInt(countdown / 1000 / 60 % 60);
            var seconds = parseInt(countdown / 1000 % 60);
            day = String(day).length < 2 ? '0' + day : day;
            hour = String(hour).length < 2 ? '0' + hour : hour;
            minute = String(minute).length < 2 ? '0' + minute : minute;
            seconds = String(seconds).length < 2 ? '0' + seconds : seconds;
            $('.count_down_con').html('<span class="day">' + day + '<i></i></span>天<span class="hour">' + hour + '<i></i></span>时<span class="minute">' + minute + '<i></i></span>分<span class="second">' + seconds + '<i></i></span>秒');
        }, 1000);
    });
})(jQuery);