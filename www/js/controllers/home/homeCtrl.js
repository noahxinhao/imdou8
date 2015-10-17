angular.module('app.controllers')
    .controller('DashCtrl', function ($scope,
                                      $rootScope,
                                      $timeout,
                                      $ionicModal,
                                      AREA,
                                      appTools,
                                      barcodeScanner,
                                      ionPlatform,
                                      pusNotificationService,
                                      socketService) {
        //socketService.connectServe();
        var vm = $scope.vm = {};
        vm.updateData = function () {
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
                console.log("加载数据");
            }, 2000);
        };

        $scope.$on('$ionicView.enter', function () {
            $rootScope.hideTabs = "fadeInUp"
        });
        vm.slideElement = [
            {
                "img": "img/TB1km1AIXXXXXaAXVXXTIPs_XXX-1125-352.png"
            },
            {
                "img": "img/TB1fTKZIXXXXXcBXVXXSutbFXXX.jpg_q50.jpg"
            },
            {
                "img": "img/TB1vbq8IXXXXXcvXVXXXXXXXXXX.jpg_q50.jpg"
            },
            {
                "img": "img/TB1kKqDIXXXXXazXVXXdIns_XXX-1125-352.jpg_q50.jpg"
            },
            {
                "img": "img/TB1vbq8IXXXXXcvXVXXXXXXXXXX.jpg_q50.jpg"
            }
        ];

        vm.location_city = "上海";
        vm.AREA = AREA;
        $ionicModal.fromTemplateUrl('templates/components/area-select.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        $scope.$on('modal.hidden', function () {
        });
        $scope.$on('modal.removed', function () {
        });

        vm.select_city = function (city) {
            console.log(city);
            vm.location_city = city.name;
            $scope.closeModal();
        };

        //检查网络连接
        //vm.checkConnection = function () {
        //  var q = $q.defer();
        //  var connectStatus = appTools.checkConnection();
        //  if (connectStatus.indexOf("WiFi") >= -1) {
        //    q.resolve(connectStatus);
        //  } else {
        //    q.reject(connectStatus);
        //  }
        //  return q.promise;
        //};

        ionPlatform.ready.then(function (device) {
            //vm.checkConnection().then(function(){
            //  appTools.imCordovaToast("网络环境良好");
            //},function(){
            //  appTools.imCordovaToast("请在WIFI环境使用APP,以免耗费您的流量")
            //});

            //appTools.imCordovaToast(appTools.imGetCurrentPosition());


            //var networkState = navigator.connection.type;
            //var states = {};
            //states[Connection.UNKNOWN] = 'Unknown connection';
            //states[Connection.ETHERNET] = 'Ethernet connection';
            //states[Connection.WIFI] = 'WiFi connection';
            //states[Connection.CELL_2G] = 'Cell 2G connection';
            //states[Connection.CELL_3G] = 'Cell 3G connection';
            //states[Connection.CELL_4G] = 'Cell 4G connection';
            //states[Connection.CELL] = 'Cell generic connection';
            //states[Connection.NONE] = 'No network connection';
            //appTools.imCordovaToast(states[networkState]);
        });

        //获取地理位置信息
        //alert(appTools.imGetCurrentPosition());
        //alert(appTools.checkConnection());

        //监听消息推送 防止多次注册
        if (!$rootScope.notificationIsMonitor) {
            $rootScope.notificationIsMonitor = true;
            $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
                console.log("获取消息" + JSON.stringify([notification]));
                pusNotificationService.handleNotification(notification);
                $scope.$apply(function () {
                    $scope.notifications.push(JSON.stringify(notification.alert));
                })
            });
            $rootScope.$on("resume", function () {
                pusNotificationService.onResume()
            })
        }

        vm.imTheme = [
            {
                "themeType": "附近活动",
                "img": "img/icon/TB1oq4xHXXXXXbxXpXXszjdGpXX-140-140.png?imgtag=avatar);%20background-size:%20cover;%20background-position:%2050%%2050%;",
            },
            {
                "themeType": "免费试用",
                "img": "img/icon/TB1Ed9LGFXXXXc3XXXXszjdGpXX-140-140.png?imgtag=avatar); background-size: cover; background-position: 50% 50%;",
            },
            {
                "themeType": "有奖问卷",
                "img": "img/icon/TB1hW9KGFXXXXXLXpXXszjdGpXX-140-140.png?imgtag=avatar); background-size: cover; background-position: 50% 50%;",
            },
            {
                "themeType": "生活服务",
                "img": "img/icon/TB1pAV7HXXXXXX5aXXXszjdGpXX-140-140.png?imgtag=avatar); background-size: cover; background-position: 50% 50%;",
            }
        ];

        vm.topicList = [
            {
                "topicName": "附近活动",
                "details": [
                    {
                        "name": "贡茶",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s1.dpfile.com/pc/mc/6e39344171c9561d382f38afbe85fa6b(160x100)/thumb.jpg",
                        "note": "[13店通用]仅售12元，价值15元代金券，全场通用，每次最多可用1张,苹果花园(江西北路店)现已不再参与本次团购。如您还未使用，可持券至其他分店消费。不便之处，深表歉意！13店通用]仅售12元，价值15元代金券，全场通用，每次最多可用1张"
                    },
                    {
                        "name": "颐风茶道",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s2.dpfile.com/pc/mc/5e252f409f06a89f224104551a8f6e37(160x100)/thumb.jpg",
                        "note": "[13店通用]仅售16元，价值18元代金券，全场通用，每次最多可用1张"
                    },
                    {
                        "name": "小南国",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s1.dpfile.com/pc/mc/71cf7333acdaecfcd0a2045e6868b89b(160x100)/thumb.jpg",
                        "note": "苹果花园现已不再参与本次团购。如您还未使用，可持券至其..."
                    },
                    {
                        "name": "北国之春",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s1.dpfile.com/pc/mc/6e39344171c9561d382f38afbe85fa6b(160x100)/thumb.jpg",
                        "note": "金鼎路店现已不再参与本次团购。如您还未使用，可持券至其..."
                    }
                ]
            },
            {
                "topicName": "免费试用",
                "details": [
                    {
                        "name": "贡茶",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s1.dpfile.com/pc/mc/6e39344171c9561d382f38afbe85fa6b(160x100)/thumb.jpg",
                        "note": "[13店通用]仅售12元，价值15元代金券，全场通用，每次最多可用1张"
                    },
                    {
                        "name": "颐风茶道",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s2.dpfile.com/pc/mc/5e252f409f06a89f224104551a8f6e37(160x100)/thumb.jpg",
                        "note": "[13店通用]仅售12元，价值15元代金券，全场通用，每次最多可用1张"
                    },
                    {
                        "name": "小南国",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s1.dpfile.com/pc/mc/71cf7333acdaecfcd0a2045e6868b89b(160x100)/thumb.jpg",
                        "note": "苹果花园(江西北路店)现已不再参与本次团购。如您还未使用，可持券至其他分店消费。不便之处，深表歉意！13店通用]仅售12元，价值15元代金券，全场通用，每次最多可用1张"
                    },
                    {
                        "name": "北国之春",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s1.dpfile.com/pc/mc/6e39344171c9561d382f38afbe85fa6b(160x100)/thumb.jpg",
                        "note": "金鼎路店现已不再参与本次团购。如您还未使用，可持券至其他分店消费。不便之处，深表歉意！"
                    }
                ]
            }, {
                "topicName": "生活服务",
                "details": [
                    {
                        "name": "贡茶",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s1.dpfile.com/pc/mc/6e39344171c9561d382f38afbe85fa6b(160x100)/thumb.jpg",
                        "note": "[13店通用]仅售12元，价值15元代金券，全场通用，每次最多可用1张"
                    },
                    {
                        "name": "颐风茶道",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s2.dpfile.com/pc/mc/5e252f409f06a89f224104551a8f6e37(160x100)/thumb.jpg",
                        "note": "[13店通用]仅售12元，价值15元代金券，全场通用，每次最多可用1张"
                    },
                    {
                        "name": "小南国",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s1.dpfile.com/pc/mc/71cf7333acdaecfcd0a2045e6868b89b(160x100)/thumb.jpg",
                        "note": "[13店通用]仅售12元，价值15元代金券，全场通用，每次最多可用1张"
                    },
                    {
                        "name": "北国之春",
                        "url": "#/tab/ad-details",
                        "imgUrl": "http://t1.s1.dpfile.com/pc/mc/6e39344171c9561d382f38afbe85fa6b(160x100)/thumb.jpg",
                        "note": "[13店通用]仅售12元，价值15元代金券，全场通用，每次最多可用1张"
                    }
                ]
            }
        ];

        //二维码扫描
        vm.boardScan = function () {
            barcodeScanner.scan();
        }
    });
