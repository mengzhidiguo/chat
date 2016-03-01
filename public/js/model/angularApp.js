define(['angular', 'io'], function (angular, io) {

    var app = angular.module('chat', []).run(function ($rootScope) {
        //    可以通过run方法来访问$rootScope
    });

    //执行完ng-repeate  执行函数
    app.directive('repeatDone', function() {
        return {
            link: function(scope, element, attrs) {
                if (scope.$last) {                   // 这个判断意味着最后一个 OK
                    scope.$eval(attrs.repeatDone)    // 执行绑定的表达式
                }
            }
        }
    })

    ////自定义触摸事件
    app.directive('ngClick', ['$parse', '$timeout', '$rootElement',
        function($parse, $timeout, $rootElement) {
            var TAP_DURATION = 750; // Shorter than 750ms is a tap, longer is a taphold or drag.
            var MOVE_TOLERANCE = 12; // 12px seems to work in most mobile browsers.
            var PREVENT_DURATION = 2500; // 2.5 seconds maximum from preventGhostClick call to click
            var CLICKBUSTER_THRESHOLD = 25; // 25 pixels in any dimension is the limit for busting clicks.

            var ACTIVE_CLASS_NAME = 'ng-click-active';
            var lastPreventedTime;
            var touchCoordinates;
            var lastLabelClickCoordinates;
            function hit(x1, y1, x2, y2) {
                return Math.abs(x1 - x2) < CLICKBUSTER_THRESHOLD && Math.abs(y1 - y2) < CLICKBUSTER_THRESHOLD;
            }

            // Checks a list of allowable regions against a click location.
            // Returns true if the click should be allowed.
            // Splices out the allowable region from the list after it has been used.
            function checkAllowableRegions(touchCoordinates, x, y) {
                for (var i = 0; i < touchCoordinates.length; i += 2) {
                    if (hit(touchCoordinates[i], touchCoordinates[i + 1], x, y)) {
                        touchCoordinates.splice(i, i + 2);
                        return true; // allowable region
                    }
                }
                return false; // No allowable region; bust it.
            }

            // Global click handler that prevents the click if it's in a bustable zone and preventGhostClick
            // was called recently.
            function onClick(event) {
                if (Date.now() - lastPreventedTime > PREVENT_DURATION) {
                    return; // Too old.
                }
                var touches = event.touches && event.touches.length ? event.touches : [event];
                var x = touches[0].clientX;
                var y = touches[0].clientY;
                // Work around desktop Webkit quirk where clicking a label will fire two clicks (on the label
                // and on the input element). Depending on the exact browser, this second click we don't want
                // to bust has either (0,0), negative coordinates, or coordinates equal to triggering label
                // click event
                if (x < 1 && y < 1) {
                    return; // offscreen
                }
                if (lastLabelClickCoordinates &&
                    lastLabelClickCoordinates[0] === x && lastLabelClickCoordinates[1] === y) {
                    return; // input click triggered by label click
                }
                // reset label click coordinates on first subsequent click
                if (lastLabelClickCoordinates) {
                    lastLabelClickCoordinates = null;
                }
                // remember label click coordinates to prevent click busting of trigger click event on input
                if (event.target.tagName.toLowerCase() === 'label') {
                    lastLabelClickCoordinates = [x, y];
                }

                // Look for an allowable region containing this click.
                // If we find one, that means it was created by touchstart and not removed by
                // preventGhostClick, so we don't bust it.
                if (checkAllowableRegions(touchCoordinates, x, y)) {
                    return;
                }

                // If we didn't find an allowable region, bust the click.
                event.stopPropagation();
                event.preventDefault();

                // Blur focused form elements
                event.target && event.target.blur();
            }


            // Global touchstart handler that creates an allowable region for a click event.
            // This allowable region can be removed by preventGhostClick if we want to bust it.
            function onTouchStart(event) {
                var touches = event.touches && event.touches.length ? event.touches : [event];
                var x = touches[0].clientX;
                var y = touches[0].clientY;
                touchCoordinates.push(x, y);

                $timeout(function() {
                    // Remove the allowable region.
                    for (var i = 0; i < touchCoordinates.length; i += 2) {
                        if (touchCoordinates[i] == x && touchCoordinates[i + 1] == y) {
                            touchCoordinates.splice(i, i + 2);
                            return;
                        }
                    }
                }, PREVENT_DURATION, false);
            }

            // On the first call, attaches some event handlers. Then whenever it gets called, it creates a
            // zone around the touchstart where clicks will get busted.
            function preventGhostClick(x, y) {
                if (!touchCoordinates) {
                    $rootElement[0].addEventListener('click', onClick, true);
                    $rootElement[0].addEventListener('touchstart', onTouchStart, true);
                    touchCoordinates = [];
                }

                lastPreventedTime = Date.now();

                checkAllowableRegions(touchCoordinates, x, y);
            }

            // Actual linking function.
            return function(scope, element, attr) {
                var clickHandler = $parse(attr.ngClick),
                    tapping = false,
                    tapElement,  // Used to blur the element after a tap.
                    startTime,   // Used to check if the tap was held too long.
                    touchStartX,
                    touchStartY;

                function resetState() {
                    tapping = false;
                    element.removeClass(ACTIVE_CLASS_NAME);
                }

                element.on('touchstart', function(event) {
                    //console.log('touchstart')
                    tapping = true;
                    tapElement = event.target ? event.target : event.srcElement; // IE uses srcElement.
                    // Hack for Safari, which can target text nodes instead of containers.
                    if (tapElement.nodeType == 3) {
                        tapElement = tapElement.parentNode;
                    }

                    element.addClass(ACTIVE_CLASS_NAME);

                    startTime = Date.now();

                    var touches = event.touches && event.touches.length ? event.touches : [event];
                    var e = touches[0].originalEvent || touches[0];
                    touchStartX = e.clientX;
                    touchStartY = e.clientY;
                });

                element.on('touchmove', function(event) {
                    //console.log('touchmove')
                    resetState();
                });

                element.on('touchcancel', function(event) {
                    console.log('touchcancel')
                    resetState();
                });

                element.on('touchend', function(event) {
                    //console.log('touchend')
                    var tempElement = event.target ? event.target : event.srcElement; // IE uses srcElement.
                    if(tempElement === tapElement)
                        tapping = true;
                    var diff = Date.now() - startTime;

                    var touches = (event.changedTouches && event.changedTouches.length) ? event.changedTouches :
                        ((event.touches && event.touches.length) ? event.touches : [event]);
                    var e = touches[0].originalEvent || touches[0];
                    var x = e.clientX;
                    var y = e.clientY;
                    var dist = Math.sqrt(Math.pow(x - touchStartX, 2) + Math.pow(y - touchStartY, 2));
                    //console.log(tapping+'  diff:'+diff+'   TAP_DURATION:'+TAP_DURATION+'     dist:'+dist+'   MOVE_TOLERANCE:'+MOVE_TOLERANCE)
                    if (tapping && diff < TAP_DURATION && dist < MOVE_TOLERANCE) {
                        // Call preventGhostClick so the clickbuster will catch the corresponding click.
                        preventGhostClick(x, y);
                        if (tapElement) {
                            tapElement.blur();
                        }
                        //console.log('touchend222')
                        if (!angular.isDefined(attr.disabled) || attr.disabled === false) {
                            element.triggerHandler('click', [event]);
                        }
                    }
                    resetState();
                });

                // Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
                // something else nearby.
                element.onclick = function(event) {
                };
                element.on('click', function(event, touchend) {
                    //console.log('click')
                    scope.$apply(function() {
                        clickHandler(scope, {$event: (touchend || event)});
                    });
                });

                element.on('mousedown', function(event) {
                    //console.log('mousedown')
                    element.addClass(ACTIVE_CLASS_NAME);
                });

                element.on('mousemove mouseup', function(event) {
                    //console.log('mousemove mouseup')
                    element.removeClass(ACTIVE_CLASS_NAME);
                });

            };
        }]);

    app.service('$socket', function ($rootScope) {
        var socket = io();
        this.on = function (eventName, callback) {
            socket.on(eventName, function (msg) {
                callback(msg);
                $rootScope.$apply();
            })
        };
        this.emit = function (eventName, data) {
            socket.emit(eventName, data)
        };
    })
    //切换视图服务
    app.service('$switchView', function ($rootScope,$timeout) {
        //切换
        this.switch = function (eleFrom,eleTo, type,callback) {

            eleFrom =angular.element(document.querySelector(eleFrom));
            eleTo =angular.element(document.querySelector(eleTo));
            eleFrom.addClass('animalHide');
            eleTo.addClass('animalShow');
            //$rootScope.$apply();
            $timeout(function(){
                eleFrom.css('transform',' translate(-100%,0px)');
                eleFrom.removeClass('animalHide');
                eleTo.css('transform',' translate(0px,0px)');
                eleTo.removeClass('animalShow');
                callback();
            },1500);
        };

    });
    return app;
});
