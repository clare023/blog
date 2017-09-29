
!function($){
	var Tab = function(tab,setConfig){
		//保存自身类
		var _this = this;
		//保存单个tab组件
		this.tab = tab;
		//默认配置参数
		this.config = {
			"triggerTab":"mouseover",//鼠标触发方式
			"effect":"default",//切换效果
			"invoke":2,//默认选中第几个
			"auto":5000,//自动切换
		};
		
		//传入参数配置替换
        if(setConfig&&setConfig!=null){
            $.extend(this.config,setConfig);
        }
		
		//保存tab标签和tab列表
		this.tabItems = this.tab.find("ul.tab-top li");
		this.tabContentItems = this.tab.find(".tab-main .tab-item");
		
		//保存配置参数
		var config = this.config;
		console.log(config.triggerTab);
		//点击事件
		if(config.triggerTab === "click"){
			this.tabItems.bind(config.triggerTab,function(){
				_this.invoke($(this));//切换
			});
		}
		//不是click也不是mouseover执行mouseover
		else if(config.triggerTab === "mouseover" || config.triggerTab !== "click"){
			this.tabItems.mouseover(function(){
				var self = $(this);
				this.timer = window.setTimeout(function(){
					_this_.invoke(self);
				},300);
				
			}).mouseout(function(){
				window.clearTimeout(this.timer);
			});
		}
		
		//自动切换功能,如果设置了时间就按设置时间进行切换，设置false不自动切换
		if(config.auto){
			
			//定义全局定时器
			this.timer = null;
			//计数器
			this.loop = 0;
			//自动播放
			this.autoPlay();
			//鼠标放上清空定时器
			this.tab.hover(function(){
				clearInterval(_this.timer);
			},function(){
				_this.autoPlay();
			});
		}
		//默认选中第几个
		if(config.invoke > 1){
			this.invoke(this.tabItems.eq(config.invoke - 1));
		}
	}
	
	Tab.prototype = {
		//自动播放
		autoPlay:function(){
			
			var _this = this,
				tabItems = this.tabItems,//临时保存tab列表
				tabLength = tabItems.length,//tab列表元素个数
				config = this.config;//配置项
			console.log(this);
			this.timer = setInterval(function(){
				
			    _this.loop = (_this.loop + 1)% tabLength;
				
				tabItems.eq(_this.loop).trigger(config.triggerTab);
				
			},config.auto)
			
		},
		invoke:function(currentTab){
			var _this = this;
			/***
			 * 执行tab选中状态
			 * 当前选中加上active
			 * 切换当前对应的内容根据配置参数的effect值deault还是fade
			 * **/
			var index = currentTab.index();
			var conItems = this.tabContentItems;
			//tab选中状态
			currentTab.addClass("active").siblings("li").removeClass("active");
			
			var effect = this.config.effect;
			if(effect === "default" || effect !== "fade"){
				conItems.eq(index).show().siblings(".tab-item").hide();
			}
			else if(effect === "fade"){
				conItems.eq(index).fadeIn().siblings(".tab-item").fadeOut();
			}
			console.log(effect);
			
			//loop和index做同步
			//如果配置了自动播放auto才能设置
			if(this.config.auto){
				this.loop = index;
			}
		}
	};
	
	//调用直接new
	Tab.init = function(tabs){
		var _this = this;
		tabs.each(function(){
			new _this($(this));
		});
	}
	
	//注册jQuery方法
	$.fn.extend({
		tab:function(config){
			console.log(config);
			//Tab.init(this)
			this.each(function(){
				new Tab($(this),config||null);
			});
			return this;
		}
	});
	
	
	//注册至命名空间
	window.Tab = Tab;
}(jQuery)

$(".js-tab").tab({
	"triggerTab":"click",
	"effect":"fade",
	"invoke":2,
	"auto":3000
});

