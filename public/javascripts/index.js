var socket  =  (function(){
    var socket = io();
    socket.on('msg',function(msg){
        console.log('接受到:'+msg);
        chat.receive(2,msg);
    });

    return socket;
})();
var chat = {
    //isScroll.js  句柄
    scroll: null,
    //type:1  时间 text:   type:2 消息
    send: function (type, text) {
        var temp = text;
        if (type === 1) {
            text = '<li class="chat_r" ><img src="image/ui_23.png" class="touxiang" height="54" width="54" alt=""> <p><img src="' + text + '" height="50" width="50"  alt=""></p></li>';
        }
        if (type === 2) {
            text = '<li class="chat_r" ><img src="image/ui_23.png" class="touxiang" height="54" width="54" alt=""> <p>' + text + '</p></li>';
        }
        $('#chat_rl').append(text);
        this.scroll.refresh();
        this.scroll.scrollToElement($('#chat_rl').children().last()[0]);
        socket.emit('msg',temp);
    },
    //type:1  时间   type:2 消息
    receive: function (type, text) {
        if (type === 1) {
            text = '<li class="chat_l" ><img src="image/ui_23.png" class="touxiang" height="54" width="54" alt=""> <p><img src="' + text + '" height="50" width="50"  alt=""></p></li>';
        }
        if (type === 2) {
            text = '<li class="chat_l" ><img src="image/ui_23.png" class="touxiang" height="54" width="54" alt=""> <p>' + text + '</p></li>';
        }
        $('#chat_rl').append(text);
        this.scroll.refresh();
        this.scroll.scrollToElement($('#chat_rl').children().last()[0]);
    },

    getBlobURL: (window.url && URL.createObjectURL.bind(URL)) ||
    (window.webkitURL && webkitURL.createObjectURL.bind(webkitURL)) ||
    window.createObjectURL
};
//footer底部  发送等触发事件处理函数
var footer = {
    //input
    input:document.querySelector('.footerCon .m'),

    //发送按钮
    send:function(){
        chat.send(2, this.input.value.replace(/^\s*|\s*$/g,''));
        this.input.value = '';
    },
    //回车键
    enter:function (e) {
        var t = this.input.value.replace(/^\s*|\s*$/g,'');
        if (e.keyCode !== 13 || t === '' || t === undefined)
            return;
        chat.send(2, t);
        this.input.value = '';
    },

}

function loaded() {
    chat.scroll = new IScroll('#wrapper', {mouseWheel: true});
}

window.onload = function () {
    loaded();
    //isScroll.js  插件监听事件
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
    //监听选择文件  图片  事件
    $('.footerXun').find('input[type="file"]').change(function () {
        if (this.files.length > 0) {
            var reader = new FileReader();
            reader.readAsDataURL(this.files[0]);
            reader.addEventListener("load", function () {
                chat.send(1, reader.result);
            }, false);
        }
    });

    //监听键盘enter事件
    window.onkeydown = function (e) {
        footer.enter(e);
    };

    //事件委托方式
    document.querySelector('.footerCon').onclick = function(event){
        var target = (event || window.event).target;
        switch(target.className){
            ////监听发送按钮
            case 'r':
                footer.send();
                break;
            //监听第一个按钮
            case 'l':
                if ($('.footerXun').css('display') === 'none')
                    $('.footerXun').css('display', 'flex');
                else
                    $('.footerXun').hide();
                break;
        }
    };

}